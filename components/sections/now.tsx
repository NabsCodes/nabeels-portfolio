"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Clock, Activity, MapPin, Code2 } from "lucide-react";
import { SiSpotify, SiGithub } from "react-icons/si";
import TerminalInfo from "@/components/ui/terminal-info";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { staggerContainer, fadeInUp } from "@/lib/animation-presets";

export default function Now() {
  const { ref } = useSectionInView("now", {
    desktopThreshold: 0.5,
  });

  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  // Update time every second (only on client)
  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  return (
    <section
      ref={ref}
      id="now"
      className="relative scroll-mt-12 px-4 py-10 sm:py-12 lg:py-16"
    >
      <SectionHeader title="Now" subtitle="presence" align="left" />

      {/* Terminal-style description */}
      <div className="mt-6 w-fit">
        <TerminalInfo
          command="status"
          flag="--fetch"
          content="Real-time glimpse into my developer life"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Spotify Card */}
        <motion.div
          variants={fadeInUp}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 group relative overflow-hidden rounded-xl border transition-colors duration-300"
        >
          <div className="relative p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <SiSpotify className="h-6 w-6 text-green-500" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-space-grotesk text-default-base/50 dark:text-default-base-dark/50 text-xs font-medium tracking-wider uppercase">
                  Spotify
                </h3>
                <p className="text-default-base dark:text-default-base-dark mt-1 truncate font-medium">
                  Not playing
                </p>
                <p className="text-default-base/60 dark:text-default-base-dark/60 mt-0.5 text-sm">
                  Offline
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GitHub Card */}
        <motion.div
          variants={fadeInUp}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 overflow-hidden rounded-xl border transition-colors duration-300"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <SiGithub className="text-default-base dark:text-default-base-dark h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-space-grotesk text-default-base/50 dark:text-default-base-dark/50 text-xs font-medium tracking-wider uppercase">
                  GitHub
                </h3>
                <p className="text-default-base dark:text-default-base-dark mt-1 truncate font-medium">
                  nabeels-portfolio
                </p>
                <p className="text-default-base/60 dark:text-default-base-dark/60 mt-0.5 truncate text-sm">
                  Building in public
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coding Activity Card */}
        <motion.div
          variants={fadeInUp}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 overflow-hidden rounded-xl border transition-colors duration-300"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Code2 className="text-primary-base dark:text-primary-base-dark h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-space-grotesk text-default-base/50 dark:text-default-base-dark/50 text-xs font-medium tracking-wider uppercase">
                  Currently Building
                </h3>
                <p className="text-default-base dark:text-default-base-dark mt-1 font-medium">
                  Full-stack apps
                </p>
                <p className="text-default-base/60 dark:text-default-base-dark/60 mt-0.5 text-sm">
                  TypeScript • Next.js • React
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {/* Local Time */}
        <motion.div
          variants={fadeInUp}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 rounded-xl border p-4"
        >
          <div className="flex items-center gap-3">
            <Clock className="text-primary-base dark:text-primary-base-dark h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-default-base/50 dark:text-default-base-dark/50 text-xs tracking-wider uppercase">
                Local Time
              </p>
              <p className="text-default-base dark:text-default-base-dark mt-0.5 font-mono text-sm font-medium">
                {isClient ? currentTime : "--:--:--"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          variants={fadeInUp}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 rounded-xl border p-4"
        >
          <div className="flex items-center gap-3">
            <MapPin className="text-primary-base dark:text-primary-base-dark h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-default-base/50 dark:text-default-base-dark/50 text-xs tracking-wider uppercase">
                Location
              </p>
              <p className="text-default-base dark:text-default-base-dark mt-0.5 text-sm font-medium">
                Nigeria
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status */}
        <motion.div
          variants={fadeInUp}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 rounded-xl border p-4"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-default-base/50 dark:text-default-base-dark/50 text-xs tracking-wider uppercase">
                Status
              </p>
              <p className="text-default-base dark:text-default-base-dark mt-0.5 text-sm font-medium">
                Available
              </p>
            </div>
          </div>
        </motion.div>

        {/* Response Time */}
        <motion.div
          variants={fadeInUp}
          className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 rounded-xl border p-4"
        >
          <div className="flex items-center gap-3">
            <Activity className="text-primary-base dark:text-primary-base-dark h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-default-base/50 dark:text-default-base-dark/50 text-xs tracking-wider uppercase">
                Response
              </p>
              <p className="text-default-base dark:text-default-base-dark mt-0.5 text-sm font-medium">
                ~2 hours
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
