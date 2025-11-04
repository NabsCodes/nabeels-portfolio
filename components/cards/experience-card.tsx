"use client";

import React from "react";
import { motion } from "framer-motion";
import { RiBuildingLine, RiMapPinLine } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";
import { BsBriefcase, BsLaptop, BsClock } from "react-icons/bs";
import { PiGraduationCapBold, PiHandshakeBold } from "react-icons/pi";
import type { Experience } from "@/lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Convert YYYY-MM format to display format (MMM YYYY)
const formatDate = (dateStr: string) => {
  if (dateStr === "Present") return "Present";

  const [year, month] = dateStr.split("-");
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

  const monthIndex = parseInt(month) - 1;
  return `${monthNames[monthIndex]} ${year}`;
};

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "full-time":
      return <BsBriefcase className="h-3 w-3" />;
    case "part-time":
      return <BsClock className="h-3 w-3" />;
    case "contract":
      return <PiHandshakeBold className="h-3 w-3" />;
    case "freelance":
      return <BsLaptop className="h-3 w-3" />;
    case "internship":
      return <PiGraduationCapBold className="h-3 w-3" />;
    default:
      return <BsBriefcase className="h-3 w-3" />;
  }
};

export const ExperienceCard: React.FC<{
  experience: Experience;
  isRight: boolean;
}> = ({ experience, isRight }) => {
  // Shared content components
  const DateDisplay = () => (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="border-accent-base/30 bg-accent-base/8 text-accent-base/90 dark:border-accent-base-dark/30 dark:bg-accent-base-dark/8 dark:text-accent-base-dark/90 inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">
        {formatDate(experience.dates.start)}
      </span>
      <span className="text-primary-base dark:text-primary-base-dark mx-1">
        →
      </span>
      <span className="border-primary-base/30 bg-primary-base/8 text-primary-base/90 dark:border-primary-base-dark/30 dark:bg-primary-base-dark/8 dark:text-primary-base-dark/90 inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">
        {formatDate(experience.dates.end)}
      </span>
    </div>
  );

  const RoleAndType = ({ compact = false }) => (
    <div
      className={cn(
        "flex items-center gap-2",
        compact ? "flex-wrap" : "lg:flex-col lg:items-start",
      )}
    >
      <h3
        className={cn(
          "from-primary-base to-accent-base font-space-grotesk dark:from-primary-base-dark dark:to-accent-base-dark bg-linear-to-r bg-clip-text font-medium text-transparent",
          compact ? "text-base" : "text-lg",
        )}
      >
        {experience.role}
      </h3>
      <div className="flex items-center gap-2">
        <span className="border-primary-base/8 from-primary-base/8 to-accent-base/8 text-primary-base/90 hover:from-primary-base/12 hover:to-accent-base/12 dark:border-primary-base-dark/8 dark:from-primary-base-dark/8 dark:to-accent-base-dark/8 dark:text-primary-base-dark/90 dark:hover:from-primary-base-dark/12 dark:hover:to-accent-base-dark/12 inline-flex items-center gap-1.5 rounded-md border bg-linear-to-r px-2 py-0.5 text-[0.6875rem] font-medium transition-colors duration-200">
          {getTypeIcon(experience.type)}
          {experience.type}
        </span>
        {experience.current && (
          <span className="text-accent-base/80 dark:text-accent-base-dark/80 inline-flex items-center text-xs">
            <span className="relative mr-1.5 flex h-2 w-2">
              <span className="bg-accent-base dark:bg-accent-base-dark absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-accent-base dark:bg-accent-base-dark relative inline-flex h-2 w-2 rounded-full" />
            </span>
            Active
          </span>
        )}
      </div>
    </div>
  );

  const CompanyInfo = ({ compact = false }) => (
    <div className={cn("space-y-1", compact && "text-sm")}>
      <div className="text-default-base/70 dark:text-default-base-dark/70 flex items-center gap-2 text-sm">
        <RiBuildingLine className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
        {experience.companyUrl ? (
          <Link
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:text-accent-base dark:hover:text-accent-base-dark flex items-center gap-0.5 transition-colors"
          >
            {experience.company}
            <MdArrowOutward className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors" />
          </Link>
        ) : (
          <span>{experience.company}</span>
        )}
      </div>
      {!compact && (
        <div className="text-default-base/70 dark:text-default-base-dark/70 flex items-center gap-2 text-sm">
          <RiMapPinLine className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
          <span>{experience.location}</span>
        </div>
      )}
    </div>
  );

  const AchievementsSection = () => (
    <div className="border-primary-base/30 bg-primary-base/5 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 rounded-lg border p-4">
      <div className="text-primary-base dark:text-primary-base-dark mb-3 font-mono text-xs">
        $ achievements --list
      </div>
      <ul className="space-y-3">
        {experience.achievements.map((achievement, i) => (
          <li key={i} className="group relative flex items-start gap-3">
            <div className="relative mt-1.5">
              <div className="from-accent-base dark:from-accent-base-dark absolute -left-[3px] h-full w-[2px] bg-linear-to-b to-transparent" />
              <div className="border-accent-base/30 bg-accent-base/30 group-hover:border-accent-base/50 group-hover:bg-accent-base/30 dark:border-accent-base-dark/30 dark:bg-accent-base-dark/30 dark:group-hover:border-accent-base-dark/50 dark:group-hover:bg-accent-base-dark/30 relative h-2 w-2 rounded-full border transition-colors" />
            </div>
            <span className="text-default-base/70 group-hover:text-default-base/90 dark:text-default-base-dark/70 dark:group-hover:text-default-base-dark/90 text-sm transition-colors">
              {achievement}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`relative ${isRight ? "md:ml-auto" : ""}`}>
      {/* Mobile Accordion (< lg) */}
      <div className="lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <DateDisplay />
        </motion.div>

        <Accordion type="single" className="space-y-0">
          <AccordionItem value={experience.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex w-full flex-col space-y-2">
                <RoleAndType compact />
                <CompanyInfo compact />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-4">
                <div className="text-default-base/70 dark:text-default-base-dark/70 flex items-center gap-2 text-sm">
                  <RiMapPinLine className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
                  <span>{experience.location}</span>
                </div>
                <p className="text-default-base/80 dark:text-default-base-dark/80 text-sm">
                  {experience.description}
                </p>
                <AchievementsSection />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Desktop Full Layout (>= lg) */}
      <div className="hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <DateDisplay />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 rounded-lg border p-6 backdrop-blur-sm transition-colors"
        >
          <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-start lg:justify-between">
            <RoleAndType />
            <CompanyInfo />
          </div>

          <div className="via-primary-base/80 dark:via-primary-base-dark/20 h-px w-full bg-linear-to-r from-transparent to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-4 space-y-4"
          >
            <p className="text-default-base/80 dark:text-default-base-dark/80 text-sm">
              {experience.description}
            </p>
            <AchievementsSection />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceCard;
