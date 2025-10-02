import { useState, useMemo } from "react";
import { BlogPost } from "@/lib/types/blog";

interface UseBlogSearchProps {
  posts: BlogPost[];
}

interface UseBlogSearchReturn {
  filteredPosts: BlogPost[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  allTags: string[];
}

export function useBlogSearch({
  posts,
}: UseBlogSearchProps): UseBlogSearchReturn {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from posts (normalized, deduplicated, sorted by usage)
  const allTags = useMemo(() => {
    const tagMap = new Map<string, { display: string; count: number }>();

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const normalized = tag.toLowerCase();
        const existing = tagMap.get(normalized);

        if (existing) {
          // Increment count for existing tag
          existing.count++;
        } else {
          // Add new tag with count 1
          tagMap.set(normalized, { display: tag, count: 1 });
        }
      });
    });

    // Sort by usage count (descending), then alphabetically
    return Array.from(tagMap.values())
      .sort((a, b) => {
        if (b.count === a.count) {
          return a.display.toLowerCase().localeCompare(b.display.toLowerCase());
        }
        return b.count - a.count;
      })
      .map((t) => t.display);
  }, [posts]);

  // Toggle tag selection (multi-select)
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Filter by selected tags (OR logic: show posts that have ANY of the selected tags)
    // Case-insensitive matching to handle tag variations
    if (selectedTags.length > 0) {
      const selectedLower = selectedTags.map((t) => t.toLowerCase());
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => selectedLower.includes(tag.toLowerCase())),
      );
    }

    return filtered;
  }, [posts, searchQuery, selectedTags]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    clearFilters,
    allTags,
  };
}
