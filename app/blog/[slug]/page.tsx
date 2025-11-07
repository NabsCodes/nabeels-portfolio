import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/sanity-blog-data";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 3600;

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;

  // Generate OG image URL if available, otherwise use default
  let ogImageUrl: string | undefined;
  if (post.seo?.ogImage) {
    ogImageUrl = urlFor(post.seo.ogImage)
      .width(1200)
      .height(630)
      .format("webp")
      .url();
  } else {
    // Fallback to default portfolio OG image
    ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://nabeelhassan.dev"}/opengraph-image.png`;
  }

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post.seo?.ogImage?.alt || title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative mx-auto w-full max-w-4xl px-4 pt-24">
      <BlogPostContent post={post} />
    </main>
  );
}
