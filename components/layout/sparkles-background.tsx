"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SparklesCore } from "@/components/ui/sparkles";

export function SparklesBackground() {
  const { theme } = useTheme();
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const isDarkTheme = theme === "dark";
  const particleDensity = isMobileViewport
    ? isDarkTheme
      ? 36
      : 44
    : isDarkTheme
      ? 72
      : 88;

  return (
    <div className="pointer-events-none fixed inset-0 h-full w-full">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.4}
        maxSize={isDarkTheme ? 1.1 : 1.4}
        particleDensity={particleDensity}
        particleColor={isDarkTheme ? "#71a295" : "#365e53"}
        enableLinks={!isMobileViewport}
      />
    </div>
  );
}
