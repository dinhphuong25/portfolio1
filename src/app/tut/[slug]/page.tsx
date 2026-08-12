import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTutorialBySlug, tutorials } from '@/data/tutorials';
import TutDetailClient from '@/components/pages/TutDetailClient';

export async function generateStaticParams() {
    return tutorials.map((tutorial) => ({
        slug: tutorial.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tutorial = getTutorialBySlug(slug);

    if (!tutorial) {
        return {
            title: 'Tutorial Not Found',
            description: 'The tutorial content you are looking for does not exist.',
        };
    }

    const ogImage = `/tut/${tutorial.slug}/opengraph-image`;
    const twitterImage = `/tut/${tutorial.slug}/twitter-image`;

    return {
        title: tutorial.title,
        description: tutorial.description,
        alternates: {
            canonical: `/tut/${tutorial.slug}`,
        },
        openGraph: {
            title: `${tutorial.title} | Kim Đình Phương`,
            description: tutorial.description,
            url: `/tut/${tutorial.slug}`,
            type: 'article',
            images: [ogImage],
        },
        twitter: {
            title: `${tutorial.title} | Kim Đình Phương`,
            description: tutorial.description,
            images: [twitterImage],
        },
    };
}

export default async function TutorialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tutorial = getTutorialBySlug(slug);

    if (!tutorial) {
        notFound();
    }

    const isVideo = tutorial.type === 'video';
    const datePublished = new Date(tutorial.date).toISOString();

    const jsonLd = isVideo
        ? {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: tutorial.title,
            description: tutorial.description,
            thumbnailUrl: [tutorial.thumbnail || "https://kimdinhphuong.dev/opengraph-image"],
            uploadDate: datePublished,
            embedUrl: tutorial.videoUrl || `https://kimdinhphuong.dev/tut/${tutorial.slug}`,
            url: `https://kimdinhphuong.dev/tut/${tutorial.slug}`,
            author: {
                "@type": "Person",
                name: "Kim Đình Phương",
            },
        }
        : {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: tutorial.title,
            description: tutorial.description,
            datePublished,
            dateModified: datePublished,
            image: [tutorial.thumbnail || "https://kimdinhphuong.dev/opengraph-image"],
            mainEntityOfPage: `https://kimdinhphuong.dev/tut/${tutorial.slug}`,
            author: {
                "@type": "Person",
                name: "Kim Đình Phương",
            },
        };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TutDetailClient slug={slug} />
        </>
    );
}
