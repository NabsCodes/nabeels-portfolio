"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { Code2, ExternalLink, ChevronDown, Eye } from "lucide-react";
import { ProjectData } from "@/lib/types";
import Image from "next/image";
import ProjectImagePlaceholder from "@/components/ui/project-image-placeholder";
import Link from "next/link";
import { ProjectPreview } from "@/components/ui/project-preview";

export default function FeaturedProjectCard({
  project,
  onTechClick,
}: {
  project: ProjectData;
  onTechClick?: (techName: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClampable, setIsClampable] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Optimize performance by memoizing the preview handler
  const handlePreviewClick = useCallback(() => {
    if (project.links.live) {
      setShowPreview(true);
    }
  }, [project.links.live]);

  useEffect(() => {
    if (textRef.current) {
      setIsClampable(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, [project.description]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="group relative"
      >
        {/* Main Card Container */}
        <div className="border-primary-base/50 bg-background-base/80 hover:border-primary-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/80 dark:hover:border-primary-base-dark/40 relative flex h-fit w-full flex-col overflow-hidden rounded-lg border backdrop-blur-sm transition-colors">
          {/* Header Section - Fixed height */}
          <div className="border-primary-base/10 bg-primary-base/5 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/5 flex h-14 shrink-0 items-center border-b px-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
                <h3 className="from-primary-base to-accent-base font-space-grotesk dark:from-primary-base-dark dark:to-accent-base-dark bg-linear-to-r bg-clip-text text-sm font-medium text-transparent transition-colors md:text-base">
                  {project.title}
                </h3>
              </div>
              {project.featured && (
                <span className="bg-primary-base/10 text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark rounded-full px-2 py-0.5 text-xs">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Image Section with Enhanced Overlay */}
          <div className="group/preview border-primary-base/30 dark:border-primary-base-dark/20 relative aspect-video w-full overflow-hidden border-b">
            {!imageError && project.cover ? (
              <>
                <Image
                  src={project.cover.url}
                  alt={project.cover.alt}
                  fill
                  className="object-cover object-top transition-all duration-500 ease-out group-hover/preview:scale-[1.03]"
                  onError={() => setImageError(true)}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />

                {/* Subtle overlay gradient */}
                <div className="from-background-base-dark/30 absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100" />

                {project.links.live && (
                  <div className="absolute right-4 bottom-4 translate-y-2 opacity-0 transition-all duration-300 group-hover/preview:translate-y-0 group-hover/preview:opacity-100">
                    <button
                      onClick={handlePreviewClick}
                      className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/70 px-4 py-2 text-sm font-medium text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:bg-black/80 dark:border-white/30 dark:bg-black/80 dark:hover:bg-black/90"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <ProjectImagePlaceholder />
            )}
          </div>

          {/* Content Section - Fills remaining space */}
          <div className="flex flex-1 flex-col justify-between p-6">
            {/* Description and Tech Stack Container */}
            <div className="space-y-4 overflow-y-auto">
              {/* Description with Expand/Collapse */}
              <div className="relative">
                <motion.div
                  initial={{ height: "4.5rem" }}
                  animate={{ height: isExpanded ? "auto" : "4.5rem" }}
                  transition={{
                    duration: 0.4,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="overflow-hidden"
                >
                  <p
                    ref={textRef}
                    className={`text-default-base/70 dark:text-default-base-dark/70 text-sm leading-relaxed ${
                      !isExpanded ? "line-clamp-3" : ""
                    }`}
                  >
                    {project.description}
                  </p>
                </motion.div>

                {isClampable && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="font-space-grotesk text-primary-base/60 hover:text-primary-base focus-visible:ring-primary-base/40 dark:text-primary-base-dark/60 dark:hover:text-primary-base-dark dark:focus-visible:ring-primary-base-dark/40 mt-1 flex items-center gap-1 text-xs transition-colors focus:outline-none focus-visible:ring-2"
                    aria-expanded={isExpanded}
                    aria-label={
                      isExpanded
                        ? "Show less description"
                        : "Read more description"
                    }
                  >
                    <span>{isExpanded ? "show less" : "read more"}</span>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </motion.div>
                  </button>
                )}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTechClick?.(name);
                    }}
                    className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 focus-visible:ring-primary-base/40 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 dark:focus-visible:ring-primary-base-dark/40 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2"
                    aria-label={`Filter projects by ${name}`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Links Section - Fixed at bottom */}
            <div className="mt-4 flex items-center gap-3">
              {project.links.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary-base/20 bg-primary-base/5 text-primary-base hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10 flex items-center gap-2 rounded-lg border px-4 py-2 text-xs transition-all"
                >
                  <FiGithub className="h-4 w-4" />
                  <span>View Code</span>
                </Link>
              )}
              {project.links.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary-base/20 bg-primary-base/5 text-primary-base hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10 flex items-center gap-2 rounded-lg border px-4 py-2 text-xs transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preview Modal */}
      {project.links.live && (
        <ProjectPreview
          url={project.links.live}
          isVisible={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
