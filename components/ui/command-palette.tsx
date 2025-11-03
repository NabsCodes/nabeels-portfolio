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
  AiOutlineStar,
  AiOutlineThunderbolt,
} from "react-icons/ai";
import { HiOutlineBriefcase, HiOutlineExternalLink } from "react-icons/hi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FiCopy, FiDownload } from "react-icons/fi";
import { projectsData, contactData, heroContent } from "@/lib/data";
import { useCommandPalette } from "@/contexts/command-palette-context";

interface CommandPaletteProps {
  blogPosts?: Array<{
    slug: string;
    title: string;
  }>;
}

export function CommandPalette({ blogPosts = [] }: CommandPaletteProps) {
  const { open, setOpen, toggle } = useCommandPalette();
  const router = useRouter();
  const { setTheme } = useTheme();

  // Keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
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
  }, [open, setOpen, toggle]);

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

  // Copy email to clipboard
  const copyEmail = React.useCallback(() => {
    navigator.clipboard.writeText(contactData.email);
    // Could add toast notification here if you have a toast system
  }, []);

  // Open external link
  const openLink = (url: string) => {
    runCommand(() => window.open(url, "_blank"));
  };

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
            onSelect={() => scrollToSection("skills")}
            className="gap-2"
          >
            <AiOutlineThunderbolt className="h-4 w-4" />
            <span>Skills</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollToSection("experience")}
            className="gap-2"
          >
            <AiOutlineCode className="h-4 w-4" />
            <span>Experience</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollToSection("testimonials")}
            className="gap-2"
          >
            <AiOutlineStar className="h-4 w-4" />
            <span>Testimonials</span>
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

        {/* Social Links */}
        <CommandGroup heading="Connect">
          <CommandItem
            onSelect={() => openLink(contactData.socials.github)}
            className="gap-2"
          >
            <SiGithub className="h-4 w-4" />
            <span>GitHub</span>
            <HiOutlineExternalLink className="ml-auto h-3 w-3 opacity-50" />
          </CommandItem>
          <CommandItem
            onSelect={() => openLink(contactData.socials.linkedin)}
            className="gap-2"
          >
            <SiLinkedin className="h-4 w-4" />
            <span>LinkedIn</span>
            <HiOutlineExternalLink className="ml-auto h-3 w-3 opacity-50" />
          </CommandItem>
          {contactData.socials.twitter && (
            <CommandItem
              onSelect={() => openLink(contactData.socials.twitter)}
              className="gap-2"
            >
              <FaXTwitter className="h-4 w-4" />
              <span>Twitter</span>
              <HiOutlineExternalLink className="ml-auto h-3 w-3 opacity-50" />
            </CommandItem>
          )}
        </CommandGroup>

        <CommandSeparator />

        {/* Contact & Resume */}
        <CommandGroup heading="Contact & Resume">
          <CommandItem
            onSelect={() => {
              runCommand(() => {
                copyEmail();
                scrollToSection("contact");
              });
            }}
            className="gap-2"
          >
            <FiCopy className="h-4 w-4" />
            <span>Copy Email</span>
            <span className="ml-auto text-xs text-default-base/60 dark:text-default-base-dark/60">
              {contactData.email}
            </span>
          </CommandItem>
          <CommandItem
            onSelect={() => openLink(heroContent.cta.secondary.href)}
            className="gap-2"
          >
            <FiDownload className="h-4 w-4" />
            <span>Download Resume</span>
            <HiOutlineExternalLink className="ml-auto h-3 w-3 opacity-50" />
          </CommandItem>
        </CommandGroup>

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
