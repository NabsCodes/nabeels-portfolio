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
          <div className="relative overflow-hidden rounded-2xl border border-primary-base/20 bg-background-base shadow-lg dark:border-primary-base-dark/20 dark:bg-background-base-dark">
            <div className="relative aspect-[3/4] w-full">
              <div className="absolute left-0 top-0 z-10 w-full border-b border-primary-base/10 bg-gradient-to-r from-primary-base/5 to-accent-base/5 px-4 py-3 backdrop-blur-sm dark:border-primary-base-dark/10 dark:from-primary-base-dark/5 dark:to-accent-base-dark/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <span className="font-space-grotesk text-xs font-medium text-primary-base/80 dark:text-primary-base-dark/80">
                      Professional Profile
                    </span>
                  </div>
                  <span className="font-mono text-xs text-primary-base/60 dark:text-primary-base-dark/60">
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
                className="text-pretty font-raleway leading-relaxed text-default-base/80 dark:text-default-base-dark/80 md:text-justify md:text-base"
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
            <div className="flex items-center gap-3 rounded-lg border border-primary-base/50 bg-background-base/50 px-3 py-3 transition-colors duration-300 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30">
              <Award className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
              <div>
                <div className="font-space-grotesk text-sm font-medium text-primary-base-dark">
                  15+ Projects
                </div>
                <div className="text-xs text-default-base/60 dark:text-default-base-dark/60">
                  Delivered
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-primary-base/50 bg-background-base/50 px-3 py-3 transition-colors duration-300 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30">
              <CheckCircle className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
              <div>
                <div className="font-space-grotesk text-sm font-medium text-primary-base-dark">
                  100% Satisfaction
                </div>
                <div className="text-xs text-default-base/60 dark:text-default-base-dark/60">
                  Client feedback
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-primary-base/50 bg-background-base/50 px-3 py-3 transition-colors duration-300 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30">
              <Users className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
              <div>
                <div className="font-space-grotesk text-sm font-medium text-primary-base-dark">
                  5+ Industries
                </div>
                <div className="text-xs text-default-base/60 dark:text-default-base-dark/60">
                  Experience across
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-primary-base/50 bg-background-base/50 px-3 py-3 transition-colors duration-300 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30">
              <Clock className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
              <div>
                <div className="font-space-grotesk text-sm font-medium text-primary-base-dark">
                  3+ Years
                </div>
                <div className="text-xs text-default-base/60 dark:text-default-base-dark/60">
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
                className="rounded-lg border border-primary-base/50 bg-background-base/50 px-5 py-4 transition-colors duration-300 hover:border-primary-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-primary-base-dark/30"
              >
                {/* Header */}
                <div className="flex items-center gap-2">
                  {index === 0 ? (
                    <MonitorPlay className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
                  ) : (
                    <Trophy className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
                  )}
                  <h3 className="font-space-grotesk text-sm font-medium text-primary-base-dark">
                    {section.type}
                  </h3>
                </div>

                {/* List */}
                <div className="mt-4">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-primary-base/20 py-2 pl-4 text-sm text-default-base/80 transition-colors duration-300 hover:border-primary-base/50 hover:text-default-base dark:border-primary-base-dark/20 dark:text-default-base-dark/80 dark:hover:border-primary-base-dark/40 dark:hover:text-default-base-dark"
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
