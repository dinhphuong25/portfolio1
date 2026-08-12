"use client";

import { Link } from '@/components/ViewTransitions';
import Image from 'next/image';
import { Tutorial } from '@/data/tutorials';

interface TutCardProps {
    tutorial: Tutorial;
}

export default function TutCard({ tutorial }: TutCardProps) {
    const isVideo = tutorial.type === 'video';

    return (
        <article className="group relative card-hover rounded-2xl bg-white border border-slate-100 overflow-hidden elevation-sm hover:elevation-xl">
            <Link href={`/tut/${tutorial.slug}`} className="absolute inset-0 z-10 focus:outline-none" aria-label={`View ${tutorial.title}`} />

            {/* Thumbnail */}
            <div className="aspect-[16/10] w-full overflow-hidden relative bg-gradient-to-br from-indigo-50 to-slate-100">
                {/* Thumbnail Image */}
                {tutorial.thumbnail ? (
                    <Image
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        fill
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4="
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-slate-100/50" />
                )}

                {/* Type Badge */}
                <div className="absolute top-4 left-4 z-20">
                    {isVideo ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
                            <svg className="w-3.5 h-3.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                            Video
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
                            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Article
                        </span>
                    )}
                </div>

                {/* Play Icon Overlay for Videos */}
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <svg className="w-6 h-6 text-indigo-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Header */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                        {tutorial.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="font-medium text-slate-700">{tutorial.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-500">
                            {new Date(tutorial.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {tutorial.description}
                </p>

                {/* Meta Info - Duration/Read Time */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    {tutorial.duration && (
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {tutorial.duration}
                        </span>
                    )}
                    {tutorial.readTime && (
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {tutorial.readTime}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
