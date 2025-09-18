"use client";

import React from "react";
import { motion } from "framer-motion";
import { RiBuildingLine, RiMapPinLine } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";
import { BsBriefcase, BsLaptop, BsClock } from "react-icons/bs";
import { PiGraduationCapBold, PiHandshakeBold } from "react-icons/pi";
import type { Experience } from "@/lib/types";
import Link from "next/link";

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
}> = ({ experience, isRight }) => (
  <div className={`relative ${isRight ? "md:ml-auto" : ""}`}>
    {/* Date display */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-2 font-mono text-sm"
    >
      <span className="inline-flex items-center rounded-md border border-accent-base/30 bg-accent-base/[0.08] px-2 py-0.5 text-xs font-medium text-accent-base/90 dark:border-accent-base-dark/30 dark:bg-accent-base-dark/[0.08] dark:text-accent-base-dark/90">
        {formatDate(experience.dates.start)}
      </span>
      <span className="mx-2 text-primary-base dark:text-primary-base-dark">
        →
      </span>
      <span className="inline-flex items-center rounded-md border border-primary-base/30 bg-primary-base/[0.08] px-2 py-0.5 text-xs font-medium text-primary-base/90 dark:border-primary-base-dark/30 dark:bg-primary-base-dark/[0.08] dark:text-primary-base-dark/90">
        {formatDate(experience.dates.end)}
      </span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-1 rounded-lg border border-primary-base/40 bg-background-base/50 p-6 backdrop-blur-sm transition-colors dark:border-primary-base-dark/20 dark:bg-background-base-dark/50"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Role & Type */}
        <div className="flex items-center justify-between lg:flex-col lg:items-start">
          <h3 className="bg-gradient-to-r from-primary-base to-accent-base bg-clip-text font-space-grotesk text-lg font-medium text-transparent dark:from-primary-base-dark dark:to-accent-base-dark">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 lg:mt-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md border border-primary-base/[0.08] bg-gradient-to-r from-primary-base/[0.08] to-accent-base/[0.08] px-2.5 py-0.5 text-[0.6875rem] font-medium text-primary-base/90 transition-colors duration-200 hover:from-primary-base/[0.12] hover:to-accent-base/[0.12] dark:border-primary-base-dark/[0.08] dark:from-primary-base-dark/[0.08] dark:to-accent-base-dark/[0.08] dark:text-primary-base-dark/90 dark:hover:from-primary-base-dark/[0.12] dark:hover:to-accent-base-dark/[0.12]`}
            >
              {getTypeIcon(experience.type)}
              {experience.type}
            </span>
            {experience.current && (
              <span className="inline-flex items-center text-xs text-accent-base/80 dark:text-accent-base-dark/80">
                <span className="relative mr-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-base opacity-75 dark:bg-accent-base-dark" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-base dark:bg-accent-base-dark" />
                </span>
                Active
              </span>
            )}
          </div>
        </div>

        {/* Company Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-default-base/70 dark:text-default-base-dark/70">
            <RiBuildingLine className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
            {experience.companyUrl ? (
              <Link
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-0.5 transition-colors hover:text-accent-base dark:hover:text-accent-base-dark"
              >
                {experience.company}
                <MdArrowOutward className="text-sm text-primary-base transition-colors group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark" />
              </Link>
            ) : (
              <span>{experience.company}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-default-base/70 dark:text-default-base-dark/70">
            <RiMapPinLine className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-base/80 to-transparent dark:via-primary-base-dark/20" />

      {/* Description & Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-4 space-y-4"
      >
        <p className="text-sm text-default-base/80 dark:text-default-base-dark/80">
          {experience.description}
        </p>

        {/* Achievements with terminal style */}
        <div className="rounded-lg border border-primary-base/30 bg-primary-base/5 p-4 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5">
          <div className="mb-3 font-mono text-xs text-primary-base dark:text-primary-base-dark">
            $ achievements --list
          </div>
          <ul className="space-y-3">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex items-start gap-3"
              >
                <div className="relative mt-1.5">
                  <div className="absolute -left-[3px] h-full w-[2px] bg-gradient-to-b from-accent-base to-transparent dark:from-accent-base-dark" />
                  <div className="relative h-2 w-2 rounded-full border border-accent-base/30 bg-accent-base/30 transition-colors group-hover:border-accent-base/50 group-hover:bg-accent-base/30 dark:border-accent-base-dark/30 dark:bg-accent-base-dark/30 dark:group-hover:border-accent-base-dark/50 dark:group-hover:bg-accent-base-dark/30" />
                </div>
                <span className="text-sm text-default-base/70 transition-colors group-hover:text-default-base/90 dark:text-default-base-dark/70 dark:group-hover:text-default-base-dark/90">
                  {achievement}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  </div>
);
