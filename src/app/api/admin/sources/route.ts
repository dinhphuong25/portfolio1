import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import {
  getContentSources,
  upsertContentSource,
  deleteContentSource,
  updateContentSourceStatus,
} from "@/lib/db";
import { fetchFeed, validateFeedUrl } from "@/lib/rss/parser";
import { syncSourceById, syncAllActiveSources } from "@/lib/rss/aggregator";

export async function GET(request: Request) {
  const isAuth = await isAdminAuthenticated(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Chưa xác thực." }, { status: 401 });
  }

  try {
    const sources = await getContentSources();
    return NextResponse.json({ success: true, sources });
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

    // 1. Sync all sources
    if (action === "sync-all") {
      const result = await syncAllActiveSources();
      return NextResponse.json({ success: true, result });
    }

    // 2. Sync single source
    if (action === "sync-one") {
      const { sourceId } = body;
      if (!sourceId) {
        return NextResponse.json({ error: "Thiếu sourceId." }, { status: 400 });
      }
      const result = await syncSourceById(sourceId);
      return NextResponse.json({ success: true, result });
    }

    // 3. Test RSS feed URL
    if (action === "test") {
      const { feedUrl } = body;
      if (!feedUrl) {
        return NextResponse.json({ error: "Thiếu feedUrl." }, { status: 400 });
      }
      const check = validateFeedUrl(feedUrl);
      if (!check.valid) {
        return NextResponse.json({ error: check.reason }, { status: 400 });
      }
      const feed = await fetchFeed(feedUrl);
      return NextResponse.json({
        success: true,
        feedTitle: feed.title,
        itemsCount: feed.items.length,
        sampleItems: feed.items.slice(0, 3),
      });
    }

    // 4. Toggle active status
    if (action === "toggle") {
      const { sourceId, isActive } = body;
      const sources = await getContentSources();
      const existing = sources.find((s) => s.id === sourceId);
      if (!existing) {
        return NextResponse.json({ error: "Không tìm thấy nguồn." }, { status: 404 });
      }
      const updated = await upsertContentSource({
        ...existing,
        is_active: isActive ? 1 : 0,
      });
      return NextResponse.json({ success: true, source: updated });
    }

    // 5. Upsert source (create or edit)
    if (action === "upsert") {
      const { source } = body;
      if (!source || !source.name || !source.feed_url) {
        return NextResponse.json(
          { error: "Vui lòng điền đầy đủ tên và đường dẫn RSS Feed." },
          { status: 400 }
        );
      }

      const check = validateFeedUrl(source.feed_url);
      if (!check.valid) {
        return NextResponse.json({ error: check.reason }, { status: 400 });
      }

      const id =
        source.id || `src_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const saved = await upsertContentSource({
        id,
        name: source.name,
        url: source.url || source.feed_url,
        feed_url: source.feed_url,
        category: source.category || "tech_global",
        is_active: source.is_active !== undefined ? source.is_active : 1,
        fetch_interval_min: source.fetch_interval_min || 60,
        last_fetched_at: source.last_fetched_at || null,
        last_status: source.last_status || "pending",
        error_count: source.error_count || 0,
        last_error: source.last_error || null,
      });

      return NextResponse.json({ success: true, source: saved });
    }

    return NextResponse.json({ error: "Hành động không hợp lệ." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Lỗi xử lý yêu cầu." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = await isAdminAuthenticated(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Chưa xác thực." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Thiếu tham số ID." }, { status: 400 });
    }

    await deleteContentSource(id);
    return NextResponse.json({ success: true, message: "Đã xóa nguồn thành công." });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
