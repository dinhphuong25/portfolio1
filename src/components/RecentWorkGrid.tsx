import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects, Project } from "@/data/projects";

export default function RecentWorkGrid() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const featuredProjects = getFeaturedProjects();

    return (
        <section className="px-6 py-5 border-t border-slate-100" aria-labelledby="recent-work-heading">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 id="recent-work-heading" className="text-lg font-bold text-slate-900">
                        Recent work
                    </h2>
                    <p className="text-sm text-slate-500 hidden sm:block">A selection of my latest projects</p>
                </div>

                <Link
                    href="/projects"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1 group"
                >
                    View all projects
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Scrollable Container */}
            <div className="w-full overflow-x-auto pb-6 -mb-6 scrollbar-hide scroll-smooth-ios">
                <div className="flex gap-5 min-w-max px-0.5">
                    {featuredProjects.map((item) => (
                        <article
                            key={item.id}
                            onClick={() => setSelectedProject(item)}
                            className="flex-shrink-0 w-48 sm:w-56 group cursor-pointer"
                            tabIndex={0}
                            role="button"
                        >
                            <div className={`h-32 sm:h-40 rounded-2xl ${item.thumbnailGradient} mb-3 overflow-hidden relative shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/10 group-hover:-translate-y-1`}>
                                {item.thumbnail ? (
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.title}
                                        fill
                                        placeholder="blur"
                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4="
                                        sizes="(max-width: 640px) 192px, 224px"
                                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        <div className="w-full h-full bg-gradient-to-tr from-white/10 to-transparent" />
                                    </div>
                                )}

                                {/* Overlay icon */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-indigo-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors px-1">
                                {item.title}
                            </h3>
                            <p className="text-xs font-medium text-slate-500 mt-0.5 px-1">{item.tags[0]}</p>
                        </article>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProject(null)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-up border border-white/20">
                        <div className={`h-48 sm:h-56 ${selectedProject.thumbnailGradient} relative`}>
                            {selectedProject.thumbnail && (
                                <Image
                                    src={selectedProject.thumbnail}
                                    alt={selectedProject.title}
                                    fill
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4="
                                    sizes="(max-width: 640px) 100vw, 512px"
                                    className="object-cover"
                                />
                            )}
                            {/* Gradient overlay for text legibility */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 w-9 h-9 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide border border-indigo-100">
                                    {selectedProject.tags[0]}
                                </span>
                                <span className="text-sm text-slate-500 font-medium">{selectedProject.year}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedProject.title}</h3>
                            <p className="text-sm text-slate-500 font-medium mb-5">{selectedProject.role}</p>

                            <p className="text-base text-slate-600 mb-6 leading-relaxed">{selectedProject.summary}</p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedProject.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={`/projects/${selectedProject.id}`}
                                className="flex items-center justify-center w-full px-6 py-3.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] shadow-lg shadow-indigo-200 transition-all duration-200 gap-2"
                                onClick={() => setSelectedProject(null)}
                            >
                                <span>View Full Case Study</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
