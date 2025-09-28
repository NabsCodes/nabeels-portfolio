"use client";

import { Search, Tag, X, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  allTags: string[];
  clearFilters: () => void;
  resultsCount: number;
}

export function BlogSearch({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  allTags,
  clearFilters,
  resultsCount,
}: BlogSearchProps) {
  const MAX_VISIBLE_TAGS = 8;

  const { visibleTags, hiddenTags } = useMemo(() => {
    if (!allTags.length) {
      return { visibleTags: [], hiddenTags: [] };
    }

    return {
      visibleTags: allTags.slice(0, MAX_VISIBLE_TAGS),
      hiddenTags: allTags.slice(MAX_VISIBLE_TAGS),
    };
  }, [allTags]);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-8 space-y-6"
    >
      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
          <Search className="h-4 w-4 text-primary-base/60 dark:text-primary-base-dark" />
        </div>
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-primary-base/20 bg-background-base/60 py-3 pl-10 pr-10 text-default-base backdrop-blur-sm transition-all placeholder:text-primary-base/60 focus:border-accent-base focus:outline-none focus:ring-1 focus:ring-accent-base/20 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 dark:text-default-base-dark dark:placeholder:text-primary-base-dark/60 dark:focus:border-accent-base-dark dark:focus:ring-accent-base-dark/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-primary-base/60 transition-colors hover:text-accent-base dark:text-primary-base-dark/60 dark:hover:text-accent-base-dark"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tag Filter */}
      {visibleTags.length > 0 && (
        <div className="space-y-3">
          {/* Mobile: horizontal scroll */}
          <div className="space-y-2 md:hidden">
            <div className="flex items-center gap-2 font-mono text-sm text-primary-base dark:text-primary-base-dark">
              <Tag className="h-4 w-4" />
              <span>Topics:</span>
            </div>
            <div className="-mx-4 overflow-x-auto pb-1 pl-4 pr-6">
              <div className="flex w-max flex-nowrap gap-2">
                <button
                  onClick={() => setSelectedTag("")}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all ${
                    !selectedTag
                      ? "bg-accent-base text-white shadow-lg dark:bg-accent-base-dark"
                      : "bg-primary-base/10 text-primary-base hover:bg-accent-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-accent-base-dark/20"
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={`mobile-${tag}`}
                    onClick={() => handleTagSelect(tag)}
                    className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all ${
                      selectedTag === tag
                        ? "bg-accent-base text-white shadow-lg dark:bg-accent-base-dark"
                        : "bg-primary-base/10 text-primary-base hover:bg-accent-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-accent-base-dark/20"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: limited chips + dropdown */}
          <div className="hidden flex-wrap items-center gap-3 md:flex">
            <div className="flex items-center gap-2 font-mono text-sm text-primary-base dark:text-primary-base-dark">
              <Tag className="h-4 w-4" />
              <span>Topics:</span>
            </div>

            {/* All Button */}
            <button
              onClick={() => setSelectedTag("")}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                !selectedTag
                  ? "bg-accent-base text-white shadow-lg dark:bg-accent-base-dark"
                  : "bg-primary-base/10 text-primary-base hover:bg-accent-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-accent-base-dark/20"
              }`}
            >
              All
            </button>

            {/* Tag Buttons */}
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                  selectedTag === tag
                    ? "bg-accent-base text-white shadow-lg dark:bg-accent-base-dark"
                    : "bg-primary-base/10 text-primary-base hover:bg-accent-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-accent-base-dark/20"
                }`}
              >
                {tag}
              </button>
            ))}

            {hiddenTags.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-2 rounded-lg bg-primary-base/10 px-3 py-1.5 font-mono text-xs text-primary-base transition-all hover:bg-accent-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-accent-base-dark/20">
                    <MoreHorizontal className="h-4 w-4" />
                    More
                    <span className="rounded-md bg-primary-base/10 px-1 text-[10px] text-primary-base/70 dark:bg-primary-base-dark/10 dark:text-primary-base-dark/70">
                      {hiddenTags.length}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-64 w-48 overflow-y-auto border border-primary-base/20 bg-background-base/95 backdrop-blur-sm dark:border-primary-base-dark/20 dark:bg-background-base-dark/95">
                  {hiddenTags.map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      className={`cursor-pointer font-mono text-xs transition-colors ${
                        selectedTag === tag
                          ? "bg-accent-base/10 text-accent-base hover:bg-accent-base/20 dark:bg-accent-base-dark/10 dark:text-accent-base-dark"
                          : "text-primary-base hover:bg-primary-base/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/10"
                      }`}
                      onSelect={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Clear all filters and results count */}
          {(searchQuery || selectedTag) && (
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
              >
                <X className="h-3 w-3" />
                Clear all filters
              </button>

              {/* Results count */}
              <div className="font-mono text-sm text-primary-base/70 dark:text-primary-base-dark/70">
                {resultsCount} post{resultsCount !== 1 ? "s" : ""} found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedTag && ` in "${selectedTag}"`}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
