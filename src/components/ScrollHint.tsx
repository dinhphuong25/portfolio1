"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollHint() {
    const [visible, setVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Show the hint text after a short delay
        const showTimer = setTimeout(() => setVisible(true), 1000);

        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            
            if (totalScroll > 0) {
                // Calculate percentage
                setScrollProgress(Math.min(currentScroll / totalScroll, 1));
            }

            // Hide the hint text after some scrolling
            if (currentScroll > 100) {
                setVisible(false);
            } else if (currentScroll < 30) {
                setVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            clearTimeout(showTimer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center justify-end pointer-events-none select-none">
            <div className="relative flex items-center gap-2">
                
                {/* Scroll Hint Pill - Pops out from the left of the circle */}
                <AnimatePresence>
                    {visible && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9, filter: "blur(4px)" }}
                            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: 20, scale: 0.9, filter: "blur(4px)" }}
                            transition={{ type: "spring", damping: 25, stiffness: 400 }}
                            className="glass-premium px-4 py-2.5 rounded-2xl shadow-2xl border border-white/50 mr-2 flex items-center gap-2"
                        >
                            <motion.div
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="text-indigo-600"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </motion.div>
                            <span className="text-slate-800 text-sm font-bold tracking-tight whitespace-nowrap">
                                Lướt xuống để xem portfolio nhaaa 🥰
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Circular Progress Container */}
                <motion.div 
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="glass-premium p-1.5 rounded-full shadow-2xl border border-white/60 relative group pointer-events-auto cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* SVG Progress Circle */}
                        <svg className="w-full h-full -rotate-90 overflow-visible">
                            {/* Background track */}
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="none"
                                stroke="rgba(99, 102, 241, 0.1)"
                                strokeWidth="4"
                            />
                            {/* Glow effect for the progress */}
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="none"
                                stroke="rgba(99, 102, 241, 0.3)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                style={{
                                    pathLength: scrollProgress,
                                    filter: "blur(4px)"
                                }}
                            />
                            {/* Main progress line */}
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="none"
                                stroke="url(#indigo-gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                style={{
                                    pathLength: scrollProgress,
                                }}
                            />
                            <defs>
                                <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Center Text/Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {scrollProgress > 0.95 ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-indigo-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                </motion.div>
                            ) : (
                                <span className="text-[11px] font-black text-slate-700 font-mono">
                                    {Math.round(scrollProgress * 100)}%
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Tooltip on hover (Desktop) */}
                    <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap mb-2">
                            {scrollProgress > 0.9 ? "Quay lại đầu trang" : "Tiến độ đọc"}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
