"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
      viewport={{ once: true }}
      className={cn("relative py-2", className, {
        "text-center": align === "center",
        "text-right": align === "right",
      })}
    >
      <div
        className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", {
          "justify-center": align === "center",
          "justify-end": align === "right",
        })}
      >
        <div className="inline-flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="text-primary-base dark:text-primary-base-dark h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 3v12" />
              <circle cx="6" cy="18" r="3" />
              <path d="M6 9a9 9 0 0 0 9 9" />
              <circle cx="18" cy="18" r="3" />
            </svg>
            <span className="font-space-grotesk text-default-base dark:text-default-base-dark text-lg font-medium tracking-wide sm:text-xl md:text-2xl">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-accent-base/10 font-space-grotesk text-primary-base dark:bg-accent-base-dark/10 dark:text-primary-base-dark rounded-full px-2 py-0.5 text-sm">
              main
            </span>
            <span className="text-primary-base/70 dark:text-primary-base-dark/70 font-mono text-sm">
              /{" "}
            </span>
            <span className="bg-primary-base/10 font-space-grotesk text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark rounded-full px-2 py-0.5 text-sm">
              {subtitle}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
