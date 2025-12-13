import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiVercel,
  SiFigma,
  // SiFramer,
  SiSupabase,
  SiPostgresql,
  SiPrisma,
  SiReactquery,
  SiSanity,
  SiDrizzle,
  SiGithub,
  SiMysql,
  SiGit,
  SiPostman,
  SiRedis,
  SiNotion,
  SiVite,
} from "react-icons/si";
// import { FaVuejs } from "react-icons/fa";
import { SiShadcnui } from "react-icons/si";
import { SkillsContent } from "@/lib/types";

export const skillsContent: SkillsContent = {
  title: "Skills",
  subtitle: "tech stack",
  terminalInfo: {
    command: "skill",
    flag: "list",
    content: "Modern technologies I use to build production-ready applications",
  },
  groups: [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "JavaScript", icon: SiJavascript },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        // { name: "Framer Motion", icon: SiFramer },
        { name: "Shadcn UI", icon: SiShadcnui },
        { name: "React Query", icon: SiReactquery },
        { name: "Vite", icon: SiVite },
        // { name: "Vue", icon: FaVuejs },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express.js", icon: SiExpress },
        { name: "MySQL", icon: SiMysql },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Prisma", icon: SiPrisma },
        { name: "Drizzle", icon: SiDrizzle },
        { name: "Supabase", icon: SiSupabase },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "Vercel", icon: SiVercel },
        { name: "Notion", icon: SiNotion },
        { name: "Postman", icon: SiPostman },
        { name: "Redis", icon: SiRedis },
        { name: "Sanity CMS", icon: SiSanity },
        { name: "Figma", icon: SiFigma },
      ],
    },
  ],
};
