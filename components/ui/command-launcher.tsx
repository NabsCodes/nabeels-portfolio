"use client";

import { AiOutlineSearch } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useCommandPalette } from "@/contexts/command-palette-context";

interface CommandLauncherProps {
  className?: string;
}

export function CommandLauncher({ className }: CommandLauncherProps) {
  const { setOpen } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open command palette"
      className={cn(
        "border-primary-base/50 bg-background-base/90 text-default-base hover:border-primary-base/30 dark:border-primary-base-dark/30 dark:bg-background-base-dark/90 dark:text-default-base-dark dark:hover:border-primary-base-dark/30 fixed right-6 bottom-6 z-40 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors",
        "focus-visible:ring-primary-base/40 dark:focus-visible:ring-primary-base-dark/40 focus:outline-none focus-visible:ring-2",
        "shadow-none", // avoid shadow per design preference
        className,
      )}
    >
      <AiOutlineSearch className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <KbdGroup className="ml-1 hidden items-center md:inline-flex">
        <Kbd>/</Kbd>
        <Kbd className="hidden md:inline">⌘K</Kbd>
      </KbdGroup>
    </button>
  );
}
