"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/cards/experience-card";
import { SectionHeader } from "@/components/ui/section-header";
import { experienceData } from "@/lib/data";
import TerminalInfo from "@/components/ui/terminal-info";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeInUp, getStaggerDelay } from "@/lib/animation-presets";

export default function Experience() {
  const { ref } = useSectionInView("experience", {
    desktopThreshold: 0.3,
  });

  // Parse date string to proper Date object for comparison
  const parseEndDate = (dateStr: string) => {
    if (dateStr === "Present") return new Date(); // Current date for "Present"

    // Handle "MMM YYYY" format (e.g., "May 2024")
    const [month, year] = dateStr.split(" ");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = monthNames.indexOf(month);

    if (monthIndex !== -1 && year) {
      // Use last day of the month for end dates to ensure proper ordering
      return new Date(parseInt(year), monthIndex + 1, 0);
    }

    return new Date(dateStr);
  };

  // Sort experiences: current jobs first, then by end date (most recent first)
  const sortedExperienceData = React.useMemo(() => {
    return [...experienceData.experiences].sort((a, b) => {
      // Current jobs first
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;

      // Then by end date (most recent first)
      const aEndDate = parseEndDate(a.dates.end);
      const bEndDate = parseEndDate(b.dates.end);

      return bEndDate.getTime() - aEndDate.getTime();
    });
  }, []);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative scroll-mt-28 px-4 pb-10 sm:pb-12 lg:pb-16"
    >
      <SectionHeader
        title={experienceData.title}
        subtitle={experienceData.subtitle}
        align="left"
      />

      {/* Terminal-style intro */}
      <div className="mb-16 mt-6 w-fit">
        <TerminalInfo
          command={experienceData.terminalInfo.command}
          flag={experienceData.terminalInfo.flag}
          content={experienceData.terminalInfo.content}
        />
      </div>

      {/* Experience Grid with Connection Lines */}
      <div className="relative flex flex-col gap-12 md:gap-16">
        {/* Connector Line */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-px bg-gradient-to-b from-primary-base/40 via-primary-base/30 to-transparent dark:from-primary-base-dark/40 dark:via-primary-base-dark/30" />
        </div>

        {/* Experience Items */}
        {sortedExperienceData.map((experience, index) => (
          <motion.div
            key={experience.id}
            variants={fadeInUp}
            custom={getStaggerDelay(index)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-16"
          >
            {/* Connector Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-6">
              <div className="h-[10px] w-[10px] rounded-full border-2 border-primary-base/30 bg-primary-base dark:border-primary-base-dark/30 dark:bg-primary-base-dark" />
            </div>

            {/* Card - Alternating Layout (only on md+) */}
            <div
              className={index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}
            >
              <ExperienceCard
                experience={experience}
                isRight={index % 2 !== 0}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
