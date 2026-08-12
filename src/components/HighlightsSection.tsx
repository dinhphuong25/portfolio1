"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const data = {
    vi: [
        {
            icon: (
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            label: "Công Nghệ & Kỹ Năng",
            title: "Next.js · React · Tailwind CSS",
            sub: "TypeScript · Node.js · Figma · REST API",
        },
        {
            icon: (
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            label: "Chuyên Ngành Định Hướng",
            title: "Quản lý Chuỗi Cung Ứng & Logistics",
            sub: "Tối ưu hóa Kho Bãi · Vận Tải · Hệ Thống WMS",
        },
    ],
    en: [
        {
            icon: (
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            label: "Tech Stack & Skills",
            title: "Next.js · React · Tailwind CSS",
            sub: "TypeScript · Node.js · Figma · REST API",
        },
        {
            icon: (
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            label: "Core Specialization",
            title: "Supply Chain & Logistics Management",
            sub: "Warehouse Optimization · Transport · WMS",
        },
    ],
};

export default function HighlightsSection() {
    const { language } = useLanguage();
    const items = language === "vi" ? data.vi : data.en;

    return (
        <section className="px-6 sm:px-10 lg:px-14 py-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-3.5 rounded-full bg-indigo-600 inline-block" />
                <h2 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                    {language === "vi" ? "TỔNG QUAN" : "OVERVIEW"}
                </h2>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center flex-shrink-0">
                                {item.icon}
                            </div>
                            <div className="min-w-0 pt-0.5">
                                <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                                    {item.label}
                                </p>
                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug mb-1">
                                    {item.title}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {item.sub}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
