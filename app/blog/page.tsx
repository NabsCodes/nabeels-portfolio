import { getAllPosts } from "@/lib/sanity-blog-data";
import { BlogPageHeader } from "@/components/blog/blog-page-header";
import { BlogClientWrapper } from "@/components/blog/blog-client-wrapper";

export const revalidate = 60; // Revalidate every 60 seconds

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
