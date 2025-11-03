"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseEffect() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(true);

  // Spring configuration for smooth following
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Check if cursor is within viewport
      if (
        e.clientX >= 0 &&
        e.clientX <= window.innerWidth &&
        e.clientY >= 0 &&
        e.clientY <= window.innerHeight
      ) {
        setIsVisible(true);
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      } else {
        setIsVisible(false);
      }
    };

    // Handle mouse leaving the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Handle interactive elements
    const handleLinkHover = () => setCursorVariant("link");
    const handleLinkLeave = () => setCursorVariant("default");

    const interactiveElements = document.querySelectorAll(
      'a, button, input, [role="button"]',
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHover);
      element.addEventListener("mouseleave", handleLinkLeave);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleLinkHover);
        element.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, [cursorX, cursorY, cursorVariant]);

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "1px solid rgba(113, 162, 149, 0.5)",
      scale: 1,
    },
    link: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(113, 162, 149, 0.1)",
      border: "1px solid rgba(113, 162, 149, 0.2)",
      scale: 2,
    },
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-999 hidden rounded-full lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Cursor dot */}
      <motion.div
        className="bg-primary-base/80 dark:bg-primary-base-dark/80 pointer-events-none fixed top-0 left-0 z-999 hidden h-1.5 w-1.5 rounded-full lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: 13, // Center the dot
          translateY: 13,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
