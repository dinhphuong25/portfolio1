"use client";

import React from "react";
import TimelineSection from "./TimelineSection";
import { useLanguage } from "@/context/LanguageContext";
import { Layers, Code, Cpu, MapPin, Mail, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutSection() {
    const { language } = useLanguage();
    const isVi = language === "vi";

    const keyStrengths = isVi ? [
        {
            title: "Hi Tech - All In One",
            desc: "Sáng lập và phát triển hệ sinh thái sản phẩm số đa năng (HiTOEIC, Ez Tool, Hi Phim...) phục vụ học tập, tiện ích và công việc.",
            icon: <Layers className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Web Development & UI/UX",
            desc: "Phát triển ứng dụng web hiện đại với Next.js, TypeScript và Tailwind CSS, chú trọng hiệu năng cao và trải nghiệm người dùng tinh tế.",
            icon: <Code className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Tự động hóa & AI",
            desc: "Ứng dụng AI và workflow tự động hóa để tinh gọn quy trình phát triển, tối ưu hiệu suất và tạo ra các giải pháp thông minh.",
            icon: <Cpu className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
    ] : [
        {
            title: "Hi Tech - All In One",
            desc: "Founding and scaling an all-in-one digital ecosystem (HiTOEIC, Ez Tool, Hi Phim...) for learning, developer tools, and entertainment.",
            icon: <Layers className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Web Development & UI/UX",
            desc: "Engineering modern web applications with Next.js, TypeScript, and Tailwind CSS with a sharp focus on speed and delightful UX.",
            icon: <Code className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Automation & AI",
            desc: "Leveraging AI workflows and automation to streamline development processes, boost productivity, and build smart interactive solutions.",
            icon: <Cpu className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
    ];

    const contactCards = [
        {
            icon: <MapPin className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
            label: isVi ? "Địa điểm" : "Location",
            value: isVi ? "Cần Thơ, Việt Nam" : "Can Tho, Vietnam",
            subtext: isVi ? "Sẵn sàng làm việc Onsite & Remote" : "Available for Onsite & Remote",
            href: undefined,
        },
        {
            icon: <Mail className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
            label: isVi ? "Email liên hệ" : "Contact Email",
            value: "contact@dinhphuong.dev",
            subtext: isVi ? "Nhấp để gửi thư trao đổi" : "Click to send an email",
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
                <div className="mb-8 w-full space-y-4 text-justify text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {isVi ? (
                        <>
                            <p>
                                Chào bạn! Mình là Kim Đình Phương – một nhà phát triển web và là Founder của <strong>Hi Tech - All In One</strong>. Với niềm đam mê sâu sắc dành cho công nghệ và lập trình, mình luôn hướng đến việc kiến tạo những sản phẩm số tiện ích, hiện đại, mang lại trải nghiệm mượt mà và giá trị thiết thực cho cộng đồng người dùng.
                            </p>
                            <p>
                                Trên hành trình phát triển hệ sinh thái số <strong>Hi Tech - All In One</strong>, mình trực tiếp thiết kế, lập trình và vận hành nhiều nền tảng đa dạng — tiêu biểu như nền tảng luyện thi thông minh <strong>HiTOEIC</strong>, chuyên trang tiện ích lập trình <strong>Ez Tool</strong> cùng nhiều công cụ số hữu ích khác. Trong từng sản phẩm, mình luôn áp dụng các công nghệ hiện đại như Next.js, TypeScript, Tailwind CSS, kết hợp AI và tự động hóa quy trình, đồng thời đặt trải nghiệm người dùng (UI/UX) trực quan, giao diện sạch sẽ và hiệu năng tối ưu lên hàng đầu.
                            </p>
                            <p>
                                Mục tiêu của mình là tiếp tục hoàn thiện và mở rộng hệ sinh thái Hi Tech - All In One trở thành điểm đến đa năng, chất lượng cho học tập, công việc và giải trí. Mình luôn giữ tinh thần cầu tiến, không ngừng học hỏi công nghệ mới và rất mong có cơ hội được kết nối, trao đổi cũng như hợp tác phát triển cùng các anh chị và bạn bè đồng nghiệp!
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                Hello! I am Kim Dinh Phuong — a web developer and the Founder of <strong>Hi Tech - All In One</strong>. Driven by a deep passion for technology and software engineering, I am dedicated to building modern, versatile digital products that deliver seamless user experiences and practical value to the community.
                            </p>
                            <p>
                                Through the journey of growing the <strong>Hi Tech - All In One</strong> digital ecosystem, I have personally designed, developed, and deployed diverse platforms — notably the smart exam preparation portal <strong>HiTOEIC</strong>, the developer utility hub <strong>Ez Tool</strong>, and other digital tools. In every project, I leverage modern web technologies including Next.js, TypeScript, and Tailwind CSS, integrated with AI workflows and automation, while prioritizing intuitive UI/UX design, clean layouts, and peak performance.
                            </p>
                            <p>
                                My vision is to continually innovate and scale Hi Tech - All In One into a reliable, comprehensive all-in-one platform for learning, productivity, and beyond. I maintain a continuous learning mindset and welcome any opportunity to connect, collaborate, and exchange insights with fellow developers, creators, and partners!
                            </p>
                        </>
                    )}
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

            {/* 2 Clean Minimal Contact & Location Cards */}
            <Reveal direction="up" delay={150}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
                    {contactCards.map((card, idx) => {
                        const content = (
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                                    {card.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                                        {card.label}
                                    </div>
                                    <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                                        {card.value}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                        {card.subtext}
                                    </div>
                                </div>
                                {card.href && (
                                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
                                        <ArrowUpRight className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
                                    </div>
                                )}
                            </div>
                        );

                        if (card.href) {
                            return (
                                <a
                                    key={idx}
                                    href={card.href}
                                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs group block"
                                >
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <div
                                key={idx}
                                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700 group"
                            >
                                {content}
                            </div>
                        );
                    })}
                </div>
            </Reveal>

            {/* Timeline Section */}
            <TimelineSection />
        </section>
    );
}
