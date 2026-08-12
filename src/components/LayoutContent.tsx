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

    const getPageTitle = () => {
        if (pathname === "/") return "Overview";
        if (pathname === "/projects") return "Projects";
        if (pathname.startsWith("/projects/")) return "Case Study";
        if (pathname === "/blog") return "Blog";
        if (pathname.startsWith("/blog/")) return "Post";
        if (pathname === "/tut") return "Tutorials";
        if (pathname.startsWith("/tut/")) return "Tutorial";
        if (pathname === "/about") return "About";
        if (pathname === "/contact") return "Contact";
        return "Portfolio";
    };

    return (
        <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 safe-area-top">
            <div className="flex items-center justify-between">
                <button
                    onClick={onMenuOpen}
                    className="p-2.5 -ml-2 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150"
                    aria-label="Open menu"
                >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-base font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">{getPageTitle()}</h1>
                <div className="w-10" /> {/* Spacer */}
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
                <footer className="py-4 px-6 sm:px-10 lg:px-14 border-t border-slate-100 dark:border-slate-800/40 text-slate-400 dark:text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full mt-4">
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
