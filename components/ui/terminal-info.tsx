"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalInfoProps {
  command?: string;
  flag?: string;
  content?: string;
  className?: string;
}

const TerminalInfo: React.FC<TerminalInfoProps> = ({
  command,
  flag,
  content,
  className,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "border-primary-base/50 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 mb-8 rounded-lg border p-4 backdrop-blur-sm",
        className,
      )}
    >
      {/* Compact layout for mobile */}
      <div className="flex flex-col gap-2 md:hidden">
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal className="text-accent-base/80 dark:text-accent-base-dark/80 h-4 w-4 shrink-0" />
          </motion.div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <motion.span
              variants={itemVariants}
              className="text-primary-base/90 dark:text-primary-base-dark/90 font-mono text-sm whitespace-nowrap"
            >
              {command}
            </motion.span>
            {flag && (
              <>
                <span className="text-default-base/30 dark:text-default-base-dark/30">
                  /
                </span>
                <motion.span
                  variants={itemVariants}
                  className="text-accent-base/90 dark:text-accent-base-dark/90 font-mono text-sm whitespace-nowrap"
                >
                  {flag}
                </motion.span>
              </>
            )}
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="border-primary-base/10 dark:border-primary-base-dark/10 ml-6 border-l-2 pl-3"
        >
          <span className="text-default-base/70 dark:text-default-base-dark/70 text-sm">
            {content}
          </span>
        </motion.div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex md:items-center md:gap-3">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Terminal className="text-accent-base/80 dark:text-accent-base-dark/80 h-4 w-4 shrink-0" />
        </motion.div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <motion.span
            variants={itemVariants}
            className="text-primary-base/90 dark:text-primary-base-dark/90 font-mono text-sm"
          >
            {command}
          </motion.span>
          {flag && (
            <>
              <span className="text-default-base/30 dark:text-default-base-dark/30">
                /
              </span>
              <motion.span
                variants={itemVariants}
                className="text-accent-base/90 dark:text-accent-base-dark/90 font-mono text-sm"
              >
                {flag}
              </motion.span>
            </>
          )}
          <motion.span
            variants={itemVariants}
            className="text-default-base/30 dark:text-default-base-dark/30"
          >
            →
          </motion.span>
          <motion.span
            variants={itemVariants}
            className="text-default-base/70 dark:text-default-base-dark/70 text-sm"
          >
            {content}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalInfo;
