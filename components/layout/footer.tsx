"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { navigationItems } from "@/lib/data";
import { RiCodeSSlashLine } from "react-icons/ri";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { fadeInUp } from "@/lib/animation-presets";

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger initial animation after a small delay
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Custom footer container variant with larger y offset
  const footerVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={footerVariants}
      className="border-primary-base/40 from-background-base/50 to-background-base/80 dark:border-primary-base-dark/20 dark:from-background-base-dark/50 dark:to-background-base-dark/80 relative z-10 mt-8 border-t bg-linear-to-b py-12 backdrop-blur-sm"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1.2px,transparent_1px),linear-gradient(to_bottom,#80808012_1.2px,transparent_1px)] mask-[linear-gradient(to_bottom,transparent,black,transparent)] bg-size-[24px_24px]" />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row lg:mt-4">
          {/* Logo */}
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              {/* Light mode logo */}
              <div className="relative h-[35px] w-[35px] dark:hidden">
                <Image
                  src="/images/light-logo.png"
                  alt="Personal logo"
                  fill
                  sizes="(max-width: 30px) 100vw, 30px"
                  className="object-contain"
                />
              </div>
              {/* Dark mode logo */}
              <div className="relative hidden h-[35px] w-[35px] dark:block">
                <Image
                  src="/images/dark-logo.png"
                  alt="Personal logo"
                  fill
                  sizes="(max-width: 30px) 100vw, 30px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-6 text-sm md:justify-end"
          >
            {navigationItems.map((item) => {
              const isBlog = item.name === "Blog";
              const isContact = item.name === "Contact me";
              return (
                <Link
                  key={item.name}
                  href={item.fullHref}
                  className={cn(
                    "group text-default-base hover:text-accent-base dark:text-default-base-dark dark:hover:text-accent-base-dark inline-flex items-center transition-colors",
                    isBlog &&
                      "group border-primary-base/10 bg-primary-base/10 hover:border-primary-base/20 hover:bg-primary-base/15 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/10 dark:hover:border-primary-base-dark/20 dark:hover:bg-primary-base-dark/15 flex items-center gap-1 rounded-full border px-3 py-1 transition-colors",
                    isContact && "hidden",
                  )}
                >
                  <span className="relative top-px">{item.name}</span>
                  {isBlog && (
                    <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-primary-base/5 dark:border-primary-base-dark/5 flex flex-col items-center justify-between gap-6 border-t pt-8 text-sm md:flex-row">
          {/* Developer signature */}
          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <RiCodeSSlashLine className="text-primary-base dark:text-primary-base-dark h-4 w-4" />
            <span className="text-default-base dark:text-default-base-dark">
              Design & Development by{" "}
              <Link
                href="https://github.com/NabsCodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-base-dark hover:text-accent-base dark:hover:text-accent-base-dark transition-colors"
              >
                Hassan Umar Hassan
              </Link>
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.div variants={fadeInUp} className="text-sm">
            <span className="text-primary-base-dark">
              &copy; {new Date().getFullYear()}
            </span>{" "}
            <span className="text-default-base dark:text-default-base-dark/90">
              All rights reserved
            </span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
