"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Contexts
interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  type?: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);
const AccordionItemContext = createContext<string | undefined>(undefined);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within Accordion");
  }
  return context;
};

// Root Accordion Component
interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = "single",
  defaultValue,
  className,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (defaultValue) {
      return new Set(
        Array.isArray(defaultValue) ? defaultValue : [defaultValue],
      );
    }
    return new Set();
  });

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (type === "single") {
        newSet.clear();
        if (!prev.has(value)) {
          newSet.add(value);
        }
      } else {
        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          newSet.add(value);
        }
      }
      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

// Accordion Item
interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  value,
  className,
}) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <div
        className={cn(
          "border-primary-base/40 bg-background-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 overflow-hidden rounded-lg border backdrop-blur-sm transition-colors",
          className,
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

// Accordion Trigger
interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  showChevron?: boolean;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  showChevron = true,
}) => {
  const { openItems, toggleItem } = useAccordion();
  const value = useContext(AccordionItemContext);

  if (!value) {
    throw new Error("AccordionTrigger must be used within AccordionItem");
  }

  const isOpen = openItems.has(value);

  return (
    <button
      onClick={() => toggleItem(value)}
      className={cn(
        "hover:bg-primary-base/5 dark:hover:bg-primary-base-dark/5 flex w-full items-center justify-between p-4 text-left transition-colors",
        className,
      )}
    >
      <div className="flex-1">{children}</div>
      {showChevron && (
        <ChevronDown
          className={cn(
            "text-primary-base dark:text-primary-base-dark h-4 w-4 transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        />
      )}
    </button>
  );
};

// Accordion Content
interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
}) => {
  const { openItems } = useAccordion();
  const value = useContext(AccordionItemContext);

  if (!value) {
    throw new Error("AccordionContent must be used within AccordionItem");
  }

  const isOpen = openItems.has(value);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "border-primary-base/20 dark:border-primary-base-dark/10 border-t p-4",
              className,
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
