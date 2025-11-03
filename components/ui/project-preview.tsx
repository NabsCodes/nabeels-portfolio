"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { useClickOutside } from "@/hooks/use-click-outside";

interface ProjectPreviewProps {
  url: string;
  isVisible: boolean;
  onClose: () => void;
}

export function ProjectPreview({
  url,
  isVisible,
  onClose,
}: ProjectPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Use click outside hook
  useClickOutside(modalRef, onClose);

  // Reset loading state when URL changes
  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [url, isVisible]);

  // Memoize the onLoad handler
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle escape key to close preview
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-x-0 top-18 bottom-0 z-50 sm:top-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background-base/60 dark:bg-background-base-dark/60 absolute inset-0 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Modal Container with Safe Area Padding */}
          <div className="relative h-full overflow-y-auto">
            <div className="h-full p-4 sm:p-6 md:p-8">
              {/* Modal Content */}
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="border-primary-base/30 bg-background-base/95 dark:border-primary-base-dark/10 dark:bg-background-base-dark/95 relative mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-lg border shadow-xl"
              >
                {/* Header with Safe Area */}
                <div className="border-primary-base/10 bg-primary-base/5 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/5 flex h-12 items-center justify-between border-b px-3 sm:h-14 sm:px-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3" />
                  </div>
                  <div className="flex-1 px-4 text-center">
                    <p className="text-default-base/70 dark:text-default-base-dark/70 truncate text-xs sm:text-sm">
                      {url}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-default-base/70 hover:bg-primary-base/10 hover:text-default-base dark:text-default-base-dark/70 dark:hover:bg-primary-base-dark/10 dark:hover:text-default-base-dark rounded-md p-1.5 sm:p-2"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="bg-background-base dark:bg-background-base-dark absolute inset-0 flex items-center justify-center">
                    <div className="border-primary-base h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
                  </div>
                )}

                {/* iframe with Flex Grow */}
                <div className="relative flex-1">
                  {isVisible && (
                    <iframe
                      ref={iframeRef}
                      src={url}
                      className="absolute h-full w-full"
                      onLoad={handleLoad}
                      loading="lazy"
                      title={`Preview of ${url}`}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
