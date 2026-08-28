"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import TopShell from "./TopShell";
import Sidebar from "./Sidebar";
import ScrollHint from "./ScrollHint";
import { useLanguage } from "@/context/LanguageContext";
import { profileData } from "@/data/profile";

interface LayoutShellProps {
    children: ReactNode;
}

// Mobile header component
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
        <header className="lg:hidden sticky top-0 z-40 p-3 safe-area-top">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-md px-4 py-2.5 flex items-center justify-between relative">
                <button
                    onClick={onMenuOpen}
                    className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center active:scale-95 transition-all duration-150 cursor-pointer shadow-2xs shrink-0"
                    aria-label="Open menu"
                >
                    <svg className="w-5 h-5 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <h1 className="text-sm font-extrabold text-slate-900 dark:text-white absolute left-1/2 -translate-x-1/2 tracking-tight">{getPageTitle()}</h1>
            </div>
        </header>
    );
}

export default function LayoutShell({ children }: LayoutShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden text-slate-900">
            {/* Mobile header */}
            <MobileHeader onMenuOpen={() => setSidebarOpen(true)} />

            <div className="lg:flex">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="flex-1 lg:ml-[210px] min-h-[calc(100vh-44px)] overflow-hidden">
                    <TopShell />
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex-1"
                    >
                        {children}
                    </motion.div>

                    {/* Shared Website Footer */}
                    <footer className="py-8 px-6 sm:px-10 lg:px-14 border-t border-slate-100 dark:border-slate-800/40 text-slate-400 dark:text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full mt-10">
                        <div className="font-medium">
                            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
                        </div>
                        <div className="flex items-center gap-1 font-medium">
                            <span>{language === "vi" ? "Được thiết kế bởi" : "Designed by"}</span>
                            <span className="font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">{profileData.name}</span>
                        </div>
                    </footer>
                </main>
            </div>
            <ScrollHint />
        </div>
    );
}
