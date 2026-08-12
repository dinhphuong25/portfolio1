"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

    // Cập nhật selectedCategory nếu người dùng đổi ngôn ngữ nhưng đang chọn "All" hoặc "Tất cả"
    useEffect(() => {
        if (selectedCategory === "All" && isVi) setSelectedCategory("Tất cả");
        if (selectedCategory === "Tất cả" && !isVi) setSelectedCategory("All");
    }, [isVi, selectedCategory]);

    const hasPosts = BLOG_POSTS.length > 0;

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
            <div className="max-w-6xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
                <div className="bg-white sm:rounded-2xl shadow-sm sm:border border-slate-200 p-5 sm:p-6 lg:p-8">
                    <Reveal direction="down" delay={100}>
                        <div className="mb-6 space-y-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                {isVi ? 'Bài Viết' : 'Blog'}
                            </h1>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                {isVi ? 'Chia sẻ trải nghiệm, quá trình và những suy nghĩ về thiết kế giao diện.' : 'Sharing experiences, design processes, and thoughts on product design.'}
                            </p>
                        </div>
                    </Reveal>

                    {/* Always show the Search Bar and Categories for demo purposes, or only when there are posts. Let's just remove the hasPosts wrapper for the top bar so the search is visible. */}
                    <Reveal direction="up" delay={150}>
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                {BLOG_CATEGORIES.map((category, index) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${selectedCategory === category
                                            ? "bg-slate-900 text-white shadow-md"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Search Bar */}
                            <div className="relative w-full sm:w-64 flex-shrink-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                                    placeholder={isVi ? 'Tìm theo nội dung, tag...' : 'Search by title, tag...'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={200}>
                        <div className="mb-5 flex items-center gap-3">
                        <p className="text-xs sm:text-sm font-semibold text-slate-600">
                            <span className="text-slate-900">{gridPosts.length}</span> {isVi ? 'bài viết' : (gridPosts.length === 1 ? "post" : "posts")}
                        </p>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>
                    </Reveal>

                    <div className="space-y-8">
                        {gridPosts.length > 0 ? (
                            <div key={`${selectedCategory}-${searchQuery}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                {gridPosts.map((post, index) => (
                                    <Reveal direction="up" delay={250 + index * 50} key={post.id}>
                                        <BlogCard post={post} />
                                    </Reveal>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{isVi ? 'Không Tồn Tại' : 'No posts found'}</h3>
                                <p className="text-sm text-slate-600">
                                    {searchQuery 
                                        ? (isVi ? "Thử lại với các cụm từ khoá khác nhau." : "Try different keywords to find what you are looking for.") 
                                        : (isVi ? "Chưa có bài viết ở đây." : "No content available yet.")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
