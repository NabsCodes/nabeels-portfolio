import { Terminal, Code2, Boxes, ArrowRight } from "lucide-react";
import { HeroContent } from "@/lib/types";

export const heroContent: HeroContent = {
  // intro: " Available for hire ",
  intro: " Open to Strategic Partnerships ",
  // intro: " CODE • CREATE • INNOVATE ",
  description:
    // "Software developer who enjoys building things for the web. Whether it's a full website or a specific feature, I create solutions that work well and look good. Discover my portfolio and explore my work.",
    "Software engineer specializing in building scalable web applications that drive business growth. From enterprise solutions to startup MVPs, I deliver robust, user-centric applications that perform. Explore my portfolio to see how I transform ideas into impactful digital solutions.",
  // "Frontend-focused developer with a knack for building reliable full-stack applications. I specialize in creating engaging user interfaces that are responsive and scalable.",
  personal: {
    name: "Hassan Umar Hassan",
    nickname: "Nabeel",
  },
  currentRole: {
    title: "Frontend Engineer",
    filename: "current_role.tsx",
  },
  roles: [
    { icon: Terminal, label: "Software Engineer" },
    { icon: Code2, label: "Frontend Developer" },
    { icon: Boxes, label: "Full Stack Developer" },
    { icon: ArrowRight, label: "Freelance Developer" },
    // Add more roles as needed
  ],
  cta: {
    primary: {
      href: "#projects",
    },
    secondary: {
      href: "https://drive.google.com/file/d/1i2bki3RXgZU2U0LNkbs2CCZLLg5i8F8A/view?usp=drive_link",
    },
  },
  social: {
    github: "https://github.com/NabsCodes",
    linkedin: "https://linkedin.com/in/hassan-umar-hassan",
  },
};
