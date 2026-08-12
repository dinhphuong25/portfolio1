"use client";

import { useState, FormEvent } from "react";
import { Toast, useToast } from "./Toast";
import { useLanguage } from "@/context/LanguageContext";

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
    const isVi = language === 'vi';
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
            newErrors.name = isVi ? "Tên là bắt buộc" : "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = isVi ? "Email là bắt buộc" : "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = isVi ? "Vui lòng nhập địa chỉ email hợp lệ" : "Please enter a valid email address";
        }

        if (!formData.message.trim()) {
            newErrors.message = isVi ? "Tin nhắn là bắt buộc" : "Message is required";
        } else if (formData.message.trim().length < 20) {
            newErrors.message = isVi ? "Tin nhắn phải có ít nhất 20 ký tự" : "Message should be at least 20 characters";
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
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                showToast(
                    data.message || (isVi ? "Tin nhắn của bạn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất có thể." : "Your message has been sent successfully! I will get back to you as soon as possible."),
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
            showToast(isVi ? "Không thể gửi tin nhắn ngay bây giờ. Vui lòng thử lại sau." : "Unable to send your message right now. Please try again later.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                        {isVi ? "Tên" : "Name"} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400 ${errors.name ? "border-red-300 bg-red-50" : "border-slate-200"
                            }`}
                        placeholder={isVi ? "Tên của bạn" : "Your name"}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        {isVi ? "Email" : "Email"} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400 ${errors.email ? "border-red-300 bg-red-50" : "border-slate-200"
                            }`}
                        placeholder={isVi ? "you@example.com" : "you@example.com"}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Message textarea */}
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                        {isVi ? "Tin nhắn" : "Message"} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all resize-none placeholder:text-slate-400 ${errors.message ? "border-red-300 bg-red-50" : "border-slate-200"
                            }`}
                        placeholder={isVi ? "Kể cho tôi nghe về dự án của bạn..." : "Tell me about your project..."}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                        <p id="message-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 group mt-4"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            {isVi ? "Đang gửi..." : "Sending..."}
                        </>
                    ) : (
                        <>
                            {isVi ? "Gửi tin nhắn" : "Send Message"}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </>
                    )}
                </button>
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
