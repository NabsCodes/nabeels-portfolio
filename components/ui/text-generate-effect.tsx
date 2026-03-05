"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function TextGenerateEffect({
  words,
  textSpeed = 28,
}: {
  words: string;
  textSpeed?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(words);
      return;
    }

    setDisplayText("");
    let currentIndex = 0;
    const step = Math.max(1, Math.ceil(words.length / 80));
    const intervalSpeed = Math.max(24, textSpeed);

    const interval = setInterval(() => {
      currentIndex = Math.min(words.length, currentIndex + step);
      setDisplayText(words.slice(0, currentIndex));

      if (currentIndex >= words.length) {
        clearInterval(interval);
      }
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [words, textSpeed, shouldReduceMotion]);

  return (
    <div className="relative">
      <p className="text-sm leading-relaxed text-pretty md:text-base">
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="bg-primary-base dark:bg-primary-base-dark ml-px inline-block h-4 w-0.5"
        />
      </p>
    </div>
  );
}
