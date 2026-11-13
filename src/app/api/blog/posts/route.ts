import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/db";
import { BLOG_POSTS_VI, BlogPost } from "@/data/posts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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
        let tags: string[] = [];
        try {
          tags = JSON.parse(p.tags);
        } catch {
          tags = [p.category];
        }

        // Format date in Vietnamese
        let formattedDate = "Gần đây";
        try {
          const d = new Date(p.published_at);
          const day = d.getDate().toString().padStart(2, "0");
          const month = (d.getMonth() + 1).toString().padStart(2, "0");
          const year = d.getFullYear();
          formattedDate = `${day} Tháng ${month}, ${year}`;
        } catch {
          //
        }

        return {
          id: p.id,
          title: p.title,
          excerpt: p.excerpt,
          date: formattedDate,
          readTime: `${p.reading_time || 5} phút đọc`,
          category: p.category,
          image: p.cover_image || "/untitled-1555924881176370155281.jpg",
          slug: p.slug,
          content: p.content,
          tags,
          isPublished: true,
          sourceType: p.source_type,
          sourceName: p.source_name || undefined,
          sourceUrl: p.source_url || undefined,
          author: p.author,
          views: p.views,
          publishedAt: p.published_at,
        };
      });
    } else {
      // Fallback to static posts
      posts = BLOG_POSTS_VI.map((p) => ({
        ...p,
        sourceType: "original" as const,
        author: "Kim Đình Phương",
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
