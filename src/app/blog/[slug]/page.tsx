import type { Metadata } from "next";
import { getPostBySlug, BlogPost } from "@/data/posts";
import { getBlogPostBySlug } from "@/lib/db";
import BlogPostClient from "@/components/pages/BlogPostClient";
import { notFound } from "next/navigation";

async function resolvePost(slug: string): Promise<BlogPost | undefined> {
  // Check static files first
  const staticPost = getPostBySlug(slug, "vi");
  if (staticPost) return staticPost;

  // Check database
  try {
    const dbPost = await getBlogPostBySlug(slug);
    if (dbPost) {
      let tags: string[] = [];
      try {
        tags = JSON.parse(dbPost.tags);
      } catch {
        tags = [dbPost.category];
      }

      let formattedDate = "Gần đây";
      try {
        const d = new Date(dbPost.published_at);
        formattedDate = `${d.getDate().toString().padStart(2, "0")} Tháng ${(
          d.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}, ${d.getFullYear()}`;
      } catch {}

      return {
        id: dbPost.id,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        date: formattedDate,
        readTime: `${dbPost.reading_time || 5} phút đọc`,
        category: dbPost.category,
        image: dbPost.cover_image || "/untitled-1555924881176370155281.jpg",
        slug: dbPost.slug,
        content: dbPost.content,
        tags,
        isPublished: dbPost.status === "published",
        sourceType: dbPost.source_type,
        sourceName: dbPost.source_name || undefined,
        sourceUrl: dbPost.source_url || undefined,
        author: dbPost.author,
        views: dbPost.views,
        publishedAt: dbPost.published_at,
      };
    }
  } catch {
    //
  }

  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) {
    return {
      title: "Bài viết không tìm thấy | Blog Kim Đình Phương",
      description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ.",
    };
  }

  const ogImage = `/blog/${post.slug}/opengraph-image`;
  const twitterImage = `/blog/${post.slug}/twitter-image`;

  return {
    title: `${post.title} | Blog Kim Đình Phương`,
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await resolvePost(slug);

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
    image: post.image ? [post.image] : ["https://dinhphuong.dev/opengraph-image"],
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: post.author || "Kim Đình Phương",
      url: "https://dinhphuong.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Kim Đình Phương",
    },
    mainEntityOfPage: `https://dinhphuong.dev/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient slug={slug} initialPost={post} />
    </>
  );
}
