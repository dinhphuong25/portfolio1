"use client";

import { useState, FormEvent } from "react";
import { Toast, useToast } from "./Toast";
import { useLanguage } from "@/context/LanguageContext";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactForm() {
    const { language } = useLanguage();
    const isVi = language === "vi";
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast, showToast, hideToast } = useToast();

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = isVi ? "Vui lòng nhập họ và tên" : "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = isVi ? "Vui lòng nhập địa chỉ email" : "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = isVi ? "Email không đúng định dạng" : "Please enter a valid email address";
        }

        if (!formData.message.trim()) {
            newErrors.message = isVi ? "Vui lòng nhập nội dung tin nhắn" : "Message is required";
        } else if (formData.message.trim().length < 15) {
            newErrors.message = isVi ? "Nội dung cần tối thiểu 15 ký tự" : "Message should be at least 15 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, language }),
            });

            const data = (await response.json()) as { message?: string; error?: string };

            if (response.ok) {
                showToast(
                    data.message || (isVi 
                        ? "Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi lại bạn sớm." 
                        : "Message sent successfully! I will reply to you soon."),
                    "success"
                );
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
                setErrors({});
            } else {
                showToast(data.error || (isVi ? "Đã xảy ra lỗi. Vui lòng thử lại." : "An error occurred. Please try again."), "error");
            }
        } catch {
            showToast(isVi ? "Không thể kết nối đến máy chủ. Vui lòng thử lại sau." : "Unable to reach server. Please try again later.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* 2 Columns: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name field */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                            {isVi ? "Họ và tên" : "Your Name"} <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-800/60 border text-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:bg-white dark:focus:bg-slate-850 transition-all placeholder:text-slate-400 ${
                                errors.name ? "border-rose-400 bg-rose-50/40" : "border-slate-200 dark:border-slate-700/80"
                            }`}
                            placeholder={isVi ? "VD: Nguyễn Văn A" : "e.g. Alex Morgan"}
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email field */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                            {isVi ? "Địa chỉ Email" : "Email Address"} <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-800/60 border text-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:bg-white dark:focus:bg-slate-850 transition-all placeholder:text-slate-400 ${
                                errors.email ? "border-rose-400 bg-rose-50/40" : "border-slate-200 dark:border-slate-700/80"
                            }`}
                            placeholder="you@company.com"
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                {/* Message textarea */}
                <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        {isVi ? "Nội dung tin nhắn" : "Your Message"} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-800/60 border text-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:bg-white dark:focus:bg-slate-850 transition-all resize-none placeholder:text-slate-400 ${
                            errors.message ? "border-rose-400 bg-rose-50/40" : "border-slate-200 dark:border-slate-700/80"
                        }`}
                        placeholder={isVi ? "Hãy chia sẻ về dự án, bài toán hoặc ý tưởng bạn muốn thảo luận..." : "Tell me about your project, idea, or questions..."}
                        aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block">
                        {isVi ? "Thông tin được gửi bảo mật & trả lời nhanh." : "Protected & fast response."}
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-semibold text-xs rounded-xl shadow-xs transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>{isVi ? "Đang gửi..." : "Sending..."}</span>
                            </>
                        ) : (
                            <>
                                <span>{isVi ? "Gửi tin nhắn" : "Send Message"}</span>
                                <Send className="w-3.5 h-3.5" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </>
    );
}
