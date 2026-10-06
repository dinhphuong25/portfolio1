"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { projectsEn, projectsVi } from "@/data/projects";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

function getDisplayDomain(url?: string) {
    if (!url) return "project.live";
    try {
        return new URL(url).hostname;
    } catch {
        return url.replace(/https?:\/\//, "").split("/")[0] ?? "project.live";
    }
}

export default function ProjectsClient() {
    const { language } = useLanguage();
    const isVi = language === "vi";
    const projectsList = isVi ? projectsVi : projectsEn;

    // Dự án hiện đang tạm ẩn
    const isProjectsHidden = true;

    if (isProjectsHidden) {
        return (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center mb-4 text-slate-500 shadow-2xs">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {isVi ? "Dự án hiện đang tạm ẩn" : "Projects are currently hidden"}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
                    {isVi 
                        ? "Mục dự án hiện đang được cập nhật và tối ưu lại nội dung. Vui lòng quay lại sau nhé!" 
                        : "The projects section is currently being updated and optimized. Please check back later!"}
                </p>
                <Link
                    href="/"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                    {isVi ? "Về trang chủ" : "Back to Home"}
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Unified Grid - Direct Link to Web */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {projectsList.map((project, index) => {
                        const displayDomain = getDisplayDomain(project.caseStudyUrl);
                        const isHiPhim = project.id === "hi-phim" || index === 0;
                        const targetUrl = project.caseStudyUrl || "#";

                        return (
                            <motion.article
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35, delay: index * 0.05 }}
                                className={`group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl transition-all duration-300 overflow-hidden ${
                                    isHiPhim
                                        ? "border-2 border-slate-900 dark:border-white shadow-md hover:shadow-xl hover:-translate-y-1.5"
                                        : "border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm hover:shadow-md hover:-translate-y-1"
                                }`}
                            >
                                {/* Top Image Mockup Frame - Direct Link */}
                                <a
                                    href={targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative h-48 w-full bg-slate-100 dark:bg-slate-950 p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
                                >
                                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 flex flex-col shadow-sm group/mockup">
                                        <div className="h-6 bg-slate-900 flex items-center justify-between px-3 border-b border-slate-800 shrink-0">
                                            <div className="flex gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                            </div>
                                            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded truncate max-w-[130px] text-slate-300 bg-slate-800 border border-slate-700">
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
                                                priority={index === 0}
                                                sizes="(max-width: 640px) 100vw, 400px"
                                                className="object-cover object-top group-hover/mockup:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        </div>
                                    </div>
                                </a>

                                {/* Content Body */}
                                <div className="flex-1 p-5 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <a
                                                href={targetUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-base font-extrabold text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200 block cursor-pointer"
                                            >
                                                {project.title}
                                            </a>
                                            {isHiPhim && (
                                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shrink-0 shadow-2xs">
                                                    {isVi ? "Nổi bật" : "Featured"}
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
                                            <span>{isVi ? "Truy cập website trực tiếp" : "Visit live website"}</span>
                                            <ExternalLink className={`w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all ${
                                                isHiPhim ? "text-white dark:text-slate-900" : "text-slate-500 group-hover/btn:text-slate-900 dark:group-hover/btn:text-white"
                                            }`} />
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}