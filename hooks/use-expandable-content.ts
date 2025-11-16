"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { RefObject } from "react";
import type { MotionProps } from "framer-motion";

type EaseTuple = [number, number, number, number];

type UseExpandableContentOptions = {
  collapsedHeight?: string;
  clampClassName?: string;
  transitionDuration?: number;
  transitionEase?: EaseTuple;
};

type UseExpandableContentResult<T extends HTMLElement> = {
  isExpanded: boolean;
  isClampable: boolean;
  toggle: () => void;
  motionProps: MotionProps & { ref: RefObject<HTMLDivElement> };
  contentRef: RefObject<T>;
  measureRef: RefObject<T>;
  clampClassName: string;
};

const defaultEase: EaseTuple = [0.04, 0.62, 0.23, 0.98];

export function useExpandableContent<
  T extends HTMLElement = HTMLParagraphElement,
>({
  collapsedHeight,
  clampClassName,
  transitionDuration = 0.4,
  transitionEase = defaultEase,
}: UseExpandableContentOptions = {}): UseExpandableContentResult<T> {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isClampable, setIsClampable] = useState<boolean>(false);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

  const contentRef = useRef<T | null>(null);
  const measureRef = useRef<T | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkClampable = useCallback(() => {
    if (!measureRef.current || !contentRef.current) return;

    const fullHeight = measureRef.current.scrollHeight;
    const clampedHeight = contentRef.current.clientHeight;

    setIsClampable(fullHeight > clampedHeight);
    if (!isExpanded) setExpandedHeight(fullHeight);
  }, [isExpanded]);

  useEffect(() => {
    const timeoutId = window.setTimeout(checkClampable, 0);

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => {
        window.setTimeout(checkClampable, 0);
      });

      if (contentRef.current) {
        observer.observe(contentRef.current);
      }

      return () => {
        window.clearTimeout(timeoutId);
        observer.disconnect();
      };
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [checkClampable]);

  useEffect(() => {
    if (isExpanded && measureRef.current) {
      const timeoutId = window.setTimeout(() => {
        if (measureRef.current) {
          setExpandedHeight(measureRef.current.scrollHeight);
        }
      }, 60);

      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [isExpanded]);

  const toggle = useCallback(() => {
    if (isExpanded && containerRef.current) {
      const currentHeight = containerRef.current.scrollHeight;
      if (currentHeight > 0) setExpandedHeight(currentHeight);
    } else if (!isExpanded && measureRef.current) {
      const fullHeight = measureRef.current.scrollHeight;
      if (fullHeight > 0) setExpandedHeight(fullHeight);
    }

    setIsExpanded((prev) => !prev);
  }, [isExpanded]);

  const motionProps = useMemo(
    () => ({
      ref: containerRef,
      initial: false,
      animate: {
        height: isExpanded
          ? expandedHeight !== null
            ? `${expandedHeight}px`
            : "auto"
          : collapsedHeight,
      },
      transition: {
        duration: transitionDuration,
        ease: transitionEase,
      },
    }),
    [
      collapsedHeight,
      expandedHeight,
      isExpanded,
      transitionDuration,
      transitionEase,
    ],
  );

  return {
    isExpanded,
    isClampable,
    toggle,
    motionProps,
    contentRef,
    measureRef,
    clampClassName: clampClassName ?? "",
  };
}

export type { UseExpandableContentOptions, UseExpandableContentResult };
