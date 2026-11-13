"use client";

import Image from "next/image";
import Link from "next/link";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Reveal from "@/components/Reveal";
import { getPostBySlug, BlogPost } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import { Cpu, ExternalLink, Clock, Calendar } from "lucide-react";

export default function BlogPostClient({
  slug,
  initialPost,
}: {
  slug: string;
  initialPost?: BlogPost;
}) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const staticPost = getPostBySlug(slug, isVi ? "vi" : "en");
  const post = staticPost
    ? {
        ...staticPost,
        views: initialPost?.views ?? staticPost.views,
      }
    : initialPost;

  if (!post) {
    notFound();
  }

  if (post.isPublished === false) {
    return (
      <div className="max-w-5xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl sm:rounded-3xl border border-slate-400 dark:border-slate-600 p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xs border border-slate-200/60 dark:border-slate-700/60 text-3xl">
            ✍️
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {isVi ? "Bài viết đang được viết, hiện chưa công bố" : "Article In Progress"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {isVi
                ? "Bài viết này đang trong quá trình biên soạn và chưa được phát hành chính thức. Rất mong bạn quay lại sau!"
                : "This article is currently under composition and has not been published yet. Please check back later!"}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md hover:-translate-y-0.5 transition-all"
          >
            ← {isVi ? "Quay lại danh sách Bài viết" : "Back to Blog Articles"}
          </Link>
        </div>
      </div>
    );
  }

  const isCurated = post.sourceType === "curated" || Boolean(post.sourceName);

  return (
    <>
      <ReadingProgressBar />
      <div className="max-w-5xl mx-auto p-3 sm:p-4 lg:p-6 lg:pr-6">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-slate-400 dark:border-slate-600 overflow-hidden shadow-sm">
          <Reveal direction="up" delay={100}>
            <article>
              {/* Standard Header */}
              <div className="px-6 sm:px-10 lg:px-14 pt-8 sm:pt-10 lg:pt-12 pb-8 border-b border-slate-100 dark:border-slate-800/80">
                {/* Back Link */}
                <Link
                  href="/blog"
                  className="inline-flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors group"
                >
                  <svg
                    className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  {isVi ? "Quay lại danh sách Bài viết" : "Back to Articles"}
                </Link>

                <div className="max-w-4xl space-y-4">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>

                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-justify">
                    {post.excerpt}
                  </p>

                  {/* Attribution Banner for Curated Articles */}
                  {isCurated && (
                    <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900 dark:text-blue-200">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          {isVi
                            ? "Nội dung được tổng hợp, phân tích và biên soạn bằng AI từ nguồn chính thức: "
                            : "Content curated, analyzed, and compiled by AI from official source: "}
                          <strong>{post.sourceName || (isVi ? "Đầu báo uy tín" : "Trusted publisher")}</strong>
                        </span>
                      </div>
                      {post.sourceUrl && (
                        <a
                          href={post.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                        >
                          <span>{isVi ? "Xem bài gốc" : "View original"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              {post.image && (
                <div className="px-6 sm:px-10 lg:px-14 py-8 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="rounded-2xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 relative aspect-[16/9]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="px-6 sm:px-10 lg:px-14 py-8 sm:py-12">
                <div className="prose dark:prose-invert max-w-3xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-justify [&_p]:text-justify [&_li]:text-justify [&_div]:text-justify">
                  {post.content ? (
                    <MDXContent content={post.content} />
                  ) : (
                    <p className="text-slate-500 italic text-center">
                      {isVi
                        ? "Nội dung bài viết đang được cập nhật..."
                        : "Content for this article is coming soon..."}
                    </p>
                  )}
                </div>

                {/* Minimalist Author Box */}
                <div className="mt-14 max-w-3xl mx-auto">
                  <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 shadow-xs">
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed text-left font-normal">
                      {isVi
                        ? "Một blog nho nhỏ lưu giữ những trải nghiệm, suy tư và hành trình học hỏi, ứng dụng công nghệ vào thực tiễn cuộc sống."
                        : "A small personal blog documenting experiences, reflections, and journeys of learning and applying technology to life."}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </>
  );
}
