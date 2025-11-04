"use client";

import { trackEvent } from "@/lib/services/analytics";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { projectsData, projectsSection } from "@/lib/data";
import { Code2, FolderX } from "lucide-react";
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

  // Get valid filter option names for validation
  const validFilterNames = useMemo(
    () => new Set(filterOptions.map((opt) => opt.name)),
    [filterOptions],
  );

  // Filter state with localStorage persistence (client-only hydration)
  const [activeFilter, setActiveFilter] = useState<string>("All");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("projectFilter");
      if (saved && (saved === "All" || validFilterNames.has(saved))) {
        setActiveFilter(saved);
      }
    }
  }, [validFilterNames]);

  // Validate and reset filter if it becomes invalid (e.g., stale localStorage value)
  useEffect(() => {
    if (activeFilter !== "All" && !validFilterNames.has(activeFilter)) {
      setActiveFilter("All");
      if (typeof window !== "undefined") {
        localStorage.setItem("projectFilter", "All");
      }
    }
  }, [activeFilter, validFilterNames]);

  // Unified filter change handler - single source of truth
  const handleFilterChange = useCallback(
    (filter: string, source: "filter" | "tech" | "command" = "filter") => {
      // Validate filter before setting
      if (filter === "All" || validFilterNames.has(filter)) {
        setActiveFilter(filter);
        if (typeof window !== "undefined") {
          localStorage.setItem("projectFilter", filter);
        }
        // Track analytics based on source
        if (source === "filter") {
          trackEvent("project_filter", "interaction", filter);
        } else if (source === "tech") {
          trackEvent("project_tech_badge_click", "interaction", filter);
        } else {
          trackEvent("project_filter", "command_palette", filter);
        }
      } else {
        // Fallback to "All" if invalid filter
        setActiveFilter("All");
        if (typeof window !== "undefined") {
          localStorage.setItem("projectFilter", "All");
        }
      }
    },
    [validFilterNames],
  );

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
  const featuredProjects = useMemo(
    () => filteredProjects.filter((p) => p.featured),
    [filteredProjects],
  );
  const otherProjects = useMemo(
    () => filteredProjects.filter((p) => !p.featured),
    [filteredProjects],
  );

  // Check if there are no projects at all (not filtered, but empty data)
  const hasNoProjects = projectsData.length === 0;

  // Handle tech badge click from cards
  const handleTechClick = (techName: string) => {
    handleFilterChange(techName, "tech");
    // Smooth scroll to top of section
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Listen for filter events from command palette
  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        handleFilterChange(customEvent.detail, "command");
      }
    };

    window.addEventListener("filterProjects", handleFilterEvent);
    return () =>
      window.removeEventListener("filterProjects", handleFilterEvent);
  }, [handleFilterChange]);

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
            onFilterChange={(filter) => handleFilterChange(filter, "filter")}
          />
        </div>

        {/* Empty State */}
        <AnimatePresence mode="wait">
          {hasNoProjects ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="bg-primary-base/10 dark:bg-primary-base-dark/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              >
                <FolderX className="text-primary-base dark:text-primary-base-dark h-10 w-10" />
              </motion.div>

              <h3 className="font-space-grotesk text-default-base dark:text-default-base-dark mb-2 text-xl font-semibold sm:text-2xl">
                No projects available
              </h3>

              <p className="text-default-base/70 dark:text-default-base-dark/70 mb-6 max-w-md text-sm sm:text-base">
                There are currently no projects to display. Check back soon for
                updates!
              </p>
            </motion.div>
          ) : (
            <>
              {/* Featured Projects */}
              {featuredProjects.length > 0 && (
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
              )}

              {/* Other Projects Section */}
              {otherProjects.length > 0 && (
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
                      <div className="border-primary-base/50 dark:border-primary-base-dark/50 w-full border-t" />
                    </div>
                    <div className="border-primary-base/50 bg-background-base/95 dark:border-primary-base-dark/30 dark:bg-background-base-dark/95 relative flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                      <Code2 className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
                      <span className="text-primary-base dark:text-primary-base-dark text-sm">
                        More Projects
                      </span>
                    </div>
                  </div>

                  {/* Projects Grid */}
                  <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    layout
                  >
                    {otherProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() =>
                          handleProjectClick(project.title, "view")
                        }
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
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
