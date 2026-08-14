"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";
import Image from "next/image";

interface Testimonial {
  name: string;
  roleEn: string;
  roleVi: string;
  contentEn: string;
  contentVi: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "ThS. Nguyễn Hoàng Nam",
    roleEn: "Logistics Lecturer, CTUT",
    roleVi: "Giảng viên chuyên ngành Logistics, CTUT",
    contentEn: "Phuong shows exceptional dedication in class, particularly when working on logistics simulations and routing algorithms. He has a solid foundation in supply chain analysis.",
    contentVi: "Phương thể hiện tư duy cẩn thận và tính logic rất tốt trong các bài tập mô phỏng logistics và tối ưu hóa tuyến đường. Rất chủ động học hỏi và tìm tòi giải pháp mới.",
    rating: 5,
    avatar: "/avatar_lecturer.png",
  },
  {
    name: "Trần Minh Triết",
    roleEn: "Project Partner & Tech Lead",
    roleVi: "Đồng nghiệp / Bạn học dự án WMS",
    contentEn: "Working with Phuong on our WMS case study was great. He handled the data mapping and analytics side perfectly using Power BI and web tools, turning complex data into clear insights.",
    contentVi: "Làm việc nhóm cùng Phương trong dự án WMS rất an tâm. Bạn ấy thiết kế luồng dữ liệu và trực quan hóa báo cáo rất chi tiết, trực quan và dễ ứng dụng.",
    rating: 5,
    avatar: "/avatar_student_male.png",
  },
  {
    name: "Lê Thị Bảo Trâm",
    roleEn: "Supply Chain Club President",
    roleVi: "Trưởng CLB Supply Chain CTUT",
    contentEn: "Phuong is a proactive member of our student club. He contributed greatly to organizing our logistics workshops and has strong project coordination skills.",
    contentVi: "Phương là một thành viên rất năng nổ tại CLB. Bạn ấy luôn sẵn sàng hỗ trợ tổ chức các buổi workshop chia sẻ kinh nghiệm thực tế về chuỗi cung ứng với các khóa dưới.",
    rating: 5,
    avatar: "/avatar_student_female.png",
  },
];

export default function TestimonialsSection() {
  const { language } = useLanguage();

  return (
    <section className="px-6 sm:px-10 lg:px-14 py-8 border-t border-slate-100 dark:border-slate-800" aria-labelledby="testimonials-heading">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-4 rounded-full bg-slate-900 dark:bg-white inline-block" />
        <h2 id="testimonials-heading" className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
          {language === "vi" ? "ĐÁNH GIÁ TỪ ĐỒNG NGHIỆP" : "PEER TESTIMONIALS"}
        </h2>
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, index) => {
          return (
            <Reveal direction="up" delay={index * 120 + 80} key={t.name}>
              <div className="h-full bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between relative group">
                
                <div className="space-y-3.5">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote Content */}
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal text-justify">
                    "{language === "vi" ? t.contentVi : t.contentEn}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      unoptimized
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                      {language === "vi" ? t.roleVi : t.roleEn}
                    </p>
                  </div>
                </div>

              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
