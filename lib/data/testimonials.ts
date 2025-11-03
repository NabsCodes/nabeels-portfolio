import { TestimonialsContent } from "@/lib/types";

export const testimonialsContent: TestimonialsContent = {
  title: "Testimonials",
  subtitle: "what people say",
  terminalInfo: {
    command: "say",
    flag: "testimonials",
    content: "Feedback from clients and collaborators",
  },
  items: [
    {
      id: "t1",
      quote:
        "Hassan excels at working with teams and bringing people together to achieve shared goals. His ability to learn and adapt make him a valuable asset to any software project.",
      author: {
        name: "Baraatu Audu",
        role: "Supervisor",
        company: "MKEL Networks",
        avatarUrl: "/images/bara.webp",
      },
    },
    {
      id: "t2",
      quote:
        "Hassan was with us for few months for the UI/UX design learning, but his key eye to details and his ability to help others is what made him stand out.",
      author: {
        name: "Perxcels UI/UX School",
        role: "Mentor",
        company: "Perxcels",
        // avatarUrl: "/images/perxcels.webp",
      },
    },
    {
      id: "t3",
      quote:
        "Working with Hassan to translate designs into real applications was seamless. He's easy to work with and has a keen eye for design and user experience details.",
      author: {
        name: "Kolawole Olubummo",
        role: "Product Designer",
        company: "MKEL Networks",
        avatarUrl: "/images/kola.webp",
      },
    },
    {
      id: "t4",
      quote:
        "I had the pleasure of mentoring Hassan over the past year as he explored how to define his craft as a software engineer. His combination of technical curiosity, consistency, and tenacity will make him an asset to any engineering team. He approaches learning with both creativity and curiosity, always eager to understand not just how things work, but why.",
      author: {
        name: "Janet Onyeche Audu",
        role: "Lead Software Engineer",
        company: "Morgan Stanley",
        avatarUrl: "/images/janet.webp",
      },
    },
  ],
};
