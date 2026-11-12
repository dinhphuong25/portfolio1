"use client";

import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopShell from "./TopShell";
import { useLanguage } from "@/context/LanguageContext";
import { profileData } from "@/data/profile";
import { motion } from "framer-motion";

function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
    const pathname = usePathname();
    const { language } = useLanguage();

    const getPageTitle = () => {
        const isVi = language === "vi";
        if (pathname === "/") return isVi ? "Tổng quan" : "Overview";
        if (pathname === "/projects") return isVi ? "Dự án" : "Projects";
        if (pathname.startsWith("/projects/")) return isVi ? "Chi tiết dự án" : "Case Study";
        if (pathname === "/blog") return isVi ? "Bài viết" : "Blog";
        if (pathname.startsWith("/blog/")) return isVi ? "Bài viết" : "Post";
        if (pathname === "/tut") return isVi ? "Hướng dẫn" : "Tutorials";
        if (pathname.startsWith("/tut/")) return isVi ? "Bài học" : "Tutorial";
        if (pathname === "/about") return isVi ? "Giới thiệu" : "About";
        if (pathname === "/contact") return isVi ? "Liên hệ" : "Contact";
        return "Portfolio";
    };

    return (
        <header className="lg:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-2.5 safe-area-top">
            <div className="flex items-center justify-between">
                <button
                    onClick={onMenuOpen}
                    className="p-2 -ml-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    aria-label="Open menu"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-sm font-bold text-slate-900 dark:text-white absolute left-1/2 -translate-x-1/2 tracking-tight">
                    {getPageTitle()}
                </h1>
                <div className="w-8" />
            </div>
        </header>
    );
}

export default function LayoutContent({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden text-slate-900 flex flex-col lg:flex-row">
            {/* Mobile header */}
            <MobileHeader onMenuOpen={() => setSidebarOpen(true)} />

            {/* Sidebar remains persistent */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 lg:ml-[210px] min-h-screen overflow-hidden flex flex-col">
                <TopShell />

                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 h-full flex flex-col"
                >
                    {children}
                </motion.div>

                {/* Shared Website Footer */}
                <footer className="py-4 px-6 sm:px-10 lg:px-14 border-t border-slate-100 dark:border-slate-800/40 text-slate-400 dark:text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full mt-4">
                    <div className="font-medium">
                        Copyright © 2026 Personal Website. All rights reserved.
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                        <span>{language === "vi" ? "Được thiết kế bởi" : "Designed by"}</span>
                        <span className="font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">{profileData.name}</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
