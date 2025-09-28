import { useState, useMemo } from "react";
import { BlogPost } from "@/lib/types/blog";

interface UseBlogSearchProps {
  posts: BlogPost[];
}

interface UseBlogSearchReturn {
  filteredPosts: BlogPost[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  clearFilters: () => void;
  allTags: string[];
}

export function useBlogSearch({
  posts,
}: UseBlogSearchProps): UseBlogSearchReturn {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    return filtered;
  }, [posts, searchQuery, selectedTag]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("");
  };

  return {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    clearFilters,
    allTags,
  };
}
