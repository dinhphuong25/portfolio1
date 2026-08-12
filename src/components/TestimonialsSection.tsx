"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

interface Testimonial {
  name: string;
  roleEn: string;
  roleVi: string;
  contentEn: string;
  contentVi: string;
  rating: number;
  gradient: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Nguyen Van A",
    roleEn: "Logistics Lecturer, CTUT",
    roleVi: "Giảng viên chuyên ngành Logistics, CTUT",
    contentEn: "Phuong shows exceptional dedication in class, particularly when working on logistics simulations and routing algorithms. He's got a bright future in supply chain analysis.",
    contentVi: "Phương thể hiện sự cẩn thận và tư duy logic rất tốt trong các bài tập mô phỏng logistics và tối ưu hóa tuyến đường. Rất chủ động học hỏi và tìm tòi cái mới.",
    rating: 5,
    gradient: "from-indigo-500 to-purple-500",
    avatar: "/avatar_lecturer.png",
  },
  {
    name: "Tran Minh B",
    roleEn: "Classmate / Project Partner",
    roleVi: "Bạn học / Đồng nghiệp dự án",
    contentEn: "Working with Phuong on our WMS case study was great. He handled the data mapping and analytics side perfectly using Power BI, turning complex data into clear insights.",
    contentVi: "Làm việc nhóm cùng Phương trong dự án WMS rất an tâm. Bạn ấy thiết kế luồng dữ liệu và trực quan hóa báo cáo trên Power BI rất chi tiết và dễ hiểu.",
    rating: 5,
    gradient: "from-cyan-500 to-blue-500",
    avatar: "/avatar_student_male.png",
  },
  {
    name: "Le Thi C",
    roleEn: "Supply Chain Club President",
    roleVi: "Trưởng CLB Supply Chain",
    contentEn: "Phuong is a proactive member of our student club. He contributed greatly to organizing our logistics workshops and has strong project coordination skills.",
    contentVi: "Phương là một thành viên rất năng nổ tại CLB. Luôn sẵn sàng hỗ trợ tổ chức các buổi workshop chia sẻ kinh nghiệm thực tế về chuỗi cung ứng với các khóa dưới.",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
    avatar: "/avatar_student_female.png",
  },
];

export default function TestimonialsSection() {
  const { language } = useLanguage();

  return (
    <section className="px-6 sm:px-10 lg:px-14 py-8 border-t border-slate-100" aria-labelledby="testimonials-heading">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1 h-4 rounded-full bg-indigo-500 inline-block" />
        <h2 id="testimonials-heading" className="text-xs font-bold text-slate-500 tracking-[0.15em] uppercase">
          {language === "vi" ? "Đánh Giá từ Đồng Nghiệp" : "Peer Testimonials"}
        </h2>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, index) => {
          const initials = t.name
            .split(" ")
            .filter((n) => n !== "Dr.")
            .map((n) => n[0])
            .join("")
            .slice(-2)
            .toUpperCase();

          return (
            <Reveal direction="up" delay={index * 150 + 100} key={t.name}>
              <div className="h-full bg-slate-50/50 hover:bg-white dark:bg-slate-900/30 dark:hover:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 flex flex-col justify-between relative group">
                
                {/* Quote Icon Background */}
                <span className="absolute top-4 right-6 text-6xl text-slate-200/50 dark:text-slate-800/40 font-serif pointer-events-none select-none">
                  “
                </span>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote Content */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium italic relative z-10">
                    "{language === "vi" ? t.contentVi : t.contentEn}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-100/80 dark:border-slate-800/50">
                  {/* Initials or Image Avatar */}
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    {t.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                        {initials}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">
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
