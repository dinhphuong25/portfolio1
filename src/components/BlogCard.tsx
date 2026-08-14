import Image from "next/image";
import { Link } from '@/components/ViewTransitions';
import { BlogPost } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    const { language } = useLanguage();
    const isVi = language === "vi";

    return (
        <article className={`group relative p-4 rounded-3xl bg-slate-50/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300 ease-out flex flex-col ${featured ? 'md:flex-row md:gap-8 md:items-center' : 'gap-4'}`}>
            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10 focus:outline-none rounded-3xl" aria-label={`Read ${post.title}`} />

            {/* Thumbnail */}
            <div className={`rounded-2xl overflow-hidden relative shadow-xs transition-all duration-500 group-hover:shadow-md ${featured ? 'w-full md:w-1/2 aspect-[16/9]' : 'w-full aspect-[16/10]'} bg-slate-100 dark:bg-slate-800`}>
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes={featured
                            ? "(max-width: 768px) 100vw, 50vw"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <span className="text-3xl">✍️</span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 shadow-2xs border border-slate-200/60 dark:border-slate-700/60">
                        {post.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className={`flex flex-col justify-between flex-1 space-y-3 ${featured ? 'w-full md:w-1/2 py-2' : ''}`}>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h3 className={`font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors tracking-tight leading-snug ${featured ? 'text-xl lg:text-2xl' : 'text-base'}`}>
                        {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3 font-normal text-justify">
                        {post.excerpt}
                    </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                    <span>{isVi ? "Đọc bài viết" : "Read Article"}</span>
                    <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </article>
    );
}
