import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";
import ProjectDetailClient from "@/components/pages/ProjectDetailClient";

interface ProjectDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "Dự án bạn đang tìm không tồn tại.",
        };
    }

    const ogImage = `/projects/${project.id}/opengraph-image`;
    const twitterImage = `/projects/${project.id}/twitter-image`;

    return {
        title: project.title,
        description: project.summary,
        alternates: {
            canonical: `/projects/${project.id}`,
        },
        openGraph: {
            title: `${project.title} | Kim Đình Phương`,
            description: project.summary,
            url: `/projects/${project.id}`,
            type: "article",
            images: [ogImage],
        },
        twitter: {
            title: `${project.title} | Kim Đình Phương`,
            description: project.summary,
            images: [twitterImage],
        },
    };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url: `https://kimdinhphuong.dev/projects/${project.id}`,
        image: project.thumbnail || "https://kimdinhphuong.dev/opengraph-image",
        datePublished: `${project.year}-01-01`,
        creator: {
            "@type": "Person",
            name: "Kim Đình Phương",
        },
        keywords: project.tags.join(", "),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProjectDetailClient id={id} />
        </>
    );
}
