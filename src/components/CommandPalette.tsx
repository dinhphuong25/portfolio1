"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  Download,
  Globe,
  BookOpen,
  Sun,
  Moon,
  Copy
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { Toast, useToast } from "@/components/Toast";

type CommandItem = {
  id: string;
  icon: React.ReactNode;
  label: Record<"vi" | "en", string>;
  action: () => void;
  section: "navigate" | "action" | "social";
  shortcut?: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast, showToast, hideToast } = useToast();

  const isDark = theme === "dark";

  const commands: CommandItem[] = [
    // NAVIGATION
    {
      id: "home",
      icon: <Home size={18} />,
      label: { vi: "Trang chủ", en: "Home" },
      action: () => router.push("/"),
      section: "navigate",
      shortcut: "G H"
    },
    {
      id: "about",
      icon: <User size={18} />,
      label: { vi: "Thông tin & Tiểu sử", en: "About & Bio" },
      action: () => router.push("/about"),
      section: "navigate",
      shortcut: "G A"
    },
    {
      id: "projects",
      icon: <Briefcase size={18} />,
      label: { vi: "Dự án", en: "Projects" },
      action: () => router.push("/projects"),
      section: "navigate",
      shortcut: "G P"
    },
    {
      id: "blog",
      icon: <FileText size={18} />,
      label: { vi: "Bài viết", en: "Blog" },
      action: () => router.push("/blog"),
      section: "navigate",
      shortcut: "G B"
    },
    {
      id: "contact",
      icon: <Mail size={18} />,
      label: { vi: "Liên hệ", en: "Contact" },
      action: () => router.push("/contact"),
      section: "navigate",
      shortcut: "G C"
    },

    // ACTIONS
    {
      id: "theme",
      icon: isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-500" />,
      label: {
        vi: isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối",
        en: isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
      },
      action: () => setTheme(isDark ? "light" : "dark"),
      section: "action",
      shortcut: "T T"
    },
    {
      id: "email",
      icon: <Copy size={18} />,
      label: { vi: "Sao chép địa chỉ Email", en: "Copy Email Address" },
      action: () => {
        navigator.clipboard.writeText("hi@dinhphuong.tech");
        showToast(
          language === "vi" ? "Đã sao chép địa chỉ Email!" : "Email address copied to clipboard!",
          "success"
        );
      },
      section: "action",
      shortcut: "C E"
    },
    {
      id: "cv",
      icon: <Download size={18} />,
      label: { vi: "Tải CV", en: "Download CV" },
      action: () => {
        showToast(
          language === "vi"
            ? "Tài liệu CV hiện chưa khả dụng (đang cập nhật)..."
            : "CV document is currently unavailable (updating)...",
          "info"
        );
      },
      section: "action",
      shortcut: "D C"
    },
    {
      id: "lang",
      icon: <Globe size={18} />,
      label: { vi: "Switch to English", en: "Đổi sang Tiếng Việt" },
      action: () => setLanguage(language === "vi" ? "en" : "vi"),
      section: "action",
      shortcut: "L L"
    },

    // SOCIALS
    {
      id: "facebook",
      icon: (
        <svg className="w-[18px] h-[18px] text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      label: { vi: "Theo dõi tôi trên Facebook", en: "Follow me on Facebook" },
      action: () => {
        window.open("https://www.facebook.com/dinhphuongkim250705/", "_blank");
      },
      section: "social"
    },
    {
      id: "linkedin",
      icon: (
        <svg className="w-[18px] h-[18px] text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: { vi: "Kết nối trên LinkedIn", en: "Connect on LinkedIn" },
      action: () => {
        window.open("https://www.linkedin.com/in/dinhphuongkim/", "_blank");
      },
      section: "social"
    },
    {
      id: "github",
      icon: (
        <svg className="w-[18px] h-[18px] text-slate-800 dark:text-slate-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      label: { vi: "Ghé thăm GitHub profile", en: "Visit GitHub Profile" },
      action: () => {
        window.open("https://github.com/kimdinhphuong", "_blank");
      },
      section: "social"
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label[language as "vi" | "en"].toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle keyboard navigation within the palette
  useEffect(() => {
    if (!isOpen) return;

    const handlePaletteKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
          }
          break;
      }
    };

    document.addEventListener("keydown", handlePaletteKeydown);
    return () => document.removeEventListener("keydown", handlePaletteKeydown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const sections = {
    navigate: language === "vi" ? "ĐIỀU HƯỚNG" : "NAVIGATION",
    action: language === "vi" ? "HÀNH ĐỘNG" : "ACTIONS",
    social: language === "vi" ? "LIÊN KẾT MẠNG XÃ HỘI" : "SOCIAL LINKS"
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999]"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] pointer-events-none px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 pointer-events-auto"
              >
                {/* Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800">
                  <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={language === "vi" ? "Tìm kiếm trang hoặc lệnh..." : "Search pages or commands..."}
                    className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400 text-lg"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                  />
                  <div className="flex gap-1 ml-3 shrink-0">
                    <kbd className="px-2 py-1 text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-md">ESC</kbd>
                  </div>
                </div>

                {/* Results List */}
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {filteredCommands.length === 0 ? (
                    <div className="py-10 text-center text-slate-500 text-sm">
                      {language === "vi" ? "Không tìm thấy kết quả." : "No results found."}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(sections).map(([sectionKey, sectionTitle]) => {
                        const sectionCmds = filteredCommands.filter((c) => c.section === sectionKey);
                        if (sectionCmds.length === 0) return null;

                        return (
                          <div key={sectionKey} className="space-y-1">
                            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                              {sectionTitle}
                            </div>
                            {sectionCmds.map((cmd) => {
                              const flatIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                              const isSelected = flatIndex === selectedIndex;
                              return (
                                <div
                                  key={cmd.id}
                                  className={`flex items-center px-4 py-3 rounded-xl cursor-default transition-colors ${
                                    isSelected
                                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400"
                                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                  }`}
                                  onMouseEnter={() => setSelectedIndex(flatIndex)}
                                  onClick={() => {
                                    cmd.action();
                                    setIsOpen(false);
                                  }}
                                >
                                  <div className={`mr-3 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`}>
                                    {cmd.icon}
                                  </div>
                                  <span className="font-medium text-sm">
                                    {cmd.label[language as "vi" | "en"]}
                                  </span>

                                  {cmd.shortcut && (
                                    <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-600 font-mono hidden sm:inline-block">
                                      {cmd.shortcut}
                                    </span>
                                  )}

                                  {isSelected && (
                                    <span className="ml-2 sm:ml-4 flex items-center gap-1 text-[10px] text-indigo-400">
                                      <kbd className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50">↵</kbd>
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Portal */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
}
