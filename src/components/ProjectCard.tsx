import Image from "next/image";
import { Link } from '@/components/ViewTransitions';
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    showCaseStudyButton?: boolean;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
            className="group relative card-hover rounded-2xl bg-white border border-slate-100 overflow-hidden elevation-sm hover:elevation-xl"
        >
            <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10 focus:outline-none" aria-label={`View ${project.title}`} />

            {/* Thumbnail - Larger aspect ratio for product focus */}
            <div 
                className="aspect-[16/10] w-full overflow-hidden relative bg-slate-50 flex items-center justify-center border-b border-slate-100"
            >
                {project.thumbnail ? (
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4="
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ viewTransitionName: `project-image-${project.id}` }}
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 group-hover:bg-slate-100/80 transition-colors duration-500">
                        {/* Simple soft icon placeholder representing the project */}
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-indigo-500 transition-all duration-500 mb-3">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">
                            {project.tags[0] || 'Project View'}
                        </span>
                    </div>
                )}
            </div>

            {/* Content - Clean information hierarchy */}
            <div className="p-6 space-y-4">
                {/* Header */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="font-medium text-slate-700">{project.role}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-500">{project.year}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {project.summary}
                </p>

                {/* Tags - Minimal outlined pills */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="px-3 py-1 text-xs font-medium text-slate-400 bg-slate-50 rounded-full">
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
