"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RiArrowUpLine } from "react-icons/ri";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      aria-label="Scroll to top"
      className="border-primary-base/40 bg-background-base/80 text-primary-base hover:border-primary-base/80 hover:text-accent-base dark:border-primary-base-dark/20 dark:bg-background-base-dark/80 dark:text-primary-base-dark dark:hover:border-primary-base-dark/40 dark:hover:text-accent-base-dark absolute top-3 right-5 -translate-y-1/2 rounded-xl border p-3 backdrop-blur-sm transition-colors"
    >
      <RiArrowUpLine className="h-5 w-5" />
      <span className="sr-only">Scroll to top of page</span>
    </motion.button>
  );
};

export default ScrollToTopButton;
