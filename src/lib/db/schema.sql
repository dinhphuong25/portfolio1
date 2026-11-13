-- Content Sources Table
CREATE TABLE IF NOT EXISTS content_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    feed_url TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- 'tech_global', 'tech_vn', 'logistics'
    is_active INTEGER DEFAULT 1,
    fetch_interval_min INTEGER DEFAULT 60,
    last_fetched_at TEXT,
    last_status TEXT DEFAULT 'pending', -- 'success', 'error', 'pending'
    error_count INTEGER DEFAULT 0,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

-- Collected Articles Table
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
    status TEXT NOT NULL DEFAULT 'collected', -- 'collected', 'processing', 'pending', 'draft', 'published', 'rejected'
    ai_post_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (source_id) REFERENCES content_sources (id) ON DELETE CASCADE
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Công nghệ', 'Lập trình', 'AI', 'Logistics', 'Học tập', 'Trải nghiệm'
    tags TEXT NOT NULL, -- JSON array of strings: '["AI", "Next.js"]'
    cover_image TEXT,
    reading_time INTEGER DEFAULT 5,
    author TEXT DEFAULT 'Kim Đình Phương',
    source_type TEXT NOT NULL DEFAULT 'curated', -- 'original', 'curated'
    source_name TEXT,
    source_url TEXT,
    collected_article_id TEXT,
    status TEXT NOT NULL DEFAULT 'published', -- 'draft', 'pending', 'published', 'archived'
    views INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    published_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

-- Sync Logs Table
CREATE TABLE IF NOT EXISTS sync_logs (
    id TEXT PRIMARY KEY,
    source_id TEXT,
    source_name TEXT,
    status TEXT NOT NULL, -- 'success', 'partial', 'failed'
    items_found INTEGER DEFAULT 0,
    items_new INTEGER DEFAULT 0,
    error_message TEXT,
    duration_ms INTEGER DEFAULT 0,
    created_at TEXT NOT NULL
);

-- Indices for rapid edge queries
CREATE INDEX IF NOT EXISTS idx_collected_articles_status ON collected_articles (status);
CREATE INDEX IF NOT EXISTS idx_collected_articles_source ON collected_articles (source_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_sync_logs_created ON sync_logs (created_at DESC);
