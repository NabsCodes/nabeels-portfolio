export type TerminalInfo = {
  command: string;
  flag: string;
  content: string;
};

export type Icon = React.FC<{ className?: string }>;

export type BaseSection = {
  title: string;
  subtitle: string;
  terminalInfo: TerminalInfo;
};

export type SectionName =
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "testimonials"
  | "experience"
  | "contact me"
  | "blog"
  | "now";
