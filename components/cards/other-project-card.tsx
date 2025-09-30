"use client";

import { useState, useRef, useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { ExternalLink, ChevronDown, ChevronUp, Folder } from "lucide-react";
import { ProjectData } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";

const OtherProjectCard = ({ project }: { project: ProjectData }) => {
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
      <div className="relative w-full overflow-hidden rounded-lg border border-primary-base/50 bg-background-base/80 p-6 backdrop-blur-sm transition-all hover:border-primary-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/80 dark:hover:border-primary-base-dark/40">
        <div className="flex flex-col">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-primary-base/10 p-2 dark:bg-primary-base-dark/10">
              <Folder className="h-5 w-5 text-primary-base dark:text-primary-base-dark" />
            </div>

            {/* Links in header */}
            <div className="flex items-center gap-2">
              {project.links.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-base/20 bg-primary-base/5 text-primary-base transition-all duration-200 hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10"
                >
                  <FiGithub className="h-4 w-4" />
                </Link>
              )}
              {project.links.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-base/20 bg-accent-base/5 text-accent-base transition-all duration-200 hover:border-accent-base/40 hover:bg-accent-base/10 dark:border-accent-base-dark/20 dark:bg-accent-base-dark/5 dark:text-accent-base-dark dark:hover:border-accent-base-dark/40 dark:hover:bg-accent-base-dark/10"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          {/* Title */}
          <h3 className="mb-2 bg-gradient-to-r from-primary-base to-accent-base bg-clip-text font-space-grotesk text-base font-medium text-transparent dark:from-primary-base-dark dark:to-accent-base-dark md:text-lg">
            {project.title}
          </h3>

          {/* Description with read more */}
          <div className="relative">
            <div
              onClick={() => isClampable && setIsExpanded(!isExpanded)}
              className={isClampable ? "cursor-pointer" : ""}
            >
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
                  className={`text-sm leading-relaxed text-default-base/70 dark:text-default-base-dark/70 ${
                    !isExpanded ? "line-clamp-3" : ""
                  }`}
                >
                  {project.description}
                </p>
              </motion.div>
            </div>

            {isClampable && (
              <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 cursor-pointer font-space-grotesk text-xs text-primary-base/60 transition-colors hover:text-primary-base dark:text-primary-base-dark/60 dark:hover:text-primary-base-dark"
              >
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

          {/* Tech stack */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-1.5 rounded-full bg-primary-base/10 px-2 py-0.5 text-xs text-primary-base dark:bg-primary-base-dark/5 dark:text-primary-base-dark/80"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OtherProjectCard;
