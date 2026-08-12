import { BLOG_POSTS } from "@/data/posts";
import { tutorials } from "@/data/tutorials";

const SITE_URL = "https://kimdinhphuong.dev";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseDate(input: string): Date {
  const parsed = new Date(input);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }
  return new Date();
}

export async function GET() {
  const blogItems = BLOG_POSTS.map((post) => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    return {
      title: post.title,
      description: post.excerpt,
      link,
      pubDate: parseDate(post.date).toUTCString(),
    };
  });

  const tutorialItems = tutorials.map((tutorial) => {
    const link = `${SITE_URL}/tut/${tutorial.slug}`;
    return {
      title: tutorial.title,
      description: tutorial.description,
      link,
      pubDate: parseDate(tutorial.date).toUTCString(),
    };
  });

  const items = [...blogItems, ...tutorialItems]
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .map(
      (item) => `\n  <item>\n    <title>${escapeXml(item.title)}</title>\n    <description>${escapeXml(item.description)}</description>\n    <link>${item.link}</link>\n    <guid>${item.link}</guid>\n    <pubDate>${item.pubDate}</pubDate>\n  </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n<channel>\n  <title>Kim Đình Phương Portfolio Feed</title>\n  <description>Latest blog posts and tutorials from Kim Đình Phương</description>\n  <link>${SITE_URL}</link>${items}\n</channel>\n</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
