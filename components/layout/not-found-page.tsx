"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {/* Background with consistent dark styling */}
      <div className="fixed inset-0 -z-10">
        <div className="bg-background-base-dark/[0.02] dark:bg-background-base-dark absolute inset-0" />
        <div className="bg-accent-base-dark/10 absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-primary-base-dark/10 bg-background-base-dark/5 dark:bg-background-base-dark/50 overflow-hidden rounded-lg border p-8 backdrop-blur-xs"
        >
          {/* Simple Terminal Header */}
          <div className="flex items-center gap-2">
            <div className="bg-primary-base-dark/20 h-2 w-2 rounded-full" />
            <div className="bg-primary-base-dark/20 h-2 w-2 rounded-full" />
            <div className="bg-primary-base-dark/20 h-2 w-2 rounded-full" />
          </div>

          {/* 404 Content */}
          <div className="mt-8 text-center">
            <h1 className="text-primary-base-dark font-mono text-6xl font-bold">
              404
            </h1>
            <p className="font-space-grotesk text-primary-base-dark/80 mt-4 text-lg">
              Oops! Page not found
            </p>
            <p className="text-primary-base-dark/60 mt-2 text-sm">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Home Button */}
            <Link
              href="/"
              className="group border-primary-base-dark/20 bg-primary-base-dark/5 text-primary-base-dark hover:border-primary-base-dark/30 hover:bg-primary-base-dark/10 mt-8 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
