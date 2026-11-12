"use client";

import React from "react";
import TimelineSection from "./TimelineSection";
import { useLanguage } from "@/context/LanguageContext";
import { Code, MapPin, Mail, Sparkles, Box, Cpu } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutSection() {
    const { language } = useLanguage();
    const isVi = language === "vi";

    const keyStrengths = isVi ? [
        {
            title: "Supply Chain & Logistics",
            desc: "Nghiên cứu tối ưu hóa vận hành, quản lý kho bãi (WMS) và phân tích quy trình luân chuyển hàng hóa thực tế.",
            icon: <Box className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            badge: "Chuyên môn lõi",
        },
        {
            title: "Web Development & UI/UX",
            desc: "Phát triển ứng dụng web hiện đại với Next.js, TypeScript và Tailwind CSS, chú trọng hiệu năng và trải nghiệm người dùng.",
            icon: <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
            badge: "Kỹ thuật số",
        },
        {
            title: "Tự động hóa & AI",
            desc: "Ứng dụng AI và workflow tự động hóa để tinh gọn các tác vụ lặp lại, tối ưu thời gian và chi phí vận hành.",
            icon: <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
            badge: "Đổi mới sáng tạo",
        },
    ] : [
        {
            title: "Supply Chain & Logistics",
            desc: "Focusing on operations optimization, warehouse management systems (WMS), and practical distribution workflow analysis.",
            icon: <Box className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            badge: "Core Discipline",
        },
        {
            title: "Web Development & UI/UX",
            desc: "Engineering modern web applications with Next.js, TypeScript, and Tailwind CSS with a sharp focus on speed and UX.",
            icon: <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
            badge: "Digital Skills",
        },
        {
            title: "Automation & AI",
            desc: "Leveraging AI and workflow automation to streamline repetitive tasks, boost productivity, and cut operational friction.",
            icon: <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
            badge: "Innovation",
        },
    ];

    const quickInfo = [
        {
            icon: <Code className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Định hướng chính" : "Primary Focus",
            value: "Digital Supply Chain & Web Tech",
        },
        {
            icon: <MapPin className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Địa điểm" : "Location",
            value: isVi ? "Cần Thơ, Việt Nam" : "Can Tho, Vietnam",
        },
        {
            icon: <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Email liên hệ" : "Contact Email",
            value: "contact@dinhphuong.dev",
            href: "mailto:contact@dinhphuong.dev",
        },
    ];

    return (
        <section className="px-6 sm:px-10 lg:px-14 py-8 border-t border-slate-100 dark:border-slate-800" aria-labelledby="about-heading">
            {/* Section Badge & Title */}
            <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
                <h2 id="about-heading" className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                    {isVi ? "CÂU CHUYỆN & GIỚI THIỆU" : "MY STORY & ABOUT"}
                </h2>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Featured Intro Banner */}
            <Reveal direction="up" delay={100}>
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 mb-8 overflow-hidden shadow-sm">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mb-20 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-blue-200 border border-white/10 mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            <span>{isVi ? "Tôn chỉ & Định hướng" : "Vision & Purpose"}</span>
                        </div>

                        <h3 className="text-lg sm:text-2xl font-extrabold leading-snug tracking-tight mb-3">
                            {isVi ? (
                                <>
                                    Kết hợp tư duy <span className="text-blue-400">Logistics & Chuỗi cung ứng</span> với sức mạnh của <span className="text-indigo-300">Công nghệ số</span>.
                                </>
                            ) : (
                                <>
                                    Bridging <span className="text-blue-400">Supply Chain & Logistics</span> expertise with <span className="text-indigo-300">Digital Solutions</span>.
                                </>
                            )}
                        </h3>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl font-normal">
                            {isVi 
                                ? "Chào bạn! Tôi là Kim Đình Phương. Tôi tin rằng công nghệ chỉ thực sự tạo ra đột phá khi được gắn liền với bài toán thực tế. Mục tiêu của tôi là trở thành một Tech-driven Supply Chain Specialist — người có thể thấu hiểu sâu sắc nghiệp vụ chuỗi cung ứng và tự tay xây dựng các công cụ, ứng dụng số để tối ưu hóa hiệu suất vận hành."
                                : "Hello! I am Kim Dinh Phuong. I strongly believe technology creates genuine impact when applied to real-world operational challenges. My mission is to grow into a Tech-driven Supply Chain Specialist — blending domain logistics expertise with hands-on software development to streamline business processes."}
                        </p>
                    </div>
                </div>
            </Reveal>

            {/* 3 Pillars Grid */}
            <Reveal direction="up" delay={150}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {keyStrengths.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                                        {item.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                        {item.badge}
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Quick Info Bar */}
            <Reveal direction="up" delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 p-2 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    {quickInfo.map((info, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/50 shadow-2xs">
                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shrink-0">
                                {info.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                                    {info.label}
                                </span>
                                {info.href ? (
                                    <a
                                        href={info.href}
                                        className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                                    >
                                        {info.value}
                                    </a>
                                ) : (
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                                        {info.value}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Timeline Section */}
            <TimelineSection />
        </section>
    );
}
