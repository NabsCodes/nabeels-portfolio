"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <main className="relative mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 pt-24">
      <div className="text-center">
        <div className="mb-6 inline-flex rounded-full bg-red-500/10 p-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>

        <h1 className="mb-4 font-raleway text-3xl font-bold text-default-base dark:text-default-base-dark">
          Something went wrong
          <span className="text-accent-base dark:text-accent-base-dark">!</span>
        </h1>

        <p className="mb-8 text-lg text-primary-base dark:text-primary-base-dark">
          We encountered an error while loading the blog posts. Please try
          again.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-accent-base bg-accent-base px-6 py-3 font-medium text-white transition-colors hover:bg-accent-base/90 dark:border-accent-base-dark dark:bg-accent-base-dark dark:hover:bg-accent-base-dark/90"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-base/20 bg-background-base/60 px-6 py-3 font-medium text-default-base backdrop-blur-sm transition-colors hover:bg-background-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 dark:text-default-base-dark dark:hover:bg-background-base-dark/80"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
