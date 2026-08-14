"use client";

import Image from "next/image";
import { profileData } from "@/data/profile";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

interface ProfileHeaderProps {
    onMessage: () => void;
}

export default function ProfileHeader({ onMessage: _onMessage }: ProfileHeaderProps) {
    return (
        <section className="relative overflow-hidden pt-10 pb-8 px-4 sm:px-8 border-b border-slate-100 dark:border-slate-800/80">
            {/* Ambient background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-transparent dark:from-slate-900/30 pointer-events-none" />

            <div className="max-w-2xl mx-auto flex flex-col items-center text-center relative z-10">
                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative cursor-pointer mb-5"
                >
                    <div className="p-1 rounded-full bg-slate-200/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden">
                            <Image
                                src={encodeURI(profileData.avatar)}
                                alt={profileData.name}
                                fill
                                unoptimized
                                priority
                                sizes="(max-width: 640px) 128px, 144px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 flex items-center justify-center gap-2"
                >
                    {profileData.name}
                    <span title="Verified" className="inline-flex items-center">
                        <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-[#0866FF] shrink-0" />
                    </span>
                </motion.h1>

                {/* Social Links Row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex items-center justify-center gap-2 mt-3 flex-wrap"
                >
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/kimdinhphuong/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:bg-white dark:hover:bg-slate-900 hover:border-[#0A66C2]/40 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                        </svg>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/kimdinhphuong"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 hover:border-slate-400 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/dinhphuongkim250705/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Facebook"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-[#1877F2] dark:hover:text-[#1877F2] hover:bg-white dark:hover:bg-slate-900 hover:border-[#1877F2]/40 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/_kimdinhphuong/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-[#E4405F] dark:hover:text-[#E4405F] hover:bg-white dark:hover:bg-slate-900 hover:border-[#E4405F]/40 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>

                    {/* TikTok */}
                    <a
                        href="https://www.tiktok.com/@kimdinhphuong_"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="TikTok"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 hover:border-black/40 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72V13.5c-1.4-.04-2.8.29-3.98 1.05-.88.58-1.46 1.49-1.62 2.53-.1.64.03 1.33.35 1.9.43.76 1.16 1.35 2.01 1.55 1.42.34 2.93-.16 3.86-1.25.59-.69.87-1.58.91-2.51.05-3.39.02-6.79.03-10.18.01-1.2.01-2.4-.01-3.6 0-.66.01-1.32.01-1.98Z" />
                        </svg>
                    </a>

                    {/* Zalo */}
                    <a
                        href="https://zalo.me/0339906660"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Zalo"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-[#0068FF] dark:hover:text-[#0068FF] hover:bg-white dark:hover:bg-slate-900 hover:border-[#0068FF]/40 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                        <span className="font-extrabold text-[10px] tracking-tight">Zalo</span>
                    </a>

                    {/* Email */}
                    <a
                        href={`mailto:${profileData.email}`}
                        title="Email"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 hover:border-slate-400 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
