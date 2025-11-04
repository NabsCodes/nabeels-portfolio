import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollBar({ position = "top" }) {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const isVertical = position === "left" || position === "right";

  const positionStyles = {
    left: "left-0 top-0 bottom-0 w-1",
    right: "right-0 top-0 bottom-0 w-1",
    top: "left-0 top-0 h-1 w-full",
    bottom: "left-0 bottom-0 h-1 w-full",
  };
  return (
    <div
      className={`fixed z-50 ${positionStyles[position as keyof typeof positionStyles]}`}
    >
      <motion.div
        className="bg-primary-base h-full w-full origin-top-left"
        style={{
          [isVertical ? "scaleY" : "scaleX"]: scaleProgress,
        }}
      />
    </div>
  );
}
