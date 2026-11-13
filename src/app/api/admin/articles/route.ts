import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import {
  getCollectedArticles,
  getCollectedArticleById,
  updateArticleStatus,
  saveBlogPost,
  deleteBlogPost,
  getBlogPostBySlug,
} from "@/lib/db";
import {
  synthesizeArticleWithGemini,
  createBlogPostFromSynthesis,
} from "@/lib/ai/gemini";
import { DbBlogPost } from "@/lib/db/types";

export async function GET(request: Request) {
  const isAuth = await isAdminAuthenticated(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Chưa xác thực." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const sourceId = searchParams.get("sourceId") || "all";
    const limit = parseInt(searchParams.get("limit") || "40", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const result = await getCollectedArticles({
      status,
      sourceId,
      limit,
      offset,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await isAdminAuthenticated(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Chưa xác thực." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as any;
    const { action } = body;

    // 1. Synthesize article with AI
    if (action === "synthesize") {
      const { articleId } = body;
      if (!articleId) {
        return NextResponse.json({ error: "Thiếu articleId." }, { status: 400 });
      }

      const article = await getCollectedArticleById(articleId);
      if (!article) {
        return NextResponse.json(
          { error: "Không tìm thấy bài viết nguồn." },
          { status: 404 }
        );
      }

      await updateArticleStatus(articleId, "processing");

      try {
        const synth = await synthesizeArticleWithGemini(article);
        const post = createBlogPostFromSynthesis(article, synth);
        post.status = "draft"; // Save as draft initially so admin can review

        await saveBlogPost(post);
        await updateArticleStatus(articleId, "pending", post.id);

        return NextResponse.json({
          success: true,
          message: "Đã tổng hợp bài viết thành công qua AI.",
          post,
          synthesis: synth,
        });
      } catch (err: any) {
        await updateArticleStatus(articleId, "collected");
        throw err;
      }
    }

    // 2. Publish or update status
    if (action === "update-status") {
      const { articleId, status, aiPostId } = body;
      if (!articleId || !status) {
        return NextResponse.json(
          { error: "Thiếu articleId hoặc status." },
          { status: 400 }
        );
      }
      await updateArticleStatus(articleId, status, aiPostId);
      return NextResponse.json({ success: true, message: "Đã cập nhật trạng thái." });
    }

    // 3. Save / publish blog post
    if (action === "save-post") {
      const { post, articleId } = body as { post: DbBlogPost; articleId?: string };
      if (!post || !post.title || !post.slug) {
        return NextResponse.json(
          { error: "Dữ liệu bài viết không hợp lệ." },
          { status: 400 }
        );
      }

      const saved = await saveBlogPost(post);
      if (articleId) {
        await updateArticleStatus(
          articleId,
          post.status === "published" ? "published" : "draft",
          saved.id
        );
      }

      return NextResponse.json({ success: true, post: saved });
    }

    // 4. Reject article
    if (action === "reject") {
      const { articleId } = body;
      if (!articleId) {
        return NextResponse.json({ error: "Thiếu articleId." }, { status: 400 });
      }
      await updateArticleStatus(articleId, "rejected");
      return NextResponse.json({ success: true, message: "Đã từ chối bài viết." });
    }

    return NextResponse.json({ error: "Hành động không hợp lệ." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lỗi xử lý yêu cầu." }, { status: 500 });
  }
}
