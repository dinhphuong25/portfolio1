"use client";

import React from "react";
import TimelineSection from "./TimelineSection";
import { useLanguage } from "@/context/LanguageContext";
import { Box, Code, Cpu, MapPin, Mail } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutSection() {
    const { language } = useLanguage();
    const isVi = language === "vi";

    const keyStrengths = isVi ? [
        {
            title: "Supply Chain & Logistics",
            desc: "Nghiên cứu tối ưu hóa vận hành, quản lý kho bãi (WMS) và phân tích quy trình luân chuyển hàng hóa thực tế.",
            icon: <Box className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Web Development & UI/UX",
            desc: "Phát triển ứng dụng web hiện đại với Next.js, TypeScript và Tailwind CSS, chú trọng hiệu năng và trải nghiệm người dùng.",
            icon: <Code className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Tự động hóa & AI",
            desc: "Ứng dụng AI và workflow tự động hóa để tinh gọn các tác vụ lặp lại, tối ưu thời gian và chi phí vận hành.",
            icon: <Cpu className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
    ] : [
        {
            title: "Supply Chain & Logistics",
            desc: "Focusing on operations optimization, warehouse management systems (WMS), and practical distribution workflow analysis.",
            icon: <Box className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Web Development & UI/UX",
            desc: "Engineering modern web applications with Next.js, TypeScript, and Tailwind CSS with a sharp focus on speed and UX.",
            icon: <Code className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Automation & AI",
            desc: "Leveraging AI and workflow automation to streamline repetitive tasks, boost productivity, and cut operational friction.",
            icon: <Cpu className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
    ];

    const quickInfo = [
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
            <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
                <h2 id="about-heading" className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                    {isVi ? "CÂU CHUYỆN & GIỚI THIỆU" : "ABOUT & STORY"}
                </h2>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Intro Narrative */}
            <Reveal direction="up" delay={50}>
                <div className="mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-3">
                        {isVi ? (
                            <>Kết hợp tư duy Logistics & Chuỗi cung ứng với sức mạnh của Công nghệ số.</>
                        ) : (
                            <>Bridging Supply Chain & Logistics expertise with the power of Digital Tech.</>
                        )}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-4xl">
                        {isVi 
                            ? "Chào bạn! Tôi là Kim Đình Phương. Tôi tin rằng công nghệ chỉ thực sự tạo ra đột phá khi được gắn liền với bài toán thực tế. Mục tiêu của tôi là trở thành một Tech-driven Supply Chain Specialist — người có thể thấu hiểu sâu sắc nghiệp vụ chuỗi cung ứng và tự tay xây dựng các công cụ, ứng dụng số để tối ưu hóa hiệu suất vận hành."
                            : "Hello! I am Kim Dinh Phuong. I believe technology creates real breakthroughs when applied to practical operational challenges. My mission is to become a Tech-driven Supply Chain Specialist — deeply understanding domain logistics while building tailored digital tools to streamline operations."}
                    </p>
                </div>
            </Reveal>

            {/* 3 Clean Minimal Cards ("ô") */}
            <Reveal direction="up" delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
                    {keyStrengths.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 transition-colors hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center mb-3.5 shadow-2xs">
                                    {item.icon}
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Minimal Quick Info Chips */}
            <Reveal direction="up" delay={150}>
                <div className="flex flex-wrap items-center gap-3 mb-12">
                    {quickInfo.map((info, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 text-xs"
                        >
                            <span className="text-slate-500 dark:text-slate-400">{info.icon}</span>
                            <span className="text-slate-400 dark:text-slate-500 font-medium">{info.label}:</span>
                            {info.href ? (
                                <a
                                    href={info.href}
                                    className="font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {info.value}
                                </a>
                            ) : (
                                <span className="font-semibold text-slate-900 dark:text-slate-100">{info.value}</span>
                            )}
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Timeline Section */}
            <TimelineSection />
        </section>
    );
}
