"use client";

import Image from "next/image";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

interface ProfileHeaderProps {
    onMessage: () => void;
}

const TAGLINES_VI = [
    "Sinh viên Logistics & Quản lý Chuỗi Cung Ứng",
    "Lập trình viên Web & Xây dựng Sản phẩm Số",
    "Đam mê Đổi mới & Tự động hóa Quy trình"
];
const TAGLINES_EN = [
    "Supply Chain Management & Logistics Student",
    "Web Developer & Digital Product Builder",
    "Passionate about Process Automation"
];

function TypingText({ texts }: { texts: string[] }) {
    const [displayed, setDisplayed] = useState("");
    const [textIdx, setTextIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = texts[textIdx];
        let timeout: ReturnType<typeof setTimeout>;
        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx((c) => c + 1), 45);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), 2400);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx((c) => c - 1), 25);
        } else if (deleting && charIdx === 0) {
            setDeleting(false);
            setTextIdx((i) => (i + 1) % texts.length);
        }
        setDisplayed(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, textIdx, texts]);

    return (
        <span>
            {displayed}
            <span className="inline-block w-[2px] h-4.5 bg-slate-900 dark:bg-slate-100 ml-0.5 align-middle animate-pulse" />
        </span>
    );
}

export default function ProfileHeader({ onMessage }: ProfileHeaderProps) {
    const { language } = useLanguage();
    const taglines = language === "vi" ? TAGLINES_VI : TAGLINES_EN;

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
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center justify-center gap-2"
                >
                    {profileData.name}
                    <span title="Verified" className="inline-flex items-center">
                        <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-[#0866FF] shrink-0" />
                    </span>
                </motion.h1>
            </div>
        </section>
    );
}
