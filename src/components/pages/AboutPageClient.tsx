"use client";

import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/data/profile";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { BadgeCheck, MapPin, Mail, Globe, GraduationCap, Lightbulb, Target, ArrowUpRight, Truck, Code2, Boxes, Warehouse, BarChart3, TrendingUp, Zap, FileCode2, Palette, Bot, Terminal, Cpu } from "lucide-react";

export default function AboutPageClient() {
    const { language } = useLanguage();
    const isVi = language === 'vi';

    const aboutTextEn = profileData.about;
    const aboutTextVi = [
        "Xin chào! Tôi là Kim Đình Phương, sinh viên năm 3 chuyên ngành Quản lý Chuỗi cung ứng và Logistics tại Trường Đại học Kỹ thuật – Công nghệ Cần Thơ.",
        "Tôi yêu thích việc kết hợp logistics với công nghệ để giải quyết các bài toán thực tiễn trong quản lý và vận hành. Bên cạnh kiến thức chuyên ngành, tôi dành nhiều thời gian tìm hiểu và phát triển các kỹ năng về thiết kế website, lập trình web, trí tuệ nhân tạo (AI), tự động hóa quy trình và xây dựng các công cụ hỗ trợ công việc.",
        "Tôi tin rằng công nghệ là chìa khóa thúc đẩy chuyển đổi số trong chuỗi cung ứng. Vì vậy, tôi luôn chủ động thực hiện các dự án cá nhân nhằm ứng dụng những kiến thức đã học vào các giải pháp có tính thực tiễn, từ xây dựng website, hệ thống quản lý đến các ứng dụng hỗ trợ học tập và làm việc.",
        "Mục tiêu của tôi là trở thành một chuyên gia Supply Chain có nền tảng công nghệ, có khả năng kết nối giữa nghiệp vụ logistics và các giải pháp số để tối ưu hóa quy trình, nâng cao hiệu quả vận hành và tạo ra giá trị bền vững cho doanh nghiệp.",
        "Ngoài thời gian học tập, tôi thường nghiên cứu các xu hướng mới về Supply Chain, AI, Web Development, UI/UX và chuyển đổi số, đồng thời không ngừng trau dồi kỹ năng thông qua các dự án thực tế và hoạt động tự học."
    ];

    const currentAbout = isVi ? aboutTextVi : aboutTextEn;

    const logisticsSkills = isVi ? [
        "Quản lý Chuỗi cung ứng",
        "Vận hành Kho hàng & WMS",
        "Tối ưu hóa Quy trình Vận tải",
        "Kế hoạch & Quản lý Tồn kho",
        "Phân tích Dữ liệu Logistics",
        "Chuyển đổi số Doanh nghiệp"
    ] : [
        "Supply Chain Management",
        "Warehouse & WMS Ops",
        "Logistics & Transport Opt",
        "Inventory Planning",
        "Logistics Data Analytics",
        "Digital Transformation"
    ];

    const techSkills = [
        "Next.js & React",
        "TypeScript & JavaScript",
        "Tailwind CSS",
        "UI/UX Design (Figma)",
        "Artificial Intelligence (AI)",
        "Process Automation"
    ];

    return (
        <div className="max-w-6xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-10 border border-slate-400 dark:border-slate-600">
                {/* Header Title */}
                <Reveal direction="down" delay={100}>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-1.5 h-6 rounded-full bg-indigo-600 inline-block" />
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {isVi ? "Thông Tin & Tiểu Sử" : "About & Biography"}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                                {isVi
                                    ? "Kết nối chuyên môn Logistics với sức mạnh của Công nghệ & AI"
                                    : "Bridging Supply Chain & Logistics Expertise with Technology & AI"}
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* Profile Hero Header Card - Balanced Layout */}
                <Reveal direction="up" delay={150}>
                    <section className="mb-10 bg-gradient-to-br from-indigo-50/70 via-slate-50/40 to-white dark:from-slate-800/40 dark:via-slate-900/60 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left relative z-10">
                            {/* Avatar with Gradient Ring & Shadow */}
                            <div className="relative group shrink-0">
                                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-indigo-300 to-amber-300 shadow-md group-hover:scale-105 transition-transform duration-300">
                                    <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white dark:border-slate-900">
                                        <Image
                                            src={encodeURI(profileData.avatar)}
                                            alt={profileData.name}
                                            fill
                                            priority
                                            unoptimized
                                            sizes="(max-width: 640px) 128px, 144px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Main Info Details */}
                            <div className="flex-1 flex flex-col justify-center items-center md:items-start">
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap justify-center md:justify-start">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                        {profileData.name}
                                    </h2>
                                    <BadgeCheck className="w-6 h-6 text-[#1877F2] shrink-0" />
                                </div>

                                <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                                    {isVi ? "Trường Đại học Kỹ thuật – Công nghệ Cần Thơ" : "Can Tho University of Technology"}
                                </p>

                                {/* Contact Pills Row */}
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-2xs">
                                        <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                        <span>Cần Thơ, Việt Nam</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-2xs">
                                        <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                        <a href={`mailto:${profileData.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {profileData.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700 shadow-2xs">
                                        <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                        <a href={profileData.website} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            kimdinhphuong.dev
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* Biography Section - Ultra-Polished Editorial Layout */}
                <Reveal direction="up" delay={200}>
                    <section className="mb-12">
                        <div className="flex items-center justify-between gap-3 mb-6">
                            <div className="flex items-center gap-3">
                                <span className="w-1.5 h-6 rounded-full bg-indigo-600 inline-block" />
                                <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    {isVi ? "BẢN SẮC & TIỂU SỬ" : "ABOUT & BIOGRAPHY"}
                                </h2>
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>{isVi ? "Chủ động học hỏi & Đổi mới" : "Continuously Innovating"}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                            {/* Main Bio Text - 8 cols */}
                            <div className="lg:col-span-8 bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/70 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs">
                                {/* Lead Quote / Mission statement */}
                                <div className="p-4 sm:p-5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 relative">
                                    <p className="text-sm sm:text-base font-semibold text-indigo-900 dark:text-indigo-200 italic leading-relaxed">
                                        &ldquo;{isVi 
                                            ? "Tôi tin rằng công nghệ là chìa khóa thúc đẩy chuyển đổi số trong chuỗi cung ứng, tối ưu hóa quy trình và nâng cao hiệu quả vận hành." 
                                            : "I believe technology is the key to driving digital transformation in supply chains and optimizing operations."}&rdquo;
                                    </p>
                                </div>

                                {/* Core Bio Paragraphs */}
                                <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                    <p className="font-medium text-slate-900 dark:text-slate-100 text-base sm:text-lg border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
                                        {currentAbout[0]}
                                    </p>

                                    <p>
                                        {isVi ? (
                                            <>
                                                Tôi yêu thích việc kết hợp <strong className="font-bold text-slate-800 dark:text-slate-100">logistics với công nghệ</strong> để giải quyết các bài toán thực tiễn trong quản lý và vận hành. Bên cạnh kiến thức chuyên ngành, tôi dành nhiều thời gian tìm hiểu và phát triển các kỹ năng về thiết kế website, lập trình web, trí tuệ nhân tạo (AI), tự động hóa quy trình và xây dựng các công cụ hỗ trợ công việc.
                                            </>
                                        ) : currentAbout[1]}
                                    </p>

                                    <p>
                                        {isVi ? (
                                            <>
                                                Vì vậy, tôi luôn chủ động thực hiện các <strong className="font-bold text-slate-800 dark:text-slate-100">dự án cá nhân</strong> nhằm ứng dụng những kiến thức đã học vào các giải pháp có tính thực tiễn, từ xây dựng website, hệ thống quản lý đến các ứng dụng hỗ trợ học tập và làm việc.
                                            </>
                                        ) : currentAbout[2]}
                                    </p>

                                    <p>
                                        {isVi ? (
                                            <>
                                                Mục tiêu của tôi là trở thành một <strong className="font-bold text-indigo-600 dark:text-indigo-400">chuyên gia Supply Chain có nền tảng công nghệ</strong>, có khả năng kết nối giữa nghiệp vụ logistics và các giải pháp số để tạo ra giá trị bền vững cho doanh nghiệp.
                                            </>
                                        ) : currentAbout[3]}
                                    </p>

                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                                        {currentAbout[4]}
                                    </p>
                                </div>
                            </div>

                            {/* Side Highlights Cards - 4 cols */}
                            <div className="lg:col-span-4 space-y-3.5">
                                <div className="bg-white dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
                                            <GraduationCap className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                                {isVi ? "Học Vấn" : "Education"}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-800 dark:text-white">
                                                {isVi ? "Sinh viên Năm 3" : "Year 3 Student"}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
                                        Logistics & Quản lý Chuỗi cung ứng • ĐH Kỹ thuật – Công nghệ Cần Thơ
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400">
                                            <Lightbulb className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                                {isVi ? "Định Hướng" : "Focus"}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-800 dark:text-white">
                                                Logistics + Công Nghệ & AI
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
                                        Tối ưu hóa quy trình, thiết kế web & tự động hóa công việc
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-600 dark:text-blue-400">
                                            <Target className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                                {isVi ? "Mục Tiêu" : "Goal"}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-800 dark:text-white">
                                                Supply Chain Specialist
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
                                        Kết nối nghiệp vụ logistics và các giải pháp số thực tiễn
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* Skills & Focus Areas - Bento Matrix Layout */}
                <Reveal direction="up" delay={400}>
                    <section className="pt-8 border-t border-slate-100 dark:border-slate-800 mb-12">
                        <div className="flex items-center justify-between gap-3 mb-8">
                            <div className="flex items-center gap-3">
                                <span className="w-1.5 h-6 rounded-full bg-indigo-600 inline-block" />
                                <div>
                                    <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                                        {isVi ? "NĂNG LỰC & KỸ NĂNG CHUYÊN MÔN" : "COMPETENCIES & SKILLS"}
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                                        {isVi ? "Sự kết hợp giữa Nghiệp vụ Logistics thực tế & Công nghệ số" : "Fusion of Logistics Domain Expertise & Digital Tech"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bento Grid Matrix */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Bento Card 1: Logistics & SCM Core (7 cols) */}
                            <div className="md:col-span-7 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-xl group border border-slate-800">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                                
                                <div>
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">
                                        <Truck className="w-4 h-4" />
                                        <span>LOGISTICS & SUPPLY CHAIN</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-extrabold mb-3 text-white">
                                        {isVi ? "Nghiệp Vụ Chuỗi Cung Ứng" : "Supply Chain Operations"}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                                        {isVi 
                                            ? "Nền tảng kiến thức bài bản về vận hành kho bãi (WMS), quản lý tồn kho, tối ưu hóa quy trình vận tải và phân tích dữ liệu logistics."
                                            : "Solid foundation in warehouse management (WMS), inventory planning, transport optimization, and logistics data analytics."}
                                    </p>
                                </div>

                                {/* Feature Badges */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                                    {logisticsSkills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3.5 py-1.5 bg-slate-800/90 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700/80 hover:border-indigo-500 hover:text-indigo-300 hover:scale-102 transition-all"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Bento Card 2: Tech & AI Integration (5 cols) */}
                            <div className="md:col-span-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-xl border border-indigo-500/30">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
                                
                                <div>
                                    <div className="flex items-center gap-2 text-indigo-200 font-bold text-xs uppercase tracking-wider mb-3">
                                        <Code2 className="w-4 h-4" />
                                        <span>TECH & AI SOLUTIONS</span>
                                    </div>
                                    <h3 className="text-xl font-extrabold mb-3 text-white">
                                        {isVi ? "Công Nghệ & Tự Động Hóa" : "Tech & Automation"}
                                    </h3>
                                    <p className="text-xs text-indigo-100/90 mb-6 leading-relaxed">
                                        {isVi
                                            ? "Phát triển phần mềm web, ứng dụng Trí tuệ nhân tạo (AI) và tự động hóa quy trình làm việc hiệu quả."
                                            : "Web development, Artificial Intelligence (AI) integration, and process automation solutions."}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-indigo-500/40">
                                    {techSkills.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:scale-102 transition-all"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Bento Card 3: Digital Bridge Banner (12 cols) */}
                            <div className="md:col-span-12 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
                                <div className="flex items-center gap-4">
                                    <div className="p-3.5 bg-indigo-600 text-white rounded-2xl shrink-0 shadow-md shadow-indigo-500/20">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                                            {isVi ? "Giải Pháp Số Hóa & Tối Ưu Hóa Quy Trình" : "Digital Transformation & Process Optimization"}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                            {isVi
                                                ? "Khả năng đóng vai trò \"cầu nối số\" giữa phòng vận hành nghiệp vụ Logistics và đội ngũ kỹ thuật phần mềm."
                                                : "Bridging the gap between Logistics operations and technical software solutions."}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                                        Supply Chain Tech Specialist
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* Direct Contact Footer */}
                <Reveal direction="up" delay={500}>
                    <footer className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                            {isVi ? "Kim Đình Phương • 2026 Portfolio" : "Kim Dinh Phuong • 2026 Portfolio"}
                        </span>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            <span>{isVi ? "Liên hệ làm việc" : "Get in touch"}</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </footer>
                </Reveal>
            </div>
        </div>
    );
}