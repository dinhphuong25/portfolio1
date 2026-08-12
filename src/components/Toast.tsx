"use client";

import { useState, useEffect, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    title?: string;
    message: string;
    type: ToastType;
    onClose: () => void;
    duration?: number;
}

export function Toast({ title, message, type, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const tone = {
        success: {
            container: "bg-white border-slate-200/70",
            iconWrap: "bg-indigo-50 text-indigo-600",
            title: "text-slate-900",
            message: "text-slate-600",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ),
        },
        error: {
            container: "bg-white border-slate-200/70",
            iconWrap: "bg-rose-50 text-rose-600",
            title: "text-red-900",
            message: "text-slate-600",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        info: {
            container: "bg-white border-slate-200/70",
            iconWrap: "bg-slate-100 text-slate-600",
            title: "text-slate-900",
            message: "text-slate-600",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    }[type];

    const toastTitle = title ?? {
        success: "Message sent",
        error: "Send failed",
        info: "Notification",
    }[type];

    return (
        <div
            className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[420px] z-50 rounded-[1.25rem] border ring-1 ring-slate-200/60 shadow-sm ${tone.container} animate-fade-in-up`}
            role="alert"
            aria-live={type === "error" ? "assertive" : "polite"}
        >
            <div className="flex items-start gap-3 p-4">
                <div className={`mt-0.5 shrink-0 rounded-xl p-2 ${tone.iconWrap}`}>
                    {tone.icon}
                </div>

                <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${tone.title}`}>{toastTitle}</p>
                    <p className={`mt-1 text-sm leading-relaxed ${tone.message}`}>{message}</p>
                </div>

                <button
                    onClick={onClose}
                    className="shrink-0 rounded-lg p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    aria-label="Close notification"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

interface ToastState {
    message: string;
    type: ToastType;
    id: number;
}

export function useToast() {
    const [toast, setToast] = useState<ToastState | null>(null);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        setToast({ message, type, id: Date.now() });
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    return { toast, showToast, hideToast };
}
