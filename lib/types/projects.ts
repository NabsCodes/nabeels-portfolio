import { IconType } from "react-icons";
import { BaseSection } from "@/lib/types/common";

export type ProjectSection = BaseSection;

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  dateAdded: string; // ISO date format: "YYYY-MM-DD"
  cover?: {
    url: string;
    alt: string;
  };
  tech: Array<{
    name: string;
    icon: IconType;
  }>;
  links: {
    github?: string;
    live?: string;
  };
}
