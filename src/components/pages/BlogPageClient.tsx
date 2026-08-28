"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS_EN, BLOG_POSTS_VI, BLOG_CATEGORIES_EN, BLOG_CATEGORIES_VI } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPageClient() {
    const { language } = useLanguage();
    const isVi = language === 'vi';
    
    const BLOG_POSTS = isVi ? BLOG_POSTS_VI : BLOG_POSTS_EN;
    const BLOG_CATEGORIES = isVi ? BLOG_CATEGORIES_VI : BLOG_CATEGORIES_EN;

    const ALL_CATEGORY = isVi ? "Tất cả" : "All";
    const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
    const [searchQuery, setSearchQuery] = useState("");
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (selectedCategory === "All" && isVi) setSelectedCategory("Tất cả");
        if (selectedCategory === "Tất cả" && !isVi) setSelectedCategory("All");
    }, [isVi, selectedCategory]);

    // Auto dismiss toast after 3.5s
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleUnpublishedClick = () => {
        setToastMessage(
            isVi 
                ? "Bài viết đang được viết, hiện chưa công bố" 
                : "This article is currently being written and is not yet published"
        );
    };

    const filteredByCategory = selectedCategory === ALL_CATEGORY
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === selectedCategory);

    const filteredPosts = filteredByCategory.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const gridPosts = filteredPosts;

    return (
        <>
            <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6 lg:pr-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 lg:p-8 relative">
                    {/* Header */}
                    <Reveal direction="down" delay={100}>
                        <div className="mb-6 space-y-2">
                            <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
                                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
                                    {isVi ? 'BÀI VIẾT & CHIA SẺ' : 'BLOG & ARTICLES'}
                                </h1>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                                {isVi 
                                    ? 'Chia sẻ kinh nghiệm thực tế về Chuỗi cung ứng, Công nghệ phần mềm và Hành trình phát triển bản thân.' 
                                    : 'Sharing practical insights on Supply Chain, Software Engineering, and Personal Growth.'}
                            </p>
                        </div>
                    </Reveal>

                    {/* Filter Tabs & Search Bar */}
                    <Reveal direction="up" delay={150}>
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                {BLOG_CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${selectedCategory === category
                                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Search Bar */}
                            <div className="relative w-full sm:w-64 shrink-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-9 pr-3 py-2 border border-slate-200/80 dark:border-slate-800 rounded-xl leading-5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-xs transition-all duration-200"
                                    placeholder={isVi ? 'Tìm theo nội dung, tag...' : 'Search by title, tag...'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </Reveal>

                    {/* Article Count Header */}
                    <Reveal direction="up" delay={200}>
                        <div className="mb-6 flex items-center gap-3">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <span className="text-slate-900 dark:text-white font-extrabold">{gridPosts.length}</span> {isVi ? 'bài viết' : (gridPosts.length === 1 ? "article" : "articles")}
                            </p>
                            <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
                        </div>
                    </Reveal>

                    {/* Blog Grid */}
                    <div className="space-y-8">
                        {gridPosts.length > 0 ? (
                            <div key={`${selectedCategory}-${searchQuery}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {gridPosts.map((post, index) => (
                                    <Reveal direction="up" delay={220 + index * 60} key={post.id}>
                                        <BlogCard 
                                            post={post} 
                                            onUnpublishedClick={handleUnpublishedClick} 
                                        />
                                    </Reveal>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xs border border-slate-200/60 dark:border-slate-700/60">
                                    <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">{isVi ? 'Không tìm thấy bài viết' : 'No posts found'}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {searchQuery 
                                        ? (isVi ? "Thử lại với cụm từ khóa khác." : "Try different keywords to search.") 
                                        : (isVi ? "Chưa có bài viết nào trong danh mục này." : "No articles in this category yet.")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Clean Minimalist Toast Notification - Top Right Corner */}
            {toastMessage && (
                <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 max-w-[280px] sm:max-w-xs px-4 py-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-100 text-[11px] sm:text-xs font-bold shadow-lg border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-3">
                    <span className="leading-relaxed text-center flex-1">{toastMessage}</span>
                    <button 
                        onClick={() => setToastMessage(null)} 
                        className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    );
}
