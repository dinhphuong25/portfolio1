import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/db";
import { BLOG_POSTS_VI, BLOG_POSTS_EN, BlogPost, getCategoryDisplay } from "@/data/posts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") === "en" ? "en" : "vi";
    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const dbResult = await getBlogPosts({
      category: category === "all" ? undefined : category,
      status: "published",
      limit,
      offset,
    });

    let posts: BlogPost[] = [];

    if (dbResult.posts && dbResult.posts.length > 0) {
      posts = dbResult.posts.map((p) => {
        // If this post matches a static post, use the static post version in the requested language
        const staticList = lang === "en" ? BLOG_POSTS_EN : BLOG_POSTS_VI;
        const staticMatch = staticList.find(
          (sp) => sp.slug === p.slug || sp.id === p.id
        );

        if (staticMatch) {
          return {
            ...staticMatch,
            views: p.views || staticMatch.views,
            publishedAt: p.published_at || staticMatch.publishedAt,
          };
        }

        let tags: string[] = [];
        try {
          tags = JSON.parse(p.tags);
        } catch {
          tags = [p.category];
        }

        // Format date according to language
        let formattedDate = lang === "en" ? "Recently" : "Gần đây";
        try {
          const d = new Date(p.published_at);
          if (lang === "en") {
            const months = [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            formattedDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
          } else {
            const day = d.getDate().toString().padStart(2, "0");
            const month = (d.getMonth() + 1).toString().padStart(2, "0");
            const year = d.getFullYear();
            formattedDate = `${day} Tháng ${month}, ${year}`;
          }
        } catch {
          //
        }

        const readTime =
          lang === "en"
            ? `${p.reading_time || 5} min read`
            : `${p.reading_time || 5} phút đọc`;

        return {
          id: p.id,
          title: p.title,
          excerpt: p.excerpt,
          date: formattedDate,
          readTime,
          category: getCategoryDisplay(p.category, lang),
          image: p.cover_image || "/blog/stepping-out-of-the-safe-nest.jpg",
          slug: p.slug,
          content: p.content,
          tags,
          isPublished: true,
          sourceType: p.source_type,
          sourceName: p.source_name || undefined,
          sourceUrl: p.source_url || undefined,
          author: p.author || (lang === "en" ? "Kim Dinh Phuong" : "Kim Đình Phương"),
          views: p.views,
          publishedAt: p.published_at,
        };
      });
    } else {
      // Fallback to static posts
      const staticList = lang === "en" ? BLOG_POSTS_EN : BLOG_POSTS_VI;
      posts = staticList.map((p) => ({
        ...p,
        sourceType: p.sourceType || ("original" as const),
        author: p.author || (lang === "en" ? "Kim Dinh Phuong" : "Kim Đình Phương"),
      }));
    }

    // Apply search filter if specified
    if (search) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.excerpt.toLowerCase().includes(search) ||
          p.tags?.some((t) => t.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      success: true,
      posts,
      total: posts.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Lỗi lấy danh sách bài viết." },
      { status: 500 }
    );
  }
}
