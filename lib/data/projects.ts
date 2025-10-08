import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFramer,
  SiGooglegemini,
  SiBootstrap,
  SiSocketdotio,
  SiDjango,
  SiCss3,
  SiHtml5,
  SiEjs,
} from "react-icons/si";
import { ProjectSection, ProjectData } from "@/lib/types";

export const projectsSection: ProjectSection = {
  title: "Projects",
  subtitle: "portfolio",
  terminalInfo: {
    command: "projects",
    flag: "list",
    content: "A collection of my selected works & key projects",
  },
};

export const projectsData: ProjectData[] = [
  {
    id: "project-1",
    title: "Abdamin International Limited",
    description:
      "Enterprise web application for a multi-sector Nigerian company, featuring responsive design, optimized performance, and scalable architecture. Delivered improved user engagement and streamlined business operations.",
    featured: true,
    cover: {
      url: "/projects/abdamin.webp",
      alt: "Abdamin International Limited",
    },
    tech: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
    ],
    links: {
      github: "https://github.com/NabsCodes/abdamin",
      live: "https://abdamin.com/",
    },
  },
  {
    id: "project-2",
    title: "Horizon - Crypto SaaS Platform",
    description:
      "AI-powered SaaS platform for crypto startups, featuring real-time trend analysis, intelligent query processing, and strategic decision-making tools. Designed to help businesses make data-driven decisions in volatile markets.",
    featured: true,
    cover: {
      url: "/projects/horizon.webp",
      alt: "Horizon - Crypto SaaS",
    },
    tech: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
    ],
    links: {
      github: "https://github.com/NabsCodes/horizon",
      live: "https://horizonbusiness.vercel.app/",
    },
  },
  {
    id: "project-3",
    title: "Library Meta Bot System",
    description:
      "Advanced library management system with AI-assisted cataloging, comprehensive classification tools, and robust metadata management. Streamlines library operations and improves resource discovery for users.",
    featured: true,
    cover: {
      url: "/projects/lib-meta-bot.webp",
      alt: "Library Metabot System",
    },
    tech: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "React", icon: SiReact },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Gemini", icon: SiGooglegemini },
    ],
    links: {
      github: "https://github.com/NabsCodes/LibMetaBot",
      live: "https://lib-meta-bot.vercel.app/",
    },
  },
  {
    id: "project-4",
    title: "Yara - eCommerce Landing Page",
    description:
      "A landing page built for eCommerce small businesses. Yara is a project crafted from my time at Perxcels UI/UX school.",
    featured: false,
    cover: {
      url: "/projects/yara.webp",
      alt: "Blog platform interface",
    },
    tech: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
    links: {
      github: "https://github.com/NabsCodes/yara",
      live: "https://yara-seven.vercel.app/",
    },
  },
  {
    id: "project-5",
    title: "SMS Scheduler App",
    description:
      "An SMS Scheduler app developed for MKEL Networks to schedule SMS messages. It allows automation of sending recurring messages at specific times and intervals using third-party API(s).",
    featured: false,
    tech: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "EJS", icon: SiEjs },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "MongoDB", icon: SiMongodb },
    ],
    links: {
      github: "https://github.com/NabsCodes/sms-scheduler",
    },
  },
  {
    id: "project-6",
    title: "Elderly Care Management System",
    description:
      "An elderly care management system to monitor and manage the health and well-being of elderly individuals.",
    featured: false,
    cover: {
      url: "/projects/ecms.webp",
      alt: "Fitness tracking dashboard",
    },
    tech: [
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
    links: {
      github: "https://github.com/NabsCodes/ecms",
    },
  },
  {
    id: "project-7",
    title: "CGPA Calculator",
    description:
      "A CGPA calculator for students to calculate their cumulative grade point average.",
    featured: false,
    tech: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Django", icon: SiDjango },
    ],
    links: {
      github: "https://github.com/NabsCodes/cgpa_calculator",
      live: "https://nabeelhassan.pythonanywhere.com",
    },
  },
  {
    id: "project-8",
    title: "CGPA Calculator V2",
    description:
      "Enhanced academic planning platform with goal setting, scenario analysis, and progress visualization. Empowers students to make strategic academic decisions and track long-term performance trends.",
    featured: true,
    cover: {
      url: "/projects/cgpa-calculator-1.png",
      alt: "CGPA Calculator V2",
    },
    tech: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
    links: {
      github: "https://github.com/NabsCodes/cgpa_calculator",
      live: "https://cgpa-calculator-v2.vercel.app",
    },
  },
  // {
  //   id: "project-9",
  //   title: "Drive-X",
  //   description:
  //     "Drive X is a google drive clone built with Next.js and TypeScript. It was inspired by a tutorial by Theo - T3.gg",
  //   featured: true,
  //   cover: {
  //     url: "/projects/drive-x.png",
  //     alt: "Drive-X",
  //   },
  //   tech: [
  //     { name: "TypeScript", icon: SiTypescript },
  //     { name: "Next.js", icon: SiNextdotjs },
  //     { name: "React", icon: SiReact },
  //     { name: "Tailwind", icon: SiTailwindcss },
  //     { name: "Clerk", icon: SiClerk },
  //   ],
  //   links: {
  //     github: "https://github.com/NabsCodes/drive-x",
  //     live: "https://drive-x.vercel.app",
  //   },
  // },
];
