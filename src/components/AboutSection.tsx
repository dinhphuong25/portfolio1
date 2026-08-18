"use client";

import React from "react";
import TimelineSection from "./TimelineSection";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, MapPin, Mail, Target } from "lucide-react";

export default function AboutSection() {
    const { language } = useLanguage();

    const storyVi = [
        "Chào bạn! Tôi là Kim Đình Phương, sinh viên năm 3 chuyên ngành Quản lý Chuỗi cung ứng & Logistics tại Trường Đại học Kỹ thuật – Công nghệ Cần Thơ.",
        "Tôi đặc biệt hứng thú với cách hàng hóa, dữ liệu và quy trình được kết nối để tạo nên một chuỗi cung ứng vận hành hiệu quả. Vì vậy, bên cạnh kiến thức chuyên ngành, tôi chủ động khám phá công nghệ và phát triển kỹ năng lập trình để tìm ra những cách tiếp cận mới cho các bài toán thực tế.",
        "Tôi đang tự học và thực hành phát triển web với Next.js, TypeScript, đồng thời tìm hiểu về AI, tự động hóa quy trình và thiết kế UI/UX. Tôi tin rằng công nghệ chỉ thực sự có giá trị khi được ứng dụng để giải quyết một vấn đề cụ thể, thay vì chỉ dừng lại ở việc tạo ra một sản phẩm đẹp hoặc hiện đại.",
        "Từ quan điểm đó, tôi đã thực hiện một số dự án cá nhân như EcoFresh WMS – hệ thống quản lý kho lạnh, Ez Study – cổng học tập và HiTOEIC – nền tảng luyện thi. Mỗi dự án là một cơ hội để tôi kết hợp tư duy Logistics với công nghệ, đồng thời rèn luyện khả năng phân tích vấn đề, thiết kế giải pháp và tối ưu trải nghiệm người dùng.",
        "Trong tương lai, tôi hướng đến trở thành một Digital Supply Chain Specialist – người có khả năng kết nối giữa nghiệp vụ vận hành, dữ liệu và công nghệ, góp phần xây dựng những giải pháp số thiết thực cho hoạt động Logistics và Chuỗi cung ứng.",
    ];

    const storyEn = [
        "Hello! I am Kim Dinh Phuong, a 3rd-year student majoring in Supply Chain Management & Logistics at Can Tho University of Technology.",
        "I am particularly fascinated by how goods, data, and processes connect to form an efficient operational supply chain. Alongside my academic studies, I proactively explore technology and develop programming skills to find practical solutions.",
        "I am self-learning fullstack web development with Next.js, TypeScript, while researching AI, process automation, and UI/UX design. I strongly believe technology brings real value only when applied to solve real-world problems.",
        "Guided by this principle, I engineered projects like EcoFresh WMS cold-storage system, Ez Study portal, and HiTOEIC exam platform. Each project bridges logistics domain knowledge with digital engineering.",
        "In the future, I aim to become a Digital Supply Chain Specialist — serving as a bridge between field operations, data, and technology to build impactful digital solutions.",
    ];

    const isVi = language === "vi";
    const currentStory = isVi ? storyVi : storyEn;

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

    const currentHighlights = isVi ? highlightsVi : highlightsEn;

    return (
        <section className="px-6 sm:px-10 lg:px-14 py-8 border-t border-slate-100 dark:border-slate-800" aria-labelledby="about-heading">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
                <h2 id="about-heading" className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                    {isVi ? "CÂU CHUYỆN & GIỚI THIỆU" : "MY STORY & ABOUT"}
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
