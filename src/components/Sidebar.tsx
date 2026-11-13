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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.85} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.85} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const BlogIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.85} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.85} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed z-50 transition-all duration-300 ease-out flex flex-col
          bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl
          
          /* Desktop (lg+): Floating centered pill on the left - wider & bolder */
          lg:left-6 lg:top-1/2 lg:-translate-y-1/2 lg:w-60 lg:h-fit lg:rounded-3xl lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto lg:shadow-none lg:border-2 lg:border-slate-400 lg:dark:border-slate-600
          
          /* Mobile (<lg): Full-height slide-over drawer from the left */
          top-0 bottom-0 left-0 h-full w-[300px] sm:w-[330px] max-w-[85vw] border-r border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-y-auto
          ${isOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto"
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Mobile header */}
        <div className="lg:hidden p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Menu
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-3 sm:p-4 lg:p-3.5 flex-1 overflow-y-auto">
          <ul className="space-y-1.5 lg:space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={`
                      relative flex items-center gap-3.5 lg:gap-3 px-3.5 lg:px-3.5 py-3 lg:py-2.5 rounded-2xl transition-all duration-200 z-10
                      ${active
                        ? "text-slate-950 dark:text-white font-extrabold"
                        : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-bold hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                      }
                    `}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNavHighlight"
                        className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 shadow-2xs -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    <span className={`shrink-0 transition-colors duration-200 ${active ? "text-slate-950 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                      {item.icon}
                    </span>
                    <span className="text-[15px] sm:text-[16px] lg:text-[15px] font-bold tracking-tight">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer controls: language toggle & download CV button */}
        <div className="p-3.5 sm:p-4 lg:p-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 lg:gap-2.5 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="flex flex-col bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-2xl gap-1.5 lg:gap-1.5 relative border border-slate-300 dark:border-slate-600 shadow-2xs">
            <button
              onClick={() => setLanguage("vi")}
              className={`w-full relative flex items-center gap-3 py-2.5 lg:py-2 px-3.5 lg:px-3 rounded-xl transition-colors duration-200 z-10 cursor-pointer ${
                language === "vi"
                  ? "text-slate-950 dark:text-white font-extrabold"
                  : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white font-bold"
              }`}
            >
              {language === "vi" && (
                <motion.div
                  layoutId="activeLang"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-600 shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Image 
                src="/flags/vn.svg" 
                alt="VN" 
                width={22} 
                height={15} 
                unoptimized
                className="w-5.5 h-4 lg:w-5 lg:h-3.5 object-cover rounded-[2px] shrink-0 relative z-10 shadow-2xs" 
              />
              <span className="relative z-10 text-[14px] sm:text-sm lg:text-[13.5px] font-extrabold tracking-tight">Tiếng Việt</span>
            </button>

            <button
              onClick={() => setLanguage("en")}
              className={`w-full relative flex items-center gap-3 py-2.5 lg:py-2 px-3.5 lg:px-3 rounded-xl transition-colors duration-200 z-10 cursor-pointer ${
                language === "en"
                  ? "text-slate-950 dark:text-white font-extrabold"
                  : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white font-bold"
              }`}
            >
              {language === "en" && (
                <motion.div
                  layoutId="activeLang"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-600 shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Image 
                src="/flags/us.svg" 
                alt="US" 
                width={22} 
                height={15} 
                unoptimized
                className="w-5.5 h-4 lg:w-5 lg:h-3.5 object-cover rounded-[2px] shrink-0 relative z-10 shadow-2xs" 
              />
              <span className="relative z-10 text-[14px] sm:text-sm lg:text-[13.5px] font-extrabold tracking-tight">English</span>
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
            className="w-full px-4 lg:px-3.5 py-3 lg:py-2.5 text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 lg:gap-2 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            aria-label="Download CV"
          >
            <svg className="w-5 h-5 lg:w-4.5 lg:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-[14px] sm:text-sm lg:text-[13.5px] font-extrabold tracking-wide">{language === "vi" ? "Tải CV" : "Download CV"}</span>
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
