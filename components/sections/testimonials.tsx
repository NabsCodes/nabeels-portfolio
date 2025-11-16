"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonialsContent } from "@/lib/data";
import TerminalInfo from "@/components/ui/terminal-info";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { staggerContainer } from "@/lib/animation-presets";
import TestimonialCard from "@/components/cards/testimonial-card";

export default function Testimonials() {
  const { ref } = useSectionInView("testimonials", {
    mobileThreshold: 0.3,
    desktopThreshold: 0.9,
  });

  const items = testimonialsContent.items;

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative scroll-mt-12 px-4 py-10 sm:py-12 lg:py-16"
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

      {/* Responsive grid - single column on mobile, 2 columns on tablet, 3 on desktop */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </motion.div>
    </section>
  );
}
