"use client";

import React from "react";
import { Link } from '@/components/ViewTransitions';
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Toast, useToast } from "@/components/Toast";
import { motion } from "framer-motion";

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const BlogIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { toast, showToast, hideToast } = useToast();

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const navItems: NavItem[] = [
    { label: language === "vi" ? "Tổng quan" : "Overview", icon: <HomeIcon />, href: "/" },
    { label: language === "vi" ? "Dự án" : "Projects", icon: <ProjectsIcon />, href: "/projects" },
    { label: language === "vi" ? "Bài viết" : "Blog", icon: <BlogIcon />, href: "/blog" },
    { label: language === "vi" ? "Liên hệ" : "Contact", icon: <ContactIcon />, href: "/contact" },
  ];

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed z-50 transition-all duration-300 ease-out flex flex-col justify-between
          glass-premium shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-y-auto
          lg:left-6 lg:top-1/2 lg:-translate-y-1/2 lg:w-48 lg:h-fit lg:rounded-2xl lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto
          ${isOpen
            ? "left-3 top-3 bottom-3 w-[260px] rounded-2xl opacity-100 translate-x-0 pointer-events-auto"
            : "-left-full top-3 bottom-3 w-[260px] rounded-2xl opacity-0 -translate-x-full pointer-events-none lg:left-6 lg:top-1/2 lg:-translate-y-1/2 lg:w-48 lg:h-fit lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto"
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Mobile header with close button */}
        <div className="lg:hidden px-4 pt-3.5 pb-1.5 flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-4 py-4 flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 z-10
                      ${active
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }
                    `}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNavHighlight"
                        className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    <span className={`transition-colors duration-200 ${active ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer controls: language toggle & download CV button */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
          <div className="flex flex-col bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-xl gap-1 relative border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setLanguage("vi")}
              className={`w-full relative flex items-center gap-3 py-2 px-3 text-xs font-bold rounded-lg transition-colors duration-200 z-10 ${
                language === "vi"
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {language === "vi" && (
                <motion.div
                  layoutId="activeLang"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Image 
                src="https://flagcdn.com/w20/vn.png" 
                alt="VN" 
                width={20} 
                height={14} 
                sizes="20px" 
                className="rounded-[2px] shrink-0 relative z-10" 
              />
              <span className="relative z-10">Tiếng Việt</span>
            </button>

            <button
              onClick={() => setLanguage("en")}
              className={`w-full relative flex items-center gap-3 py-2 px-3 text-xs font-bold rounded-lg transition-colors duration-200 z-10 ${
                language === "en"
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {language === "en" && (
                <motion.div
                  layoutId="activeLang"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Image 
                src="https://flagcdn.com/w20/us.png" 
                alt="US" 
                width={20} 
                height={14} 
                sizes="20px" 
                className="rounded-[2px] shrink-0 relative z-10" 
              />
              <span className="relative z-10">English</span>
            </button>
          </div>

          <button
            onClick={() => {
              showToast(
                language === "vi"
                  ? "Tài liệu CV hiện chưa khả dụng (đang cập nhật)..."
                  : "CV document is currently unavailable (updating)...",
                "info"
              );
            }}
            className="w-full px-3 py-2.5 text-xs font-semibold text-white dark:text-slate-900 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            aria-label="Download CV"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{language === "vi" ? "Tải CV" : "Download CV"}</span>
          </button>
        </div>
      </aside>

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
