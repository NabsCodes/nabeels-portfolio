import { useRef, useState } from "react";

type ToggleWithScrollOptions = {
  delayMs?: number;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
};

export function useToggleWithScroll(options?: ToggleWithScrollOptions) {
  const topRef = useRef<HTMLDivElement>(null);
  const firstExpandedRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      const delay = options?.delayMs ?? 250; // Increased for smoother animations
      const behavior = options?.behavior ?? "smooth";
      const block = options?.block ?? "center";

      setTimeout(() => {
        if (next) {
          // When expanding, scroll to first new item
          firstExpandedRef.current?.scrollIntoView({
            behavior,
            block,
          });
        } else {
          // When collapsing, check if we need to scroll
          const topElement = topRef.current;
          const buttonElement = buttonRef.current;

          if (!topElement) return;

          const topRect = topElement.getBoundingClientRect();

          // Only scroll if the top of content is below viewport
          // This prevents unnecessary scrolling when user is already viewing the section
          if (topRect.top < 0) {
            // User has scrolled past the top - scroll to button position or slightly above
            if (buttonElement) {
              buttonElement.scrollIntoView({
                behavior,
                block: "center",
              });
            } else {
              topElement.scrollIntoView({
                behavior,
                block: "start",
              });
            }
          }
          // If topRect.top >= 0, user can already see the content, so don't scroll
        }
      }, delay);
      return next;
    });
  };

  return { isExpanded, setIsExpanded, toggle, topRef, firstExpandedRef, buttonRef };
}
