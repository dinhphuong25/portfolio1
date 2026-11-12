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
                <div className="mb-8 w-full space-y-4 text-justify text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {isVi ? (
                        <>
                            <p>
                                Chào bạn! Mình là Kim Đình Phương – một sinh viên đam mê công nghệ và lập trình. Xuất phát điểm từ chuyên ngành Quản trị Chuỗi cung ứng &amp; Logistics, mình luôn bị cuốn hút bởi cách mà công nghệ và phần mềm có thể số hóa, tinh gọn và tối ưu hóa những quy trình vận hành phức tạp, giúp các bài toán thực tế được giải quyết nhanh chóng và hiệu quả hơn.
                            </p>
                            <p>
                                Niềm đam mê ấy là động lực lớn để mình chủ động tự học và đào sâu vào phát triển ứng dụng web hiện đại. Mình thường dành thời gian nghiên cứu và thực hành với Next.js, TypeScript, Tailwind CSS, kết hợp cùng AI và các công cụ tự động hóa quy trình (workflow automation). Đối với mình, mỗi dòng code viết ra không chỉ nằm trên lý thuyết, mà phải gắn liền với giá trị thực tế — từ dự án quản lý kho bãi EcoFresh WMS đến các nền tảng học tập số như Ez Study hay HiTOEIC, mình luôn chú trọng trải nghiệm người dùng trực quan, giao diện sạch sẽ và hiệu năng tối ưu.
                            </p>
                            <p>
                                Mục tiêu dài hạn của mình là trở thành một Tech-driven Supply Chain Specialist – người có thể đóng vai trò cầu nối vững chắc giữa bài toán nghiệp vụ thực tiễn và giải pháp công nghệ hiện đại. Mình luôn giữ tinh thần cầu tiến, cởi mở học hỏi và rất mong có cơ hội được kết nối, trao đổi cũng như hợp tác cùng các anh chị và bạn bè đồng nghiệp!
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                Hello! I am Kim Dinh Phuong — a student deeply passionate about technology and programming. Majoring in Logistics &amp; Supply Chain Management, I have always been fascinated by how modern software and digital solutions can streamline intricate operational workflows, making everyday business processes leaner, faster, and more visual.
                            </p>
                            <p>
                                That curiosity has driven me to actively self-learn and specialize in modern full-stack web technologies. I regularly build practical applications using Next.js, TypeScript, and Tailwind CSS, while integrating AI workflows and automation tools to solve real-world problems. For me, software must always solve tangible needs — from warehouse management systems like EcoFresh WMS to e-learning platforms like Ez Study and HiTOEIC, I strive for intuitive user experiences, clean design, and dependable performance.
                            </p>
                            <p>
                                My long-term goal is to grow as a Tech-driven Supply Chain Specialist — serving as a bridge between practical business logistics and cutting-edge software solutions. I maintain a continuous learning mindset and welcome any opportunity to connect, collaborate, and exchange ideas with developers, mentors, and industry peers!
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
