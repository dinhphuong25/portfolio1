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
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-slate-400 dark:border-slate-600 overflow-hidden shadow-sm">
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
                                        <div className="flex items-center gap-4 mb-5">
                                            {/* Avatar & Info */}
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
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
                                            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed text-left font-normal">
                                                {isVi 
                                                    ? 'Một blog nho nhỏ lưu giữ những trải nghiệm, suy tư và hành trình học hỏi, ứng dụng công nghệ vào thực tiễn cuộc sống.'
                                                    : 'A small personal blog documenting experiences, reflections, and journeys of learning and applying technology to life.'
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
