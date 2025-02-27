"use client";

import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/lib/data";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  isScrolled: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, isScrolled, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background-base/60 dark:bg-background-base-dark/60 fixed inset-0 z-40 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-0 right-0 left-0 z-50 mt-[80px]"
          >
            <motion.div
              initial={false}
              animate={{
                width: isScrolled ? "95%" : "100%",
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="border-primary-base/30 bg-background-base/95 dark:border-primary-base-dark/20 dark:bg-background-base-dark/95 mx-auto overflow-hidden rounded-lg border p-6 shadow-lg backdrop-blur-md"
            >
              <nav className="max-w-lg">
                <div className="flex flex-col space-y-6">
                  {navigationItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-default-base/70 hover:text-accent-base dark:text-default-base-dark/70 dark:hover:text-accent-base-dark text-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: navigationItems.length * 0.05,
                      ease: "easeOut",
                    }}
                    className="pt-2"
                  >
                    <Link
                      href="/#contact"
                      onClick={onClose}
                      className="bg-primary-base hover:bg-primary-base/90 dark:bg-primary-base-dark dark:hover:bg-primary-base-dark/90 inline-block rounded-lg px-5 py-2.5 text-sm text-white shadow-lg transition-colors"
                    >
                      Contact Me
                    </Link>
                  </motion.div>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
