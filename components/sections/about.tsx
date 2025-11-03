"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutContent } from "@/lib/data";
import {
  MonitorPlay,
  Trophy,
  Award,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import TerminalInfo from "@/components/ui/terminal-info";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeInUp, staggerContainer } from "@/lib/animation-presets";

const About = () => {
  // Register the "about" section with higher threshold for focused reading
  const { ref } = useSectionInView("about", {
    mobileThreshold: 0.3,
    desktopThreshold: 0.8,
  });

  return (
    <section
      ref={ref}
      id="about"
      className="relative scroll-mt-12 px-4 py-10 sm:py-12 lg:py-16"
    >
      <SectionHeader
        title={aboutContent.title}
        subtitle={aboutContent.subtitle}
        align="left"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-6 grid items-start gap-8 lg:grid-cols-12 lg:gap-12"
      >
        {/* Image Section */}
        <motion.div
          variants={fadeInUp}
          className="mx-auto hidden w-full max-w-[280px] lg:col-span-4 lg:block lg:max-w-none"
        >
          <div className="border-primary-base/20 bg-background-base dark:border-primary-base-dark/20 dark:bg-background-base-dark relative overflow-hidden rounded-2xl border shadow-lg">
            <div className="relative aspect-3/4 w-full">
              <div className="border-primary-base/10 from-primary-base/5 to-accent-base/5 dark:border-primary-base-dark/10 dark:from-primary-base-dark/5 dark:to-accent-base-dark/5 absolute top-0 left-0 z-10 w-full border-b bg-linear-to-r px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <span className="font-space-grotesk text-primary-base/80 dark:text-primary-base-dark/80 text-xs font-medium">
                      Professional Profile
                    </span>
                  </div>
                  <span className="text-primary-base/60 dark:text-primary-base-dark/60 font-mono text-xs">
                    Available
                  </span>
                </div>
              </div>

              <div className="relative h-full w-full">
                <Image
                  src={aboutContent.image.src}
                  alt={aboutContent.image.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 33vw, 25vw"
                  priority
                  quality={95}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section - Made larger */}
        <motion.div variants={fadeInUp} className="col-span-12 lg:col-span-8">
          {/* Terminal-style intro */}
          <div className="w-fit">
            <TerminalInfo
              command={aboutContent.terminalInfo.command}
              flag={aboutContent.terminalInfo.flag}
              content={aboutContent.terminalInfo.content}
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            {aboutContent.description.details.map((detail, index) => (
              <motion.p
                key={index}
                variants={fadeInUp}
                className="font-raleway text-default-base/80 dark:text-default-base-dark/80 leading-relaxed text-pretty md:text-justify md:text-base"
              >
                {detail}
              </motion.p>
            ))}
          </div>

          {/* Professional Credentials */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="border-primary-base/50 bg-background-base/50 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30 flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors duration-300">
              <Award className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
              <div>
                <div className="font-space-grotesk text-primary-base-dark text-sm font-medium">
                  15+ Projects
                </div>
                <div className="text-default-base/60 dark:text-default-base-dark/60 text-xs">
                  Delivered
                </div>
              </div>
            </div>

            <div className="border-primary-base/50 bg-background-base/50 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30 flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors duration-300">
              <CheckCircle className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
              <div>
                <div className="font-space-grotesk text-primary-base-dark text-sm font-medium">
                  100% Satisfaction
                </div>
                <div className="text-default-base/60 dark:text-default-base-dark/60 text-xs">
                  Client feedback
                </div>
              </div>
            </div>

            <div className="border-primary-base/50 bg-background-base/50 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30 flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors duration-300">
              <Users className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
              <div>
                <div className="font-space-grotesk text-primary-base-dark text-sm font-medium">
                  5+ Industries
                </div>
                <div className="text-default-base/60 dark:text-default-base-dark/60 text-xs">
                  Experience across
                </div>
              </div>
            </div>

            <div className="border-primary-base/50 bg-background-base/50 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30 flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors duration-300">
              <Clock className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
              <div>
                <div className="font-space-grotesk text-primary-base-dark text-sm font-medium">
                  3+ Years
                </div>
                <div className="text-default-base/60 dark:text-default-base-dark/60 text-xs">
                  Experience
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests & Motivations */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {aboutContent.interests.map((section, index) => (
              <div
                key={index}
                className="border-primary-base/50 bg-background-base/50 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30 rounded-lg border px-5 py-4 transition-colors duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-2">
                  {index === 0 ? (
                    <MonitorPlay className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
                  ) : (
                    <Trophy className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
                  )}
                  <h3 className="font-space-grotesk text-primary-base-dark text-sm font-medium">
                    {section.type}
                  </h3>
                </div>

                {/* List */}
                <div className="mt-4">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="border-primary-base/20 text-default-base/80 hover:border-primary-base/50 hover:text-default-base dark:border-primary-base-dark/20 dark:text-default-base-dark/80 dark:hover:border-primary-base-dark/40 dark:hover:text-default-base-dark border-l-2 py-2 pl-4 text-sm transition-colors duration-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
