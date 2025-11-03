"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineFileText,
  AiOutlineCode,
  AiOutlineSun,
  AiOutlineMoon,
  AiOutlineLaptop,
  AiOutlineSearch,
} from "react-icons/ai";
import { HiOutlineBriefcase, HiOutlineExternalLink } from "react-icons/hi";
import { projectsData } from "@/lib/data";

interface CommandPaletteProps {
  blogPosts?: Array<{
    slug: string;
    title: string;
  }>;
}

export function CommandPalette({ blogPosts = [] }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  // Keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Forward slash
      if (e.key === "/" && !open) {
        const target = e.target as HTMLElement;
        // Don't trigger if typing in an input
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  // Navigation commands
  const navigateTo = (path: string) => {
    runCommand(() => router.push(path));
  };

  const scrollToSection = (sectionId: string) => {
    runCommand(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Get unique tech stacks
  const uniqueTech = React.useMemo(() => {
    const techSet = new Set<string>();
    projectsData.forEach((project) => {
      project.tech.forEach((tech) => techSet.add(tech.name));
    });
    return Array.from(techSet).sort();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Quick Navigation */}
        <CommandGroup heading="Quick Navigation">
          <CommandItem
            onSelect={() => scrollToSection("hero")}
            className="gap-2"
          >
            <AiOutlineHome className="h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollToSection("about")}
            className="gap-2"
          >
            <AiOutlineUser className="h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollToSection("projects")}
            className="gap-2"
          >
            <HiOutlineBriefcase className="h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollToSection("contact")}
            className="gap-2"
          >
            <AiOutlineMail className="h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/blog")} className="gap-2">
            <AiOutlineFileText className="h-4 w-4" />
            <span>Blog</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Projects */}
        <CommandGroup heading="Projects">
          {projectsData.slice(0, 6).map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() => {
                if (project.links.live) {
                  runCommand(() => window.open(project.links.live, "_blank"));
                } else {
                  scrollToSection("projects");
                }
              }}
              className="gap-2"
            >
              <AiOutlineCode className="h-4 w-4" />
              <span>{project.title}</span>
              {project.links.live && (
                <HiOutlineExternalLink className="ml-auto h-3 w-3 opacity-50" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Filter by Tech */}
        <CommandGroup heading="Filter by Technology">
          {uniqueTech.slice(0, 8).map((tech) => (
            <CommandItem
              key={tech}
              onSelect={() => {
                runCommand(() => {
                  // Navigate to projects section and trigger filter
                  scrollToSection("projects");
                  // Dispatch custom event to trigger filter
                  window.dispatchEvent(
                    new CustomEvent("filterProjects", { detail: tech }),
                  );
                });
              }}
              className="gap-2"
            >
              <AiOutlineSearch className="h-4 w-4" />
              <span>Show {tech} projects</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Blog Posts */}
        {blogPosts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Blog Posts">
              {blogPosts.map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() => navigateTo(`/blog/${post.slug}`)}
                  className="gap-2"
                >
                  <AiOutlineFileText className="h-4 w-4" />
                  <span>{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />

        {/* Theme */}
        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => runCommand(() => setTheme("light"))}
            className="gap-2"
          >
            <AiOutlineSun className="h-4 w-4" />
            <span>Light</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme("dark"))}
            className="gap-2"
          >
            <AiOutlineMoon className="h-4 w-4" />
            <span>Dark</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme("system"))}
            className="gap-2"
          >
            <AiOutlineLaptop className="h-4 w-4" />
            <span>System</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
