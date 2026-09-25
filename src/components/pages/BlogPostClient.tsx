"use client";

import Image from "next/image";
import Link from "next/link";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Reveal from "@/components/Reveal";
import { getPostBySlug } from "@/data/posts";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import { BadgeCheck } from "lucide-react";

export default function BlogPostClient({ slug }: { slug: string }) {
    const { language } = useLanguage();
    const isVi = language === 'vi';
    
    const post = getPostBySlug(slug, isVi ? 'vi' : 'en');

    if (!post) {
        notFound();
    }

    if (post.isPublished === false) {
        return (
            <div className="max-w-5xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl sm:rounded-3xl border border-slate-400 dark:border-slate-600 p-8 sm:p-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xs border border-slate-200/60 dark:border-slate-700/60 text-3xl">
                        ✍️
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                            {isVi ? 'Bài viết đang được viết, hiện chưa công bố' : 'Article In Progress'}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {isVi 
                                ? 'Bài viết này đang trong quá trình biên soạn và chưa được phát hành chính thức. Rất mong bạn quay lại sau!' 
                                : 'This article is currently under composition and has not been published yet. Please check back later!'}
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md hover:-translate-y-0.5 transition-all"
                    >
                        ← {isVi ? 'Quay lại danh sách Bài viết' : 'Back to Blog Articles'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <ReadingProgressBar />
            <div className="max-w-5xl mx-auto p-3 sm:p-4 lg:p-6 lg:pr-6">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-400 dark:border-slate-600 overflow-hidden">
                    <Reveal direction="up" delay={100}>
                        <article>
                            {/* Standard Header */}
                            <div className="px-6 sm:px-10 lg:px-14 pt-8 sm:pt-10 lg:pt-12 pb-8 border-b border-slate-100 dark:border-slate-800/80">
                                {/* Back Link */}
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors group"
                                >
                                    <svg className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    {isVi ? 'Quay lại danh sách Bài viết' : 'Back to Articles'}
                                </Link>

                                <div className="max-w-4xl space-y-4">
                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs">
                                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold uppercase tracking-wider border border-slate-200/60 dark:border-slate-700">
                                            {post.category}
                                        </span>
                                        <span className="text-slate-300 dark:text-slate-700">•</span>
                                        <span className="text-slate-500 dark:text-slate-400 font-semibold">{post.date}</span>
                                        <span className="text-slate-300 dark:text-slate-700">•</span>
                                        <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {post.readTime}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                                        {post.title}
                                    </h1>

                                    {/* Excerpt */}
                                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-justify">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>

                            {/* Hero Image */}
                            {post.image && (
                                <div className="px-6 sm:px-10 lg:px-14 py-8 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
                                    <div className="rounded-2xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 relative aspect-[16/9]">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            priority
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Content Area */}
                            <div className="px-6 sm:px-10 lg:px-14 py-8 sm:py-12">
                                <div className="prose dark:prose-invert max-w-3xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-justify [&_p]:text-justify [&_li]:text-justify [&_div]:text-justify">
                                    {post.content ? (
                                        <MDXContent content={post.content} />
                                    ) : (
                                        <p className="text-slate-500 italic text-center">
                                            {isVi ? 'Nội dung bài viết đang được cập nhật...' : 'Content for this article is coming soon...'}
                                        </p>
                                    )}
                                </div>

                                {/* Minimalist Author Box */}
                                <div className="mt-14 max-w-3xl mx-auto">
                                    <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 shadow-xs">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-5">
                                            {/* Avatar & Info */}
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0">
                                                    <Image
                                                        src={encodeURI(profileData.avatar)}
                                                        alt={profileData.name}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                        {profileData.name}
                                                        <BadgeCheck className="w-4 h-4 text-white fill-[#0866FF] shrink-0" />
                                                    </h3>
                                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                                                        Digital Supply Chain Specialist
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Social Icon Links */}
                                            <div className="flex items-center gap-2">
                                                {/* LinkedIn */}
                                                <a
                                                    href="https://www.linkedin.com/in/kimdinhphuong/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="LinkedIn"
                                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#0A66C2] flex items-center justify-center transition-colors cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                                                    </svg>
                                                </a>

                                                {/* Instagram */}
                                                <a
                                                    href="https://www.instagram.com/_kimdinhphuong/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Instagram"
                                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#E4405F] flex items-center justify-center transition-colors cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                    </svg>
                                                </a>

                                                {/* TikTok */}
                                                <a
                                                    href="https://www.tiktok.com/@kimdinhphuong_"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="TikTok"
                                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72V13.5c-1.4-.04-2.8.29-3.98 1.05-.88.58-1.46 1.49-1.62 2.53-.1.64.03 1.33.35 1.9.43.76 1.16 1.35 2.01 1.55 1.42.34 2.93-.16 3.86-1.25.59-.69.87-1.58.91-2.51.05-3.39.02-6.79.03-10.18.01-1.2.01-2.4-.01-3.6 0-.66.01-1.32.01-1.98Z" />
                                                    </svg>
                                                </a>

                                                {/* Zalo */}
                                                <a
                                                    href="https://zalo.me/0903917400"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Zalo"
                                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#0068FF] flex items-center justify-center transition-colors cursor-pointer"
                                                >
                                                    <span className="font-extrabold text-[10px] tracking-tight">Zalo</span>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
                                            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed text-justify font-normal">
                                                {isVi 
                                                    ? 'Sinh viên năm 3 chuyên ngành Quản lý Chuỗi cung ứng & Logistics tại ĐH Kỹ thuật – Công nghệ Cần Thơ. Blog này là góc nhỏ lưu giữ các trải nghiệm, suy tư và hành trình ứng dụng công nghệ số vào bài toán thực tế.'
                                                    : '3rd-year Supply Chain & Logistics student at Can Tho University of Technology. This blog is a personal space documenting insights and digital transformation journeys.'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                </div>
            </div>
        </>
    );
}
