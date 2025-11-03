"use client";

import { trackEvent } from "@/lib/services/analytics";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { projectsData, projectsSection } from "@/lib/data";
import { Code2 } from "lucide-react";
import TerminalInfo from "@/components/ui/terminal-info";
import OtherProjectCard from "@/components/cards/other-project-card";
import FeaturedProjectCard from "@/components/cards/featured-project-card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeInUp } from "@/lib/animation-presets";
import { ProjectFilter } from "@/components/ui/project-filter";

export default function Projects() {
  // Lower threshold for projects section due to complex layout
  const { ref } = useSectionInView("projects", {
    mobileThreshold: 0.1,
    desktopThreshold: 0.3,
  });

  // Filter state with localStorage persistence
  const [activeFilter, setActiveFilter] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("projectFilter");
      return saved || "All";
    }
    return "All";
  });

  // Extract unique tech stacks and calculate filter options
  const filterOptions = useMemo(() => {
    const techMap = new Map<string, number>();

    projectsData.forEach((project) => {
      project.tech.forEach((tech) => {
        techMap.set(tech.name, (techMap.get(tech.name) || 0) + 1);
      });
    });

    // Sort by count (descending) and then alphabetically
    const techOptions = Array.from(techMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (b.count === a.count) {
          return a.name.localeCompare(b.name);
        }
        return b.count - a.count;
      });

    // Add "All" option at the beginning
    return [{ name: "All", count: projectsData.length }, ...techOptions];
  }, []);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projectsData;
    }
    return projectsData.filter((project) =>
      project.tech.some((tech) => tech.name === activeFilter),
    );
  }, [activeFilter]);

  // Split into featured and other
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  // Handle filter change with localStorage
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (typeof window !== "undefined") {
      localStorage.setItem("projectFilter", filter);
    }
    trackEvent("project_filter", "interaction", filter);
  };

  // Handle tech badge click from cards
  const handleTechClick = (techName: string) => {
    setActiveFilter(techName);
    if (typeof window !== "undefined") {
      localStorage.setItem("projectFilter", techName);
    }
    trackEvent("project_tech_badge_click", "interaction", techName);
    // Smooth scroll to top of section
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Listen for filter events from command palette
  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveFilter(customEvent.detail);
        if (typeof window !== "undefined") {
          localStorage.setItem("projectFilter", customEvent.detail);
        }
      }
    };

    window.addEventListener("filterProjects", handleFilterEvent);
    return () =>
      window.removeEventListener("filterProjects", handleFilterEvent);
  }, []);

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

        {/* Project Filter */}
        <div className="mt-8">
          <ProjectFilter
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Featured Projects */}
        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          layout
        >
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
                onTechClick={handleTechClick}
              />
            </div>
          ))}
        </motion.div>

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
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            layout
          >
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
                  onTechClick={handleTechClick}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
