"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        className="w-full px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg flex items-center justify-center gap-1.5 opacity-50"
        aria-label="Toggle Dark Mode placeholder"
      >
        <span className="w-4 h-4" />
        <span>Loading...</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        w-full px-3 py-2 text-xs font-semibold rounded-lg transition-all 
        flex items-center justify-center gap-1.5 group
        ${isDark 
          ? "bg-slate-800 text-slate-200 hover:bg-slate-700 ring-1 ring-slate-700" 
          : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 ring-1 ring-slate-200/50"
        }
      `}
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
          <span>{language === "vi" ? "Giao diện Sáng" : "Light Mode"}</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
          <span>{language === "vi" ? "Giao diện Tối" : "Dark Mode"}</span>
        </>
      )}
    </button>
  );
}
