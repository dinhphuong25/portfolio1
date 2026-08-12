"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";
import WMSPerformanceChart from "@/components/WMSPerformanceChart";
import ProjectChart from "@/components/ProjectChart";

interface ProjectDetailClientProps {
    id: string;
}

export default function ProjectDetailClient({ id }: ProjectDetailClientProps) {
    const { language } = useLanguage();
    const project = getProjectById(id, language);

    if (!project) return null;

    return (
        <article className="max-w-4xl mx-auto p-4 lg:p-6">
            {/* Back link */}
            <Reveal direction="down" delay={100}>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {language === 'vi' ? 'Trở về dự án' : 'Back to projects'}
                </Link>
            </Reveal>

            {/* Hero section */}
            <Reveal direction="up" delay={200}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                    {/* Banner */}
                    <div className={`h-64 ${project.thumbnailGradient} relative`}>
                        {project.thumbnail ? (
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                                style={{ viewTransitionName: `project-image-${project.id}` }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <div className="grid grid-cols-4 gap-3 p-8">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="w-16 h-12 bg-gray-400/30 rounded" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Project info */}
                    <div className="p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                                <p className="text-gray-500">
                                    {project.role} • {project.year}
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-lg text-gray-600">{project.summary}</p>
                    </div>
                </div>
            </Reveal>

            {/* Content sections - Redesigned as a Premium Vertical Timeline */}
            <div className="relative border-l-2 border-slate-150 dark:border-slate-800 ml-4 md:ml-8 pl-8 md:pl-10 space-y-12 py-4">
                
                {/* 1. Problem */}
                <Reveal direction="up" delay={150}>
                    <div className="relative">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-[45px] md:-left-[53px] top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white dark:border-slate-950 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center text-sm md:text-base font-extrabold shadow-sm z-10">
                            1
                        </div>
                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
                                {language === 'vi' ? 'Vấn Đề' : 'Problem'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-justify">{project.problem}</p>
                        </section>
                    </div>
                </Reveal>

                {/* 2. Process */}
                <Reveal direction="up" delay={200}>
                    <div className="relative">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-[45px] md:-left-[53px] top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white dark:border-slate-950 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm md:text-base font-extrabold shadow-sm z-10">
                            2
                        </div>
                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
                                {language === 'vi' ? 'Quá Trình' : 'Process'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-justify">{project.process}</p>
                        </section>
                    </div>
                </Reveal>

                {/* 3. Solution */}
                <Reveal direction="up" delay={250}>
                    <div className="relative">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-[45px] md:-left-[53px] top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white dark:border-slate-950 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm md:text-base font-extrabold shadow-sm z-10">
                            3
                        </div>
                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
                                {language === 'vi' ? 'Giải Pháp' : 'Solution'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-justify">{project.solution}</p>
                        </section>
                    </div>
                </Reveal>

                {/* 4. Outcome */}
                <Reveal direction="up" delay={300}>
                    <div className="relative">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-[45px] md:-left-[53px] top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white dark:border-slate-950 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm md:text-base font-extrabold shadow-sm z-10">
                            4
                        </div>
                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
                                {language === 'vi' ? 'Kết Quả' : 'Outcome'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-justify mb-8">{project.outcome}</p>
                            
                            {project.results && project.results.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800/60">
                                    {project.results.map((result, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex items-baseline justify-between">
                                                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{result.label}</h3>
                                                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{result.value}</span>
                                            </div>
                                            {result.chartData && (
                                                <ProjectChart data={result.chartData} label={language === 'vi' ? 'Hiệu quả đạt được' : 'Performance Increase'} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {project.id === "wms-ecofresh" && !project.results && (
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
                                    <WMSPerformanceChart language={language} />
                                </div>
                            )}
                        </section>
                    </div>
                </Reveal>

                {/* Image gallery */}
                {project.images && project.images.length > 0 && (
                    <Reveal direction="up" delay={350}>
                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">{language === 'vi' ? 'Thư Viện Ảnh' : 'Gallery'}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.images.map((image, idx) => (
                                    <div key={idx} className="rounded-lg overflow-hidden h-64 relative">
                                        <Image
                                            src={image}
                                            alt={`${project.title} gallery image ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Reveal>
                )}

                {/* External links */}
                {project.caseStudyUrl && (
                    <Reveal direction="up" delay={400}>
                        <div className="flex justify-center pt-6">
                            <a
                                href={project.caseStudyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                            >
                                {language === 'vi' ? 'Xem dự án thực tế' : 'Visit project website'}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </Reveal>
                )}
            </div>
        </article>
    );
}