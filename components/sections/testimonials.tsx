"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonialsContent } from "@/lib/data";
import TerminalInfo from "@/components/ui/terminal-info";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeInUp, staggerContainer } from "@/lib/animation-presets";
import { Quote } from "lucide-react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToggleWithScroll } from "@/hooks/use-toggle-with-scroll";

type TestimonialItem = (typeof testimonialsContent.items)[number];

function TestimonialCard({
  t,
  className,
  containerRef,
}: {
  t: TestimonialItem;
  className?: string;
  containerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className={clsx(
        "group relative h-full overflow-hidden rounded-xl border border-primary-base/40 bg-background-base/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/70 dark:hover:border-primary-base-dark/40",
        className,
      )}
      ref={containerRef}
    >
      {/* Decorative background icon */}
      <Quote className="pointer-events-none absolute -right-2 -top-2 h-14 w-14 rotate-12 text-primary-base/10 dark:text-primary-base-dark/10" />

      {/* Accent bar */}
      <div className="mb-3 h-1 w-24 rounded bg-gradient-to-r from-primary-base/40 to-accent-base/40 dark:from-primary-base-dark/30 dark:to-accent-base-dark/30" />

      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-primary-base/20 dark:border-primary-base-dark/20">
            <AvatarImage src={t.author.avatarUrl} alt={t.author.name} />
            <AvatarFallback>
              {t.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-space-grotesk text-sm font-medium text-primary-base-dark dark:text-primary-base-dark">
                {t.author.name}
              </span>
            </div>
            <div className="text-xs text-default-base/60 dark:text-default-base-dark/60">
              {[t.author.role, t.author.company].filter(Boolean).join(" • ")}
            </div>
          </div>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-base/10 dark:bg-primary-base-dark/10">
          <Quote className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
        </div>
      </div>

      <p className="line-clamp-5 border-l-2 border-primary-base/30 pl-4 text-sm italic leading-relaxed text-default-base/80 dark:border-primary-base-dark/20 dark:text-default-base-dark/80">
        {t.quote}
      </p>

      <div className="mt-auto pt-4" />
    </motion.div>
  );
}

export default function Testimonials() {
  const { ref } = useSectionInView("testimonials", {
    mobileThreshold: 0.3,
    desktopThreshold: 0.9,
  });
  const {
    isExpanded: showAllMobile,
    toggle: toggleMobile,
    topRef,
    firstExpandedRef,
  } = useToggleWithScroll();

  const items = testimonialsContent.items;
  const initialVisibleMobile = 3; // show 3 by default on mobile; reveals the rest on toggle
  const hasHiddenMobile = items.length > initialVisibleMobile;

  return (
    <section
      ref={ref}
      id="testimonials"
      className="scroll-mt-12 px-4 py-10 sm:py-12 lg:py-16"
    >
      <SectionHeader
        title={testimonialsContent.title}
        subtitle={testimonialsContent.subtitle}
        align="left"
      />

      <div className="mt-6 w-fit">
        <TerminalInfo
          command={testimonialsContent.terminalInfo.command}
          flag={testimonialsContent.terminalInfo.flag}
          content={testimonialsContent.terminalInfo.content}
        />
      </div>

      {/* Desktop / tablet grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </motion.div>

      {/* Mobile stacked with button-controlled expand/collapse */}
      <div ref={topRef} className="mt-10 space-y-4 md:hidden">
        {items
          .slice(0, showAllMobile ? items.length : initialVisibleMobile)
          .map((t, idx) => (
            <TestimonialCard
              key={t.id}
              t={t}
              containerRef={
                showAllMobile && idx === initialVisibleMobile
                  ? firstExpandedRef
                  : undefined
              }
            />
          ))}

        {hasHiddenMobile && (
          <div className="flex justify-center pt-1">
            <Button
              variant="outline"
              size="sm"
              aria-expanded={showAllMobile}
              onClick={toggleMobile}
              className="border-primary-base/40 text-primary-base hover:bg-primary-base/10 dark:border-primary-base-dark/30 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/10"
            >
              {showAllMobile
                ? "Show less"
                : `Show ${items.length - initialVisibleMobile} more`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
