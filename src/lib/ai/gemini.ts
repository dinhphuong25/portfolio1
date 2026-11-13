import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CollectedArticle, DbBlogPost } from "../db/types";

export interface AISynthesizedArticle {
  title: string;
  excerpt: string;
  content: string;
  category: "Công nghệ" | "Lập trình" | "AI" | "Logistics" | "Học tập" | "Trải nghiệm";
  tags: string[];
  readingTime: number;
  seoTitle: string;
  seoDescription: string;
}

// Convert Vietnamese title to URL-friendly slug
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/(\s+)/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getGeminiApiKey(): Promise<string | undefined> {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  try {
    const ctx = await getCloudflareContext();
    if (ctx?.env?.GEMINI_API_KEY) {
      return ctx.env.GEMINI_API_KEY;
    }
  } catch {
    // Edge context not available
  }
  return undefined;
}

// Intelligent heuristic synthesizer when Gemini API key is not yet configured
function generateHeuristicSynthesis(article: CollectedArticle): AISynthesizedArticle {
  const isLogistics =
    article.source_id.includes("vla") ||
    article.source_id.includes("vlr") ||
    /logistics|chuỗi cung ứng|kho bãi|vận tải|cảng biển/i.test(article.title + " " + (article.raw_summary || ""));

  const isAI = /ai|artificial intelligence|trí tuệ nhân tạo|llm|chatgpt|gemini|deepseek/i.test(
    article.title + " " + (article.raw_summary || "")
  );

  let category: AISynthesizedArticle["category"] = "Công nghệ";
  if (isLogistics) category = "Logistics";
  else if (isAI) category = "AI";

  const cleanSummary = article.raw_summary || article.title;
  const wordCount = (cleanSummary + " " + (article.raw_content || "")).split(/\s+/).length;
  const readingTime = Math.max(3, Math.min(10, Math.ceil(wordCount / 200)));

  const content = `
> **Tóm tắt nhanh:** Bài viết này tổng hợp và phân tích thông tin mới nhất từ **${article.source_name}** về chủ đề: *${article.title}*. Dưới góc nhìn công nghệ và quản trị thực tiễn, sự phát triển này mang lại nhiều giá trị đáng chú ý.

---

### 1. Bối cảnh & Điểm tin chính

${cleanSummary}

${
  article.raw_content && article.raw_content !== article.raw_summary
    ? article.raw_content
        .split("\n\n")
        .slice(0, 3)
        .map((p) => p.trim())
        .filter(Boolean)
        .join("\n\n")
    : ""
}

---

### 2. Phân tích & Góc nhìn thực tiễn

Trong bối cảnh chuyển đổi số đang diễn ra mạnh mẽ trên toàn cầu, các bước tiến như trên không chỉ tác động đến riêng ngành công nghệ mà còn lan tỏa mạnh mẽ đến các lĩnh vực vận hành, logistics và tự động hóa quy trình:

* **Tối ưu hóa năng suất:** Việc áp dụng các giải pháp số và dữ liệu theo thời gian thực giúp giảm thiểu các nút thắt cổ chai truyền thống.
* **Tính liên kết hệ sinh thái:** Khả năng kết nối API và đồng bộ dữ liệu liên tục mở ra nhiều tiềm năng phát triển các công cụ hỗ trợ người dùng cuối.
* **Gợi mở cho lập trình & ứng dụng:** Đây là nguồn cảm hứng thực tế cho các dự án phát triển phần mềm và tối ưu hóa hệ thống vận hành.

---

### 3. Lời kết

Việc cập nhật liên tục các xu hướng công nghệ và vận hành mới là chìa khóa để xây dựng các giải pháp có giá trị thực tiễn cao. Mình sẽ tiếp tục theo dõi và chia sẻ các phân tích chuyên sâu hơn trong thời gian tới.

---

*Bài viết được tổng hợp và biên soạn lại dựa trên thông tin phát hành từ nguồn chính thức: [${article.source_name}](${article.original_url}).*
`.trim();

  return {
    title: article.title,
    excerpt: cleanSummary.slice(0, 220) + (cleanSummary.length > 220 ? "..." : ""),
    content,
    category,
    tags: [category, article.source_name, "Tổng hợp tin tức", "Công nghệ số"],
    readingTime,
    seoTitle: `${article.title.slice(0, 50)} | Blog Kim Đình Phương`,
    seoDescription: cleanSummary.slice(0, 155),
  };
}

export async function synthesizeArticleWithGemini(
  article: CollectedArticle
): Promise<AISynthesizedArticle> {
  const apiKey = await getGeminiApiKey();

  if (!apiKey) {
    console.warn("GEMINI_API_KEY chưa được cấu hình. Sử dụng heuristic synthesis fallback.");
    return generateHeuristicSynthesis(article);
  }

  const prompt = `
Bạn là Senior Tech Writer và AI Content Editor cho website cá nhân của Kim Đình Phương (dinhphuong.dev) - sinh viên Logistics và đam mê Lập trình, Công nghệ, AI.

NHIỆM VỤ:
Hãy phân tích nội dung nguồn dưới đây và biên soạn thành một bài viết blog tiếng Việt hoàn chỉnh, sâu sắc, có giá trị riêng và phong cách chuyên nghiệp, gần gũi.

THÔNG TIN BÀI VIẾT GỐC:
- Nguồn: ${article.source_name}
- Tiêu đề gốc: ${article.title}
- Ngày phát hành: ${article.published_at}
- Tác giả gốc: ${article.author || "N/A"}
- Bản tóm tắt/nội dung thu thập:
"""
${article.raw_summary || ""}
${article.raw_content || ""}
"""

NGUYÊN TẮC BẮT BUỘC:
1. KHÔNG DỊCH MÁY NGUYÊN VĂN. Hãy cấu trúc lại thông tin bằng ngôn ngữ tiếng Việt tự nhiên, mạch lạc.
2. KHÔNG TỰ BỊA SỐ LIỆU hoặc sự kiện giả mạo. Phân biệt rõ thông tin từ nguồn và phần phân tích của người viết.
3. BỔ SUNG GÓC NHÌN: Phân tích ý nghĩa của thông tin này đối với ngành công nghệ, ứng dụng phần mềm hoặc quản lý chuỗi cung ứng/logistics nếu liên quan.
4. CẤU TRÚC BÀI VIẾT MARKDOWN:
   - Dùng tiêu đề phụ h3 (### 1. Bối cảnh & Tổng quan, ### 2. Các điểm cốt lõi, ### 3. Phân tích & Góc nhìn thực tiễn, ### 4. Kết luận).
   - Có phần trích dẫn callout (sử dụng blockquote >).
   - Cuối bài có mục trích dẫn nguồn rõ ràng: [Tên nguồn](đường dẫn gốc).
5. CHỌN 1 TRONG CÁC DANH MỤC SAU: "Công nghệ", "Lập trình", "AI", "Logistics", "Học tập", "Trải nghiệm".
6. TRẢ VỀ KẾT QUẢ DƯỚI ĐỊNH DẠNG JSON DUY NHẤT (không bọc trong \`\`\`json thừa thãi, chỉ trả về JSON hợp lệ):
{
  "title": "Tiêu đề tiếng Việt hấp dẫn, chính xác, không giật tít rẻ tiền",
  "excerpt": "Đoạn tóm tắt mở đầu 2-3 câu ngắn gọn, thu hút người đọc",
  "content": "Nội dung bài viết đầy đủ định dạng Markdown tiếng Việt",
  "category": "Công nghệ" | "Lập trình" | "AI" | "Logistics" | "Học tập" | "Trải nghiệm",
  "tags": ["Từ khóa 1", "Từ khóa 2", "Từ khóa 3", "Từ khóa 4"],
  "readingTime": 5,
  "seoTitle": "Tiêu đề chuẩn SEO dưới 60 ký tự",
  "seoDescription": "Mô tả chuẩn SEO dưới 155 ký tự"
}
`;

  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 3000,
            responseMimeType: "application/json",
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Lỗi Gemini API (${model}):`, res.status, errText);
        continue; // Try fallback model
      }

      const data = (await res.json()) as any;
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      // Clean potential code fences
      const cleaned = rawText.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
      const parsed: AISynthesizedArticle = JSON.parse(cleaned);

      // Validate parsed fields
      if (!parsed.title || !parsed.content) {
        throw new Error("Dữ liệu JSON từ Gemini thiếu trường title hoặc content.");
      }

      return parsed;
    } catch (err) {
      console.warn(`Lỗi khi gọi model ${model}:`, err);
    }
  }

  // If all Gemini calls failed, fallback to heuristic synthesis
  return generateHeuristicSynthesis(article);
}

// Convert synthesized article into a ready-to-save DbBlogPost
export function createBlogPostFromSynthesis(
  article: CollectedArticle,
  synth: AISynthesizedArticle
): DbBlogPost {
  const baseSlug = slugify(synth.title);
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  const slug = `${baseSlug}-${randomSuffix}`;
  const now = new Date().toISOString();

  return {
    id: `post_${Date.now()}_${randomSuffix}`,
    slug,
    title: synth.title,
    excerpt: synth.excerpt,
    content: synth.content,
    category: synth.category,
    tags: JSON.stringify(synth.tags || [synth.category]),
    cover_image: article.image_url || null,
    reading_time: synth.readingTime || 5,
    author: "Kim Đình Phương",
    source_type: "curated",
    source_name: article.source_name,
    source_url: article.original_url,
    collected_article_id: article.id,
    status: "published",
    views: 1,
    seo_title: synth.seoTitle,
    seo_description: synth.seoDescription,
    published_at: now,
    created_at: now,
    updated_at: now,
  };
}
