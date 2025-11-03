"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { heroContent } from "@/lib/data";
import { MobileRolesSidebar } from "@/components/ui/mobile-roles";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { PiReadCvLogoLight } from "react-icons/pi";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { trackEvent } from "@/lib/services/analytics";
import { Kbd } from "@/components/ui/kbd";
import {
  fadeInUp,
  scaleIn,
  slideInLeft,
  staggerContainer,
  getStaggerDelay,
} from "@/lib/animation-presets";

export default function Hero() {
  const { ref } = useSectionInView("home");

  // Analytics Tracking
  const handleSocialClick = (platform: string) => {
    trackEvent("social_click", "social", platform);
  };

  const handleResumeClick = () => {
    trackEvent("resume_download", "resume", "hero");
  };

  const handleProjectsClick = () => {
    trackEvent("projects_click", "projects", "hero");
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 sm:pt-24 md:pt-20"
    >
      {/* Dynamic Side Roles - Desktop only */}
      <div className="absolute right-10 top-20 hidden h-full lg:block xl:right-0 xl:top-3">
        <div className="relative h-full w-[1.5px] bg-primary-base dark:w-[2px] dark:bg-primary-base-dark/20">
          <div className="absolute -left-[150px] bottom-20 flex h-full flex-col justify-center space-y-16 xl:bottom-0">
            {heroContent.roles.map((item, index) => (
              <motion.div
                key={index}
                variants={slideInLeft}
                custom={getStaggerDelay(index, 0.3)}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <item.icon className="h-5 w-5 text-primary-base dark:text-primary-base-dark/80" />
                <span className="font-space-grotesk text-sm text-primary-base dark:text-primary-base-dark/80">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full"
      >
        {/* Code-style intro */}
        <motion.div variants={fadeInUp} className="mb-8">
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="flex items-center space-x-2 border-0 bg-background-base dark:bg-background-base-dark"
            duration={1.5}
          >
            <span className="font-space-grotesk text-xs tracking-wider text-primary-base-dark dark:text-primary-base-dark/90">
              <span className="text-primary-base dark:text-primary-base-dark">
                {"<"}
              </span>
              {heroContent.intro}
              <span className="text-primary-base dark:text-primary-base-dark">
                {"/>"}
              </span>
            </span>
          </HoverBorderGradient>
        </motion.div>

        {/* Main Content */}
        <div className="relative">
          {/* Name Section with Terminal-style Decoration */}
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="inline-block">
              <div className="mb-2 font-mono text-sm">
                <span className="text-accent-base dark:text-accent-base-dark">
                  hello{" "}
                </span>
                <span className="text-primary-base/70 dark:text-primary-base-dark/70">
                  {">"}
                </span>
                <span className="ml-2 text-primary-base-dark">
                  Welcome! I&apos;m
                </span>
              </div>

              <h1 className="relative mb-2 bg-gradient-to-r from-primary-base-dark via-accent-base-dark/70 to-primary-base bg-clip-text font-raleway text-4xl font-bold tracking-tight text-transparent dark:from-primary-base-dark dark:via-accent-base-dark dark:to-primary-base-dark sm:text-6xl md:text-7xl">
                {heroContent.personal.name}
                <span className="absolute -right-8 top-5 font-space-grotesk text-lg text-primary-base dark:text-primary-base-dark/40">
                  _
                </span>
              </h1>

              <div className="mt-2 font-mono text-sm">
                <span className="text-accent-base dark:text-accent-base-dark">
                  nickname{" "}
                </span>
                <span className="text-primary-base/70 dark:text-primary-base-dark/70">
                  {">"}
                </span>
                <span className="ml-2 text-primary-base-dark">
                  Also known as {heroContent.personal.nickname}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Role Title with Terminal-like Design */}
          <motion.div variants={scaleIn} className="mb-8">
            <div className="inline-block rounded-lg border border-primary-base/50 bg-background-base/60 p-4 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
                </div>
                <span className="ml-2 font-space-grotesk text-sm text-primary-base/80 dark:text-primary-base-dark/70">
                  {heroContent.currentRole.filename}
                </span>
              </div>
              <h2 className="mt-3 font-space-grotesk text-xl font-medium text-primary-base-dark dark:text-primary-base-dark">
                {heroContent.currentRole.title}
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 w-full lg:max-w-[730px]"
          >
            <div className="relative rounded-lg border border-primary-base/50 bg-background-base/60 p-4 backdrop-blur-sm dark:border-primary-base-dark/20 dark:bg-background-base-dark/50">
              <div className="absolute left-4 top-0 -translate-y-1/2 rounded-sm bg-background-base px-2 py-0.5 dark:bg-background-base-dark">
                <span className="font-mono text-xs text-primary-base-dark/70 dark:text-primary-base-dark/70">
                  README.md
                </span>
              </div>
              <TextGenerateEffect
                words={heroContent.description}
                textSpeed={10}
              />
            </div>
          </motion.div>

          {/* Mobile/Tablet Roles */}
          <MobileRolesSidebar />

          {/* CTA Section */}
          <motion.div variants={fadeInUp} className="flex gap-4 sm:flex-row">
            <Link
              href={heroContent.cta.primary.href}
              onClick={handleProjectsClick}
            >
              <Button
                className="group relative h-12 overflow-hidden rounded-lg bg-secondary-base px-4 py-2 text-default-base transition-all hover:bg-primary-base/90 dark:bg-primary-base-dark/80 dark:text-default-base-dark dark:hover:bg-primary-base-dark/10 sm:px-8"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2 font-space-grotesk">
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-10 bg-accent-base transition-transform duration-500 group-hover:translate-x-full dark:bg-accent-base-dark/20" />
              </Button>
            </Link>

            <Link
              href={heroContent.cta.secondary.href}
              target="_blank"
              onClick={handleResumeClick}
            >
              <Button
                variant="outline"
                className="group h-12 overflow-hidden border-primary-base/50 bg-background-base/50 px-4 font-space-grotesk text-primary-base-dark transition-all duration-300 hover:bg-primary-base/10 hover:text-primary-base-dark dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 dark:hover:bg-primary-base-dark/10 sm:px-8"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PiReadCvLogoLight className="h-5 w-5 group-hover:-rotate-[12deg]" />
                  Resume
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex items-center gap-4"
          >
            <span className="font-space-grotesk text-sm text-primary-base-dark dark:text-primary-base-dark">
              Connect:
            </span>
            <div className="flex gap-3">
              <Link
                href={heroContent.social.github}
                onClick={() => handleSocialClick("github")}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-primary-base-dark/50 p-2.5 transition-all hover:border-primary-base-dark/40 hover:bg-primary-base-dark/5 dark:border-primary-base-dark/30 dark:hover:border-primary-base-dark/50 dark:hover:bg-primary-base-dark/10"
              >
                <SiGithub className="h-5 w-5 text-primary-base-dark/70 transition-colors group-hover:text-primary-base-dark dark:text-primary-base-dark/60 dark:group-hover:text-primary-base-dark" />
              </Link>
              <Link
                href={heroContent.social.linkedin}
                onClick={() => handleSocialClick("linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-primary-base-dark/50 p-2.5 transition-all hover:border-primary-base-dark/40 hover:bg-primary-base-dark/5 dark:border-primary-base-dark/30 dark:hover:border-primary-base-dark/50 dark:hover:bg-primary-base-dark/10"
              >
                <SiLinkedin className="h-5 w-5 text-primary-base-dark/70 transition-colors group-hover:text-primary-base-dark dark:text-primary-base-dark/60 dark:group-hover:text-primary-base-dark" />
              </Link>
            </div>
          </motion.div>

          {/* Command Palette Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 hidden items-center gap-2 font-mono text-xs text-primary-base-dark dark:text-primary-base-dark md:flex"
          >
            <span>Quick search:</span>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span className="text-primary-base-dark dark:text-primary-base-dark">
              or
            </span>
            <Kbd>/</Kbd>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
