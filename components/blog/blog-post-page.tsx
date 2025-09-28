"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/sanity-blog-data";
import { BlogPost } from "@/lib/types/blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { BlogLoading } from "@/components/blog/blog-loading";

interface BlogPostPageProps {
  slug: string;
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const foundPost = await getPostBySlug(slug);
        if (!foundPost) {
          notFound();
        }
        setPost(foundPost);
      } catch (error) {
        console.error("Error loading blog post:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <BlogLoading />;
  }

  if (!post) {
    return notFound();
  }

  return (
    <main className="relative mx-auto w-full max-w-4xl px-4 pt-24">
      <BlogPostContent post={post} />
    </main>
  );
}
