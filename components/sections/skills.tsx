"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { skillsContent } from "@/lib/data";
import { Code2 } from "lucide-react";
import TerminalInfo from "@/components/ui/terminal-info";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { staggerContainer, fadeInUp } from "@/lib/animation-presets";

const Skills = () => {
  const { ref } = useSectionInView("skills", {
    desktopThreshold: 0.8,
  });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative scroll-mt-12 px-4 py-10 sm:py-12 lg:py-16"
    >
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-primary-base/5 dark:bg-primary-base-dark/5 absolute top-1/2 -left-4 h-64 w-64 rounded-full blur-3xl" />
          <div className="bg-accent-base/5 dark:bg-accent-base-dark/5 absolute top-1/4 -right-4 h-64 w-64 rounded-full blur-3xl" />
        </div>

        <SectionHeader
          title={skillsContent.title}
          subtitle={skillsContent.subtitle}
          align="left"
        />

        {/* Terminal-style description */}
        <div className="mt-6 w-fit">
          <TerminalInfo
            command={skillsContent.terminalInfo.command}
            flag={skillsContent.terminalInfo.flag}
            content={skillsContent.terminalInfo.content}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillsContent.groups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeInUp}
              className="border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 relative h-full rounded-xl border p-6"
            >
              {/* Decorative gradient */}
              <div className="from-primary-base/10 dark:from-primary-base-dark/5 absolute inset-0 -z-10 bg-linear-to-br via-transparent to-transparent" />

              {/* Group header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 inline-flex items-center gap-2 rounded-full px-3 py-1">
                  <Code2 className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
                  <h3 className="from-primary-base to-accent-base font-space-grotesk dark:from-primary-base-dark dark:to-accent-base-dark bg-linear-to-r bg-clip-text text-sm font-medium text-transparent">
                    {group.title}
                  </h3>
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="group border-primary-base/30 bg-background-base/80 hover:border-primary-base/30 dark:border-primary-base-dark/10 dark:bg-background-base-dark/80 dark:hover:border-primary-base-dark/30 flex flex-col items-center justify-center gap-2 rounded-lg border p-3 backdrop-blur-sm transition-all hover:shadow-sm"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <skill.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-6 w-6 transition-colors" />
                    <span className="text-default-base/70 group-hover:text-default-base dark:text-default-base-dark/70 dark:group-hover:text-default-base-dark text-center text-xs font-medium transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom border line */}
              <div className="via-primary-base/80 dark:via-primary-base-dark/20 mt-6 h-px w-full bg-linear-to-r from-transparent to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
