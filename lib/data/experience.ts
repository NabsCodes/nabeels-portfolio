import { ExperienceContent } from "@/lib/types";

export const experienceData: ExperienceContent = {
  title: "Experience",
  subtitle: "journey",
  terminalInfo: {
    command: "career",
    flag: "experiences",
    content: "Discover my career journey and work experience",
  },
  experiences: [
    {
      id: "exp-1",
      role: "Technical Support",
      company: "Nigerian Communications Commission",
      companyUrl: "https://www.ncc.gov.ng/",
      location: "Abuja, Nigeria",
      type: "Internship",
      dates: {
        start: "2022-07",
        end: "2022-08",
      },
      description:
        "Supported Technical Standards & Network Integrity Department with data analysis and documentation.",
      achievements: [
        "Implemented efficient MySQL queries to analyze and manage telecommunications user data, processing over 10,000 records.",
        "Developed technical documentation from industry meetings, enhancing team knowledge base of Mobile Network Operators (MNOs) standards.",
        "Supported data integrity through MySQL database management, working closely with the Technical Standards unit.",
      ],
      current: false,
    },
    {
      id: "exp-2",
      role: "Full Stack Developer",
      company: "Mkel Networks Limited",
      companyUrl: "https://mkelnetworks.com",
      location: "Abuja, Nigeria",
      type: "Internship",
      dates: {
        start: "2023-08",
        end: "2024-05",
      },
      description:
        "Developed and maintained multiple client projects and supported team members, focusing on scalable web applications.",
      achievements: [
        "Enhanced team productivity by 50% through the development of an SMS scheduling app with Node.js and Express.",
        "Monitored client queries remotely during night shifts, maintaining a 95% response rate.",
        "Led 80% of frontend and 20% of backend development for an HR Management system, implementing user authentication and core features.",
      ],
      current: false,
    },
    {
      id: "exp-3",
      role: "Freelance Developer",
      company: "Self-Employed",
      location: "Remote",
      type: "Freelance",
      dates: {
        start: "2024-05",
        end: "Present",
      },
      description:
        "Deliver end-to-end freelance web development services, collaborating with cross-functional teams to create tailored client solutions.",
      achievements: [
        "Work closely with designers and backend developers to build seamless, user-focused web applications for diverse clients.",
        "Manage full project lifecycles, from requirements gathering and UI/UX design to deployment and ongoing support.",
        "Build responsive, scalable websites and applications, ensuring high performance and client satisfaction.",
      ],
      current: true,
    },
  ],
};
