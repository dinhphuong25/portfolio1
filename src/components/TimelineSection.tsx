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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        ),
        color: "indigo",
    },
    {
        id: 2,
        year: "Mar 2024",
        title: "Academic Research",
        description: "Participated in research on optimizing local warehouse distribution routes, developing my analytical skills.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        color: "violet",
    },
    {
        id: 3,
        year: "Oct 2024",
        title: "EcoFresh WMS",
        description: "Started developing warehouse management system tracking tools to monitor inventory in real-time.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        color: "blue",
    },
    {
        id: 4,
        year: "2025 – Present",
        title: "Internship & Advanced Studies",
        description: "Seeking practical internships and expanding knowledge in sustainable logistics and global supply chain.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: "emerald",
    },
];

const timelineDataVi = [
    { ...timelineDataEn[0], year: "Thg 9 2023", title: "Nhập học Đại học", description: "Bắt đầu hành trình học chuyên ngành Quản lý chuỗi cung ứng & Logistics tại ĐH KTCN Cần Thơ." },
    { ...timelineDataEn[1], year: "Thg 3 2024", title: "Nghiên cứu học thuật", description: "Tham gia nghiên cứu tối ưu hóa tuyến đường phân phối kho bãi địa phương, cải thiện tư duy phân tích." },
    { ...timelineDataEn[2], year: "Thg 10 2024", title: "Hệ thống WMS EcoFresh", description: "Phát triển các công cụ theo dõi hệ thống kho bãi trực tuyến theo thời gian thực." },
    { ...timelineDataEn[3], year: "2025 – Hiện tại", title: "Thực tập & Chuyên sâu", description: "Tìm kiếm thực tập thực tế, mở rộng kiến thức logistics bền vững và chuỗi cung ứng toàn cầu." },
];

const colorMap: Record<string, { dot: string; icon: string; badge: string }> = {
    indigo: { dot: "bg-indigo-500", icon: "bg-indigo-50 text-indigo-600", badge: "bg-indigo-50 text-indigo-600" },
    violet: { dot: "bg-violet-500", icon: "bg-violet-50 text-violet-600", badge: "bg-violet-50 text-violet-600" },
    blue: { dot: "bg-blue-500", icon: "bg-blue-50 text-blue-600", badge: "bg-blue-50 text-blue-600" },
    emerald: { dot: "bg-emerald-500", icon: "bg-emerald-50 text-emerald-600", badge: "bg-emerald-50 text-emerald-600" },
};

export default function TimelineSection() {
    const { language } = useLanguage();
    const timelineData = language === "vi" ? timelineDataVi : timelineDataEn;

    return (
        <div className="mt-8 pt-6 border-t border-slate-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-4 rounded-full bg-indigo-500 inline-block" />
                <h3 className="text-xs font-bold text-slate-500 tracking-[0.15em] uppercase">
                    {language === "vi" ? "Tiến Trình Phát Triển" : "Career Journey"}
                </h3>
                <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Timeline */}
            <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-1 bottom-1 w-px bg-gradient-to-b from-indigo-200 via-slate-200 to-transparent" />

                <div className="space-y-5">
                    {timelineData.map((item, index) => {
                        const c = colorMap[item.color];
                        const isLast = index === timelineData.length - 1;

                        return (
                            <Reveal key={item.id} direction="up" delay={index * 100}>
                                <div className="relative flex gap-4 group">
                                    {/* Dot */}
                                    <div className={`absolute -left-6 top-3 w-[11px] h-[11px] rounded-full ${c.dot} ring-2 ring-white shadow-sm flex-shrink-0 transition-transform duration-200 group-hover:scale-125`} />

                                    {/* Card */}
                                    <div className="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 hover:-translate-y-0.5">
                                        <div className="flex items-start justify-between gap-3 mb-1.5">
                                            {/* Icon + Title */}
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${c.icon}`}>
                                                    {item.icon}
                                                </div>
                                                <h4 className="text-sm font-bold text-slate-800 leading-tight">
                                                    {item.title}
                                                </h4>
                                            </div>

                                            {/* Year badge */}
                                            <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge} whitespace-nowrap`}>
                                                {item.year}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-500 leading-relaxed ml-9">
                                            {item.description}
                                        </p>

                                        {/* "Present" pulse indicator */}
                                        {isLast && (
                                            <div className="flex items-center gap-1.5 mt-2 ml-9">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                                </span>
                                                <span className="text-[10px] text-emerald-600 font-semibold">
                                                    {language === "vi" ? "Hiện tại" : "In progress"}
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