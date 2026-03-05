"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const gradientId = useId();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    let frameId = 0;
    const updateHeight = () => {
      if (contentRef.current) {
        const nextHeight = Math.ceil(contentRef.current.offsetHeight);
        setSvgHeight((previousHeight) =>
          previousHeight === nextHeight ? previousHeight : nextHeight,
        );
      }
    };

    // Initial height
    updateHeight();

    const scheduleHeightUpdate = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(updateHeight);
    };

    window.addEventListener("resize", scheduleHeightUpdate);

    const observer = new ResizeObserver(scheduleHeightUpdate);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", scheduleHeightUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      observer.disconnect();
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextScrolled = value > 0.005;
    setHasScrolled((previousScrolled) =>
      previousScrolled === nextScrolled ? previousScrolled : nextScrolled,
    );
  });

  const safeSvgHeight = Math.max(svgHeight, 1);
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, safeSvgHeight]),
    {
      stiffness: 460,
      damping: 82,
      mass: 1,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, safeSvgHeight - 200]),
    {
      stiffness: 460,
      damping: 82,
      mass: 1,
    },
  );

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative mx-auto h-full w-full max-w-7xl", className)}
    >
      <div className="absolute top-3 -left-4 hidden md:-left-20 md:block">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: hasScrolled ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-primary-base/20 bg-background-base dark:border-primary-base-dark/20 dark:bg-background-base-dark ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
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
          viewBox={`0 0 20 ${safeSvgHeight}`}
          width="20"
          height={safeSvgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <path
            d={`M 1 0V -36 l 18 24 V ${safeSvgHeight * 0.8} l -18 24V ${safeSvgHeight}`}
            fill="none"
            stroke="var(--primary-base)"
            strokeOpacity="0.16"
          />
          {!shouldReduceMotion && (
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${safeSvgHeight * 0.8} l -18 24V ${safeSvgHeight}`}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="1.25"
              transition={{
                duration: 10,
              }}
            />
          )}
          <defs>
            <motion.linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="var(--primary-base)" stopOpacity="0" />
              <stop stopColor="var(--primary-base)" />
              <stop stopColor="var(--accent-base)" offset="0.325" />
              <stop
                stopColor="var(--secondary-base)"
                offset="1"
                stopOpacity="0"
              />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
