"use client";

import Image from "next/image";
import Link from "next/link";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Reveal from "@/components/Reveal";
import { getPostBySlug } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";

export default function BlogPostClient({ slug }: { slug: string }) {
    const { language } = useLanguage();
    const isVi = language === 'vi';
    
    const post = getPostBySlug(slug, isVi ? 'vi' : 'en');

    if (!post) {
        notFound();
    }

    return (
        <>
            <ReadingProgressBar />
            <div className="max-w-5xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
                <div className="bg-white sm:rounded-2xl shadow-sm sm:border border-slate-200 overflow-hidden">
                    <Reveal direction="up" delay={100}>
                        <article>
                        
                        {/* Standard Vertical Header */}
                        <div className="px-6 sm:px-10 lg:px-14 pt-8 sm:pt-10 lg:pt-14 pb-8 sm:pb-12 border-b border-slate-100">
                            {/* Back Link */}
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors group"
                            >
                                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {isVi ? 'Quay lại Blog' : 'Back to Blog'}
                            </Link>

                            <div className="max-w-4xl">
                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold uppercase tracking-wider text-xs">
                                        {post.category}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 font-medium">{post.date}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
                                    {post.title}
                                </h1>

                                {/* Excerpt */}
                                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                                    {post.excerpt}
                                </p>
                            </div>
                        </div>

                        {/* Featured Hero Image */}
                        {post.image && (
                            <div className="px-6 sm:px-10 lg:px-14 py-8 border-b border-slate-50 bg-slate-50/30">
                                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-slate-100 border border-slate-200">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="px-6 sm:px-10 lg:px-14 py-8 sm:py-12">
                            {/* Main Content */}
                            <div className="prose max-w-3xl mx-auto">
                                {post.content ? (
                                    <MDXContent content={post.content} />
                                ) : (
                                    <p className="text-slate-500 italic text-center">
                                        {isVi ? 'Nội dung bài viết đang được cập nhật...' : 'Content for this article is coming soon...'}
                                    </p>
                                )}
                            </div>

                            {/* Modern Minimalist Author Box */}
                            <div className="mt-16 max-w-3xl mx-auto">
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-5">
                                        {/* Avatar & Header */}
                                        <div className="flex items-center gap-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src="https://github.com/dinhphuongkim257.png" 
                                                    alt="Kim Đình Phương" 
                                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                                                    onError={(e) => {
                                                        // Fallback to a clean monogram if the image fails to load
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                                <div className="hidden w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm">
                                                    <span className="text-xl sm:text-2xl font-bold text-slate-500">KĐP</span>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center">
                                                    Kim Đình Phương
                                                    <svg className="w-5 h-5 text-indigo-500 ml-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </h3>
                                                <p className="text-sm font-medium text-indigo-600 mt-0.5">
                                                    {isVi ? 'Tác giả' : 'Author'}
                                                </p>
                                                
                                                {/* Mobile Social Links */}
                                                <div className="flex sm:hidden items-center gap-4 mt-3">
                                                    <Link href="https://github.com/dinhphuongkim257" target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 100 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                                    </Link>
                                                    <Link href="mailto:phuongkimdinh257@gmail.com" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                    </Link>
                                                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                                                    <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-1 group">
                                                        {isVi ? 'Kết nối' : 'Connect'}
                                                        <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Desktop Social Links */}
                                        <div className="hidden sm:flex items-center gap-3">
                                            <Link href="https://github.com/dinhphuongkim257" target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors">
                                                <span className="sr-only">GitHub</span>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 100 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                            </Link>
                                            <Link href="mailto:phuongkimdinh257@gmail.com" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                <span className="sr-only">Email</span>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </Link>
                                            <div className="w-px h-4 bg-slate-200 mx-1"></div>
                                            <Link 
                                                href="/contact" 
                                                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-1 group"
                                            >
                                                {isVi ? 'Kết nối' : 'Connect'}
                                                <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="text-slate-600 text-base leading-relaxed text-justify-pretty">
                                            {isVi 
                                                ? 'Một người bình thường đang trên hành trình khám phá bản thân và thế giới. Blog này là góc nhỏ tĩnh lặng nơi mình lưu giữ những trải nghiệm, bài học nhỏ bé và góc nhìn cá nhân giữa cuộc sống ồn ào.'
                                                : 'Just an ordinary person on a journey of self-discovery. This blog is a quiet space where I keep my experiences, small lessons, and personal perspectives amidst a noisy world.'
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
