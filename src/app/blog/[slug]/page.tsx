import type { Metadata } from "next";
import { getPostBySlug } from "@/data/posts";
import BlogPostClient from "@/components/pages/BlogPostClient";

// Next.js 15: params is a Promise <{ slug: string }>
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The post you are looking for does not exist.",
        };
    }

    const ogImage = `/blog/${post.slug}/opengraph-image`;
    const twitterImage = `/blog/${post.slug}/twitter-image`;

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            type: "article",
            images: [ogImage],
        },
        twitter: {
            title: post.title,
            description: post.excerpt,
            images: [twitterImage],
        },
    };
}

import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const publishedAt = new Date(post.date);
    const datePublished = Number.isNaN(publishedAt.getTime())
        ? new Date().toISOString()
        : publishedAt.toISOString();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: post.image ? [post.image] : ["https://kimdinhphuong.dev/opengraph-image"],
        datePublished,
        dateModified: datePublished,
        author: {
            "@type": "Person",
            name: "Kim Đình Phương",
            url: "https://kimdinhphuong.dev",
        },
        publisher: {
            "@type": "Person",
            name: "Kim Đình Phương",
        },
        mainEntityOfPage: `https://kimdinhphuong.dev/blog/${post.slug}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostClient slug={slug} />
        </>
    );
}
