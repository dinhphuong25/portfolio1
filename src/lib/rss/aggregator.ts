import { ContentSource, CollectedArticle, SyncLog } from "../db/types";
import {
  getContentSources,
  getContentSourceById,
  upsertCollectedArticle,
  updateContentSourceStatus,
  addSyncLog,
} from "../db";
import { fetchFeed, ParsedFeedItem } from "./parser";

// Fast edge-friendly hash function
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Generate deterministic ID for collected article
export function generateArticleId(sourceId: string, guidOrUrl: string): string {
  return `art_${simpleHash(`${sourceId}:${guidOrUrl}`)}`;
}

export async function syncSource(
  source: ContentSource
): Promise<{ success: boolean; itemsFound: number; itemsNew: number; error?: string }> {
  const startTime = Date.now();
  let itemsFound = 0;
  let itemsNew = 0;

  try {
    const feed = await fetchFeed(source.feed_url);
    itemsFound = feed.items.length;

    const now = new Date().toISOString();

    for (const item of feed.items) {
      if (!item.url || !item.title) continue;

      const articleId = generateArticleId(source.id, item.guid || item.url);
      const article: CollectedArticle = {
        id: articleId,
        source_id: source.id,
        source_name: source.name,
        title: item.title,
        original_url: item.url,
        guid: item.guid || item.url,
        author: item.author || null,
        published_at: item.publishedAt || now,
        raw_summary: item.summary || null,
        raw_content: item.content || item.summary || null,
        image_url: item.imageUrl || null,
        category_hint: item.category || source.category,
        status: "collected",
        ai_post_id: null,
        created_at: now,
        updated_at: now,
      };

      const isInserted = await upsertCollectedArticle(article);
      if (isInserted) {
        itemsNew++;
      }
    }

    // Update source status to success
    await updateContentSourceStatus(source.id, "success", null);

    // Add sync log
    const duration = Date.now() - startTime;
    const log: SyncLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      source_id: source.id,
      source_name: source.name,
      status: "success",
      items_found: itemsFound,
      items_new: itemsNew,
      error_message: null,
      duration_ms: duration,
      created_at: new Date().toISOString(),
    };
    await addSyncLog(log);

    return { success: true, itemsFound, itemsNew };
  } catch (err: any) {
    const duration = Date.now() - startTime;
    const errorMsg = err?.message || "Lỗi không xác định khi đồng bộ nguồn.";

    await updateContentSourceStatus(source.id, "error", errorMsg);

    const log: SyncLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      source_id: source.id,
      source_name: source.name,
      status: "failed",
      items_found: 0,
      items_new: 0,
      error_message: errorMsg,
      duration_ms: duration,
      created_at: new Date().toISOString(),
    };
    await addSyncLog(log);

    return { success: false, itemsFound: 0, itemsNew: 0, error: errorMsg };
  }
}

export async function syncSourceById(id: string) {
  const source = await getContentSourceById(id);
  if (!source) {
    throw new Error(`Không tìm thấy nguồn tin có ID: ${id}`);
  }
  return syncSource(source);
}

export async function syncAllActiveSources(): Promise<{
  totalSources: number;
  totalFound: number;
  totalNew: number;
  errors: { sourceName: string; error: string }[];
}> {
  const sources = await getContentSources();
  const activeSources = sources.filter((s) => s.is_active === 1);

  let totalFound = 0;
  let totalNew = 0;
  const errors: { sourceName: string; error: string }[] = [];

  for (const src of activeSources) {
    const res = await syncSource(src);
    totalFound += res.itemsFound;
    totalNew += res.itemsNew;
    if (!res.success && res.error) {
      errors.push({ sourceName: src.name, error: res.error });
    }
  }

  return {
    totalSources: activeSources.length,
    totalFound,
    totalNew,
    errors,
  };
}
