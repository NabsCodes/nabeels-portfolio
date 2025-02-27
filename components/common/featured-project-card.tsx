"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { Code2, ExternalLink, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { ProjectData } from "@/lib/types";
import Image from "next/image";
import ProjectImagePlaceholder from "./project-image-placeholder";
import Link from "next/link";
import { ProjectPreview } from "@/components/ui/project-preview";

export default function FeaturedProjectCard({
  project,
}: {
  project: ProjectData;
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
        <div className="border-primary-base/30 bg-background-base/80 hover:border-primary-base/50 dark:border-primary-base-dark/10 dark:bg-background-base-dark/80 dark:hover:border-primary-base-dark/30 relative flex h-[550px] w-full flex-col overflow-hidden rounded-lg border backdrop-blur-xs transition-colors">
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

          {/* Image Section with Preview Overlay */}
          <div
            className="group/preview border-primary-base/30 dark:border-primary-base-dark/20 relative aspect-video w-full overflow-hidden border-b"
            onClick={handlePreviewClick}
          >
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
                {project.links.live && (
                  <div className="via-background-base/20 to-background-base/95 dark:via-background-base-dark/20 dark:to-background-base-dark/95 absolute inset-0 flex items-center justify-center bg-linear-to-b from-transparent opacity-0 transition-all duration-300 group-hover/preview:opacity-100">
                    <button className="border-primary-base bg-background-base/95 text-primary-base ring-primary-base/5 dark:border-primary-base-dark dark:bg-background-base-dark/95 dark:text-primary-base-dark dark:ring-primary-base-dark/5 flex items-center gap-2 rounded-lg border px-5 py-2 text-sm ring-1 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>preview --live</span>
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
                <div
                  onClick={() => isClampable && setIsExpanded(!isExpanded)}
                  className={isClampable ? "cursor-pointer" : ""}
                >
                  <p
                    ref={textRef}
                    className={`text-default-base/70 dark:text-default-base-dark/70 text-sm leading-relaxed md:text-base ${
                      !isExpanded ? "line-clamp-3" : ""
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {isClampable && (
                  <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary-base/60 hover:text-primary-base dark:text-primary-base-dark/60 dark:hover:text-primary-base-dark mt-2 flex cursor-pointer items-center gap-1 font-mono text-xs transition-colors"
                  >
                    <span className="text-accent-base dark:text-accent-base-dark">
                      $
                    </span>
                    <div className="flex items-center gap-1">
                      <span>{isExpanded ? "show less" : "read more"}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="bg-primary-base/10 text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
                  >
                    <Icon className="h-3 w-3" />
                    <span>{name}</span>
                  </div>
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
