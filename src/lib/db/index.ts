import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ContentSource, CollectedArticle, DbBlogPost, SyncLog } from "./types";
import { DEFAULT_CONTENT_SOURCES, INITIAL_BLOG_POSTS } from "./seed";

export * from "./types";
export * from "./seed";

// In-memory / Local dev state cache
interface MemoryDb {
  sources: Map<string, ContentSource>;
  articles: Map<string, CollectedArticle>;
  posts: Map<string, DbBlogPost>;
  logs: SyncLog[];
}

let globalMemoryDb: MemoryDb | null = null;

function getMemoryDb(): MemoryDb {
  if (globalMemoryDb) return globalMemoryDb;

  const sources = new Map<string, ContentSource>();
  for (const src of DEFAULT_CONTENT_SOURCES) {
    sources.set(src.id, {
      ...src,
      updated_at: src.created_at,
    });
  }

  const posts = new Map<string, DbBlogPost>();
  for (const post of INITIAL_BLOG_POSTS) {
    posts.set(post.id, post);
  }

  globalMemoryDb = {
    sources,
    articles: new Map<string, CollectedArticle>(),
    posts,
    logs: [],
  };

  // Try to load persisted JSON in local Node environment if available
  if (typeof process !== "undefined" && process.versions?.node) {
    try {
      // Dynamic import to avoid edge bundling issues
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("fs");
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require("path");
      const filePath = path.join(process.cwd(), ".data", "portfolio_db.json");
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(raw);
        if (data.sources) {
          for (const s of data.sources) sources.set(s.id, s);
        }
        if (data.articles) {
          for (const a of data.articles) globalMemoryDb.articles.set(a.id, a);
        }
        if (data.posts) {
          for (const p of data.posts) posts.set(p.id, p);
        }
        if (data.logs) {
          globalMemoryDb.logs = data.logs;
        }
      }
    } catch {
      // Ignore file persistence errors in read-only / edge environments
    }
  }

  return globalMemoryDb;
}

function persistLocalMemoryDb(db: MemoryDb) {
  if (typeof process !== "undefined" && process.versions?.node) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("fs");
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require("path");
      const dataDir = path.join(process.cwd(), ".data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "portfolio_db.json");
      const dump = {
        sources: Array.from(db.sources.values()),
        articles: Array.from(db.articles.values()),
        posts: Array.from(db.posts.values()),
        logs: db.logs.slice(-200),
      };
      fs.writeFileSync(filePath, JSON.stringify(dump, null, 2), "utf-8");
    } catch {
      // Ignore in environments where filesystem write is unavailable
    }
  }
}

// Cloudflare D1 Context Helper
async function getD1(): Promise<any | null> {
  try {
    const ctx = await getCloudflareContext();
    if (ctx && ctx.env && (ctx.env as any).DB) {
      return (ctx.env as any).DB;
    }
  } catch {
    // Context not available in standard Node / build
  }
  return null;
}

// Ensure D1 Tables exist when D1 is available
let d1Initialized = false;
async function ensureD1Tables(d1: any) {
  if (d1Initialized) return;
  try {
    // Create tables if not exist
    await d1.batch([
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS content_sources (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          url TEXT NOT NULL,
          feed_url TEXT NOT NULL UNIQUE,
          category TEXT NOT NULL,
          is_active INTEGER DEFAULT 1,
          fetch_interval_min INTEGER DEFAULT 60,
          last_fetched_at TEXT,
          last_status TEXT DEFAULT 'pending',
          error_count INTEGER DEFAULT 0,
          last_error TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS collected_articles (
          id TEXT PRIMARY KEY,
          source_id TEXT NOT NULL,
          source_name TEXT NOT NULL,
          title TEXT NOT NULL,
          original_url TEXT NOT NULL UNIQUE,
          guid TEXT NOT NULL,
          author TEXT,
          published_at TEXT NOT NULL,
          raw_summary TEXT,
          raw_content TEXT,
          image_url TEXT,
          category_hint TEXT,
          status TEXT NOT NULL DEFAULT 'collected',
          ai_post_id TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id TEXT PRIMARY KEY,
          slug TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          tags TEXT NOT NULL,
          cover_image TEXT,
          reading_time INTEGER DEFAULT 5,
          author TEXT DEFAULT 'Kim Đình Phương',
          source_type TEXT NOT NULL DEFAULT 'curated',
          source_name TEXT,
          source_url TEXT,
          collected_article_id TEXT,
          status TEXT NOT NULL DEFAULT 'published',
          views INTEGER DEFAULT 0,
          seo_title TEXT,
          seo_description TEXT,
          published_at TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS sync_logs (
          id TEXT PRIMARY KEY,
          source_id TEXT,
          source_name TEXT,
          status TEXT NOT NULL,
          items_found INTEGER DEFAULT 0,
          items_new INTEGER DEFAULT 0,
          error_message TEXT,
          duration_ms INTEGER DEFAULT 0,
          created_at TEXT NOT NULL
        )
      `),
    ]);

    // Check if sources are seeded in D1
    const { results: existingSources } = await d1
      .prepare(`SELECT count(*) as count FROM content_sources`)
      .all();
    if (!existingSources || existingSources[0]?.count === 0) {
      const inserts = DEFAULT_CONTENT_SOURCES.map((src) =>
        d1
          .prepare(
            `INSERT OR IGNORE INTO content_sources (id, name, url, feed_url, category, is_active, fetch_interval_min, last_status, error_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            src.id,
            src.name,
            src.url,
            src.feed_url,
            src.category,
            src.is_active,
            src.fetch_interval_min,
            src.last_status,
            src.error_count,
            src.created_at,
            src.created_at
          )
      );
      await d1.batch(inserts);
    }

    // Check if initial blog posts are seeded
    const { results: existingPosts } = await d1
      .prepare(`SELECT count(*) as count FROM blog_posts`)
      .all();
    if (!existingPosts || existingPosts[0]?.count === 0) {
      const postInserts = INITIAL_BLOG_POSTS.map((p) =>
        d1
          .prepare(
            `INSERT OR IGNORE INTO blog_posts (id, slug, title, excerpt, content, category, tags, cover_image, reading_time, author, source_type, status, views, seo_title, seo_description, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            p.id,
            p.slug,
            p.title,
            p.excerpt,
            p.content,
            p.category,
            p.tags,
            p.cover_image,
            p.reading_time,
            p.author,
            p.source_type,
            p.status,
            p.views,
            p.seo_title,
            p.seo_description,
            p.published_at,
            p.created_at,
            p.updated_at
          )
      );
      await d1.batch(postInserts);
    }

    d1Initialized = true;
  } catch (err) {
    console.error("Error ensuring D1 tables:", err);
  }
}

// ----------------------------------------------------
// Public Database API
// ----------------------------------------------------

export async function getContentSources(): Promise<ContentSource[]> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const { results } = await d1
      .prepare(`SELECT * FROM content_sources ORDER BY name ASC`)
      .all();
    return (results as ContentSource[]) || [];
  }
  const db = getMemoryDb();
  return Array.from(db.sources.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getContentSourceById(id: string): Promise<ContentSource | null> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const res = await d1
      .prepare(`SELECT * FROM content_sources WHERE id = ?`)
      .bind(id)
      .first();
    return (res as ContentSource) || null;
  }
  const db = getMemoryDb();
  return db.sources.get(id) || null;
}

export async function upsertContentSource(
  source: Omit<ContentSource, "created_at" | "updated_at"> & {
    created_at?: string;
    updated_at?: string;
  }
): Promise<ContentSource> {
  const now = new Date().toISOString();
  const fullSource: ContentSource = {
    ...source,
    created_at: source.created_at || now,
    updated_at: now,
  };

  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    await d1
      .prepare(
        `INSERT INTO content_sources (id, name, url, feed_url, category, is_active, fetch_interval_min, last_fetched_at, last_status, error_count, last_error, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           name = excluded.name,
           url = excluded.url,
           feed_url = excluded.feed_url,
           category = excluded.category,
           is_active = excluded.is_active,
           fetch_interval_min = excluded.fetch_interval_min,
           updated_at = excluded.updated_at`
      )
      .bind(
        fullSource.id,
        fullSource.name,
        fullSource.url,
        fullSource.feed_url,
        fullSource.category,
        fullSource.is_active,
        fullSource.fetch_interval_min,
        fullSource.last_fetched_at,
        fullSource.last_status,
        fullSource.error_count,
        fullSource.last_error,
        fullSource.created_at,
        fullSource.updated_at
      )
      .run();
    return fullSource;
  }

  const db = getMemoryDb();
  db.sources.set(fullSource.id, fullSource);
  persistLocalMemoryDb(db);
  return fullSource;
}

export async function updateContentSourceStatus(
  id: string,
  lastStatus: "success" | "error" | "pending",
  lastError: string | null = null,
  errorDelta = 0
): Promise<void> {
  const now = new Date().toISOString();
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    await d1
      .prepare(
        `UPDATE content_sources
         SET last_fetched_at = ?,
             last_status = ?,
             last_error = ?,
             error_count = CASE WHEN ? = 'error' THEN error_count + 1 ELSE 0 END,
             updated_at = ?
         WHERE id = ?`
      )
      .bind(now, lastStatus, lastError, lastStatus, now, id)
      .run();
    return;
  }

  const db = getMemoryDb();
  const s = db.sources.get(id);
  if (s) {
    s.last_fetched_at = now;
    s.last_status = lastStatus;
    s.last_error = lastError;
    s.error_count = lastStatus === "error" ? s.error_count + 1 : 0;
    s.updated_at = now;
    persistLocalMemoryDb(db);
  }
}

export async function deleteContentSource(id: string): Promise<boolean> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    await d1.prepare(`DELETE FROM content_sources WHERE id = ?`).bind(id).run();
    return true;
  }
  const db = getMemoryDb();
  const deleted = db.sources.delete(id);
  persistLocalMemoryDb(db);
  return deleted;
}

// ----------------------------------------------------
// Collected Articles
// ----------------------------------------------------

export async function getCollectedArticles(options?: {
  status?: string;
  sourceId?: string;
  limit?: number;
  offset?: number;
}): Promise<{ articles: CollectedArticle[]; total: number }> {
  const limit = options?.limit || 50;
  const offset = options?.offset || 0;

  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const conditions: string[] = [];
    const params: any[] = [];

    if (options?.status && options.status !== "all") {
      conditions.push("status = ?");
      params.push(options.status);
    }
    if (options?.sourceId && options.sourceId !== "all") {
      conditions.push("source_id = ?");
      params.push(options.sourceId);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countRes = await d1
      .prepare(`SELECT count(*) as total FROM collected_articles ${whereClause}`)
      .bind(...params)
      .first();

    const { results } = await d1
      .prepare(
        `SELECT * FROM collected_articles ${whereClause} ORDER BY published_at DESC LIMIT ? OFFSET ?`
      )
      .bind(...params, limit, offset)
      .all();

    return {
      articles: (results as CollectedArticle[]) || [],
      total: countRes?.total || 0,
    };
  }

  const db = getMemoryDb();
  let list = Array.from(db.articles.values());
  if (options?.status && options.status !== "all") {
    list = list.filter((a) => a.status === options.status);
  }
  if (options?.sourceId && options.sourceId !== "all") {
    list = list.filter((a) => a.source_id === options.sourceId);
  }

  list.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return {
    articles: list.slice(offset, offset + limit),
    total: list.length,
  };
}

export async function getCollectedArticleById(
  id: string
): Promise<CollectedArticle | null> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const res = await d1
      .prepare(`SELECT * FROM collected_articles WHERE id = ?`)
      .bind(id)
      .first();
    return (res as CollectedArticle) || null;
  }
  const db = getMemoryDb();
  return db.articles.get(id) || null;
}

export async function upsertCollectedArticle(
  article: CollectedArticle
): Promise<boolean> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    // Insert if not exists, ignore duplicate original_url
    const res = await d1
      .prepare(
        `INSERT OR IGNORE INTO collected_articles (
           id, source_id, source_name, title, original_url, guid, author,
           published_at, raw_summary, raw_content, image_url, category_hint,
           status, ai_post_id, created_at, updated_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        article.id,
        article.source_id,
        article.source_name,
        article.title,
        article.original_url,
        article.guid,
        article.author,
        article.published_at,
        article.raw_summary,
        article.raw_content,
        article.image_url,
        article.category_hint,
        article.status,
        article.ai_post_id,
        article.created_at,
        article.updated_at
      )
      .run();
    return res.meta?.changes > 0;
  }

  const db = getMemoryDb();
  // Check duplicate URL
  const existing = Array.from(db.articles.values()).find(
    (a) => a.original_url === article.original_url || a.id === article.id
  );
  if (existing) {
    return false; // Already collected
  }
  db.articles.set(article.id, article);
  persistLocalMemoryDb(db);
  return true;
}

export async function updateArticleStatus(
  id: string,
  status: CollectedArticle["status"],
  aiPostId: string | null = null
): Promise<void> {
  const now = new Date().toISOString();
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    if (aiPostId !== null) {
      await d1
        .prepare(
          `UPDATE collected_articles SET status = ?, ai_post_id = ?, updated_at = ? WHERE id = ?`
        )
        .bind(status, aiPostId, now, id)
        .run();
    } else {
      await d1
        .prepare(
          `UPDATE collected_articles SET status = ?, updated_at = ? WHERE id = ?`
        )
        .bind(status, now, id)
        .run();
    }
    return;
  }

  const db = getMemoryDb();
  const a = db.articles.get(id);
  if (a) {
    a.status = status;
    if (aiPostId !== null) a.ai_post_id = aiPostId;
    a.updated_at = now;
    persistLocalMemoryDb(db);
  }
}

// ----------------------------------------------------
// Blog Posts
// ----------------------------------------------------

export async function getBlogPosts(options?: {
  category?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{ posts: DbBlogPost[]; total: number }> {
  const limit = options?.limit || 50;
  const offset = options?.offset || 0;

  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const conditions: string[] = [];
    const params: any[] = [];

    if (options?.status && options.status !== "all") {
      conditions.push("status = ?");
      params.push(options.status);
    } else if (!options?.status) {
      // Default to published only for public viewing
      conditions.push("status = 'published'");
    }

    if (options?.category && options.category !== "all" && options.category !== "Tất cả") {
      conditions.push("category = ?");
      params.push(options.category);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countRes = await d1
      .prepare(`SELECT count(*) as total FROM blog_posts ${whereClause}`)
      .bind(...params)
      .first();

    const { results } = await d1
      .prepare(
        `SELECT * FROM blog_posts ${whereClause} ORDER BY published_at DESC LIMIT ? OFFSET ?`
      )
      .bind(...params, limit, offset)
      .all();

    return {
      posts: (results as DbBlogPost[]) || [],
      total: countRes?.total || 0,
    };
  }

  const db = getMemoryDb();
  let list = Array.from(db.posts.values());
  if (options?.status && options.status !== "all") {
    list = list.filter((p) => p.status === options.status);
  } else if (!options?.status) {
    list = list.filter((p) => p.status === "published");
  }

  if (options?.category && options.category !== "all" && options.category !== "Tất cả") {
    list = list.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
  }

  list.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return {
    posts: list.slice(offset, offset + limit),
    total: list.length,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<DbBlogPost | null> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const res = await d1
      .prepare(`SELECT * FROM blog_posts WHERE slug = ?`)
      .bind(slug)
      .first();
    return (res as DbBlogPost) || null;
  }
  const db = getMemoryDb();
  for (const post of db.posts.values()) {
    if (post.slug === slug) return post;
  }
  return null;
}

export async function saveBlogPost(post: DbBlogPost): Promise<DbBlogPost> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    await d1
      .prepare(
        `INSERT INTO blog_posts (
           id, slug, title, excerpt, content, category, tags, cover_image,
           reading_time, author, source_type, source_name, source_url,
           collected_article_id, status, views, seo_title, seo_description,
           published_at, created_at, updated_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           slug = excluded.slug,
           title = excluded.title,
           excerpt = excluded.excerpt,
           content = excluded.content,
           category = excluded.category,
           tags = excluded.tags,
           cover_image = excluded.cover_image,
           reading_time = excluded.reading_time,
           source_type = excluded.source_type,
           source_name = excluded.source_name,
           source_url = excluded.source_url,
           status = excluded.status,
           seo_title = excluded.seo_title,
           seo_description = excluded.seo_description,
           published_at = excluded.published_at,
           updated_at = excluded.updated_at`
      )
      .bind(
        post.id,
        post.slug,
        post.title,
        post.excerpt,
        post.content,
        post.category,
        post.tags,
        post.cover_image,
        post.reading_time,
        post.author,
        post.source_type,
        post.source_name,
        post.source_url,
        post.collected_article_id,
        post.status,
        post.views,
        post.seo_title,
        post.seo_description,
        post.published_at,
        post.created_at,
        post.updated_at
      )
      .run();
    return post;
  }

  const db = getMemoryDb();
  db.posts.set(post.id, post);
  persistLocalMemoryDb(db);
  return post;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    await d1.prepare(`DELETE FROM blog_posts WHERE id = ?`).bind(id).run();
    return true;
  }
  const db = getMemoryDb();
  const res = db.posts.delete(id);
  persistLocalMemoryDb(db);
  return res;
}

// ----------------------------------------------------
// Sync Logs & Dashboard Stats
// ----------------------------------------------------

export async function addSyncLog(log: SyncLog): Promise<void> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    await d1
      .prepare(
        `INSERT INTO sync_logs (id, source_id, source_name, status, items_found, items_new, error_message, duration_ms, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        log.id,
        log.source_id,
        log.source_name,
        log.status,
        log.items_found,
        log.items_new,
        log.error_message,
        log.duration_ms,
        log.created_at
      )
      .run();
    return;
  }

  const db = getMemoryDb();
  db.logs.unshift(log);
  if (db.logs.length > 200) db.logs.pop();
  persistLocalMemoryDb(db);
}

export async function getSyncLogs(limit = 20): Promise<SyncLog[]> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const { results } = await d1
      .prepare(`SELECT * FROM sync_logs ORDER BY created_at DESC LIMIT ?`)
      .bind(limit)
      .all();
    return (results as SyncLog[]) || [];
  }
  const db = getMemoryDb();
  return db.logs.slice(0, limit);
}

export async function getDashboardStats(): Promise<{
  totalSources: number;
  totalCollected: number;
  pendingReview: number;
  publishedPosts: number;
  draftPosts: number;
  lastSyncAt: string | null;
}> {
  const d1 = await getD1();
  if (d1) {
    await ensureD1Tables(d1);
    const sCount = await d1.prepare(`SELECT count(*) as c FROM content_sources`).first();
    const cCount = await d1.prepare(`SELECT count(*) as c FROM collected_articles`).first();
    const pReview = await d1
      .prepare(`SELECT count(*) as c FROM collected_articles WHERE status IN ('collected', 'pending', 'processing')`)
      .first();
    const pubCount = await d1
      .prepare(`SELECT count(*) as c FROM blog_posts WHERE status = 'published'`)
      .first();
    const draftCount = await d1
      .prepare(`SELECT count(*) as c FROM blog_posts WHERE status = 'draft'`)
      .first();
    const lastLog = await d1
      .prepare(`SELECT created_at FROM sync_logs ORDER BY created_at DESC LIMIT 1`)
      .first();

    return {
      totalSources: sCount?.c || 0,
      totalCollected: cCount?.c || 0,
      pendingReview: pReview?.c || 0,
      publishedPosts: pubCount?.c || 0,
      draftPosts: draftCount?.c || 0,
      lastSyncAt: lastLog?.created_at || null,
    };
  }

  const db = getMemoryDb();
  const articles = Array.from(db.articles.values());
  const posts = Array.from(db.posts.values());

  return {
    totalSources: db.sources.size,
    totalCollected: articles.length,
    pendingReview: articles.filter((a) =>
      ["collected", "pending", "processing"].includes(a.status)
    ).length,
    publishedPosts: posts.filter((p) => p.status === "published").length,
    draftPosts: posts.filter((p) => p.status === "draft").length,
    lastSyncAt: db.logs[0]?.created_at || null,
  };
}
