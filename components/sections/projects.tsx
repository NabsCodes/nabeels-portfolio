"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/section-header";
import { projectsData, projectsSection } from "@/lib/data";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";
import TerminalInfo from "../ui/terminal-info";
import OtherProjectCard from "../common/other-project-card";
import FeaturedProjectCard from "../common/featured-project-card";
import { useSection } from "@/hooks/useSection";
import { useSectionInView } from "@/hooks/useSectionInView";

export default function Projects() {
  const { ref } = useSectionInView("projects", 0.5);

  const [showAllProjects, setShowAllProjects] = useState(false);

  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);
  const displayedOtherProjects = showAllProjects
    ? otherProjects
    : otherProjects.slice(0, 3);

  return (
    <section
      ref={ref}
      id="projects"
      className="scroll-mt-12 px-4 py-16 md:px-6"
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
            // <motion.div
            //   key={project.id}
            //   initial={{ opacity: 0, y: 20 }}
            //   whileInView={{ opacity: 1, y: 0 }}
            //   transition={{ duration: 0.3, delay: index * 0.1 }}
            //   viewport={{ once: true }}
            //   className="group relative"
            // >
            //   <div className="relative flex h-[28rem] flex-col overflow-hidden rounded-lg border border-primary-base/30 bg-background-base/80 backdrop-blur-sm transition-colors hover:border-primary-base/50 dark:border-primary-base-dark/10 dark:bg-background-base-dark/80 dark:hover:border-primary-base-dark/30">
            //     {/* Project Header */}
            //     <div className="border-b border-primary-base/10 bg-primary-base/5 px-5 py-4 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/5">
            //       <div className="flex items-center justify-between">
            //         <div className="flex items-center gap-3">
            //           <Code2 className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
            //           <h3 className="bg-gradient-to-r from-primary-base to-accent-base bg-clip-text font-space-grotesk text-sm font-medium text-transparent transition-colors dark:from-primary-base-dark dark:to-accent-base-dark">
            //             {project.title}
            //           </h3>
            //         </div>
            //         {project.featured && (
            //           <span className="rounded-full bg-primary-base/10 px-2 py-0.5 text-xs text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark">
            //             Featured
            //           </span>
            //         )}
            //       </div>
            //     </div>

            //     {/* Project Image - 40% of height */}
            //     <div className="relative h-[40%] w-full">
            //       {project.cover && (
            //         <Image
            //           src={project.cover.url}
            //           alt={project.cover.alt}
            //           fill
            //           className="object-cover object-center"
            //         />
            //       )}
            //       <div className="absolute inset-0 bg-gradient-to-t from-background-base-dark/50 via-background-base-dark/50 to-transparent" />
            //     </div>

            //     {/* Content section with fixed spacing */}
            //     <div className="flex flex-1 flex-col justify-between p-5">
            //       {/* Upper content group */}
            //       <div className="space-y-4">
            //         {/* Description with fixed height */}
            //         <p className="line-clamp-3 min-h-[3rem] text-sm text-default-base/70 dark:text-default-base-dark/70">
            //           {project.description}
            //         </p>

            //         {/* Tech stack with fixed height and scrolling if needed */}
            //         <div className="max-h-[4.5rem] overflow-y-auto">
            //           <div className="flex flex-wrap gap-1.5">
            //             {project.tech.map(({ name, icon: Icon }) => (
            //               <div
            //                 key={name}
            //                 className="flex items-center gap-1.5 rounded-full bg-primary-base/10 px-2.5 py-1 text-xs text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark"
            //               >
            //                 <Icon className="h-3 w-3" />
            //                 <span>{name}</span>
            //               </div>
            //             ))}
            //           </div>
            //         </div>
            //       </div>

            //       {/* Links always at bottom */}
            //       <div className="flex items-center gap-3">
            //         {project.links.github && (
            //           <a
            //             href={project.links.github}
            //             target="_blank"
            //             rel="noopener noreferrer"
            //             className="flex items-center gap-2 rounded-lg border border-primary-base/20 bg-primary-base/5 px-3 py-1.5 text-sm text-primary-base transition-all hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10"
            //           >
            //             <FiGithub className="h-4 w-4" />
            //             <span>View Code</span>
            //           </a>
            //         )}
            //         {project.links.live && (
            //           <a
            //             href={project.links.live}
            //             target="_blank"
            //             rel="noopener noreferrer"
            //             className="flex items-center gap-2 rounded-lg border border-primary-base/20 bg-primary-base/5 px-3 py-1.5 text-sm text-primary-base transition-all hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10"
            //           >
            //             <ExternalLink className="h-4 w-4" />
            //             <span>Live Demo</span>
            //           </a>
            //         )}
            //       </div>
            //     </div>
            //   </div>
            // </motion.div>
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Other Projects Section */}
        <div className="relative mt-16">
          {/* Section Divider with Text */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-base/20 dark:border-primary-base-dark/20" />
            </div>
            <div className="relative flex items-center gap-2 rounded-full border border-primary-base/20 bg-background-base/95 px-4 py-2 backdrop-blur-sm dark:border-primary-base-dark/20 dark:bg-background-base-dark/95">
              <Code2 className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
              <span className="text-sm text-primary-base dark:text-primary-base-dark">
                More Projects
              </span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedOtherProjects.map((project) => (
              <OtherProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Toggle Show More/Less Button */}
          {otherProjects.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="group flex items-center gap-2 rounded-lg border border-primary-base/20 bg-primary-base/5 px-4 py-2 text-sm text-primary-base transition-all hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10"
              >
                <span>{showAllProjects ? "Show Less" : "Show More"}</span>
                {showAllProjects ? (
                  <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
