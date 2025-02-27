"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "../ui/sparkles";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { heroContent } from "@/lib/data";
import { MobileRolesSidebar } from "../ui/mobile-roles";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { PiReadCvLogoLight } from "react-icons/pi";
import { useSectionInView } from "@/hooks/useSectionInView";
import { trackEvent } from "@/utils/analytics";

export default function Hero() {
  const { ref } = useSectionInView("home", 0.5);
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

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

  // Mobile/Tablet roles that appear after description
  const MobileRoles = MobileRolesSidebar;

  return (
    <section
      id="home"
      ref={ref}
      className="bg-background-base dark:bg-background-base-dark relative flex w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 sm:pt-24 md:pt-28 lg:pt-20"
    >
      {/* Matrix-like animated background */}
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={theme === "dark" ? 1.2 : 1.6}
          particleDensity={theme === "dark" ? 120 : 140}
          className="h-full w-full"
          particleColor={theme === "dark" ? "#71a295" : "#365e53"}
        />
      </div>

      {/* Dynamic Side Roles - Desktop only */}
      <div className="absolute top-20 right-10 hidden h-full lg:block xl:top-3 xl:right-0">
        <div className="bg-primary-base dark:bg-primary-base-dark/10 relative h-full w-[1.5px] dark:w-[2px]">
          <div className="absolute bottom-20 -left-[150px] flex h-full flex-col justify-center space-y-16 xl:bottom-0">
            {heroContent.roles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full"
      >
        {/* Code-style intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl"
        >
          <HoverBorderGradient
            containerClassName="rounded-full backdrop-blur-xs"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="border-primary-base/50 bg-background-base/60 dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 inline-block rounded-lg border p-4 backdrop-blur-xs">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 max-w-4xl"
          >
            <TextGenerateEffect words={heroContent.description} />
          </motion.div>

          {/* Mobile/Tablet Roles */}
          <MobileRoles />

          {/* CTA Section with Original Transition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 sm:flex-row"
          >
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
                className="group border-primary-base/50 bg-background-base/50 font-space-grotesk text-primary-base-dark hover:bg-primary-base/10 hover:text-primary-base-dark dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 dark:hover:bg-primary-base-dark/10 h-12 overflow-hidden px-4 backdrop-blur-xs transition-all duration-300 sm:px-8"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12"
          >
            <div className="border-primary-base/50 bg-background-base dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 inline-flex items-center gap-4 rounded-lg border p-2 backdrop-blur-xs">
              <Link
                href={heroContent.social.github}
                onClick={() => handleSocialClick("github")}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-primary-base/10 dark:hover:bg-primary-base-dark/10 relative rounded-md p-2 transition-colors"
              >
                <SiGithub className="text-primary-base-dark group-hover:text-primary-base/80 dark:text-primary-base-dark dark:group-hover:text-primary-base-dark/80 h-5 w-5 transition-colors" />
              </Link>

              <div className="border-primary-base dark:border-primary-base-dark/30 h-5 w-1 border-r"></div>

              <Link
                href={heroContent.social.linkedin}
                onClick={() => handleSocialClick("linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-primary-base/10 dark:hover:bg-primary-base-dark/10 relative rounded-md p-2 transition-colors"
              >
                <SiLinkedin className="text-primary-base-dark group-hover:text-primary-base/80 dark:text-primary-base-dark dark:group-hover:text-primary-base-dark/80 h-5 w-5 transition-colors" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
