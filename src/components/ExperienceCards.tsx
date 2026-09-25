"use client";

import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ExternalLink } from "lucide-react";

function getDisplayDomain(url?: string) {
    if (!url) return "project.live";
    try {
        return new URL(url).hostname;
    } catch {
        return url.replace(/https?:\/\//, "").split("/")[0] ?? "project.live";
    }
}

export default function ExperienceCards() {
    const { language } = useLanguage();
    const featuredProjects = getFeaturedProjects(language).slice(0, 3);

    return (
        <section className="py-8 border-t border-slate-100 dark:border-slate-800/80" aria-label={language === 'vi' ? "Dự án nổi bật" : "Featured projects"}>
            <div className="px-4 sm:px-6 mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{language === 'vi' ? 'Các dự án nổi bật' : 'Featured projects'}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{language === 'vi' ? 'Ba dự án mới nhất của tôi' : 'My three latest projects'}</p>
                </div>
                <Link
                    href="/projects"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <span>{language === 'vi' ? 'Xem tất cả dự án' : 'View all projects'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            <div className="w-full px-4 sm:px-6 pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project, index) => {
                        const displayDomain = getDisplayDomain(project.caseStudyUrl);
                        const isHiPhim = project.id === "hi-phim";
                        const targetUrl = project.caseStudyUrl || "#";

                        return (
                            <article
                                key={project.id}
                                className={`group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl transition-all duration-300 overflow-hidden ${
                                    isHiPhim
                                        ? "border-2 border-slate-900 dark:border-white shadow-md hover:shadow-xl hover:-translate-y-1.5"
                                        : "border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm hover:shadow-md hover:-translate-y-1"
                                }`}
                            >
                                <a
                                    href={targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative h-44 w-full bg-slate-100 dark:bg-slate-950 p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
                                >
                                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 flex flex-col shadow-md group/mockup">
                                        <div className="h-5 bg-slate-900 flex items-center justify-between px-2.5 border-b border-slate-800 shrink-0">
                                            <div className="flex gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                                            </div>
                                            <span className="text-[8px] font-mono font-semibold px-2 py-0.5 rounded truncate max-w-[120px] text-slate-400 bg-slate-800/80 border border-slate-700/60">
                                                {displayDomain}
                                            </span>
                                            <div className="w-3" />
                                        </div>

                                        <div className="flex-1 relative overflow-hidden bg-slate-950">
                                            <Image
                                                src={project.thumbnail}
                                                alt={project.title}
                                                fill
                                                unoptimized
                                                priority={index === 0}
                                                sizes="(max-width: 640px) 100vw, 400px"
                                                className="object-cover object-top group-hover/mockup:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        </div>
                                    </div>
                                </a>

                                <div className="flex-1 p-5 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <a
                                                href={targetUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-base font-extrabold text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                                            >
                                                {project.title}
                                            </a>
                                            {isHiPhim && (
                                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shrink-0 shadow-2xs">
                                                    {language === 'vi' ? "Nổi bật" : "Featured"}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                                            {project.role} • {project.year}
                                        </p>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 min-h-[54px] font-normal text-justify text-justify-pretty">
                                            {project.summary}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 my-4">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <a
                                            href={targetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full inline-flex items-center justify-between text-xs font-bold transition-all py-1.5 px-3 rounded-xl cursor-pointer group/btn ${
                                                isHiPhim
                                                    ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-xs"
                                                    : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                                            }`}
                                        >
                                            <span>{language === "vi" ? "Truy cập website trực tiếp" : "Visit live website"}</span>
                                            <ExternalLink className={`w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all ${
                                                isHiPhim ? "text-white dark:text-slate-900" : "text-slate-500 group-hover/btn:text-slate-900 dark:group-hover/btn:text-white"
                                            }`} />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
