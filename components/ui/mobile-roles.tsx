"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/data";

// Option 1: Modern Cards with Stacked Layout
const MobileRolesStacked = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="space-y-3">
      {heroContent.roles.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="group border-primary-base/20 bg-background-base/80 hover:border-accent-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-accent-base-dark/50 relative overflow-hidden rounded-lg border backdrop-blur-sm transition-all duration-300"
        >
          <div className="flex items-center gap-3 p-3">
            <div className="bg-primary-base/10 group-hover:bg-accent-base/10 dark:bg-primary-base-dark/10 dark:group-hover:bg-accent-base-dark/20 rounded-md p-2 transition-all duration-300">
              <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
            </div>
            <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
              {item.label}
            </span>
          </div>
          <div className="from-accent-base to-primary-base dark:from-accent-base-dark dark:to-primary-base-dark absolute bottom-0 h-[2px] w-full bg-linear-to-r opacity-0 transition-all duration-300 group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Option 2: Floating Chips Layout
const MobileRolesChips = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="flex flex-wrap gap-3">
      {heroContent.roles.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.6 + index * 0.1,
          }}
          className="group relative"
        >
          <div className="from-primary-base via-accent-base to-primary-base dark:from-primary-base-dark dark:via-accent-base-dark dark:to-primary-base-dark absolute -inset-1 rounded-lg bg-linear-to-r opacity-0 blur transition duration-300 group-hover:opacity-50" />
          <div className="border-primary-base bg-background-base/90 dark:border-primary-base-dark/30 dark:bg-background-base-dark/90 relative flex items-center gap-2 rounded-lg border px-4 py-2 backdrop-blur-sm transition-colors">
            <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
            <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
              {item.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Option 3: Modern Sidebar Alternative
const MobileRolesSidebar = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="border-primary-base/30 bg-background-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 relative rounded-lg border p-4 backdrop-blur-sm">
      <div className="absolute inset-x-0 -top-px mx-4 flex space-x-4">
        <div className="from-primary-base to-accent-base dark:from-primary-base-dark dark:to-accent-base-dark h-px w-8 bg-linear-to-r" />
        <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 h-px flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {heroContent.roles.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="group bg-primary-base/5 hover:border-accent-base/50 hover:bg-accent-base/5 dark:bg-primary-base-dark/5 dark:hover:border-accent-base-dark/50 dark:hover:bg-accent-base-dark/5 flex items-center gap-3 rounded-md border border-transparent p-2 transition-all duration-300"
          >
            <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
            <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Option 4: Minimal Grid with Focus States
const MobileRolesGrid = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="border-primary-base/20 bg-background-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 overflow-hidden rounded-lg border backdrop-blur-sm">
      <div className="divide-primary-base/10 dark:divide-primary-base-dark/10 grid divide-x divide-y sm:grid-cols-3">
        {heroContent.roles.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="group hover:bg-accent-base/5 dark:hover:bg-accent-base-dark/5 relative p-4 transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary-base/10 group-hover:bg-accent-base/10 dark:bg-primary-base-dark/10 dark:group-hover:bg-accent-base-dark/10 rounded-md p-2 transition-all duration-300">
                  <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
                </div>
                <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
                  {item.label}
                </span>
              </div>
            </div>
            <div className="from-accent-base to-primary-base dark:from-accent-base-dark dark:to-primary-base-dark absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-linear-to-r opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Option 5: Code Block Style
const MobileRolesCode = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="border-primary-base bg-background-base/60 dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 overflow-hidden rounded-lg border backdrop-blur-sm">
      <div className="border-primary-base/20 bg-primary-base/5 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="font-space-grotesk text-primary-base-dark/70 dark:text-primary-base-dark/70 text-xs">
            skills
          </span>
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500/50" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
            <div className="h-2 w-2 rounded-full bg-green-500/50" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {heroContent.roles.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group border-primary-base/10 bg-primary-base/5 hover:border-accent-base/30 hover:bg-accent-base/5 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/5 dark:hover:border-accent-base-dark/30 dark:hover:bg-accent-base-dark/5 flex items-center gap-2 rounded-md border p-2 transition-all duration-300"
            >
              <span className="text-primary-base-dark/50 dark:text-primary-base-dark/50 font-mono text-xs">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
              <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Option 1: Modern Floating Cards with 3D effect
const MobileRolesFloating = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {heroContent.roles.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="group relative"
        >
          {/* Gradient Glow */}
          <div className="from-primary-base to-accent-base dark:from-primary-base-dark dark:to-accent-base-dark absolute -inset-0.5 rounded-lg bg-linear-to-r opacity-0 blur transition duration-300 group-hover:opacity-30" />

          {/* Card Content */}
          <div className="border-primary-base/20 bg-background-base/80 hover:border-accent-base/50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/50 dark:hover:border-accent-base-dark/50 relative flex items-center gap-3 rounded-lg border p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
            <div className="bg-primary-base/10 ring-primary-base/20 group-hover:bg-accent-base/10 group-hover:ring-accent-base/30 dark:bg-primary-base-dark/10 dark:ring-primary-base-dark/20 dark:group-hover:bg-accent-base-dark/20 dark:group-hover:ring-accent-base-dark/30 rounded-md p-2 ring-1 transition-all duration-300">
              <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
            </div>
            <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
              {item.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Option 2: Glassmorphism Cards with Dynamic Borders
const MobileRolesGlass = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="border-primary-base/20 bg-background-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/40 relative rounded-lg border p-4 backdrop-blur-md">
      {/* Decorative Header */}
      <div className="border-primary-base/10 dark:border-primary-base-dark/10 absolute inset-x-0 top-0 flex items-center justify-between border-b px-4 py-2">
        <div className="from-primary-base to-accent-base dark:from-primary-base-dark dark:to-accent-base-dark h-px w-16 bg-linear-to-r" />
        <div className="flex space-x-1">
          <div className="bg-primary-base/40 dark:bg-primary-base-dark/40 h-1 w-1 rounded-full" />
          <div className="bg-accent-base/40 dark:bg-accent-base-dark/40 h-1 w-1 rounded-full" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {heroContent.roles.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.6 + index * 0.1,
            }}
            className="group from-background-base to-background-base hover:from-primary-base hover:to-accent-base dark:from-background-base-dark dark:to-background-base-dark dark:hover:from-primary-base-dark dark:hover:to-accent-base-dark relative rounded-lg bg-linear-to-r p-px transition-all duration-300"
          >
            <div className="bg-background-base/80 dark:bg-background-base-dark/80 relative flex items-center gap-2 rounded-lg p-3 backdrop-blur-sm">
              <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
              <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
                {item.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

// Option 3: Minimalist Tabs with Indicators
const MobileRolesMinimal = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="mb-8 lg:hidden"
  >
    <div className="border-primary-base/20 bg-background-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/40 overflow-hidden rounded-lg border backdrop-blur-sm">
      {/* Top Bar */}
      <div className="border-primary-base/10 dark:border-primary-base-dark/10 flex items-center justify-between border-b px-4 py-2">
        <span className="font-space-grotesk text-primary-base-dark/70 dark:text-primary-base-dark/70 text-xs">
          current.stack
        </span>
        <div className="flex items-center gap-2">
          <div className="bg-primary-base/30 dark:bg-primary-base-dark/30 h-1.5 w-1.5 rounded-full" />
          <div className="bg-accent-base/30 dark:bg-accent-base-dark/30 h-1.5 w-1.5 rounded-full" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="bg-primary-base/5 dark:bg-primary-base-dark/5 grid gap-px p-px sm:grid-cols-3">
        {heroContent.roles.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="group bg-background-base hover:bg-accent-base/5 dark:bg-background-base-dark dark:hover:bg-accent-base-dark/5 relative p-3 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary-base/10 group-hover:bg-accent-base/10 dark:bg-primary-base-dark/10 dark:group-hover:bg-accent-base-dark/10 rounded-md p-2 transition-all duration-300">
                <item.icon className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-colors" />
              </div>
              <span className="font-space-grotesk text-primary-base-dark group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark text-sm transition-colors">
                {item.label}
              </span>
            </div>
            {/* Active Indicator */}
            <div className="from-primary-base to-accent-base dark:from-primary-base-dark dark:to-accent-base-dark absolute inset-x-0 bottom-0 h-[2px] scale-x-0 bg-linear-to-r transition-transform duration-300 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export {
  MobileRolesStacked,
  MobileRolesChips,
  MobileRolesSidebar,
  MobileRolesGrid,
  MobileRolesCode,
  MobileRolesFloating,
  MobileRolesGlass,
  MobileRolesMinimal,
};
