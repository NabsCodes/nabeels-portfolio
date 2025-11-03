"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BiFilter, BiX, BiDotsHorizontalRounded } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FilterOption {
  name: string;
  count: number;
}

interface ProjectFilterProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function ProjectFilter({
  options,
  activeFilter,
  onFilterChange,
  className,
}: ProjectFilterProps) {
  const hasActiveFilter = activeFilter !== "All";
  const MAX_VISIBLE_OPTIONS = 8;

  const { visibleOptions, hiddenOptions } = useMemo(() => {
    return {
      visibleOptions: options.slice(0, MAX_VISIBLE_OPTIONS),
      hiddenOptions: options.slice(MAX_VISIBLE_OPTIONS),
    };
  }, [options]);

  const FilterButton = ({ option }: { option: FilterOption }) => {
    const isActive = activeFilter === option.name;
    return (
      <motion.button
        key={option.name}
        onClick={() => onFilterChange(option.name)}
        className={cn(
          "relative inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
          isActive
            ? "bg-primary-base dark:bg-primary-base-dark dark:text-background-base-dark text-white shadow-sm"
            : "bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20",
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {option.name}
        <span
          className={cn(
            "flex h-4 min-w-[16px] items-center justify-center rounded px-1 text-[10px] font-semibold",
            isActive
              ? "bg-white/25 text-white"
              : "bg-primary-base/10 text-primary-base/70 dark:bg-primary-base-dark/10 dark:text-primary-base-dark/70",
          )}
        >
          {option.count}
        </span>
      </motion.button>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-3">
        {/* Mobile: horizontal scroll with all options */}
        <div className="space-y-2 md:hidden">
          <div className="text-default-base/80 dark:text-default-base-dark/80 flex items-center gap-2 text-sm font-medium">
            <BiFilter className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
            <span>Filter:</span>
          </div>
          <div className="scrollbar-hide -mx-4 overflow-x-auto pb-1 pl-4">
            <div className="flex w-max gap-2">
              {options.map((option) => (
                <FilterButton key={option.name} option={option} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: limited options + dropdown */}
        <div className="hidden flex-wrap items-center gap-2 md:flex">
          <div className="text-default-base/80 dark:text-default-base-dark/80 flex items-center gap-2 text-sm font-medium">
            <BiFilter className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
            <span>Filter:</span>
          </div>

          {visibleOptions.map((option) => (
            <FilterButton key={option.name} option={option} />
          ))}

          {hiddenOptions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all">
                  <BiDotsHorizontalRounded className="h-4 w-4" />
                  More
                  <span className="bg-primary-base/10 text-primary-base/70 dark:bg-primary-base-dark/10 dark:text-primary-base-dark/70 flex h-4 min-w-[16px] items-center justify-center rounded px-1 text-[10px] font-semibold">
                    {hiddenOptions.length}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-primary-base/20 bg-background-base/95 dark:border-primary-base-dark/20 dark:bg-background-base-dark/95 max-h-64 w-48 overflow-y-auto border backdrop-blur-sm">
                {hiddenOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.name}
                    className={cn(
                      "cursor-pointer text-xs transition-colors",
                      activeFilter === option.name
                        ? "bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark"
                        : "text-default-base hover:bg-primary-base/10 dark:text-default-base-dark dark:hover:bg-primary-base-dark/10",
                    )}
                    onSelect={() => onFilterChange(option.name)}
                  >
                    <span className="flex items-center gap-2">
                      {option.name}
                      <span className="text-default-base/60 dark:text-default-base-dark/60 ml-auto text-[10px]">
                        {option.count}
                      </span>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Clear button */}
          <AnimatePresence>
            {hasActiveFilter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onFilterChange("All")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
                aria-label="Clear filter"
              >
                <BiX className="h-3.5 w-3.5" />
                Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Active filter indicator */}
        <AnimatePresence>
          {hasActiveFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-default-base/60 dark:text-default-base-dark/60 overflow-hidden text-xs"
            >
              Showing{" "}
              <span className="text-primary-base dark:text-primary-base-dark font-medium">
                {options.find((opt) => opt.name === activeFilter)?.count}
              </span>{" "}
              {activeFilter} project
              {(options.find((opt) => opt.name === activeFilter)?.count ||
                0) !== 1
                ? "s"
                : ""}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
