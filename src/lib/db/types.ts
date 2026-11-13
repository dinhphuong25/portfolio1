export interface ContentSource {
  id: string;
  name: string;
  url: string;
  feed_url: string;
  category: 'tech_global' | 'tech_vn' | 'logistics';
  is_active: number; // 0 or 1
  fetch_interval_min: number;
  last_fetched_at: string | null;
  last_status: 'success' | 'error' | 'pending';
  error_count: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}

export interface CollectedArticle {
  id: string;
  source_id: string;
  source_name: string;
  title: string;
  original_url: string;
  guid: string;
  author: string | null;
  published_at: string;
  raw_summary: string | null;
  raw_content: string | null;
  image_url: string | null;
  category_hint: string | null;
  status: 'collected' | 'processing' | 'pending' | 'draft' | 'published' | 'rejected';
  ai_post_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string; // JSON string array
  cover_image: string | null;
  reading_time: number;
  author: string;
  source_type: 'original' | 'curated';
  source_name: string | null;
  source_url: string | null;
  collected_article_id: string | null;
  status: 'draft' | 'pending' | 'published' | 'archived';
  views: number;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface SyncLog {
  id: string;
  source_id: string | null;
  source_name: string | null;
  status: 'success' | 'partial' | 'failed';
  items_found: number;
  items_new: number;
  error_message: string | null;
  duration_ms: number;
  created_at: string;
}
