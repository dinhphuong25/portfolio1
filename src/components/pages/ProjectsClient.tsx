"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { projectsEn, projectsVi, Project } from "@/data/projects";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

function getDisplayDomain(url?: string) {
    if (!url) return "project.live";
    try {
        return new URL(url).hostname;
    } catch {
        return url.replace(/https?:\/\//, "").split("/")[0] ?? "project.live";
    }
}

function checkIsDeveloping(project: Project) {
    const id = project.id.toLowerCase();
    const title = project.title.toLowerCase();
    return (
        id.includes("ez-tool") ||
        id.includes("eztool") ||
        id.includes("ez-study") ||
        id.includes("ezstudy") ||
        title.includes("ez tool") ||
        title.includes("ez study")
    );
}

export default function ProjectsClient() {
    const { language } = useLanguage();
    const isVi = language === "vi";
    const projectsList = isVi ? projectsVi : projectsEn;

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const showDevelopmentToast = (title: string) => {
        setToastMessage(
            isVi
                ? `Dự án ${title} hiện đang trong quá trình phát triển và sẽ ra mắt trong thời gian tới!`
                : `${title} is currently in development and will launch soon!`
        );
    };

    return (
        <>
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Unified Grid - Direct Link to Web */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {projectsList.map((project, index) => {
                            const displayDomain = getDisplayDomain(project.caseStudyUrl);
                            const isPinned = index === 0;
                            const targetUrl = project.caseStudyUrl || "#";
                            const isDeveloping = checkIsDeveloping(project);

                            return (
                                <motion.article
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                    className={`group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${
                                        isPinned
                                            ? "border-2 border-slate-900 dark:border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2"
                                            : "border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-slate-400 dark:hover:border-slate-600 hover:-translate-y-1.5"
                                    }`}
                                >
                                    {isPinned && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900 dark:bg-white z-20" />
                                    )}

                                    {/* Top Image Mockup Frame - Direct Link or Trigger Button */}
                                    {isDeveloping ? (
                                        <button
                                            type="button"
                                            onClick={() => showDevelopmentToast(project.title)}
                                            className="relative h-48 w-full bg-slate-100 dark:bg-slate-950 p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 cursor-pointer text-left w-full"
                                        >
                                            <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 flex flex-col shadow-sm group/mockup">
                                                <div className="h-6 bg-slate-900 flex items-center justify-between px-3 border-b border-slate-800 shrink-0">
                                                    <div className="flex gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                                        <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                                    </div>
                                                    <span className="text-[9px] font-mono font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded truncate max-w-[130px]">
                                                        {displayDomain}
                                                    </span>
                                                    <div className="w-4" />
                                                </div>

                                                <div className="flex-1 relative overflow-hidden bg-slate-950">
                                                    <Image
                                                        src={project.thumbnail}
                                                        alt={project.title}
                                                        fill
                                                        unoptimized
                                                        priority={isPinned}
                                                        sizes="(max-width: 640px) 100vw, 400px"
                                                        className="object-cover object-top group-hover/mockup:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                </div>
                                            </div>
                                        </button>
                                    ) : (
                                        <a
                                            href={targetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative h-48 w-full bg-slate-100 dark:bg-slate-950 p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
                                        >
                                            <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 flex flex-col shadow-sm group/mockup">
                                                <div className="h-6 bg-slate-900 flex items-center justify-between px-3 border-b border-slate-800 shrink-0">
                                                    <div className="flex gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                                        <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                                    </div>
                                                    <span className="text-[9px] font-mono font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded truncate max-w-[130px]">
                                                        {displayDomain}
                                                    </span>
                                                    <div className="w-4" />
                                                </div>

                                                <div className="flex-1 relative overflow-hidden bg-slate-950">
                                                    <Image
                                                        src={project.thumbnail}
                                                        alt={project.title}
                                                        fill
                                                        unoptimized
                                                        priority={isPinned}
                                                        sizes="(max-width: 640px) 100vw, 400px"
                                                        className="object-cover object-top group-hover/mockup:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                </div>
                                            </div>
                                        </a>
                                    )}

                                    {/* Content Body */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <div>
                                                {isDeveloping ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => showDevelopmentToast(project.title)}
                                                        className="text-base font-extrabold text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200 block text-left cursor-pointer"
                                                    >
                                                        {project.title}
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={targetUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-base font-extrabold text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200 block cursor-pointer"
                                                    >
                                                        {project.title}
                                                    </a>
                                                )}
                                            </div>

                                            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                                                {project.role} • {project.year}
                                            </p>

                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 min-h-[54px] font-normal text-justify text-justify-pretty">
                                                {project.summary}
                                            </p>
                                        </div>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-1.5 my-4">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Links - Direct Web Link */}
                                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            {isDeveloping ? (
                                                <button
                                                    type="button"
                                                    onClick={() => showDevelopmentToast(project.title)}
                                                    className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 group/btn transition-colors py-1 cursor-pointer"
                                                >
                                                    <span>{isVi ? "Truy cập website trực tiếp" : "Visit live website"}</span>
                                                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </button>
                                            ) : (
                                                <a
                                                    href={targetUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 group/btn transition-colors py-1 cursor-pointer"
                                                >
                                                    <span>{isVi ? "Truy cập website trực tiếp" : "Visit live website"}</span>
                                                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Clean Minimalist Toast Notification - No Emoji, Centered Text */}
            {toastMessage && (
                <div className="fixed bottom-5 right-5 z-50 max-w-[280px] sm:max-w-xs px-4 py-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-100 text-[11px] sm:text-xs font-bold shadow-lg border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
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