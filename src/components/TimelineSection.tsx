"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export const timelineDataEn = [
    {
        id: 1,
        year: "Sep 2023",
        title: "Started University",
        description: "Began my journey majoring in Logistics and Supply Chain Management at Can Tho University of Technology.",
        icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        ),
    },
    {
        id: 2,
        year: "Mar 2024",
        title: "Academic Research",
        description: "Participated in research on optimizing local warehouse distribution routes, developing my analytical skills.",
        icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        id: 3,
        year: "Oct 2024",
        title: "EcoFresh WMS",
        description: "Started developing warehouse management system tracking tools to monitor inventory in real-time.",
        icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
    },
    {
        id: 4,
        year: "2025 – Present",
        title: "Internship & Advanced Studies",
        description: "Seeking practical internships and expanding knowledge in sustainable logistics and global supply chain.",
        icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

const timelineDataVi = [
    { ...timelineDataEn[0], year: "Thg 9 2023", title: "Nhập học Đại học", description: "Bắt đầu hành trình học chuyên ngành Quản lý chuỗi cung ứng & Logistics tại ĐH KTCN Cần Thơ." },
    { ...timelineDataEn[1], year: "Thg 3 2024", title: "Nghiên cứu học thuật", description: "Tham gia nghiên cứu tối ưu hóa tuyến đường phân phối kho bãi địa phương, cải thiện tư duy phân tích." },
    { ...timelineDataEn[2], year: "Thg 10 2024", title: "Hệ thống WMS EcoFresh", description: "Phát triển các công cụ theo dõi hệ thống kho bãi trực tuyến theo thời gian thực." },
    { ...timelineDataEn[3], year: "2025 – Hiện tại", title: "Thực tập & Chuyên sâu", description: "Tìm kiếm thực tập thực tế, mở rộng kiến thức logistics bền vững và chuỗi cung ứng toàn cầu." },
];

export default function TimelineSection() {
    const { language } = useLanguage();
    const timelineData = language === "vi" ? timelineDataVi : timelineDataEn;

    return (
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                    {language === "vi" ? "TIẾN TRÌNH PHÁT TRIỂN" : "CAREER JOURNEY"}
                </h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Slate Minimal Vertical Tree Timeline */}
            <div className="relative pl-4 sm:pl-6">
                {/* Vertical Central Line through Icon Nodes */}
                <div className="absolute left-[19px] sm:left-[27px] top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-6">
                    {timelineData.map((item, index) => {
                        const isLast = index === timelineData.length - 1;

                        return (
                            <Reveal key={item.id} direction="up" delay={index * 80}>
                                <div className="relative flex items-start gap-4 sm:gap-5 group">
                                    {/* Icon Center Node */}
                                    <div
                                        className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                            isLast
                                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md ring-2 ring-slate-900/10 dark:ring-white/20"
                                                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 group-hover:border-slate-400 dark:group-hover:border-slate-600 shadow-2xs"
                                        }`}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 sm:p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
                                        <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                                                {item.title}
                                            </h4>

                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 px-2.5 py-0.5 rounded-md shrink-0">
                                                {item.year}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-justify">
                                            {item.description}
                                        </p>

                                        {/* "Present" status indicator for current milestone */}
                                        {isLast && (
                                            <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                                </span>
                                                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                                    {language === "vi" ? "ĐANG THỰC HIỆN" : "IN PROGRESS"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}