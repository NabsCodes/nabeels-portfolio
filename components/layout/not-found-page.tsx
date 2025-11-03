"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, FileText } from "lucide-react";

interface ActionButton {
  href: string;
  label: string;
  iconName: string;
  variant: "primary" | "secondary";
}

interface NotFoundPageProps {
  /** Context for the terminal breadcrumb (e.g., "blog", "error") */
  context: string;
  /** Specific error message for breadcrumb (e.g., "Post not found", "Page not found") */
  errorMessage: string;
  /** Main heading text */
  title: string;
  /** Description paragraph */
  description: string;
  /** Action buttons to display */
  actions: ActionButton[];
  /** List of helpful suggestions for the user */
  suggestions: string[];
}

// Icon mapping function
const getIcon = (iconName: string) => {
  const icons = {
    home: Home,
    arrowLeft: ArrowLeft,
    search: Search,
    fileText: FileText,
  };
  return icons[iconName as keyof typeof icons] || Home;
};

export function NotFoundPage({
  context,
  errorMessage,
  title,
  description,
  actions,
  suggestions,
}: NotFoundPageProps) {
  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 py-12 pt-24 sm:pt-28 md:pt-32 lg:pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          {/* Terminal-style error code */}
          <div className="text-primary-base/20 dark:text-primary-base-dark/20 mb-6 font-mono text-6xl font-bold md:text-8xl">
            404
          </div>

          {/* Terminal-style breadcrumb */}
          <div className="mb-6 font-mono text-sm">
            <span className="text-accent-base dark:text-accent-base-dark">
              {context}
            </span>
            <span className="text-primary-base/70 dark:text-primary-base-dark/70 ml-2">
              {">"}
            </span>
            <span className="text-default-base dark:text-default-base-dark ml-2">
              {errorMessage}
            </span>
          </div>

          <h1 className="font-raleway text-default-base dark:text-default-base-dark mb-6 text-3xl font-bold md:text-4xl">
            {title}
            <span className="text-accent-base dark:text-accent-base-dark">
              .
            </span>
          </h1>

          <p className="text-primary-base dark:text-primary-base-dark mb-8 text-lg">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {actions.map((action, index) => {
              const Icon = getIcon(action.iconName);
              const isPrimary = action.variant === "primary";

              return (
                <Link
                  key={index}
                  href={action.href}
                  className={
                    isPrimary
                      ? "bg-accent-base hover:bg-accent-base/90 dark:bg-accent-base-dark dark:hover:bg-accent-base-dark/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-all duration-200 motion-safe:hover:scale-105"
                      : "border-primary-base/20 bg-background-base/60 text-default-base hover:bg-background-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 dark:text-default-base-dark dark:hover:bg-background-base-dark/80 inline-flex items-center gap-2 rounded-lg border px-6 py-3 backdrop-blur-sm transition-all duration-200 motion-safe:hover:scale-105"
                  }
                >
                  <Icon className="h-4 w-4" />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Suggestions */}
        <div className="border-primary-base/20 bg-background-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 mt-12 rounded-lg border p-6 backdrop-blur-sm">
          <h3 className="font-space-grotesk text-default-base dark:text-default-base-dark mb-3 text-lg font-semibold">
            What you can do:
          </h3>

          <ul className="text-primary-base dark:text-primary-base-dark space-y-2 text-sm">
            {suggestions.map((suggestion, index) => (
              <li key={index}>• {suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
