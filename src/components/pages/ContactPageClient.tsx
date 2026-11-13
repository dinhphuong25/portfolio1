"use client";

import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Clock, ArrowUpRight, MessageSquare, Check, Copy } from "lucide-react";
import { useState } from "react";

export default function ContactPageClient() {
    const { language } = useLanguage();
    const isVi = language === "vi";
    const [copied, setCopied] = useState(false);

    const email = "contact@dinhphuong.dev";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const directChannels = [
        {
            icon: <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Email trực tiếp" : "Direct Email",
            value: email,
            action: (
                <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title={isVi ? "Sao chép email" : "Copy email"}
                    aria-label="Copy email"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            ),
            href: `mailto:${email}`,
        },
        {
            icon: <MapPin className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Địa điểm & Múi giờ" : "Location & Timezone",
            value: isVi ? "Cần Thơ, Việt Nam (GMT+7)" : "Can Tho, Vietnam (GMT+7)",
        },
        {
            icon: <Clock className="w-4 h-4 text-slate-700 dark:text-slate-300" />,
            label: isVi ? "Thời gian phản hồi" : "Response Time",
            value: isVi ? "Thường trong vòng 24 giờ" : "Usually within 24 hours",
        },
    ];

    const socialLinks = [
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/kimdinhphuong/",
            desc: "in/kimdinhphuong",
        },
        {
            name: "GitHub",
            href: "https://github.com/kimdinhphuong",
            desc: "@kimdinhphuong",
        },
        {
            name: "Zalo",
            href: "https://zalo.me/0903917400",
            desc: "0903 917 400",
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 lg:pr-6 flex-1 flex flex-col">
            <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-slate-400 dark:border-slate-600 p-6 sm:p-10 lg:p-12 shadow-sm">
                {/* Header Tag */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
                    <h1 className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                        {isVi ? "LIÊN HỆ & KẾT NỐI" : "CONTACT & GET IN TOUCH"}
                    </h1>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                </div>

                {/* 2-Column Clean Web Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Context & Channels */}
                    <div className="lg:col-span-5 space-y-6">
                        <Reveal direction="up" delay={50}>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                                    {isVi ? "Hãy cùng trao đổi" : "Let's Start a Conversation"}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                                    {isVi
                                        ? "Tôi luôn sẵn lòng lắng nghe và trao đổi về các bài toán vận hành chuỗi cung ứng, dự án web hoặc cơ hội hợp tác mới. Bạn có thể gửi biểu mẫu bên cạnh hoặc liên hệ trực tiếp qua các kênh dưới đây."
                                        : "I am always keen to discuss supply chain challenges, web development projects, or new professional opportunities. Feel free to use the form or reach out through my direct channels below."}
                                </p>
                            </div>
                        </Reveal>

                        {/* Direct Channel Cards */}
                        <Reveal direction="up" delay={100}>
                            <div className="space-y-2.5">
                                {directChannels.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shrink-0 text-slate-700 dark:text-slate-300 shadow-2xs">
                                                {item.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                                                    {item.label}
                                                </span>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-xs font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                                                        {item.value}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {item.action && (
                                            <div className="shrink-0">{item.action}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* Social / Direct Links */}
                        <Reveal direction="up" delay={150}>
                            <div className="pt-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
                                    {isVi ? "Kênh kết nối khác" : "Other Channels"}
                                </span>
                                <div className="grid grid-cols-3 gap-2.5">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 flex flex-col justify-center transition-all hover:-translate-y-0.5 shadow-2xs group"
                                        >
                                            <span className="text-xs font-bold flex items-center justify-between">
                                                {social.name}
                                                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                                            </span>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                                                {social.desc}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7 bg-slate-50/50 dark:bg-slate-850/40 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                        <Reveal direction="up" delay={100}>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                                    <span>{isVi ? "Gửi tin nhắn trực tiếp" : "Send a Direct Message"}</span>
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {isVi
                                        ? "Tôi sẽ nhận được thông báo ngay lập tức và phản hồi lại bạn."
                                        : "I will receive an instant notification and respond promptly."}
                                </p>
                            </div>

                            <ContactForm />
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
