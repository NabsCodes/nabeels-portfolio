import type { Metadata } from "next";
import { getAllPosts } from "@/lib/sanity-blog-data";
import { BlogPageHeader } from "@/components/blog/blog-page-header";
import { BlogClientWrapper } from "@/components/blog/blog-client-wrapper";

export const revalidate = 60; // Revalidate every 60 seconds

// Define specific metadata for the blog listing page
export const metadata: Metadata = {
  title: "My Blog",
  description:
    "Sharing my ideas, journey in tech, lessons learned, and insights from building and creating things.",
  openGraph: {
    title: "My Blog | Nabeel Hassan",
    description:
      "Sharing my ideas, journey in tech, lessons learned, and insights from building and creating things.",
    url: "https://nabeelhassan.dev/blog",
    siteName: "Nabeel Hassan Portfolio",
    images: [
      {
        url: "/images/opengraph-image-blog.webp",
        width: 1200,
        height: 630,
        alt: "Nabeel Hassan's Blog Page",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog | Nabeel Hassan",
    description:
      "Sharing my ideas, journey in tech, lessons learned, and insights from building and creating things.",
    images: ["/images/opengraph-image-blog.webp"],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 py-12 pt-24 sm:pt-28 md:pt-32 lg:pt-24">
      <BlogPageHeader
        title="My Blog"
        description="Sharing my ideas, journey in tech, lessons learned, and insights from building and creating things."
      />

      <BlogClientWrapper posts={posts} />
    </main>
  );
}
