"use client";

import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPageClient() {
    const { language } = useLanguage();
    const isVi = language === 'vi';

    const socialPlatforms = [
        {
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/kimdinhphuong/",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
            hoverClass: "hover:border-[#0A66C2]/40 text-slate-700 dark:text-slate-200 hover:text-[#0A66C2]",
        },
        {
            platform: "Instagram",
            url: "https://www.instagram.com/_kimdinhphuong/",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            hoverClass: "hover:border-[#E4405F]/40 text-slate-700 dark:text-slate-200 hover:text-[#E4405F]",
        },
        {
            platform: "TikTok",
            url: "https://www.tiktok.com/@kimdinhphuong_",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72V13.5c-1.4-.04-2.8.29-3.98 1.05-.88.58-1.46 1.49-1.62 2.53-.1.64.03 1.33.35 1.9.43.76 1.16 1.35 2.01 1.55 1.42.34 2.93-.16 3.86-1.25.59-.69.87-1.58.91-2.51.05-3.39.02-6.79.03-10.18.01-1.2.01-2.4-.01-3.6 0-.66.01-1.32.01-1.98Z" />
                </svg>
            ),
            hoverClass: "hover:border-black/40 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white",
        },
        {
            platform: "Zalo",
            url: "https://zalo.me/0903917400",
            icon: (
                <span className="font-extrabold text-[12px] tracking-tight">Zalo</span>
            ),
            hoverClass: "hover:border-[#0068FF]/40 text-slate-700 dark:text-slate-200 hover:text-[#0068FF]",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-3 sm:p-6 lg:p-8">
            {/* Unified Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    
                    {/* Left Column: Info & Connect */}
                    <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-800/40 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                        <div>
                            <Reveal direction="down" delay={100}>
                                <header className="mb-10">
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                                        {isVi ? "Hãy Kết Nối" : "Let's Connect"}
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed pr-2 font-normal">
                                        {isVi 
                                            ? "Tôi luôn sẵn lòng thảo luận về công việc hoặc các cơ hội hợp tác. Hãy liên hệ và cùng nhau tạo ra những điều tuyệt vời." 
                                            : "I'm always open to discussing work or partnership opportunities. Reach out and let's create something great together."}
                                    </p>
                                </header>
                            </Reveal>

                            {/* Contact info details */}
                            <div className="space-y-6">
                                <Reveal direction="left" delay={200}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 mt-1">
                                            <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0 pt-0.5">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Email</p>
                                            <a href={`mailto:${profileData.email}`} className="text-[15px] xl:text-base font-bold text-slate-900 dark:text-white hover:underline transition-colors block whitespace-nowrap tracking-tight">
                                                {profileData.email}
                                            </a>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal direction="left" delay={300}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 mt-1">
                                            <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                                                {isVi ? "Vị trí" : "Location"}
                                            </p>
                                            <p className="text-base font-bold text-slate-900 dark:text-white">
                                                {profileData.location.city}, {profileData.location.country}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                        
                        {/* Social Links Row (LinkedIn, Instagram, TikTok, Zalo) */}
                        <Reveal direction="up" delay={400}>
                            <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                                    {isVi ? "Theo dõi tôi" : "Follow Me"}
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {socialPlatforms.map((item) => (
                                        <a
                                            key={item.platform}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-2xs border border-slate-200/80 dark:border-slate-700 transition-all ${item.hoverClass} hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}
                                        >
                                            <div className="shrink-0 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <span className="text-xs font-bold truncate">{item.platform}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 sm:p-12 relative flex-1">
                        <Reveal delay={300} direction="right">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                {isVi ? "Gửi Tin Nhắn" : "Send a Message"}
                                <span className="inline-block w-8 h-0.5 bg-slate-900 dark:bg-white ml-2"></span>
                            </h2>
                            
                            <ContactForm />
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
