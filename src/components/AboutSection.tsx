"use client";

import React from "react";
import TimelineSection from "./TimelineSection";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Mail, Layers, Compass } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutSection() {
    const { language } = useLanguage();
    const isVi = language === "vi";

    const storyVi = [
        "Chào bạn! Tôi là Kim Đình Phương – chuyên sâu trong lĩnh vực Quản trị Chuỗi cung ứng & Logistics, kết hợp với kỹ năng phát triển Web và tự động hóa quy trình.",
        "Tôi có niềm đam mê lớn với việc ứng dụng công nghệ để giải quyết các bài toán vận hành thực tế. Đối với tôi, một website hay hệ thống phần mềm không chỉ là công cụ hiển thị, mà là giải pháp trực tiếp giúp tinh gọn quy trình, giảm thiểu sai sót và tối ưu hóa chi phí.",
        "Bên cạnh kiến thức chuyên ngành Logistics và Quản lý kho bãi (WMS), tôi chủ động nghiên cứu và phát triển ứng dụng với Next.js, TypeScript, kết hợp cùng AI và workflow automation. Tôi tin rằng công nghệ chỉ thực sự tạo ra đột phá khi gắn liền với bài toán nghiệp vụ thực tế.",
        "Mục tiêu của tôi là trở thành một Tech-driven Supply Chain Specialist — người có thể thấu hiểu sâu sắc bài toán vận hành và tự tay xây dựng các công cụ, ứng dụng số để tối ưu hiệu suất cho doanh nghiệp.",
    ];

    const storyEn = [
        "Hello! I am Kim Dinh Phuong — specializing in Supply Chain Management & Logistics, paired with modern web development and process automation skills.",
        "I have a deep passion for applying technology to solve practical operational problems. To me, a website or software system is not just an interface, but a tangible solution to streamline workflows, minimize errors, and reduce operating costs.",
        "Alongside my domain expertise in Logistics and Warehouse Management Systems (WMS), I actively build applications using Next.js, TypeScript, AI, and workflow automation. I firmly believe technology delivers the greatest impact when tied directly to business operations.",
        "My goal is to become a Tech-driven Supply Chain Specialist — capable of deeply understanding operational workflows and developing tailored digital tools to drive business efficiency.",
    ];

    const currentStory = isVi ? storyVi : storyEn;

    const quickInfo = [
        {
            icon: <Compass className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Định hướng chính" : "Primary Focus",
            value: "Digital Supply Chain & Web Tech",
        },
        {
            icon: <Layers className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Kỹ năng trọng tâm" : "Core Competencies",
            value: "Logistics, WMS, Next.js, TypeScript",
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
                    {isVi ? "CÂU CHUYỆN & GIỚI THIỆU" : "ABOUT & STORY"}
                </h2>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Clean 2-Column Web Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                {/* Left: Clean Narrative */}
                <div className="lg:col-span-8 space-y-4">
                    <Reveal direction="up" delay={50}>
                        <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                            {currentStory[0]}
                        </p>
                    </Reveal>

                    <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {currentStory.slice(1).map((paragraph, index) => (
                            <Reveal key={index} direction="up" delay={100 + index * 50}>
                                <p>{paragraph}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Right: Clean Minimal Info Cards */}
                <div className="lg:col-span-4 space-y-3">
                    <Reveal direction="up" delay={150}>
                        <div className="space-y-2.5">
                            {quickInfo.map((info, idx) => (
                                <div
                                    key={idx}
                                    className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                                >
                                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shrink-0 text-slate-700 dark:text-slate-300 mt-0.5 shadow-2xs">
                                        {info.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
                                            {info.label}
                                        </span>
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                className="text-xs font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                                                {info.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Timeline Section */}
            <TimelineSection />
        </section>
    );
}
