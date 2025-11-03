import { useActiveSectionContext } from "@/contexts/active-section-context";
import { SectionName, NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSmartNavigation } from "@/hooks/use-smart-navigation";
import { ArrowUpRight } from "lucide-react";

interface NavLinkProps {
  item: NavItem;
}

export function NavLink({ item }: NavLinkProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { getNavigationHref, isBlogPage } = useSmartNavigation();

  // Determine if this nav item is currently active
  const isActive = (() => {
    // If we're on blog pages, only Blog link should be active
    if (isBlogPage) {
      return item.name === "Blog";
    }
    // Otherwise, use the normal active section logic
    return activeSection.toLowerCase() === item.name.toLowerCase();
  })();

  const href = getNavigationHref(item);
  const isBlog = item.name === "Blog";
  const isContact = item.name === "Contact me";

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2",
        isBlog &&
          "group border-primary-base/10 bg-primary-base/10 hover:border-primary-base/20 hover:bg-primary-base/15 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/10 dark:hover:border-primary-base-dark/20 dark:hover:bg-primary-base-dark/15 flex items-center gap-1 rounded-full border px-4 transition-colors",
        // Hide contact link on desktop
        isContact && "lg:hidden",
      )}
      role="menuitem"
      aria-label={item.label}
      onClick={() => {
        setActiveSection(item.name as SectionName);
        setTimeOfLastClick(Date.now());
      }}
    >
      <motion.span
        className={cn(
          "relative font-medium transition-all duration-300",
          isActive
            ? "text-primary-base dark:text-accent-base-dark"
            : "text-default-base/70 hover:text-accent-base dark:text-default-base-dark/70 dark:hover:text-default-base-dark",
          isBlog && "flex items-center gap-1",
        )}
      >
        {item.name}
        {isBlog && (
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
        {/* Underline */}
        {!isBlog && (
          <motion.span
            className="bg-primary-base dark:bg-primary-base-dark absolute right-0 -bottom-0.5 left-0 h-px"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.span>
    </Link>
  );
}
