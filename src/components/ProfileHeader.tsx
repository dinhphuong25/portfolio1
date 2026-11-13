"use client";

import Image from "next/image";
import { profileData } from "@/data/profile";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

interface ProfileHeaderProps {
    onMessage: () => void;
}

const socialIconPaths: Record<string, string> = {
    facebook:
        "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    instagram:
        "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2.25a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25z",
    tiktok:
        "M16.5 2h3.013c.227 1.734 1.223 3.29 2.737 4.276A8.067 8.067 0 0 0 24 7.11v3.078a10.94 10.94 0 0 1-4.487-1.427v6.535A6.704 6.704 0 1 1 13.72 8.65v3.236a3.47 3.47 0 1 0 2.78 3.41V2z",
    linkedin:
        "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
};

const socialIconColors: Record<string, string> = {
    facebook: "text-[#1877F2]",
    instagram: "text-[#E4405F]",
    tiktok: "text-slate-900 dark:text-white",
    linkedin: "text-[#0A66C2]",
};

function SocialIcon({ platform }: { platform: string }) {
    const key = platform.toLowerCase();
    const path = socialIconPaths[key];

    if (!path) return null;

    return (
        <svg
            aria-hidden="true"
            className={`h-4 w-4 ${socialIconColors[key]}`}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d={path} />
        </svg>
    );
}

export default function ProfileHeader({ onMessage: _onMessage }: ProfileHeaderProps) {
    const featuredSocialLinks = profileData.socialLinks.filter((link) =>
        ["Facebook", "Instagram", "TikTok", "LinkedIn"].includes(link.platform)
    );

    return (
        <section className="relative overflow-hidden pt-10 pb-8 px-4 sm:px-8 border-b border-slate-100 dark:border-slate-800/80">
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center relative z-10">
                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative cursor-pointer mb-5"
                >
                    <div className="p-1 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-md">
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

                {/* Name & Verified Badge with Tooltip */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2"
                >
                    {profileData.name}
                    
                    <span title="Verified" className="inline-flex items-center">
                        <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-[#0866FF] shrink-0" />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-2 text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400"
                >
                    Founder of Hi Tech - All In One.
                </motion.p>
                <motion.nav
                        aria-label="Mạng xã hội"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="mt-2 flex flex-wrap items-center justify-center gap-2"
                >
                    {featuredSocialLinks.map((link) => (
                        <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${link.platform}: ${link.label}`}
                            title={`${link.platform}: ${link.label}`}
                            className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700"
                        >
                            <SocialIcon platform={link.platform} />
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                {link.platform}
                            </span>
                        </a>
                    ))}
                </motion.nav>
            </div>
        </section>
    );
}
