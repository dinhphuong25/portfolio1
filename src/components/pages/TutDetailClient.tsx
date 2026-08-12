"use client";

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTutorialBySlug, tutorials } from '@/data/tutorials';
import TutCard from '@/components/TutCard';
import ReadingProgress from "@/components/ReadingProgress";
import MDXContent from "@/components/MDXContent";
import { useLanguage } from "@/context/LanguageContext";

export default function TutDetailClient({ slug }: { slug: string }) {
    const { language } = useLanguage();
    const isVi = language === 'vi';
    
    // Fetch tutorial with the current language
    const tutorial = getTutorialBySlug(slug, isVi ? 'vi' : 'en');

    if (!tutorial) {
        notFound();
    }

    const isVideo = tutorial.type === 'video';
    // Get related tutorials (same category, excluding current)
    const relatedTutorials = tutorials
        .filter(t => t.category === tutorial.category && t.id !== tutorial.id)
        .slice(0, 3);

    return (
        <>
            <ReadingProgress />
            <div className="max-w-6xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
                <div className="bg-white sm:rounded-2xl shadow-sm sm:border border-slate-200 p-5 sm:p-6 lg:p-8">

                    {/* Back Button */}
                    <Link
                        href="/tut"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {isVi ? "Quay lại trang Hướng dẫn" : "Back to Tutorials"}
                    </Link>

                    {/* Tutorial Header */}
                    <div className="mb-8">
                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold">
                                {tutorial.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            {tutorial.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            {/* Type */}
                            <div className="flex items-center gap-1.5">
                                {isVideo ? (
                                    <>
                                        <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                        </svg>
                                        <span className="font-semibold">{isVi ? "Video Hướng dẫn" : "Video Tutorial"}</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="font-semibold">{isVi ? "Bài viết" : "Article"}</span>
                                    </>
                                )}
                            </div>

                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>

                            {/* Date */}
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(tutorial.date).toLocaleDateString(isVi ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>

                            {/* Duration or Read Time */}
                            {tutorial.duration && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {tutorial.duration}
                                    </div>
                                </>
                            )}
                            {tutorial.readTime && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        {tutorial.readTime}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Tags */}
                        {tutorial.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {tutorial.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tutorial Content */}
                    <div className="space-y-6">
                        {isVideo && tutorial.videoUrl ? (
                            // Video Content
                            <div className="rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200">
                                <div className="aspect-video">
                                    <iframe
                                        src={tutorial.videoUrl}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={tutorial.title}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {/* Description */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-3">{isVi ? "Về Hướng dẫn này" : "About This Tutorial"}</h2>
                            <p className="text-slate-700 leading-relaxed">
                                {tutorial.description}
                            </p>
                        </div>

                        {/* Article Content */}
                        {!isVideo && tutorial.content && (
                            <div className="prose prose-slate max-w-none bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8">
                                <MDXContent content={tutorial.content} />
                            </div>
                        )}
                    </div>

                    {/* Related Tutorials */}
                    {relatedTutorials.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">{isVi ? "Hướng dẫn liên quan" : "Related Tutorials"}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                {relatedTutorials.map((relatedTutorial) => (
                                    <TutCard key={relatedTutorial.id} tutorial={relatedTutorial} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
