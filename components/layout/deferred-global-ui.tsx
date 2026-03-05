"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const CommandPalette = dynamic(
  () =>
    import("@/components/ui/command-palette").then((mod) => mod.CommandPalette),
  { ssr: false },
);

const CommandLauncher = dynamic(
  () =>
    import("@/components/ui/command-launcher").then(
      (mod) => mod.CommandLauncher,
    ),
  { ssr: false },
);

const SparklesBackground = dynamic(
  () =>
    import("@/components/layout/sparkles-background").then(
      (mod) => mod.SparklesBackground,
    ),
  { ssr: false },
);

export function DeferredGlobalUI() {
  const [showParticles, setShowParticles] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    // Delay decorative particles until the initial render/interaction settles.
    const timer = window.setTimeout(() => {
      setShowParticles(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <>
      <CommandPalette />
      <CommandLauncher />
      {showParticles ? <SparklesBackground /> : null}
    </>
  );
}
