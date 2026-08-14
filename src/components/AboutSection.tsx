"use client";

import React from "react";
import TimelineSection from "./TimelineSection";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, MapPin, Mail, Target } from "lucide-react";

export default function AboutSection() {
    const { language } = useLanguage();

    const storyVi = [
        "Chào bạn! Tôi là Kim Đình Phương, sinh viên năm 3 chuyên ngành Quản lý Chuỗi cung ứng & Logistics tại Trường Đại học Kỹ thuật – Công nghệ Cần Thơ. Ngay từ những ngày đầu học tập, tôi đã luôn bị cuốn hút bởi cách mà hàng hóa, dữ liệu và quy trình được vận hành trơn tru trong thực tế.",
        "Thay vì chỉ dừng lại ở lý thuyết sách vở, tôi chọn cho mình một lối đi riêng: kết hợp tư duy chuỗi cung ứng với công nghệ phần mềm hiện đại. Tôi dành phần lớn thời gian tự học lập trình web (Next.js, TypeScript), tìm hiểu về Trí tuệ nhân tạo (AI), tự động hóa quy trình và thiết kế giao diện người dùng (UI/UX).",
        "Đối với tôi, sản phẩm tốt nhất là sản phẩm giải quyết được vấn đề thực tế. Mọi dự án tôi từng phát triển — từ hệ thống Quản lý kho lạnh EcoFresh WMS, cổng học tập Ez Study cho tới nền tảng luyện thi HiTOEIC — đều xuất phát từ mong muốn tối ưu hóa trải nghiệm và đơn giản hóa các thao tác phức tạp.",
        "Mục tiêu dài hạn của tôi là trở thành một Chuyên gia Supply Chain tiên phong ứng dụng giải pháp số (Digital Supply Chain Specialist) — cầu nối vững chắc giữa nghiệp vụ vận hành thực địa và sức mạnh của công nghệ số."
    ];

    const storyEn = [
        "Hello! I am Kim Dinh Phuong, a 3rd-year Supply Chain Management & Logistics student at Can Tho University of Technology. From day one, I have been fascinated by how goods, data, and workflows seamlessly connect across complex supply chains.",
        "Rather than sticking purely to academic textbooks, I chose a unique hybrid path: combining logistics operations with modern software engineering. I dedicate significant time to self-directed fullstack web development (Next.js, TypeScript), AI workflow automation, and intuitive UI/UX design.",
        "I strongly believe the best software is one that solves a real operational headache. Every project I have engineered — from the EcoFresh Cold-Chain WMS to Ez Study and HiTOEIC — stems from a passion for optimizing workflows and making complex tools user-friendly.",
        "My ultimate goal is to become a Tech-Driven Supply Chain Specialist — serving as a reliable bridge between traditional field operations and modern digital transformations."
    ];

    const currentStory = language === "vi" ? storyVi : storyEn;

    const highlightsVi = [
        {
            icon: <GraduationCap className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Trường học",
            value: "ĐH Kỹ thuật – Công nghệ Cần Thơ",
        },
        {
            icon: <MapPin className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Vị trí hiện tại",
            value: "Cần Thơ, Việt Nam",
        },
        {
            icon: <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Email liên hệ",
            value: "kimdinhphuong205@gmail.com",
            isLink: true,
            href: "mailto:kimdinhphuong205@gmail.com",
        },
        {
            icon: <Target className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Định hướng sự nghiệp",
            value: "Digital Supply Chain Specialist",
        },
    ];

    const highlightsEn = [
        {
            icon: <GraduationCap className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Education",
            value: "Can Tho Univ. of Technology",
        },
        {
            icon: <MapPin className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Location",
            value: "Can Tho, Vietnam",
        },
        {
            icon: <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Contact Email",
            value: "kimdinhphuong205@gmail.com",
            isLink: true,
            href: "mailto:kimdinhphuong205@gmail.com",
        },
        {
            icon: <Target className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: "Career Goal",
            value: "Digital Supply Chain Specialist",
        },
    ];

    const currentHighlights = language === "vi" ? highlightsVi : highlightsEn;

    return (
        <section className="px-6 sm:px-10 lg:px-14 py-8 border-t border-slate-100 dark:border-slate-800" aria-labelledby="about-heading">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
                <h2 id="about-heading" className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                    {language === "vi" ? "CÂU CHUYỆN & GIỚI THIỆU" : "MY STORY & ABOUT"}
                </h2>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Custom 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                {/* Left Story Column */}
                <div className="lg:col-span-8 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentStory.map((paragraph, idx) => (
                        <p key={idx} className="text-justify font-normal">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Right Highlights Cards */}
                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {currentHighlights.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                        >
                            <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shrink-0">
                                {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                                    {item.label}
                                </span>
                                {item.isLink ? (
                                    <a
                                        href={item.href}
                                        className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:underline leading-tight block mt-0.5 truncate"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight block mt-0.5">
                                        {item.value}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <TimelineSection />
        </section>
    );
}
