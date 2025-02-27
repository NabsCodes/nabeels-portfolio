"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function PreLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        transitionEnd: {
          display: "none",
        },
      }}
      transition={{
        opacity: { duration: 0.5, delay: 1.5 },
        display: { delay: 2 }, // Ensure display:none happens after fade out
      }}
      className="bg-background-base dark:bg-background-base-dark fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <Terminal className="text-primary-base dark:text-primary-base-dark h-8 w-8 animate-pulse" />
        <div className="text-primary-base/70 dark:text-primary-base-dark/70 font-mono text-sm">
          Initializing development environment...
        </div>
        <div className="flex gap-2">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
              delay: 0,
            }}
            className="bg-primary-base dark:bg-primary-base-dark h-2 w-2 rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
              delay: 0.2,
            }}
            className="bg-primary-base dark:bg-primary-base-dark h-2 w-2 rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
              delay: 0.4,
            }}
            className="bg-primary-base dark:bg-primary-base-dark h-2 w-2 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
