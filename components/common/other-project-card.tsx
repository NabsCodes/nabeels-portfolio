"use client";

import { useState, useRef, useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { ProjectData } from "@/lib/types";
import Link from "next/link";

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
    <div className="group">
      <div className="border-primary-base/20 bg-background-base/80 hover:border-primary-base/40 dark:border-primary-base-dark/10 dark:bg-background-base-dark/80 dark:hover:border-primary-base-dark/20 relative w-full overflow-hidden rounded-lg border p-6 backdrop-blur-xs transition-all">
        <div className="flex flex-col">
          {/* Title */}
          <h3 className="from-primary-base to-accent-base font-space-grotesk dark:from-primary-base-dark dark:to-accent-base-dark mb-2 bg-linear-to-r bg-clip-text text-base font-medium text-transparent md:text-lg">
            {project.title}
          </h3>

          {/* Description with read more */}
          <div className="relative">
            <div
              onClick={() => isClampable && setIsExpanded(!isExpanded)}
              className={isClampable ? "cursor-pointer" : ""}
            >
              <p
                ref={textRef}
                className={`text-default-base/70 dark:text-default-base-dark/70 text-sm leading-relaxed ${
                  !isExpanded ? "line-clamp-3" : ""
                }`}
              >
                {project.description}
              </p>
            </div>

            {isClampable && (
              <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary-base/60 hover:text-primary-base dark:text-primary-base-dark/60 dark:hover:text-primary-base-dark mt-1 flex cursor-pointer items-center gap-1 font-mono text-xs transition-colors"
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

          {/* Tech stack */}
          <div className="mt-6 mb-auto">
            <div className="flex flex-wrap gap-2">
              {project.tech.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="bg-primary-base/10 text-primary-base dark:bg-primary-base-dark/5 dark:text-primary-base-dark/80 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center gap-3">
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary-base/20 bg-primary-base/5 text-primary-base hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10 flex h-10 w-10 items-center justify-center rounded-lg border transition-all"
              >
                <FiGithub className="h-5 w-5" />
              </Link>
            )}
            {project.links.live && (
              <Link
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary-base/20 bg-primary-base/5 text-primary-base hover:border-primary-base/40 hover:bg-primary-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:bg-primary-base-dark/10 flex h-10 w-10 items-center justify-center rounded-lg border transition-all"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProjectCard;
