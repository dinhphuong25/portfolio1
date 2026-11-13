import { XMLParser } from "fast-xml-parser";

export interface ParsedFeedItem {
  guid: string;
  title: string;
  url: string;
  publishedAt: string;
  author?: string;
  summary?: string;
  content?: string;
  imageUrl?: string;
  category?: string;
}

export interface ParsedFeedResult {
  title: string;
  link?: string;
  description?: string;
  items: ParsedFeedItem[];
}

// SSRF Safety Check: validate feed URL
export function validateFeedUrl(urlString: string): { valid: boolean; reason?: string } {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { valid: false, reason: "Giao thức không hợp lệ. Chỉ chấp nhận HTTP/HTTPS." };
    }

    const host = parsed.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "::1" ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)
    ) {
      return { valid: false, reason: "Không được phép truy cập địa chỉ IP nội bộ hoặc loopback (SSRF Protection)." };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: "URL không đúng định dạng." };
  }
}

// Clean HTML tags and decode basic HTML entities
export function stripHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

// Extract image URL from enclosure, media tags, or inline HTML
function extractImageUrl(item: any, htmlContent?: string): string | undefined {
  // Check enclosure
  if (item.enclosure) {
    if (item.enclosure["@_type"]?.startsWith("image/") && item.enclosure["@_url"]) {
      return item.enclosure["@_url"];
    }
    if (typeof item.enclosure === "string" && item.enclosure.startsWith("http")) {
      return item.enclosure;
    }
  }

  // Check media:content or media:thumbnail
  const mediaContent = item["media:content"] || item["media:thumbnail"];
  if (mediaContent) {
    if (mediaContent["@_url"]) return mediaContent["@_url"];
    if (Array.isArray(mediaContent) && mediaContent[0]?.["@_url"]) {
      return mediaContent[0]["@_url"];
    }
  }

  // Check HTML for <img> src
  if (htmlContent) {
    const match = htmlContent.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
    if (match && match[1]) {
      // Ignore tiny tracking pixels
      if (!match[1].includes("tracking") && !match[1].includes("1x1") && !match[1].endsWith(".gif")) {
        return match[1];
      }
    }
  }

  return undefined;
}

// Parse raw XML string to structured feed items
export function parseFeedXml(xmlString: string): ParsedFeedResult {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    trimValues: true,
    parseAttributeValue: false,
  });

  const parsed = parser.parse(xmlString);

  // Check if RSS 2.0
  if (parsed.rss && parsed.rss.channel) {
    const channel = parsed.rss.channel;
    const channelTitle = stripHtml(channel.title || "RSS Feed");
    const channelLink = typeof channel.link === "string" ? channel.link : channel.link?.["@_href"];
    const channelDesc = stripHtml(channel.description);

    let rawItems = channel.item || [];
    if (!Array.isArray(rawItems)) rawItems = [rawItems];

    const items: ParsedFeedItem[] = rawItems
      .filter((it: any) => it && (it.title || it.link))
      .map((it: any) => {
        const title = stripHtml(typeof it.title === "string" ? it.title : it.title?.["#text"]);
        const url =
          typeof it.link === "string"
            ? it.link
            : it.link?.["#text"] || it.link?.["@_href"] || it.guid?.["#text"] || it.guid || "";
        const guid =
          typeof it.guid === "string"
            ? it.guid
            : it.guid?.["#text"] || url || Math.random().toString(36).slice(2);

        const rawContent = it["content:encoded"] || it.content || it.description || "";
        const rawContentStr = typeof rawContent === "string" ? rawContent : rawContent?.["#text"] || "";
        const summary = stripHtml(
          typeof it.description === "string" ? it.description : it.description?.["#text"] || rawContentStr
        );
        const imageUrl = extractImageUrl(it, rawContentStr || (typeof it.description === "string" ? it.description : ""));

        const dateStr = it.pubDate || it["dc:date"] || it.date || new Date().toISOString();
        let publishedAt = new Date().toISOString();
        try {
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) publishedAt = d.toISOString();
        } catch {
          // fallback
        }

        const author =
          stripHtml(it["dc:creator"] || it.author?.name || it.author) || undefined;

        let category: string | undefined = undefined;
        if (it.category) {
          if (Array.isArray(it.category)) {
            category = it.category.map((c: any) => stripHtml(typeof c === "string" ? c : c?.["#text"])).filter(Boolean).join(", ");
          } else {
            category = stripHtml(typeof it.category === "string" ? it.category : it.category?.["#text"]);
          }
        }

        return {
          guid,
          title,
          url,
          publishedAt,
          author,
          summary: summary.slice(0, 1000),
          content: rawContentStr.slice(0, 5000),
          imageUrl,
          category,
        };
      });

    return {
      title: channelTitle,
      link: channelLink,
      description: channelDesc,
      items,
    };
  }

  // Check if Atom Feed
  if (parsed.feed) {
    const feed = parsed.feed;
    const feedTitle = stripHtml(feed.title?.["#text"] || feed.title || "Atom Feed");
    let feedLink = "";
    if (Array.isArray(feed.link)) {
      const alt = feed.link.find((l: any) => l["@_rel"] === "alternate") || feed.link[0];
      feedLink = alt?.["@_href"] || "";
    } else if (feed.link) {
      feedLink = feed.link["@_href"] || feed.link;
    }

    let rawEntries = feed.entry || [];
    if (!Array.isArray(rawEntries)) rawEntries = [rawEntries];

    const items: ParsedFeedItem[] = rawEntries
      .filter((entry: any) => entry && (entry.title || entry.link))
      .map((entry: any) => {
        const title = stripHtml(
          typeof entry.title === "string" ? entry.title : entry.title?.["#text"] || ""
        );

        let url = "";
        if (Array.isArray(entry.link)) {
          const alt = entry.link.find((l: any) => l["@_rel"] === "alternate") || entry.link[0];
          url = alt?.["@_href"] || "";
        } else if (entry.link) {
          url = entry.link["@_href"] || entry.link;
        }

        const guid = entry.id?.["#text"] || entry.id || url || Math.random().toString(36).slice(2);

        const contentRaw = entry.content?.["#text"] || entry.content || entry.summary?.["#text"] || entry.summary || "";
        const contentStr = typeof contentRaw === "string" ? contentRaw : "";
        const summary = stripHtml(contentStr).slice(0, 1000);
        const imageUrl = extractImageUrl(entry, contentStr);

        const dateStr = entry.updated || entry.published || new Date().toISOString();
        let publishedAt = new Date().toISOString();
        try {
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) publishedAt = d.toISOString();
        } catch {
          // fallback
        }

        const author = stripHtml(entry.author?.name || entry.author) || undefined;

        return {
          guid,
          title,
          url,
          publishedAt,
          author,
          summary,
          content: contentStr.slice(0, 5000),
          imageUrl,
        };
      });

    return {
      title: feedTitle,
      link: feedLink,
      items,
    };
  }

  throw new Error("Định dạng feed không được hỗ trợ (cần RSS 2.0 hoặc Atom XML).");
}

// Fetch and parse remote feed with timeout and SSRF protection
export async function fetchFeed(feedUrl: string): Promise<ParsedFeedResult> {
  const check = validateFeedUrl(feedUrl);
  if (!check.valid) {
    throw new Error(check.reason || "URL không hợp lệ.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 seconds timeout

  try {
    const res = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 DinhPhuongDevContentBot/1.0",
        Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml, */*",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }

    const xml = await res.text();
    return parseFeedXml(xml);
  } finally {
    clearTimeout(timeoutId);
  }
}
