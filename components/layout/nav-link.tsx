import { useActiveSectionContext } from "@/context/active-section-context";
import { SectionName } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  label?: string;
  name: string;
}

export function NavLink({ href, label, name }: NavLinkProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const isActive = activeSection.toLowerCase() === name.toLowerCase();

  return (
    <Link
      href={href}
      className="relative px-3 py-2"
      role="menuitem"
      aria-label={label}
      onClick={() => {
        setActiveSection(name as SectionName);
        setTimeOfLastClick(Date.now());
      }}
    >
      <motion.span
        className={cn(
          "relative font-medium transition-all duration-300",
          isActive
            ? "text-primary-base dark:text-accent-base-dark"
            : "text-default-base/70 hover:text-accent-base dark:text-default-base-dark/70 dark:hover:text-default-base-dark",
        )}
      >
        {name}
        <motion.span
          className="bg-primary-base dark:bg-primary-base-dark absolute right-0 -bottom-0.5 left-0 h-px"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        />
      </motion.span>
    </Link>
  );
}
