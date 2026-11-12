"use client";

import Image from "next/image";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

interface ProfileHeaderProps {
    onMessage: () => void;
}

export default function ProfileHeader({ onMessage: _onMessage }: ProfileHeaderProps) {
    const { language } = useLanguage();

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
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 flex items-center justify-center gap-2"
                >
                    {profileData.name}
                    
                    <span title="Verified" className="inline-flex items-center">
                        <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-[#0866FF] shrink-0" />
                    </span>
                </motion.h1>

                {/* Subtitle Role */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1"
                >
                    Founder @ Hi Tech - All In One | Web Developer
                </motion.p>
            </div>
        </section>
    );
}
