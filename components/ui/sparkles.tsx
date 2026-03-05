/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  enableLinks?: boolean;
};

export function SparklesCore({
  id = "tsparticles",
  className = "",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  particleColor = "#ffffff",
  enableLinks = true,
}: SparklesProps) {
  const [init, setInit] = useState(false);
  const options = useMemo(
    () => ({
      fpsLimit: 45,
      detectRetina: false,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      background: {
        color: {
          value: background,
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: { enable: true },
        },
      },
      particles: {
        number: {
          value: particleDensity,
          density: {
            enable: true,
          },
        },
        color: {
          value: particleColor,
        },
        size: {
          value: { min: minSize, max: maxSize },
        },
        move: {
          enable: true,
          direction: "none" as const,
          speed: 0.2,
        },
        opacity: {
          value: { min: 0.08, max: 0.35 },
        },
        links: {
          enable: enableLinks,
          distance: 130,
          color: particleColor,
          opacity: 0.12,
          width: 0.8,
        },
      },
    }),
    [background, enableLinks, maxSize, minSize, particleColor, particleDensity],
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return <Particles id={id} className={className} options={options} />;
}
