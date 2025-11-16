"use client";

import { useExpandableContent } from "@/hooks/use-expandable-content";
import { fadeInUp } from "@/lib/animation-presets";
import { Testimonial } from "@/lib/types/sections";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Quote, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialCard({
  t,
  className,
}: {
  t: Testimonial;
  className?: string;
}) {
  const {
    isExpanded,
    isClampable,
    toggle,
    motionProps,
    contentRef,
    measureRef,
    clampClassName,
  } = useExpandableContent<HTMLParagraphElement>({
    collapsedHeight: "7rem",
    clampClassName: "line-clamp-5",
  });

  return (
    <motion.div
      variants={fadeInUp}
      className={clsx(
        "group border-primary-base/50 bg-background-base/70 hover:border-primary-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/70 dark:hover:border-primary-base-dark/40 relative h-full overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all duration-300",
        className,
      )}
    >
      {/* Decorative background icon */}
      <Quote className="text-primary-base/10 dark:text-primary-base-dark/10 pointer-events-none absolute -top-2 -right-2 h-14 w-14 rotate-12" />

      {/* Accent bar */}
      <div className="from-primary-base/40 to-accent-base/40 dark:from-primary-base-dark/30 dark:to-accent-base-dark/30 mb-3 h-1 w-24 rounded bg-linear-to-r" />

      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="border-primary-base/50 dark:border-primary-base-dark/20 h-10 w-10 border">
            <AvatarImage src={t.author.avatarUrl} alt={t.author.name} />
            <AvatarFallback>
              {t.author.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-space-grotesk text-primary-base-dark dark:text-primary-base-dark text-sm font-medium">
                {t.author.name}
              </span>
            </div>
            <div className="text-default-base/60 dark:text-default-base-dark/60 text-xs">
              {[t.author.role, t.author.company].filter(Boolean).join(" • ")}
            </div>
          </div>
        </div>

        <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <Quote className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
        </div>
      </div>

      {/* Quote with expand/collapse */}
      <div className="relative">
        {/* Hidden element to measure full content height */}
        <p
          ref={measureRef}
          className={clsx(
            "border-primary-base/50 text-default-base/80 dark:border-primary-base-dark/20 dark:text-default-base-dark/80 border-l-2 pl-4 text-sm leading-relaxed italic",
            "pointer-events-none invisible absolute top-0 left-0 -z-10 w-full",
          )}
          aria-hidden="true"
        >
          {t.quote}
        </p>

        <motion.div {...motionProps} className="overflow-hidden">
          <p
            ref={contentRef}
            className={clsx(
              "border-primary-base/50 text-default-base/80 dark:border-primary-base-dark/20 dark:text-default-base-dark/80 border-l-2 pl-4 text-sm leading-relaxed italic",
              !isExpanded && clampClassName,
            )}
          >
            {t.quote}
          </p>
        </motion.div>

        {(isClampable || isExpanded) && (
          <button
            onClick={toggle}
            className="font-space-grotesk text-primary-base/60 hover:text-primary-base focus-visible:ring-primary-base/40 dark:text-primary-base-dark/60 dark:hover:text-primary-base-dark dark:focus-visible:ring-primary-base-dark/40 mt-2 flex items-center gap-1 text-xs transition-colors focus:outline-none focus-visible:ring-2"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Show less quote" : "Read more quote"}
          >
            <span>{isExpanded ? "show less" : "read more"}</span>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-3 w-3" />
            </motion.div>
          </button>
        )}
      </div>

      <div className="mt-auto pt-4" />
    </motion.div>
  );
}
