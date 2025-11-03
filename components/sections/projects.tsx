"use client";

import { trackEvent } from "@/lib/services/analytics";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { projectsData, projectsSection } from "@/lib/data";
import { Code2 } from "lucide-react";
import TerminalInfo from "@/components/ui/terminal-info";
import OtherProjectCard from "@/components/cards/other-project-card";
import FeaturedProjectCard from "@/components/cards/featured-project-card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeInUp } from "@/lib/animation-presets";

export default function Projects() {
  // Lower threshold for projects section due to complex layout
  const { ref } = useSectionInView("projects", {
    mobileThreshold: 0.1,
    desktopThreshold: 0.3,
  });

  // Data filtering
  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  // Analytics tracking
  useEffect(() => {
    trackEvent("projects_view", "section", "projects");
  }, []);

  const handleProjectClick = (
    projectName: string,
    type: "github" | "live" | "view",
  ) => {
    trackEvent("project_click", "project", `${type}_${projectName}`);
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="relative scroll-mt-28 px-4 pb-10 sm:pb-12 lg:pb-16"
    >
      <div className="relative">
        <SectionHeader
          title={projectsSection.title}
          subtitle={projectsSection.subtitle}
          align="left"
        />

        {/* Terminal-style description */}
        <div className="mt-6 w-fit">
          <TerminalInfo
            command={projectsSection.terminalInfo.command}
            flag={projectsSection.terminalInfo.flag}
            content={projectsSection.terminalInfo.content}
          />
        </div>

        {/* Featured Projects */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.title, "view")}
            >
              <FeaturedProjectCard
                project={{
                  ...project,
                  links: {
                    github: project.links.github || undefined,
                    live: project.links.live || undefined,
                  },
                }}
              />
            </div>
          ))}
        </div>

        {/* Other Projects Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-16"
        >
          {/* Section Divider with Text */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-base/50 dark:border-primary-base-dark/50" />
            </div>
            <div className="relative flex items-center gap-2 rounded-full border border-primary-base/50 bg-background-base/95 px-4 py-2 backdrop-blur-sm dark:border-primary-base-dark/30 dark:bg-background-base-dark/95">
              <Code2 className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
              <span className="text-sm text-primary-base dark:text-primary-base-dark">
                More Projects
              </span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.title, "view")}
              >
                <OtherProjectCard
                  project={{
                    ...project,
                    links: {
                      github: project.links.github || undefined,
                      live: project.links.live || undefined,
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
