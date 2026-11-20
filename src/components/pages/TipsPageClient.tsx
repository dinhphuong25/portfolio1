"use client";

import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { Clock } from "lucide-react";

export default function TipsPageClient() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 lg:pr-6 flex-1 flex flex-col">
      <Reveal direction="up" delay={100} className="w-full flex-1 flex flex-col">
        <div className="w-full flex-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-slate-400 dark:border-slate-600 p-8 sm:p-16 lg:p-20 text-center flex flex-col items-center justify-center min-h-[68vh] sm:min-h-[75vh] shadow-sm space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100/80 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800/80 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto text-3xl sm:text-4xl shadow-2xs">
            ✍️
          </div>

          {/* Texts */}
          <div className="space-y-3 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-bold tracking-wide border border-amber-300/80 dark:border-amber-800/60">
              <Clock className="w-3.5 h-3.5" />
              <span>{isVi ? "Nội dung đang được hoàn thiện" : "Content in progress"}</span>
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400 tracking-wider pt-0.5">
              Coming soon...
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
