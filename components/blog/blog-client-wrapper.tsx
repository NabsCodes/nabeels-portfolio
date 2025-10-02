"use client";

import { BlogSearch } from "@/components/blog/blog-search";
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import { useBlogSearch } from "@/hooks/use-blog-search";
import type { BlogPost } from "@/lib/types/blog";

interface BlogClientWrapperProps {
  posts: BlogPost[];
}

export function BlogClientWrapper({ posts }: BlogClientWrapperProps) {
  const {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    clearFilters,
    allTags: searchTags,
  } = useBlogSearch({ posts });

  return (
    <>
      <BlogSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        allTags={searchTags}
        clearFilters={clearFilters}
        resultsCount={filteredPosts.length}
      />

      <BlogPostsGrid
        posts={filteredPosts}
        searchQuery={searchQuery}
        selectedTags={selectedTags}
        clearFilters={clearFilters}
      />
    </>
  );
}
