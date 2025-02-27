"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { easeInOut, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/theme-toggle";
import { navigationItems } from "@/lib/data";
import { NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // No dependency on isMobileMenuOpen

  const nameVariants = {
    visible: {
      width: "auto",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full" role="banner">
      <div className="flex justify-center">
        {/* Desktop Navigation */}
        <nav
          className={cn(
            "relative z-60 mt-2 hidden w-full max-w-7xl flex-row items-center justify-between rounded-full bg-transparent px-4 transition-all duration-500 ease-in-out lg:flex dark:bg-transparent",
            isScrolled
              ? "border-primary-base/20 bg-background-base/80 shadow-nav dark:border-primary-base-dark/20 dark:bg-background-base-dark/80 mx-auto mt-5 w-[720px] border py-2 backdrop-blur-md"
              : "bg-transparent",
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo and Name Section */}
          <Link
            href="/"
            className="relative z-20 flex items-center gap-3 py-1"
            aria-label="Go to homepage"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Light mode logo */}
              <div className="relative h-[30px] w-[30px] dark:hidden">
                <Image
                  src="/images/light-logo.png"
                  alt="Personal logo"
                  fill
                  sizes="(max-width: 30px) 100vw, 30px"
                  className="object-contain"
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
                />
              </div>
            </motion.div>

            <motion.div
              variants={nameVariants}
              initial="visible"
              animate={isScrolled ? "hidden" : "visible"}
              className="flex overflow-hidden"
            >
              <span className="flex text-lg font-medium">
                <span className="text-primary-base dark:text-primary-base-dark">
                  &lt;
                </span>
                <span className="text-text-base dark:text-text-base-dark">
                  nabeel
                </span>
                <span className="text-primary-base dark:text-accent-base-dark font-light">
                  hassan
                </span>
                <span className="text-primary-base dark:text-primary-base-dark">
                  /&gt;
                </span>
              </span>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div
            className="absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-2 text-sm font-medium lg:flex"
            role="menubar"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                name={item.name}
                label={item.label}
              />
            ))}
          </div>

          {/* Actions Section */}
          <div
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
            >
              <Link
                href="/#contact"
                className="bg-secondary-base text-default-base shadow-secondary-base/20 hover:bg-primary-base dark:bg-secondary-base-dark dark:text-default-base-dark dark:shadow-secondary-base-dark/20 dark:hover:bg-primary-base-dark relative hidden cursor-pointer rounded-lg px-5 py-2.5 text-center text-sm shadow-lg transition-all duration-200 hover:shadow-xl md:flex"
                aria-label="Contact me"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <motion.div
          animate={{
            width: isScrolled ? "95%" : "100%",
            borderRadius: isScrolled && !isMobileMenuOpen ? 9999 : 10,
          }}
          transition={{
            duration: 0.5,
            ease: easeInOut,
            borderRadius: { duration: 0.2 },
          }}
          className={cn(
            "relative z-50 mx-auto flex flex-col items-center justify-between bg-transparent px-4 py-2", // Is not scrolled and not open
            isScrolled &&
              "border-primary-base/30 dark:border-primary-base-dark/20 mt-3 border", // Is scrolled but open
            isScrolled &&
              !isMobileMenuOpen &&
              "border-primary-base/20 bg-background-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/80 border backdrop-blur-md", // Is scrolled but not open
            isMobileMenuOpen &&
              "bg-background-base/80 dark:bg-background-base-dark/80 backdrop-blur-md", // Is open Mobile Menu and Navbar (scrolled or not)
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
                animate={!isMobileMenuOpen && isScrolled ? "hidden" : "visible"}
                className="flex overflow-hidden"
              >
                <span className="flex text-base font-medium whitespace-nowrap">
                  <span className="text-primary-base dark:text-primary-base-dark">
                    &lt;
                  </span>
                  <span className="text-text-base dark:text-text-base-dark">
                    nabeel
                  </span>
                  <span className="text-accent-base dark:text-accent-base-dark font-light">
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
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-text-base dark:text-text-base-dark bg-secondary-base/30 hover:bg-secondary-base/50 dark:bg-secondary-base-dark/30 dark:hover:bg-secondary-base-dark/50 flex h-10 w-10 items-center justify-center rounded-full transition-all"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        isScrolled={isScrolled}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
