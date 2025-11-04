"use client";

import { useState, useRef, useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { ExternalLink, ChevronDown, ChevronUp, Folder } from "lucide-react";
import { ProjectData } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";

const OtherProjectCard = ({
  project,
  onTechClick,
}: {
  project: ProjectData;
  onTechClick?: (techName: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClampable, setIsClampable] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsClampable(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, [project.description]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="border-primary-base/50 bg-background-base/80 hover:border-primary-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/80 dark:hover:border-primary-base-dark/40 relative w-full overflow-hidden rounded-lg border p-6 backdrop-blur-sm transition-all">
        <div className="flex flex-col">
          <div className="mb-4 flex items-start justify-between">
            <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 rounded-lg p-2">
              <Folder className="text-primary-base dark:text-primary-base-dark h-5 w-5" />
            </div>

            {/* Links in header */}
            <div className="flex items-center gap-2">
              {project.links.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary-base/20 bg-primary-base/5 text-primary-base hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10 flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200"
                >
                  <FiGithub className="h-4 w-4" />
                </Link>
              )}
              {project.links.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-accent-base/20 bg-accent-base/5 text-accent-base hover:border-accent-base/40 hover:bg-accent-base/10 dark:border-accent-base-dark/20 dark:bg-accent-base-dark/5 dark:text-accent-base-dark dark:hover:border-accent-base-dark/40 dark:hover:bg-accent-base-dark/10 flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          {/* Title */}
          <h3 className="from-primary-base to-accent-base font-space-grotesk dark:from-primary-base-dark dark:to-accent-base-dark mb-2 bg-linear-to-r bg-clip-text text-base font-medium text-transparent md:text-lg">
            {project.title}
          </h3>

          {/* Description with read more */}
          <div className="relative">
            <motion.div
              initial={{ height: "4.2rem" }}
              animate={{ height: isExpanded ? "auto" : "4.2rem" }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
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
                  isExpanded ? "Show less description" : "Read more description"
                }
              >
                <span>{isExpanded ? "show less" : "read more"}</span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </motion.div>
              </button>
            )}
          </div>

          {/* Tech stack */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTechClick?.(name);
                  }}
                  className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 focus-visible:ring-primary-base/40 dark:bg-primary-base-dark/5 dark:text-primary-base-dark/80 dark:hover:bg-primary-base-dark/15 dark:focus-visible:ring-primary-base-dark/40 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2"
                  aria-label={`Filter projects by ${name}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OtherProjectCard;
