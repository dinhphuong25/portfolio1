import type { Metadata } from "next";
import BlogPageClient from "@/components/pages/BlogPageClient";

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles sharing experience in product design, UX, and practical perspectives.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | Kim Đình Phương",
        description: "Read the latest articles about product design, UX, and product thinking.",
        url: "/blog",
        images: ["/opengraph-image"],
    },
};

export default function BlogPage() {
    return <BlogPageClient />;
}
