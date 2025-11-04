"use client";

import { motion } from "framer-motion";

interface BlogPageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string;
}

export function BlogPageHeader({
  title,
  description = "",
  breadcrumb = "Personal thoughts & experiences",
}: BlogPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-4 space-y-4"
    >
      {/* Terminal-style breadcrumb */}
      <div className="font-mono text-sm">
        <span className="text-accent-base dark:text-accent-base-dark">
          blog
        </span>
        <span className="text-primary-base/70 dark:text-primary-base-dark/70 ml-2">
          {">"}
        </span>
        <span className="text-default-base dark:text-default-base-dark ml-2">
          {breadcrumb}
        </span>
      </div>

      {/* Main heading */}
      <h1 className="font-raleway text-default-base dark:text-default-base-dark text-4xl font-bold md:text-5xl">
        {title}
        <span className="text-accent-base dark:text-accent-base-dark">.</span>
      </h1>

      <p className="text-primary-base dark:text-primary-base-dark text-lg">
        {description}
      </p>
    </motion.div>
  );
}
