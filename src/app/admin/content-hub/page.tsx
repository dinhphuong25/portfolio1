"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Rss,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Edit3,
  LogOut,
  Shield,
  Layers,
  FileText,
  Clock,
  Send,
  X,
  Sliders,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { ContentSource, CollectedArticle, DbBlogPost, SyncLog } from "@/lib/db/types";

export default function AdminContentHubPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [articles, setArticles] = useState<CollectedArticle[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);

  // UI tabs & filters
  const [activeTab, setActiveTab] = useState<"overview" | "sources" | "articles">("overview");
  const [articleStatusFilter, setArticleStatusFilter] = useState<string>("all");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncingSourceId, setSyncingSourceId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // New source modal state
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [newSource, setNewSource] = useState({
    name: "",
    feed_url: "",
    url: "",
    category: "tech_global" as "tech_global" | "tech_vn" | "logistics",
    fetch_interval_min: 60,
  });
  const [testFeedResult, setTestFeedResult] = useState<any>(null);
  const [isTestingFeed, setIsTestingFeed] = useState(false);

  // Article Editor / Preview Modal
  const [editingArticle, setEditingArticle] = useState<CollectedArticle | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [editorData, setEditorData] = useState<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string;
    reading_time: number;
    status: "draft" | "published";
  }>({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Công nghệ",
    tags: "Công nghệ, AI",
    reading_time: 5,
    status: "published",
  });
  const [editorView, setEditorView] = useState<"edit" | "preview">("edit");

  // Show temporary toast message
  const showToast = (text: string, type: "success" | "error" = "success") => {
    setActionMessage({ text, type });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Check auth session
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = (await res.json()) as any;
      setIsAuthenticated(Boolean(data.authenticated));
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      // 1. Stats & logs
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const statsData = (await statsRes.json()) as any;
        setStats(statsData.stats);
        setSyncLogs(statsData.logs || []);
      }

      // 2. Sources
      const sourcesRes = await fetch("/api/admin/sources");
      if (sourcesRes.ok) {
        const sourcesData = (await sourcesRes.json()) as any;
        setSources(sourcesData.sources || []);
      }

      // 3. Articles
      const articlesRes = await fetch(
        `/api/admin/articles?status=${articleStatusFilter}&sourceId=${selectedSourceFilter}&limit=50`
      );
      if (articlesRes.ok) {
        const articlesData = (await articlesRes.json()) as any;
        setArticles(articlesData.articles || []);
      }
    } catch (err: any) {
      showToast(err?.message || "Lỗi tải dữ liệu", "error");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, articleStatusFilter, selectedSourceFilter]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, loadDashboardData]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as any;
      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setLoginError(data.error || "Mật khẩu không chính xác.");
      }
    } catch {
      setLoginError("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  // Sync All Sources
  const handleSyncAll = async () => {
    setIsSyncingAll(true);
    try {
      const res = await fetch("/api/admin/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync-all" }),
      });
      const data = (await res.json()) as any;
      if (res.ok) {
        showToast(
          `Đã đồng bộ ${data.result.totalSources} nguồn: Tìm thấy ${data.result.totalFound} bài, ${data.result.totalNew} bài mới!`
        );
        loadDashboardData();
      } else {
        showToast(data.error || "Lỗi đồng bộ nguồn", "error");
      }
    } catch {
      showToast("Lỗi kết nối khi đồng bộ", "error");
    } finally {
      setIsSyncingAll(false);
    }
  };

  // Sync Single Source
  const handleSyncSource = async (sourceId: string) => {
    setSyncingSourceId(sourceId);
    try {
      const res = await fetch("/api/admin/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync-one", sourceId }),
      });
      const data = (await res.json()) as any;
      if (res.ok) {
        showToast(`Đã thu thập: ${data.result.itemsFound} bài, ${data.result.itemsNew} bài mới.`);
        loadDashboardData();
      } else {
        showToast(data.error || "Lỗi khi đồng bộ nguồn", "error");
      }
    } catch {
      showToast("Lỗi kết nối", "error");
    } finally {
      setSyncingSourceId(null);
    }
  };

  // Toggle Source Active
  const handleToggleSource = async (source: ContentSource) => {
    try {
      const newActive = source.is_active === 1 ? 0 : 1;
      const res = await fetch("/api/admin/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle", sourceId: source.id, isActive: newActive === 1 }),
      });
      if (res.ok) {
        showToast(`Đã ${newActive ? "kích hoạt" : "tắt"} nguồn ${source.name}.`);
        loadDashboardData();
      }
    } catch {
      showToast("Lỗi cập nhật nguồn", "error");
    }
  };

  // Delete Source
  const handleDeleteSource = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa nguồn "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/sources?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`Đã xóa nguồn ${name}.`);
        loadDashboardData();
      }
    } catch {
      showToast("Lỗi xóa nguồn", "error");
    }
  };

  // Test RSS URL in Add Source Modal
  const handleTestFeed = async () => {
    if (!newSource.feed_url) return;
    setIsTestingFeed(true);
    setTestFeedResult(null);
    try {
      const res = await fetch("/api/admin/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test", feedUrl: newSource.feed_url }),
      });
      const data = (await res.json()) as any;
      if (res.ok) {
        setTestFeedResult(data);
        if (!newSource.name && data.feedTitle) {
          setNewSource((prev) => ({ ...prev, name: data.feedTitle }));
        }
      } else {
        setTestFeedResult({ error: data.error || "Không thể kết nối RSS." });
      }
    } catch {
      setTestFeedResult({ error: "Lỗi kết nối mạng khi kiểm tra RSS." });
    } finally {
      setIsTestingFeed(false);
    }
  };

  // Save new source
  const handleSaveSource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upsert", source: newSource }),
      });
      const data = (await res.json()) as any;
      if (res.ok) {
        showToast("Đã thêm nguồn tin RSS thành công!");
        setIsAddSourceOpen(false);
        setNewSource({
          name: "",
          feed_url: "",
          url: "",
          category: "tech_global",
          fetch_interval_min: 60,
        });
        setTestFeedResult(null);
        loadDashboardData();
      } else {
        showToast(data.error || "Lỗi lưu nguồn", "error");
      }
    } catch {
      showToast("Lỗi lưu nguồn", "error");
    }
  };

  // Trigger AI Synthesize for an article
  const handleAiSynthesize = async (article: CollectedArticle) => {
    setIsAiProcessing(true);
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "synthesize", articleId: article.id }),
      });
      const data = (await res.json()) as any;
      if (res.ok && data.post) {
        showToast("AI đã tổng hợp và tạo bản nháp bài viết thành công!");
        // Open in editor for review
        setEditingArticle(article);
        setEditorData({
          id: data.post.id,
          title: data.post.title,
          slug: data.post.slug,
          excerpt: data.post.excerpt,
          content: data.post.content,
          category: data.post.category,
          tags: Array.isArray(data.post.tags) ? data.post.tags.join(", ") : data.post.tags,
          reading_time: data.post.reading_time || 5,
          status: "published",
        });
        setIsEditorOpen(true);
        loadDashboardData();
      } else {
        showToast(data.error || "Lỗi khi gọi AI tổng hợp", "error");
      }
    } catch {
      showToast("Lỗi kết nối khi gọi AI", "error");
    } finally {
      setIsAiProcessing(false);
    }
  };

  // Save/Publish edited post
  const handleSavePost = async (publishNow: boolean) => {
    if (!editingArticle) return;
    try {
      let tagsArr: string[] = [];
      try {
        tagsArr = editorData.tags.split(",").map((t) => t.trim()).filter(Boolean);
      } catch {
        tagsArr = [editorData.category];
      }

      const postPayload: Partial<DbBlogPost> = {
        id: editorData.id || `post_${Date.now()}`,
        slug: editorData.slug,
        title: editorData.title,
        excerpt: editorData.excerpt,
        content: editorData.content,
        category: editorData.category,
        tags: JSON.stringify(tagsArr),
        reading_time: editorData.reading_time,
        status: publishNow ? "published" : "draft",
        source_type: "curated",
        source_name: editingArticle.source_name,
        source_url: editingArticle.original_url,
        collected_article_id: editingArticle.id,
        cover_image: editingArticle.image_url,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save-post",
          post: postPayload,
          articleId: editingArticle.id,
        }),
      });

      if (res.ok) {
        showToast(publishNow ? "Đã xuất bản bài viết lên Blog thành công!" : "Đã lưu bản nháp.");
        setIsEditorOpen(false);
        loadDashboardData();
      } else {
        const err = (await res.json()) as any;
        showToast(err.error || "Lỗi lưu bài viết", "error");
      }
    } catch {
      showToast("Lỗi lưu bài viết", "error");
    }
  };

  // Reject Article
  const handleRejectArticle = async (articleId: string) => {
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", articleId }),
      });
      if (res.ok) {
        showToast("Đã từ chối bài viết.");
        loadDashboardData();
      }
    } catch {
      showToast("Lỗi cập nhật trạng thái", "error");
    }
  };

  // ----------------------------------------------------
  // Render Login Card if not authenticated
  // ----------------------------------------------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-slate-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Đang kiểm tra quyền truy cập...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center text-blue-600 mb-3 border border-blue-100 dark:border-blue-900/40">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Content Hub Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Trang quản trị thu thập & biên soạn nội dung dinhphuong.dev
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Mật khẩu Quản trị (ADMIN_SECRET_KEY)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập khóa bí mật quản trị..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <span>Vào trang quản trị</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>← Trở về trang chủ Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Render Authenticated Admin Dashboard
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16">
      {/* Toast Notification */}
      {actionMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm flex items-center gap-2 transition-all ${
            actionMessage.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Rss className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 dark:text-white">
                  Content Hub
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-900">
                  AI & RSS v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Hệ thống thu thập & biên soạn nội dung tự động cho dinhphuong.dev
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSyncAll}
              disabled={isSyncingAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? "animate-spin" : ""}`} />
              <span>{isSyncingAll ? "Đang đồng bộ..." : "Đồng bộ tất cả"}</span>
            </button>

            <Link
              href="/blog"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Blog</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tổng quan (Overview)</span>
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "articles"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quản lý bài viết ({articles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("sources")}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "sources"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <Rss className="w-3.5 h-3.5" />
            <span>Nguồn tin RSS ({sources.length})</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ==================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Nguồn RSS
                </span>
                <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {stats?.totalSources || sources.length}
                </div>
                <span className="text-[10px] text-slate-400">Đang hoạt động</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Bài thu thập
                </span>
                <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats?.totalCollected || 0}
                </div>
                <span className="text-[10px] text-slate-400">Từ các nguồn tin</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Chờ duyệt
                </span>
                <div className="mt-1 text-2xl font-bold text-amber-500">
                  {stats?.pendingReview || 0}
                </div>
                <span className="text-[10px] text-slate-400">Cần AI hoặc xem lại</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Đã xuất bản
                </span>
                <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats?.publishedPosts || 0}
                </div>
                <span className="text-[10px] text-slate-400">Hiển thị trên Blog</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Bản nháp
                </span>
                <div className="mt-1 text-2xl font-bold text-slate-700 dark:text-slate-300">
                  {stats?.draftPosts || 0}
                </div>
                <span className="text-[10px] text-slate-400">Chưa công khai</span>
              </div>
            </div>

            {/* Quick Actions & Sync Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <span>Tác vụ nhanh</span>
                </h3>

                <button
                  onClick={handleSyncAll}
                  disabled={isSyncingAll}
                  className="w-full py-2.5 px-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncingAll ? "animate-spin" : ""}`} />
                  <span>{isSyncingAll ? "Đang quét tất cả RSS..." : "Quét & Cập nhật RSS ngay"}</span>
                </button>

                <button
                  onClick={() => setIsAddSourceOpen(true)}
                  className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm nguồn RSS mới</span>
                </button>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 flex items-center justify-between mb-1">
                    <span>Cron tự động:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Đã kích hoạt (Mỗi 1h)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Lần đồng bộ gần nhất:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {stats?.lastSyncAt
                        ? new Date(stats.lastSyncAt).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Chưa có"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sync History Logs */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>Lịch sử đồng bộ gần đây</span>
                  </h3>
                  <button
                    onClick={loadDashboardData}
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Làm mới</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                        <th className="pb-2 font-medium">Thời gian</th>
                        <th className="pb-2 font-medium">Nguồn tin</th>
                        <th className="pb-2 font-medium">Trạng thái</th>
                        <th className="pb-2 font-medium text-right">Bài mới / Tổng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {syncLogs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-slate-400">
                            Chưa có lịch sử đồng bộ. Hãy bấm &quot;Đồng bộ tất cả&quot; để bắt đầu.
                          </td>
                        </tr>
                      ) : (
                        syncLogs.slice(0, 7).map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            <td className="py-2.5 text-slate-500 font-mono text-[11px]">
                              {new Date(log.created_at).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })}
                            </td>
                            <td className="py-2.5 font-medium text-slate-800 dark:text-slate-200">
                              {log.source_name || "Tất cả nguồn"}
                            </td>
                            <td className="py-2.5">
                              {log.status === "success" ? (
                                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                                  <CheckCircle2 className="w-3 h-3" /> Thành công
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] text-red-500 font-medium">
                                  <AlertCircle className="w-3 h-3" /> Lỗi
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 text-right font-medium text-slate-700 dark:text-slate-300">
                              <span className="text-emerald-600 font-semibold">+{log.items_new}</span> /{" "}
                              {log.items_found}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: ARTICLES MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "articles" && (
          <div className="space-y-4">
            {/* Filter bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Trạng thái:</span>
                {[
                  { key: "all", label: "Tất cả" },
                  { key: "collected", label: "Mới thu thập" },
                  { key: "pending", label: "Chờ duyệt" },
                  { key: "published", label: "Đã xuất bản" },
                  { key: "rejected", label: "Đã loại" },
                ].map((st) => (
                  <button
                    key={st.key}
                    onClick={() => setArticleStatusFilter(st.key)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                      articleStatusFilter === st.key
                        ? "bg-slate-900 dark:bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedSourceFilter}
                  onChange={(e) => setSelectedSourceFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
                >
                  <option value="all">Tất cả nguồn tin</option>
                  {sources.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={loadDashboardData}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  title="Làm mới"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Articles List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {articles.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    Không tìm thấy bài viết nào theo bộ lọc này.
                  </div>
                ) : (
                  articles.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 sm:p-5 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                            {art.source_name}
                          </span>

                          <span
                            className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                              art.status === "published"
                                ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300"
                                : art.status === "pending"
                                ? "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300"
                                : art.status === "rejected"
                                ? "bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300"
                                : "bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300"
                            }`}
                          >
                            {art.status === "published"
                              ? "Đã xuất bản"
                              : art.status === "pending"
                              ? "Chờ duyệt"
                              : art.status === "rejected"
                              ? "Đã loại"
                              : "Đã thu thập"}
                          </span>

                          <span className="text-[11px] text-slate-400">
                            {new Date(art.published_at).toLocaleDateString("vi-VN")}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          {art.title}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.raw_summary || "Chưa có mô tả tóm tắt."}
                        </p>

                        <div className="pt-1 flex items-center gap-3">
                          <a
                            href={art.original_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Xem bài gốc</span>
                          </a>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleAiSynthesize(art)}
                          disabled={isAiProcessing}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
                          title="Sử dụng Gemini AI để biên soạn thành bài viết tiếng Việt"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Biên soạn</span>
                        </button>

                        <button
                          onClick={() => {
                            setEditingArticle(art);
                            setEditorData({
                              id: `post_${Date.now()}`,
                              title: art.title,
                              slug: art.title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .slice(0, 50),
                              excerpt: art.raw_summary?.slice(0, 200) || "",
                              content: art.raw_content || art.raw_summary || "",
                              category: "Công nghệ",
                              tags: "Công nghệ",
                              reading_time: 5,
                              status: "published",
                            });
                            setIsEditorOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                          title="Mở editor thủ công"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {art.status !== "rejected" && (
                          <button
                            onClick={() => handleRejectArticle(art.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 text-slate-400"
                            title="Từ chối / Bỏ qua"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: SOURCES MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "sources" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Danh sách nguồn RSS & API
                </h3>
                <p className="text-xs text-slate-500">
                  Tự động đồng bộ tin tức từ các đầu báo quốc tế và Việt Nam
                </p>
              </div>

              <button
                onClick={() => setIsAddSourceOpen(true)}
                className="px-3 py-1.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm nguồn mới</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sources.map((src) => (
                <div
                  key={src.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {src.name}
                      </h4>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                          src.is_active === 1
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {src.is_active === 1 ? "Bật" : "Tắt"}
                      </span>
                    </div>

                    <p className="text-[11px] font-mono text-slate-500 truncate" title={src.feed_url}>
                      {src.feed_url}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                        {src.category === "tech_global"
                          ? "Công nghệ Quốc tế"
                          : src.category === "tech_vn"
                          ? "Công nghệ Việt Nam"
                          : "Logistics & Vận tải"}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                      <span>Cập nhật gần nhất:</span>
                      <span className="font-medium text-slate-600 dark:text-slate-300">
                        {src.last_fetched_at
                          ? new Date(src.last_fetched_at).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                            })
                          : "Chưa quét"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleSource(src)}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    >
                      {src.is_active === 1 ? "Tắt nguồn" : "Bật lại"}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSyncSource(src.id)}
                        disabled={syncingSourceId === src.id}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors"
                        title="Đồng bộ nguồn này ngay"
                      >
                        <RefreshCw
                          className={`w-3.5 h-3.5 ${syncingSourceId === src.id ? "animate-spin" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => handleDeleteSource(src.id, src.name)}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                        title="Xóa nguồn này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==================================================== */}
      {/* MODAL: ADD NEW RSS SOURCE */}
      {/* ==================================================== */}
      {isAddSourceOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Rss className="w-4 h-4 text-blue-600" />
                <span>Thêm nguồn tin RSS mới</span>
              </h3>
              <button
                onClick={() => setIsAddSourceOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSource} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Đường dẫn RSS Feed (bắt buộc)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newSource.feed_url}
                    onChange={(e) => setNewSource({ ...newSource, feed_url: e.target.value })}
                    placeholder="https://example.com/rss hoặc https://.../feed"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleTestFeed}
                    disabled={isTestingFeed || !newSource.feed_url}
                    className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50"
                  >
                    {isTestingFeed ? "Đang thử..." : "Kiểm tra"}
                  </button>
                </div>
              </div>

              {testFeedResult && (
                <div
                  className={`p-3 rounded-xl text-xs border ${
                    testFeedResult.error
                      ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-600"
                      : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {testFeedResult.error ? (
                    <span>Lỗi: {testFeedResult.error}</span>
                  ) : (
                    <div>
                      <div className="font-semibold">
                        ✓ Hợp lệ: {testFeedResult.feedTitle} ({testFeedResult.itemsCount} bài)
                      </div>
                      <div className="text-[11px] opacity-80 truncate mt-0.5">
                        Mẫu: {testFeedResult.sampleItems?.[0]?.title}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tên nguồn hiển thị
                </label>
                <input
                  type="text"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  placeholder="Ví dụ: TechCrunch, Logistics News..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Chủ đề / Phân loại
                </label>
                <select
                  value={newSource.category}
                  onChange={(e) =>
                    setNewSource({
                      ...newSource,
                      category: e.target.value as "tech_global" | "tech_vn" | "logistics",
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                >
                  <option value="tech_global">Công nghệ Quốc tế</option>
                  <option value="tech_vn">Công nghệ Việt Nam</option>
                  <option value="logistics">Logistics & Chuỗi cung ứng</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSourceOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Lưu nguồn tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ARTICLE EDITOR & LIVE PREVIEW */}
      {/* ==================================================== */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Biên soạn & Xuất bản bài viết
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
                  <button
                    onClick={() => setEditorView("edit")}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      editorView === "edit"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500"
                    }`}
                  >
                    Soạn thảo
                  </button>
                  <button
                    onClick={() => setEditorView("preview")}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      editorView === "preview"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500"
                    }`}
                  >
                    Xem trước
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {editorView === "edit" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tiêu đề bài viết
                    </label>
                    <input
                      type="text"
                      value={editorData.title}
                      onChange={(e) => setEditorData({ ...editorData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Danh mục
                      </label>
                      <select
                        value={editorData.category}
                        onChange={(e) => setEditorData({ ...editorData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                      >
                        <option value="Công nghệ">Công nghệ</option>
                        <option value="Lập trình">Lập trình</option>
                        <option value="AI">AI</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Học tập">Học tập</option>
                        <option value="Trải nghiệm">Trải nghiệm</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Thời gian đọc (phút)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={editorData.reading_time}
                        onChange={(e) =>
                          setEditorData({ ...editorData, reading_time: parseInt(e.target.value) || 5 })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Thẻ tag (phân cách bởi dấu phẩy)
                      </label>
                      <input
                        type="text"
                        value={editorData.tags}
                        onChange={(e) => setEditorData({ ...editorData, tags: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Đoạn tóm tắt (Excerpt)
                    </label>
                    <textarea
                      rows={2}
                      value={editorData.excerpt}
                      onChange={(e) => setEditorData({ ...editorData, excerpt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs leading-relaxed focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Nội dung bài viết (Markdown / MDX)
                      </label>
                      {editingArticle && (
                        <button
                          type="button"
                          onClick={() => handleAiSynthesize(editingArticle)}
                          disabled={isAiProcessing}
                          className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>AI Viết lại</span>
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={14}
                      value={editorData.content}
                      onChange={(e) => setEditorData({ ...editorData, content: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              ) : (
                /* Live Preview Mode */
                <div className="space-y-4 prose dark:prose-invert max-w-none">
                  <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      {editorData.category}
                    </span>
                    <h1 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">
                      {editorData.title}
                    </h1>
                    <p className="text-sm text-slate-500 italic mt-1">{editorData.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                      <span>Bởi Kim Đình Phương</span>
                      <span>•</span>
                      <span>{editorData.reading_time} phút đọc</span>
                      <span>•</span>
                      <span>Nguồn: {editingArticle?.source_name}</span>
                    </div>
                  </div>

                  <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {editorData.content}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <span className="text-xs text-slate-500">
                Nguồn: {editingArticle?.source_name || "Thủ công"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  Đóng
                </button>

                <button
                  type="button"
                  onClick={() => handleSavePost(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  Lưu nháp
                </button>

                <button
                  type="button"
                  onClick={() => handleSavePost(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xuất bản lên Blog</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
