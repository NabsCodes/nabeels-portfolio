"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { easeInOut, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/theme-toggle";
import { BlogMobileMenu } from "./blog-mobile-menu";

const BlogMobileMenuButton = memo(
  ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="text-text-base dark:text-text-base-dark flex h-10 w-10 items-center justify-center rounded-full bg-secondary-base/30 transition-all hover:bg-secondary-base/50 dark:bg-secondary-base-dark/30 dark:hover:bg-secondary-base-dark/50"
      aria-label="Toggle mobile menu"
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  ),
);

BlogMobileMenuButton.displayName = "BlogMobileMenuButton";

interface BlogHeaderProps {
  showProgress?: boolean;
}

export function BlogHeader({ showProgress = false }: BlogHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Add initial animation state
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Auto-hide logic
    if (scrollPosition > lastScrollY && scrollPosition > 100) {
      // Scrolling down & past initial scroll
      setIsHidden(true);
    } else {
      // Scrolling up or at top
      setIsHidden(false);
    }

    setLastScrollY(scrollPosition);
    setIsScrolled(scrollPosition > 40);

    // Reading progress calculation
    if (showProgress) {
      const scrollPercent = Math.min(
        (scrollPosition / (documentHeight - windowHeight)) * 100,
        100,
      );
      setReadingProgress(scrollPercent);
    }
  }, [lastScrollY, showProgress]);

  useEffect(() => {
    // Add passive event listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Trigger initial animation after a small delay
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const nameVariants = {
    visible: {
      width: "auto",
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.3 },
    },
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.3 },
    },
  };

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const headerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={headerVariants}
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-transform duration-300 ease-in-out",
          isHidden && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0",
        )}
        role="banner"
      >
        <div className="flex justify-center">
          {/* Desktop Navigation */}
          <motion.nav
            variants={headerVariants}
            className={cn(
              "relative z-[60] mt-2 hidden w-full max-w-7xl flex-row items-center justify-between rounded-full bg-transparent px-4 transition-all duration-500 ease-in-out dark:bg-transparent lg:flex",
              isScrolled
                ? "mx-auto mt-5 w-[720px] border border-primary-base/20 bg-background-base/80 py-2 shadow-nav backdrop-blur-md dark:border-primary-base-dark/20 dark:bg-background-base-dark/80"
                : "bg-transparent",
            )}
            role="navigation"
            aria-label="Blog navigation"
          >
            {/* Logo and Name Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href="/blog"
                className="relative z-20 flex items-center gap-3 py-1"
                aria-label="Go to blog page"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ willChange: "transform" }}
                >
                  {/* Light mode logo */}
                  <div className="relative h-[30px] w-[30px] dark:hidden">
                    <Image
                      src="/images/light-logo.png"
                      alt="Personal logo"
                      fill
                      sizes="(max-width: 30px) 100vw, 30px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  {/* Dark mode logo */}
                  <div className="relative hidden h-[30px] w-[30px] dark:block">
                    <Image
                      src="/images/dark-logo.png"
                      alt="Personal logo"
                      fill
                      sizes="(max-width: 30px) 100vw, 30px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={nameVariants}
                  initial="visible"
                  animate={isScrolled ? "hidden" : "visible"}
                  className="flex overflow-hidden"
                  style={{ willChange: "width, opacity" }}
                >
                  <span className="flex text-lg font-medium">
                    <span className="text-primary-base dark:text-primary-base-dark">
                      &lt;
                    </span>
                    <span className="text-text-base dark:text-text-base-dark">
                      nabeel
                    </span>
                    <span className="font-light text-primary-base dark:text-accent-base-dark">
                      blog
                    </span>
                    <span className="text-primary-base dark:text-primary-base-dark">
                      /&gt;
                    </span>
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Actions Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-4"
              role="group"
              aria-label="Header actions"
            >
              <ModeToggle />
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                style={{ willChange: "transform" }}
              >
                <Link
                  href="/"
                  className="relative hidden cursor-pointer rounded-lg bg-secondary-base px-5 py-2.5 text-center text-sm text-default-base shadow-lg shadow-secondary-base/20 transition-all duration-200 hover:bg-primary-base hover:shadow-xl dark:bg-secondary-base-dark dark:text-default-base-dark dark:shadow-secondary-base-dark/20 dark:hover:bg-primary-base-dark md:flex"
                  aria-label="Portfolio"
                >
                  Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </motion.nav>
        </div>

        {/* Mobile Navigation */}
        <motion.div variants={headerVariants} className="lg:hidden">
          <motion.div
            animate={{
              width: isScrolled ? "95%" : "100%",
              borderRadius: isScrolled && !isMobileMenuOpen ? 9999 : 10,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              ease: easeInOut,
              borderRadius: { duration: shouldReduceMotion ? 0 : 0.2 },
            }}
            style={{ willChange: "width, border-radius" }}
            className={cn(
              "relative z-50 mx-auto flex flex-col items-center justify-between bg-transparent px-4 py-2",
              isScrolled &&
                "mt-3 border border-primary-base/30 dark:border-primary-base-dark/20",
              isScrolled &&
                !isMobileMenuOpen &&
                "border border-primary-base/20 bg-background-base/80 backdrop-blur-md dark:border-primary-base-dark/20 dark:bg-background-base-dark/80",
              isMobileMenuOpen &&
                "bg-background-base/80 backdrop-blur-md dark:bg-background-base-dark/80",
            )}
          >
            <div className="flex w-full flex-row items-center justify-between">
              <Link
                href="/"
                className="relative z-20 flex items-center gap-3 py-1"
                aria-label="Go to homepage"
              >
                {/* Logo components */}
                <div className="relative h-[30px] w-[30px] dark:hidden">
                  <Image
                    src="/images/light-logo.png"
                    alt="Personal logo"
                    fill
                    sizes="(max-width: 30px) 100vw, 30px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="relative hidden h-[30px] w-[30px] dark:block">
                  <Image
                    src="/images/dark-logo.png"
                    alt="Personal logo"
                    fill
                    sizes="(max-width: 30px) 100vw, 30px"
                    className="object-contain"
                    priority
                  />
                </div>

                <motion.div
                  variants={nameVariants}
                  initial="visible"
                  animate={
                    !isMobileMenuOpen && isScrolled ? "hidden" : "visible"
                  }
                  className="flex overflow-hidden"
                  style={{ willChange: "width, opacity" }}
                >
                  <span className="flex whitespace-nowrap text-base font-medium">
                    <span className="text-primary-base dark:text-primary-base-dark">
                      &lt;
                    </span>
                    <span className="text-text-base dark:text-text-base-dark">
                      nabeel
                    </span>
                    <span className="font-light text-accent-base dark:text-accent-base-dark">
                      hassan
                    </span>
                    <span className="text-primary-base dark:text-primary-base-dark">
                      /&gt;
                    </span>
                  </span>
                </motion.div>
              </Link>

              <div className="flex items-center gap-3">
                <ModeToggle />
                <BlogMobileMenuButton
                  isOpen={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                />
              </div>
            </div>

            <BlogMobileMenu
              isOpen={isMobileMenuOpen}
              isScrolled={isScrolled}
              onClose={closeMobileMenu}
            />
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Reading Progress Bar */}
      {showProgress && (
        <div className="fixed left-0 top-0 z-40 h-1 w-full bg-primary-base/10 dark:bg-primary-base-dark/10">
          <div
            className="h-full bg-accent-base transition-all duration-150 ease-out dark:bg-accent-base-dark"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}
    </>
  );
}
