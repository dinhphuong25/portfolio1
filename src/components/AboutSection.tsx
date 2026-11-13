"use client";

import React from "react";
import TimelineSection from "./TimelineSection";
import { useLanguage } from "@/context/LanguageContext";
import { Box, Code, Cpu, MapPin, Mail, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutSection() {
    const { language } = useLanguage();
    const isVi = language === "vi";

    const keyStrengths = isVi ? [
        {
            title: "Logistics & Chuỗi cung ứng",
            desc: "Kết hợp tư duy quản trị chuỗi cung ứng, tối ưu hóa quy trình vận hành và phân tích luồng công việc thực tế.",
            icon: <Box className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Web Development & UI/UX",
            desc: "Phát triển ứng dụng web hiện đại với Next.js, TypeScript và Tailwind CSS, chú trọng hiệu năng cao và trải nghiệm người dùng tinh tế.",
            icon: <Code className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
        {
            title: "Tự động hóa & AI",
            desc: "Ứng dụng AI và workflow tự động hóa để tinh gọn quy trình, tối ưu hiệu suất và tạo ra các giải pháp thông minh.",
            icon: <Cpu className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        },
    ] : [
        {
            title: "Logistics & Supply Chain",
            desc: "Combining supply chain management thinking, operational process optimization, and practical workflow analysis.",
            icon: <Box className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
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
                <div 
                    className="about-narrative mb-8 w-full space-y-4 text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-[1.8] font-normal"
                    style={{ textAlign: "justify", textJustify: "inter-word" }}
                >
                    {isVi ? (
                        <>
                            <p>
                                Chào mọi người! Mình là Kim Đình Phương, hiện đang là sinh viên ngành Logistics và Quản lý chuỗi cung ứng. Bên cạnh lĩnh vực học tập, mình có niềm đam mê đặc biệt với công nghệ thông tin, lập trình và thế giới đầy thú vị của những dòng code.
                            </p>
                            <p>
                                Mình luôn bị cuốn hút bởi cách một ý tưởng có thể được biến thành một sản phẩm thực tế thông qua tư duy logic và khả năng lập trình. Đối với mình, mỗi dòng code không đơn thuần là những câu lệnh, mà còn là một cách để giải quyết vấn đề, tạo ra giá trị và hiện thực hóa những ý tưởng sáng tạo. Mình yêu thích việc tìm hiểu công nghệ mới, khám phá cách các hệ thống vận hành và tự tay xây dựng những website, ứng dụng hay công cụ số mang tính ứng dụng cao.
                            </p>
                            <p>
                                Dù theo học ngành Logistics, mình luôn nhìn thấy sự kết nối mạnh mẽ giữa lĩnh vực này với công nghệ. Từ quản lý chuỗi cung ứng, tối ưu hóa quy trình, phân tích dữ liệu đến tự động hóa hoạt động vận hành, công nghệ thông tin đang mở ra nhiều cơ hội để nâng cao hiệu quả và đổi mới phương thức làm việc. Đây cũng chính là động lực để mình không ngừng học hỏi và phát triển kiến thức ở cả hai lĩnh vực.
                            </p>
                            <p>
                                Mình mong muốn kết hợp tư duy của một sinh viên Logistics với niềm đam mê lập trình để tạo ra những giải pháp công nghệ thiết thực, góp phần đơn giản hóa công việc, tối ưu quy trình và mang lại trải nghiệm tốt hơn cho người dùng.
                            </p>
                            <p>
                                Không ngừng học hỏi – Không ngại thử thách – Luôn sáng tạo và biến ý tưởng thành sản phẩm thực tế. Đó là tinh thần mà mình muốn theo đuổi trên hành trình phát triển bản thân. Mình hy vọng sẽ có cơ hội kết nối, học hỏi và hợp tác với những người có cùng đam mê công nghệ, lập trình và sáng tạo.
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                Hello everyone! I am Kim Dinh Phuong, currently a student majoring in Logistics and Supply Chain Management. Beyond my academic field, I have a deep passion for information technology, software development, and the fascinating world of coding.
                            </p>
                            <p>
                                I have always been intrigued by how an idea can turn into a real-world product through logical thinking and programming skills. To me, code is not just syntax and commands, but a way to solve problems, generate value, and bring creative ideas to life. I enjoy exploring new technologies, understanding how systems operate, and crafting websites, web applications, and practical digital tools.
                            </p>
                            <p>
                                Despite studying Logistics, I consistently see a powerful connection between this discipline and technology. From supply chain management, workflow optimization, and data analysis to operations automation, information technology unlocks tremendous opportunities to elevate efficiency and innovate operational workflows. This fuels my drive to continuously learn and advance across both domains.
                            </p>
                            <p>
                                I aspire to combine the analytical mindset of a Logistics student with my passion for coding to create pragmatic technology solutions that simplify everyday work, optimize processes, and deliver better user experiences.
                            </p>
                            <p>
                                Continuous learning – Embracing challenges – Relentlessly creating and turning ideas into tangible products. That is the mindset I pursue on my journey of personal and professional growth. I look forward to connecting, learning, and collaborating with fellow enthusiasts who share a love for technology, coding, and innovation.
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
                                <h4 className="text-base sm:text-[17px] font-bold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h4>
                                <p 
                                    className="about-card-desc text-xs sm:text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal"
                                    style={{ textAlign: "justify", textJustify: "inter-word" }}
                                >
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
