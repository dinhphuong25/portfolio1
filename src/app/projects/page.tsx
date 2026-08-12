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
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm ring-1 ring-slate-200/60 p-6 sm:p-10">
                    <ProjectsClient />
                </div>
            </div>
        </>
    );
}
