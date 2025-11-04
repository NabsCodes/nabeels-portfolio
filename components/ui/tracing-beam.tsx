"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    // Initial height
    updateHeight();

    // Update height on resize
    window.addEventListener("resize", updateHeight);

    // Update height when content changes
    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
      mass: 1,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
      mass: 1,
    },
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-7xl", className)}
    >
      <div className="absolute top-3 -left-4 hidden md:-left-20 md:block">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-primary-base/20 bg-background-base dark:border-primary-base-dark/20 dark:bg-background-base-dark ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            className="bg-primary-base dark:bg-primary-base-dark h-2 w-2 rounded-full transition-colors"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            className="text-primary-base/20 dark:text-primary-base-dark/20"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop
                stopColor="var(--primary-base)"
                stopOpacity="0"
                className="dark:hidden"
              ></stop>
              <stop
                stopColor="var(--primary-base)"
                className="dark:hidden"
              ></stop>
              <stop
                stopColor="var(--accent-base)"
                offset="0.325"
                className="dark:hidden"
              ></stop>
              <stop
                stopColor="var(--secondary-base)"
                offset="1"
                stopOpacity="0"
                className="dark:hidden"
              ></stop>
              {/* Dark mode gradient stops */}
              <stop
                stopColor="var(--primary-base-dark)"
                stopOpacity="0"
                className="hidden dark:block"
              ></stop>
              <stop
                stopColor="var(--primary-base-dark)"
                className="hidden dark:block"
              ></stop>
              <stop
                stopColor="var(--accent-base-dark)"
                offset="0.325"
                className="hidden dark:block"
              ></stop>
              <stop
                stopColor="var(--secondary-base-dark)"
                offset="1"
                stopOpacity="0"
                className="hidden dark:block"
              ></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
