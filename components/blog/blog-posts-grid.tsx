"use client";

import { motion } from "framer-motion";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPost } from "@/lib/types/blog";

interface BlogPostsGridProps {
  posts: BlogPost[];
  searchQuery: string;
  selectedTags: string[];
  clearFilters: () => void;
}

export function BlogPostsGrid({
  posts,
  searchQuery,
  selectedTags,
  clearFilters,
}: BlogPostsGridProps) {
  if (posts.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <BlogCard post={post} index={index} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Empty state
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-20 text-center"
    >
      <div className="mb-4 font-mono text-lg">
        <span className="text-primary-base dark:text-primary-base-dark">
          {"{"}
        </span>
        <span className="text-primary-base/60 dark:text-primary-base-dark/60 mx-2">
          No posts found
        </span>
        <span className="text-primary-base dark:text-primary-base-dark">
          {"}"}
        </span>
      </div>
      <p className="text-primary-base dark:text-primary-base-dark mb-6">
        {searchQuery || selectedTags.length > 0
          ? "Try different search terms or clear filters"
          : "Coming soon..."}
      </p>
      {(searchQuery || selectedTags.length > 0) && (
        <button
          onClick={clearFilters}
          className="bg-accent-base hover:bg-accent-base/80 dark:bg-accent-base-dark dark:hover:bg-accent-base-dark/80 rounded-lg px-6 py-3 text-sm text-white transition-colors"
        >
          Clear all filters
        </button>
      )}
    </motion.div>
  );
}
