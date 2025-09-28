"use client";

// import { Terminal } from "lucide-react";
// import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { getAllPosts } from "@/lib/sanity-blog-data";
import { BlogPost } from "@/lib/types/blog";
import { BlogPageHeader } from "@/components/blog/blog-page-header";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import { BlogLoading } from "@/components/blog/blog-loading";
import { useBlogSearch } from "@/hooks/use-blog-search";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    clearFilters,
    allTags: searchTags,
  } = useBlogSearch({ posts });

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (isLoading) {
    return <BlogLoading />;
  }

  return (
    <>
      {/* TEMPORARY: Coming Soon Placeholder */}
      {/* <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="relative mx-auto w-full max-w-7xl px-4 py-12 pt-24 sm:pt-28 md:pt-32 lg:pt-24"
      >
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-8 rounded-full bg-gradient-to-r from-accent-base/10 to-primary-base/10 p-6 dark:from-accent-base-dark/10 dark:to-primary-base-dark/10">
            <Terminal className="h-12 w-12 text-accent-base dark:text-accent-base-dark" />
          </div>

          <h1 className="mb-4 font-raleway text-4xl font-bold tracking-tight text-default-base dark:text-default-base-dark sm:text-5xl">
            Blog Coming Soon
            <span className="text-accent-base dark:text-accent-base-dark">
              .
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-primary-base dark:text-primary-base-dark">
            I'm currently working on creating amazing content to share my
            journey as a developer, lessons learned, and insights from building
            things for the web. Stay tuned!
          </p>

          <div className="inline-flex items-center rounded-full border border-primary-base/20 bg-background-base/60 px-4 py-2 text-sm font-medium text-default-base backdrop-blur-sm dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 dark:text-default-base-dark">
            <span className="mr-2">🚧</span>
            Work in Progress
          </div>
        </div>
      </motion.main> */}

      {/* Blog Posts */}
      <main className="relative mx-auto w-full max-w-7xl px-4 py-12 pt-24 sm:pt-28 md:pt-32 lg:pt-24">
        <BlogPageHeader
          title="My Blog"
          description="Sharing my ideas, journey in tech, lessons learned, and insights from building and creating things."
        />

        <BlogSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={searchTags}
          clearFilters={clearFilters}
          resultsCount={filteredPosts.length}
        />

        <BlogPostsGrid
          posts={filteredPosts}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          clearFilters={clearFilters}
        />
      </main>
    </>
  );
}
