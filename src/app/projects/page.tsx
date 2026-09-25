import type { Metadata } from "next";
import ProjectsClient from "@/components/pages/ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description: "A curated list of Kim Đình Phương's featured projects in web development, logistics, and supply chain.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: "Projects | Kim Đình Phương",
        description: "Explore featured case studies and projects in logistics and digital products.",
        url: "/projects",
        images: ["/opengraph-image"],
    },
};

export default function ProjectsPage() {
    return (
        <>
            <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6 lg:pr-6">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-400 dark:border-slate-600 p-6 sm:p-10">
                    <ProjectsClient />
                </div>
            </div>
        </>
    );
}
