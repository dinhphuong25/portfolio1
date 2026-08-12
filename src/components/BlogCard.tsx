import Image from "next/image";
import { Link } from '@/components/ViewTransitions';
import { BlogPost } from "@/data/posts";

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <article className={`group relative p-4 rounded-3xl hover:bg-white/50 border border-transparent hover:border-white/60 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 ease-out flex flex-col ${featured ? 'md:flex-row md:gap-8 md:items-center' : 'gap-4'}`}>
            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10 focus:outline-none rounded-3xl" aria-label={`Read ${post.title}`} />

            {/* Thumbnail */}
            <div className={`rounded-2xl overflow-hidden relative shadow-sm transition-all duration-500 group-hover:shadow-lg ${featured ? 'w-full md:w-1/2 aspect-[16/9]' : 'w-full aspect-[4/3]'} bg-slate-100`}>
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4="
                        sizes={featured
                            ? "(max-width: 768px) 100vw, 50vw"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                        <span className="text-4xl">✍️</span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
                        {post.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className={`space-y-3 ${featured ? 'w-full md:w-1/2 py-2' : ''}`}>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                <h3 className={`font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                    {post.title}
                </h3>

                <p className="text-slate-600 text-[15px] leading-relaxed line-clamp-3 font-medium">
                    {post.excerpt}
                </p>

                <div className="pt-2 flex items-center text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0">
                    Read Article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </article>
    );
}
