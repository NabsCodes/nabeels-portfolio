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
      <div className="absolute top-20 right-10 hidden h-full lg:block xl:top-3 xl:right-0">
        <div className="bg-primary-base dark:bg-primary-base-dark/20 relative h-full w-[1.5px] dark:w-[2px]">
          <div className="absolute bottom-20 -left-[150px] flex h-full flex-col justify-center space-y-16 xl:bottom-0">
            {heroContent.roles.map((item, index) => (
              <motion.div
                key={index}
                variants={slideInLeft}
                custom={getStaggerDelay(index, 0.3)}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <item.icon className="text-primary-base dark:text-primary-base-dark/80 h-5 w-5" />
                <span className="font-space-grotesk text-primary-base dark:text-primary-base-dark/80 text-sm">
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
            className="bg-background-base dark:bg-background-base-dark flex items-center space-x-2 border-0"
            duration={1.5}
          >
            <span className="font-space-grotesk text-primary-base-dark dark:text-primary-base-dark/90 text-xs tracking-wider">
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
                <span className="text-primary-base-dark ml-2">
                  Welcome! I&apos;m
                </span>
              </div>

              <h1 className="from-primary-base-dark via-accent-base-dark/70 to-primary-base font-raleway dark:from-primary-base-dark dark:via-accent-base-dark dark:to-primary-base-dark relative mb-2 bg-linear-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
                {heroContent.personal.name}
                <span className="font-space-grotesk text-primary-base dark:text-primary-base-dark/40 absolute top-5 -right-8 text-lg">
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
                <span className="text-primary-base-dark ml-2">
                  Also known as {heroContent.personal.nickname}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Role Title with Terminal-like Design */}
          <motion.div variants={scaleIn} className="mb-8">
            <div className="border-primary-base/50 bg-background-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 inline-block rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
                </div>
                <span className="font-space-grotesk text-primary-base/80 dark:text-primary-base-dark/70 ml-2 text-sm">
                  {heroContent.currentRole.filename}
                </span>
              </div>
              <h2 className="font-space-grotesk text-primary-base-dark dark:text-primary-base-dark mt-3 text-xl font-medium">
                {heroContent.currentRole.title}
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 w-full lg:max-w-[730px]"
          >
            <div className="border-primary-base/50 bg-background-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 relative rounded-lg border p-4 backdrop-blur-sm">
              <div className="bg-background-base dark:bg-background-base-dark absolute top-0 left-4 -translate-y-1/2 rounded-sm px-2 py-0.5">
                <span className="text-primary-base-dark/70 dark:text-primary-base-dark/70 font-mono text-xs">
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
                className="group bg-secondary-base text-default-base hover:bg-primary-base/90 dark:bg-primary-base-dark/80 dark:text-default-base-dark dark:hover:bg-primary-base-dark/10 relative h-12 overflow-hidden rounded-lg px-4 py-2 transition-all sm:px-8"
                size="lg"
              >
                <span className="font-space-grotesk relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="bg-accent-base dark:bg-accent-base-dark/20 absolute inset-0 -z-10 transition-transform duration-500 group-hover:translate-x-full" />
              </Button>
            </Link>

            <Link
              href={heroContent.cta.secondary.href}
              target="_blank"
              onClick={handleResumeClick}
            >
              <Button
                variant="outline"
                className="group border-primary-base/50 bg-background-base/50 font-space-grotesk text-primary-base-dark hover:bg-primary-base/10 hover:text-primary-base-dark dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 dark:hover:bg-primary-base-dark/10 h-12 overflow-hidden px-4 transition-all duration-300 sm:px-8"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PiReadCvLogoLight className="h-5 w-5 group-hover:-rotate-12" />
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
            <span className="font-space-grotesk text-primary-base-dark dark:text-primary-base-dark text-sm">
              Connect:
            </span>
            <div className="flex gap-3">
              <Link
                href={heroContent.social.github}
                onClick={() => handleSocialClick("github")}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-primary-base-dark/50 hover:border-primary-base-dark/40 hover:bg-primary-base-dark/5 dark:border-primary-base-dark/30 dark:hover:border-primary-base-dark/50 dark:hover:bg-primary-base-dark/10 rounded-full border p-2.5 transition-all"
              >
                <SiGithub className="text-primary-base-dark/70 group-hover:text-primary-base-dark dark:text-primary-base-dark/60 dark:group-hover:text-primary-base-dark h-5 w-5 transition-colors" />
              </Link>
              <Link
                href={heroContent.social.linkedin}
                onClick={() => handleSocialClick("linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-primary-base-dark/50 hover:border-primary-base-dark/40 hover:bg-primary-base-dark/5 dark:border-primary-base-dark/30 dark:hover:border-primary-base-dark/50 dark:hover:bg-primary-base-dark/10 rounded-full border p-2.5 transition-all"
              >
                <SiLinkedin className="text-primary-base-dark/70 group-hover:text-primary-base-dark dark:text-primary-base-dark/60 dark:group-hover:text-primary-base-dark h-5 w-5 transition-colors" />
              </Link>
            </div>
          </motion.div>

          {/* Command Palette Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-primary-base-dark dark:text-primary-base-dark mt-6 hidden items-center gap-2 font-mono text-xs md:flex"
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
