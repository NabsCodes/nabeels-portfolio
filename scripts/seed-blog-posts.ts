import { createClient } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { BlogPortableText, CodeBlock } from "@/lib/types/blog";

// Load environment variables
// eslint-disable-next-line @typescript-eslint/no-require-imports
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("dotenv").config({ path: ".env.local" });
} catch {
  // dotenv not available, assume env vars are set
}

// Sanity client with write permissions
// Note: You'll need to add SANITY_API_TOKEN to your .env.local file
// Get your token from: https://www.sanity.io/manage/personal/api/tokens
// Make sure the token has Editor permissions (or at least "Editor" role)
if (!process.env.SANITY_API_TOKEN) {
  console.error(
    "\n❌ Error: SANITY_API_TOKEN is missing from your .env.local file\n",
  );
  console.log("To fix this:");
  console.log("1. Go to https://www.sanity.io/manage/personal/api/tokens");
  console.log("2. Create a new token with 'Editor' permissions");
  console.log("3. Add it to your .env.local file:");
  console.log("   SANITY_API_TOKEN=your-token-here\n");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-25",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Required for write operations
});

interface SeedBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: BlogPortableText;
  tags: string[];
  category: string;
  publishedAt: string;
  readingTime: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

// Helper to create portable text blocks
function createTextBlock(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: Math.random().toString(36).substring(7),
    style: "normal",
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).substring(7),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

function createHeadingBlock(
  text: string,
  level: 1 | 2 | 3 | 4,
): PortableTextBlock {
  return {
    _type: "block",
    _key: Math.random().toString(36).substring(7),
    style: `h${level}`,
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).substring(7),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

function createCodeBlock(
  code: string,
  language: string,
  filename?: string,
): CodeBlock {
  return {
    _type: "codeBlock",
    _key: Math.random().toString(36).substring(7),
    language,
    code,
    filename,
  };
}

const seedPosts: SeedBlogPost[] = [
  {
    title:
      "From Setup to Production: Building Scalable Apps with Next.js and TypeScript",
    slug: "building-modern-web-apps",
    excerpt:
      "A practical guide to building production-ready React applications with Next.js and TypeScript, covering project structure, custom hooks, and deployment strategies.",
    category: "Tutorial",
    tags: ["Next.js", "TypeScript", "React", "Web Development"],
    publishedAt: new Date("2025-01-15T10:00:00Z").toISOString(),
    readingTime: 8,
    seo: {
      metaTitle:
        "From Setup to Production: Building Scalable Apps with Next.js and TypeScript",
      metaDescription:
        "A practical guide to building production-ready React applications with Next.js and TypeScript, covering project structure, custom hooks, and deployment strategies.",
    },
    content: [
      createHeadingBlock("Why Next.js and TypeScript?", 2),
      createTextBlock(
        "Web development has evolved significantly over the past few years. In this comprehensive guide, we'll explore how to build modern, scalable web applications using Next.js and TypeScript.",
      ),
      createTextBlock(
        "Next.js provides an excellent foundation for React applications with features like Server-Side Rendering (SSR) for better SEO, Static Site Generation (SSG) for optimal performance, API Routes for backend functionality, and Image Optimization out of the box.",
      ),
      createTextBlock(
        "TypeScript adds type safety and developer experience improvements that are crucial for large-scale applications.",
      ),
      createHeadingBlock("Getting Started", 3),
      createTextBlock(
        "First, let's create a new Next.js project with TypeScript:",
      ),
      createCodeBlock(
        `npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm run dev`,
        "bash",
      ),
      createTextBlock(
        "This will set up a project with TypeScript configuration, Tailwind CSS for styling, and ESLint for code quality.",
      ),
      createHeadingBlock("Project Structure", 2),
      createTextBlock(
        "A well-organized project structure is crucial for maintainability:",
      ),
      createCodeBlock(
        `app/
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── types/            # TypeScript type definitions
└── (routes)/         # App Router pages`,
        "text",
        "project-structure.txt",
      ),
      createHeadingBlock("Key Features to Implement", 3),
      createTextBlock(
        "Key features include the App Router for better performance and layouts, Server Components to reduce bundle size, Middleware for authentication and redirects, and API Routes for full-stack capabilities.",
      ),
      createHeadingBlock("Advanced Patterns", 2),
      createHeadingBlock("Custom Hooks", 3),
      createTextBlock("Creating reusable logic with custom hooks:"),
      createCodeBlock(
        `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue] as const;
}`,
        "typescript",
        "use-local-storage.ts",
      ),
      createHeadingBlock("Theme Provider", 3),
      createTextBlock("Implementing a dark mode theme provider:"),
      createCodeBlock(
        `"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}`,
        "typescript",
        "theme-provider.tsx",
      ),
      createTextBlock(
        "Pro Tip: Always handle edge cases like SSR when working with browser APIs like localStorage or window.",
      ),
      createHeadingBlock("Performance Optimization", 2),
      createHeadingBlock("Image Optimization", 3),
      createTextBlock(
        "Next.js provides excellent image optimization out of the box:",
      ),
      createCodeBlock(
        `import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero section image"
      width={1200}
      height={600}
      priority
      className="rounded-lg"
    />
  );
}`,
        "jsx",
        "hero-image.tsx",
      ),
      createHeadingBlock("Code Splitting", 3),
      createTextBlock("Implement dynamic imports for better performance:"),
      createCodeBlock(
        `import { lazy, Suspense } from 'react';

const DynamicChart = lazy(() => import('./Chart'));

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <DynamicChart />
      </Suspense>
    </div>
  );
}`,
        "typescript",
        "dashboard.tsx",
      ),
      createHeadingBlock("Deployment Considerations", 2),
      createTextBlock(
        "When deploying your Next.js application: Use .env.local for development environment variables, enable compression and minification for build optimization, use Vercel or similar platforms for CDN integration, and consider serverless databases like PlanetScale for database setup.",
      ),
      createTextBlock(
        "For more advanced topics, check out the official Next.js documentation.",
      ),
      createTextBlock("Happy coding! 🚀"),
    ],
  },
  {
    title: "Why I Switched to Tailwind CSS and Never Looked Back",
    slug: "why-i-switched-to-tailwind-css",
    excerpt:
      "My journey from traditional CSS to Tailwind CSS, and why the utility-first approach changed how I think about styling web applications.",
    category: "Web Development",
    tags: ["Tailwind CSS", "CSS", "Frontend", "Development"],
    publishedAt: new Date("2025-01-10T10:00:00Z").toISOString(),
    readingTime: 6,
    seo: {
      metaTitle: "Why I Switched to Tailwind CSS and Never Looked Back",
      metaDescription:
        "A developer's perspective on switching to Tailwind CSS and how it changed their approach to styling web applications.",
    },
    content: [
      createHeadingBlock("The Initial Skepticism", 2),
      createTextBlock(
        "When I first heard about Tailwind CSS, I was skeptical. Writing styles directly in HTML? That sounded like going back to inline styles, which we'd all agreed was bad practice. I'd spent years learning CSS architecture, BEM methodology, and organizing stylesheets. Why would I throw that away?",
      ),
      createTextBlock(
        "But after building a few projects with Tailwind, I realized I had it all wrong. It wasn't about abandoning good practices—it was about a different way of thinking about styling that actually made more sense for modern web development.",
      ),
      createHeadingBlock("What Changed My Mind", 2),
      createTextBlock(
        "The turning point came when I was building this portfolio. I needed to create responsive layouts, implement dark mode, and ensure everything looked consistent. With traditional CSS, I'd spend hours writing media queries, creating custom classes, and managing a growing stylesheet.",
      ),
      createTextBlock(
        "With Tailwind, I found myself moving faster. Not because I was writing less code—honestly, sometimes there's more—but because I wasn't context-switching between files. I could see exactly what styles were applied right there in the component. No more hunting through CSS files wondering where a style came from.",
      ),
      createCodeBlock(
        `// Before: Separate CSS file
.card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}

// With Tailwind: Right there in the component
<div className="flex flex-col md:flex-row p-6 bg-white rounded-lg shadow-sm hover:shadow-md">
  {/* content */}
</div>`,
        "typescript",
      ),
      createHeadingBlock("The Real Benefits", 2),
      createTextBlock(
        "What I love most about Tailwind isn't the speed—though that's nice. It's the consistency. When I use `p-4`, I know it's always 1rem of padding. When I use `text-primary-base`, I know it matches my design system. There's no guessing, no inconsistencies, no 'wait, did I use padding-16 or padding-large here?'",
      ),
      createTextBlock(
        "Dark mode became trivial. Instead of writing separate stylesheets or complex CSS variables, I just add `dark:` variants. The same component works in both themes without any extra effort. It's elegant.",
      ),
      createCodeBlock(
        `<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
    This Just Works
  </h2>
  <p className="text-gray-600 dark:text-gray-400">
    No separate stylesheets needed.
  </p>
</div>`,
        "jsx",
      ),
      createHeadingBlock("The Learning Curve", 2),
      createTextBlock(
        "I won't lie—there was a learning curve. The class names felt verbose at first. But after a few weeks, I stopped thinking about the classes and started thinking about the design. The utility classes became muscle memory, like typing.",
      ),
      createTextBlock(
        "The Tailwind IntelliSense extension helped tremendously. Having autocomplete for all the utilities meant I didn't need to memorize everything. I could discover new utilities as I needed them.",
      ),
      createHeadingBlock("What I Still Use Custom CSS For", 2),
      createTextBlock(
        "I'm not dogmatic about it. There are still times when custom CSS makes sense. Complex animations, unique layouts that don't fit Tailwind's model, or when I need to style third-party components that I can't modify directly.",
      ),
      createTextBlock(
        "But for 90% of what I build, Tailwind covers it. And when I do need custom CSS, I use Tailwind's `@apply` directive or add it to my global styles. The best part? I'm not fighting against Tailwind—it's designed to work alongside custom CSS when needed.",
      ),
      createCodeBlock(
        `// Custom animation that doesn't fit Tailwind's model
@keyframes customSlide {
  from {
    transform: translateX(-100%) rotate(-5deg);
  }
  to {
    transform: translateX(0) rotate(0deg);
  }
}

.custom-animation {
  animation: customSlide 0.5s ease-out;
}

// Still use Tailwind for everything else
<div className="p-6 bg-white rounded-lg custom-animation">
  Content here
</div>`,
        "css",
      ),
      createHeadingBlock("The Migration Experience", 2),
      createTextBlock(
        "When I migrated this portfolio to Tailwind CSS v4, I was worried about breaking changes. But the migration was smoother than expected. The new CSS-first configuration made sense, and having everything in one place (globals.css) actually simplified things.",
      ),
      createTextBlock(
        "The biggest win? No more `tailwind.config.ts` file cluttering my project. Everything is defined in CSS using `@theme`, which feels more natural. Colors, spacing, fonts—all in one place, easy to find and modify.",
      ),
      createHeadingBlock("Why It Works for Me", 2),
      createTextBlock(
        "Tailwind CSS fits how I work. I think in terms of components, not stylesheets. When I'm building a button component, I want to see all its styles right there. When I'm adjusting spacing, I want to do it inline, not jump to another file.",
      ),
      createTextBlock(
        "It's not for everyone, and that's okay. Some developers prefer the separation of concerns that traditional CSS provides. But for me, Tailwind has made styling more enjoyable and less frustrating. I spend less time fighting CSS and more time building features.",
      ),
      createHeadingBlock("Final Thoughts", 2),
      createTextBlock(
        "If you're on the fence about Tailwind CSS, my advice is simple: try it on a small project. Don't try to migrate everything at once. Build something new with it, see how it feels, and decide if it fits your workflow.",
      ),
      createTextBlock(
        "For me, it's become an essential tool. It's not perfect—no tool is—but it's made me more productive and my code more maintainable. And honestly, that's what matters most.",
      ),
    ],
  },
  {
    title:
      "Speed Matters: Performance Optimization Strategies for React Applications",
    slug: "making-websites-faster-performance-guide",
    excerpt:
      "Practical techniques to improve React app performance, from image optimization to code splitting. Real strategies that deliver measurable results.",
    category: "Web Development",
    tags: ["Next.js", "Performance", "Web Development"],
    publishedAt: new Date("2025-10-29T10:00:00Z").toISOString(),
    readingTime: 5,
    seo: {
      metaTitle:
        "Speed Matters: Performance Optimization Strategies for React Applications",
      metaDescription:
        "Practical techniques to improve React app performance, from image optimization to code splitting. Real strategies that deliver measurable results.",
    },
    content: [
      createHeadingBlock("Why Speed Matters", 2),
      createTextBlock(
        "Think about the last time you visited a website that took forever to load. Did you wait patiently, or did you leave? Most people leave. In fact, if a website takes more than 3 seconds to load, over half of visitors will abandon it. That's like opening a store but having customers walk away before they even see what you're selling.",
      ),
      createTextBlock(
        "Speed isn't just about convenience. It directly impacts business. Faster websites have higher conversion rates, better search rankings, and happier users. It's one of those rare improvements that benefits everyone. Users get a better experience, and businesses get better results.",
      ),
      createHeadingBlock("The Old Way vs. The New Way", 2),
      createTextBlock(
        "Traditionally, websites worked like a restaurant where every order had to be prepared from scratch when you arrived. The kitchen (server) would gather all ingredients (data), prepare everything (process), and then bring it to your table (your browser). This works, but it's slow.",
      ),
      createTextBlock(
        "Modern web development uses a smarter approach. Think of it like a restaurant that preps some things ahead of time. The menu (static content) is already ready. Popular dishes (frequently accessed data) are partially prepared. Only custom orders (interactive features) are made fresh when needed.",
      ),
      createHeadingBlock("What Makes Websites Slow?", 2),
      createTextBlock(
        "There are a few common culprits. Large images that haven't been optimized are like trying to send a high-resolution photo via text message. It takes forever. Loading everything at once is like trying to read every book in a library before choosing one. It's unnecessary and overwhelming.",
      ),
      createTextBlock(
        "The solution? Load what you need, when you need it. Show the most important content first (like a newspaper headline), then load the rest progressively. Optimize images so they're the right size for what's being displayed. These simple changes can cut loading times in half.",
      ),
      createHeadingBlock("Real-World Results", 2),
      createTextBlock(
        "I've seen websites improve their loading speed by 30 to 40 percent just by applying these modern techniques. That might not sound like much, but it means a website that used to take 5 seconds now loads in 3 seconds. For users, that's the difference between frustration and satisfaction. And for businesses, that's the difference between a sale and a lost customer.",
      ),
      createTextBlock(
        "The best part? These improvements compound over time. Faster websites rank better in search results, which means more visitors. More visitors with a better experience means more conversions. It's a win-win that starts with understanding that speed matters. And once you start optimizing, you'll notice the impact immediately.",
      ),
    ],
  },
  {
    title:
      "TypeScript in Practice: How Type Safety Transformed My Development Workflow",
    slug: "typescript-helps-prevent-mistakes",
    excerpt:
      "Real-world insights on using TypeScript effectively. How type safety catches bugs early, improves team collaboration, and makes code more maintainable.",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    publishedAt: new Date("2025-10-15T10:00:00Z").toISOString(),
    readingTime: 6,
    seo: {
      metaTitle:
        "TypeScript in Practice: How Type Safety Transformed My Development Workflow",
      metaDescription:
        "Real-world insights on using TypeScript effectively. How type safety catches bugs early, improves team collaboration, and makes code more maintainable.",
    },
    content: [
      createHeadingBlock("What Is TypeScript?", 2),
      createTextBlock(
        "Imagine writing a letter without knowing if you're using the right words. That's what coding in JavaScript can feel like sometimes. TypeScript is like having a smart editor that checks your work as you write, catching mistakes before they cause problems.",
      ),
      createTextBlock(
        "Think of it this way: if JavaScript is like speaking a language without grammar rules, TypeScript adds those rules. It helps ensure that when you say 'this should be a number,' it actually is a number. When you say 'this function needs a name,' it checks that you're providing a name.",
      ),
      createHeadingBlock("Why It Matters", 2),
      createTextBlock(
        "In my experience, small mistakes can cause big problems. A typo in a variable name might cause your website to break. Passing the wrong type of data to a function might cause errors that are hard to find. TypeScript catches these issues before your users ever see them. It's saved me hours of debugging time.",
      ),
      createTextBlock(
        "It's like having a safety net. You can still write code the way you want, but TypeScript watches for common mistakes and warns you about them. This saves time, prevents bugs, and makes code easier to understand. I can't count how many times TypeScript has caught a bug before it made it to production.",
      ),
      createHeadingBlock("Real-World Example", 2),
      createTextBlock(
        "Let's say you're building a button component. With TypeScript, you can specify exactly what information that button needs: a label (text), an action (what happens when clicked), and maybe a style (primary or secondary).",
      ),
      createTextBlock(
        "If someone tries to use your button without providing the required label, TypeScript will catch that mistake immediately. It's like a form that won't let you submit until all required fields are filled. Except it works for code, which means you catch problems before they reach your users.",
      ),
      createCodeBlock(
        `// TypeScript ensures the button gets what it needs
interface ButtonProps {
  label: string;        // Required: button text
  onClick: () => void;  // Required: what happens on click
  variant?: 'primary' | 'secondary'; // Optional: style
  disabled?: boolean;  // Optional: can it be clicked?
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick} className={variant}>
    {label}
  </button>;
}`,
        "typescript",
        "button-example.tsx",
      ),
      createHeadingBlock("Benefits for Teams", 2),
      createTextBlock(
        "When teams use TypeScript, collaboration becomes easier. New team members can understand code faster because TypeScript acts like documentation. It tells you what each function expects and what it returns, making code self-explanatory.",
      ),
      createTextBlock(
        "It's like having labels on everything in a shared workspace. You don't need to ask 'what does this do?' because the labels tell you. This reduces confusion, speeds up onboarding, and helps teams work together more effectively. I've seen new developers become productive in days instead of weeks when TypeScript is used well.",
      ),
      createHeadingBlock("The Learning Curve", 2),
      createTextBlock(
        "TypeScript does require learning some new concepts, but the investment pays off quickly. Think of it like learning to drive with a backup camera. It might seem like extra work at first, but once you're used to it, you wonder how you ever managed without it. The safety and clarity it provides become essential.",
      ),
      createTextBlock(
        "The good news? You can adopt TypeScript gradually. Start with simple type annotations, then gradually use more advanced features as you become comfortable. Many teams find that within a few months, TypeScript becomes second nature.",
      ),
      createHeadingBlock("The Bottom Line", 2),
      createTextBlock(
        "TypeScript isn't about making coding harder. It's about making it safer and more predictable. It catches mistakes early, makes code easier to understand, and helps teams collaborate better. For businesses, that means fewer bugs, faster development, and happier developers. And happier developers write better code.",
      ),
      createTextBlock(
        "It's one of those tools that seems like extra work until you experience the benefits. Then you realize it's actually saving you time and preventing headaches. In the world of web development, that's a win-win.",
      ),
    ],
  },
  {
    title:
      "Accessibility First: Building Inclusive React Applications That Work for Everyone",
    slug: "building-websites-everyone-can-use",
    excerpt:
      "Beyond compliance: practical strategies for building accessible React applications. Real techniques that improve usability for all users while enhancing SEO and maintainability.",
    category: "Web Development",
    tags: ["Accessibility", "Web Development", "Best Practices"],
    publishedAt: new Date("2025-10-08T10:00:00Z").toISOString(),
    readingTime: 7,
    seo: {
      metaTitle:
        "Accessibility First: Building Inclusive React Applications That Work for Everyone",
      metaDescription:
        "Beyond compliance: practical strategies for building accessible React applications. Real techniques that improve usability for all users while enhancing SEO and maintainability.",
    },
    content: [
      createHeadingBlock("What Is Accessibility?", 2),
      createTextBlock(
        "Imagine trying to use a website without being able to see the screen, or without being able to use a mouse. That's what millions of people face every day. Accessibility is about building websites that work for everyone, regardless of their abilities or how they access the web.",
      ),
      createTextBlock(
        "Think of it like building a physical store with ramps and wide aisles. Those features help people in wheelchairs, but they also help parents with strollers and delivery people with carts. Similarly, accessible websites work better for everyone, not just people with disabilities.",
      ),
      createHeadingBlock("Why It Matters for Business", 2),
      createTextBlock(
        "Here's something I've learned: accessible websites reach more customers. About 15 percent of the world's population has some form of disability. That's a huge market you're missing if your website isn't accessible. And honestly, once you start building accessible sites, you realize they're just better sites overall.",
      ),
      createTextBlock(
        "But it's not just about reaching more people. Accessible websites also rank better in search results, work better on mobile devices, and are easier to maintain. It's one of those rare situations where doing the right thing also happens to be the smart business decision. I've seen this play out time and time again.",
      ),
      createHeadingBlock("Simple Things That Make a Big Difference", 2),
      createTextBlock(
        "You don't need to be a technical expert to understand accessibility basics. Here are some simple concepts that make websites more accessible:",
      ),
      createTextBlock(
        "Use clear headings and structure. Think of your website like a book with chapters and sections. Screen readers (tools that read websites aloud for blind users) use headings to navigate. If your headings are clear and logical, everyone can find what they're looking for more easily.",
      ),
      createTextBlock(
        "Add text descriptions to images. When someone can't see an image, they rely on text descriptions called alt text to understand what it shows. It's like describing a photo to someone over the phone. You tell them what's important about the image, not every single detail.",
      ),
      createTextBlock(
        "Make sure everything works with a keyboard. Some people can't use a mouse, so they navigate websites using only their keyboard. If your website requires a mouse, you're excluding those users. Test your site by trying to use it with only the Tab key and Enter key.",
      ),
      createHeadingBlock("Color Isn't Everything", 2),
      createTextBlock(
        "Have you ever seen a form that shows errors only in red? If you're colorblind, you might not notice the error. The solution is simple: use more than just color to convey information. Add icons, text labels, or patterns in addition to color.",
      ),
      createTextBlock(
        "It's like traffic lights. They use color, but they also use position. Red is always on top, green is always on bottom. That way, even if you can't see colors, you know which light is which. Websites should work the same way. Don't rely on color alone.",
      ),
      createHeadingBlock("Testing Your Website", 2),
      createTextBlock(
        "There are free tools that can help you check if your website is accessible. Google's Lighthouse is built into Chrome and can test your site and give you a score. It's like running a spell-check. It won't catch everything, but it will catch common issues. And that's a great place to start.",
      ),
      createTextBlock(
        "The best test? Try using your website with only a keyboard, or ask someone who uses a screen reader to test it. You'll quickly discover issues you never noticed before. I did this with my own projects and was surprised by how many problems I found. It's eye-opening.",
      ),
      createHeadingBlock("The Business Benefits", 2),
      createTextBlock(
        "When websites are accessible, everyone benefits. Users get a better experience, which means they're more likely to return and recommend your site. Search engines rank accessible sites higher. And accessible code is usually cleaner, which means fewer bugs and easier maintenance.",
      ),
      createTextBlock(
        "It's also worth noting that in many places, accessibility isn't optional. It's required by law. But even if it weren't, building accessible websites is just good business. You're reaching more customers, providing better experiences, and building a more inclusive web. That's something we should all care about.",
      ),
      createHeadingBlock("Getting Started", 2),
      createTextBlock(
        "You don't need to make everything perfect overnight. Start with the basics: clear headings, image descriptions, keyboard navigation, and color contrast. These simple changes will make your website significantly more accessible.",
      ),
      createTextBlock(
        "Remember, accessibility isn't a one-time checklist. It's an ongoing commitment to making your website usable by everyone. But the good news is that once you start thinking about accessibility, it becomes second nature. You'll naturally build better interfaces. And your users, and your business, will thank you for it.",
      ),
    ],
  },
  {
    title:
      "React State Management: Choosing the Right Approach for Your Application",
    slug: "managing-information-web-applications",
    excerpt:
      "A practical guide to React state management. When to use local state, context, or external libraries. Real-world patterns for managing data in modern React applications.",
    category: "React",
    tags: ["React", "State Management", "Best Practices"],
    publishedAt: new Date("2025-10-01T10:00:00Z").toISOString(),
    readingTime: 6,
    seo: {
      metaTitle:
        "React State Management: Choosing the Right Approach for Your Application",
      metaDescription:
        "A practical guide to React state management. When to use local state, context, or external libraries. Real-world patterns for managing data in modern React applications.",
    },
    content: [
      createHeadingBlock("What Is State Management?", 2),
      createTextBlock(
        "Think of a web application like a smart notebook. It needs to remember things. What page you're on, what you've added to your cart, whether you're logged in. This information, called state, needs to be stored somewhere and updated when things change. Without it, your app would forget everything every time you clicked something.",
      ),
      createTextBlock(
        "State management is about choosing the right place to store this information. It's like deciding where to keep important documents: some things go in a filing cabinet (shared storage), some things stay on your desk (local storage), and some things come from a central office (server storage).",
      ),
      createHeadingBlock("Simple Information, Simple Solutions", 2),
      createTextBlock(
        "For simple information that only one part of your website needs, keep it local. Think of it like a shopping list on your phone. You don't need to share it with anyone else, so you just keep it on your device. No need to make it complicated.",
      ),
      createTextBlock(
        "In web development, this might be whether a dropdown menu is open or closed, or what someone has typed in a search box. This information doesn't need to be shared with other parts of the website, so it can stay local to that specific component.",
      ),
      createHeadingBlock("Information That Needs to Be Shared", 2),
      createTextBlock(
        "Sometimes, information needs to be shared across multiple pages. Think of user login status. If someone logs in on one page, all other pages need to know they're logged in. This is like having a company-wide announcement board that everyone can see. When one person updates it, everyone knows.",
      ),
      createTextBlock(
        "For this kind of shared information, you need a more centralized approach. It's like having a shared calendar instead of everyone keeping their own separate calendars. When one person updates it, everyone sees the change.",
      ),
      createHeadingBlock("Information From Servers", 2),
      createTextBlock(
        "Some information comes from servers. Product listings, user profiles, blog posts. This is like getting information from a central database. You need to fetch it, cache it so you have a copy, and update it when it changes. The key is doing this efficiently so you're not constantly asking the server for the same information.",
      ),
      createTextBlock(
        "The key here is efficiency. You don't want to ask the server for the same information over and over. It's like checking a restaurant's menu online. You don't need to refresh it every second. You fetch it once, use it, and only refresh when necessary. This makes your app faster and reduces server load.",
      ),
      createHeadingBlock("Choosing the Right Approach", 2),
      createTextBlock(
        "The best approach depends on what you're trying to accomplish. Ask yourself: Does this information need to be shared? How often does it change? Where does it come from?",
      ),
      createTextBlock(
        "Simple, local information? Keep it simple. Information that needs to be shared? Use a shared storage solution. Information from servers? Use tools designed for server data. The key is matching the tool to the job.",
      ),
      createHeadingBlock("Real-World Example", 2),
      createTextBlock(
        "Imagine an e-commerce website. The shopping cart (what you've added) needs to be shared across pages, so it uses shared storage. The 'is menu open' state stays local to the menu component. Product listings come from a server and are cached for efficiency.",
      ),
      createTextBlock(
        "Each piece of information uses the right tool for its specific needs. This keeps the application simple, fast, and easy to maintain.",
      ),
      createHeadingBlock("The Bottom Line", 2),
      createTextBlock(
        "State management might sound complicated, but it's really about organizing information logically. Use simple solutions for simple problems, and more sophisticated tools only when you need them. The goal is always the same: keep information where it needs to be, update it when it changes, and make sure everything works smoothly.",
      ),
      createTextBlock(
        "When done well, users never think about state management. They just see a website that works smoothly and remembers what it should remember. That's the mark of good state management. It's invisible to users, but essential for developers.",
      ),
    ],
  },
];

async function seedBlogPosts() {
  console.log("🌱 Starting blog post seeding...\n");

  try {
    // Get all existing posts with their slugs and IDs
    const existingPosts = await client.fetch(
      `*[_type == "blogPost"] {
        _id,
        "slug": slug.current
      }`,
    );

    // Create a map of existing posts by slug
    const existingPostsMap: Map<string, string> = new Map(
      existingPosts.map((post: { _id: string; slug: string }) => [
        post.slug,
        post._id,
      ]),
    );

    // Separate posts into create and update lists
    const postsToCreate: SeedBlogPost[] = [];
    const postsToUpdate: Array<{ id: string; post: SeedBlogPost }> = [];

    seedPosts.forEach((post) => {
      const existingId = existingPostsMap.get(post.slug);
      if (existingId) {
        postsToUpdate.push({ id: existingId, post });
      } else {
        postsToCreate.push(post);
      }
    });

    // Create new posts
    if (postsToCreate.length > 0) {
      console.log(`📝 Creating ${postsToCreate.length} new post(s)...\n`);
      const createTransactions = postsToCreate.map((post) =>
        client.create({
          _type: "blogPost",
          ...post,
          slug: {
            _type: "slug",
            current: post.slug,
          },
        }),
      );

      const createdResults = await Promise.all(createTransactions);
      createdResults.forEach((_post, index) => {
        console.log(`   ✨ Created: ${postsToCreate[index].title}`);
      });
    }

    // Update existing posts
    if (postsToUpdate.length > 0) {
      console.log(
        `\n🔄 Updating ${postsToUpdate.length} existing post(s)...\n`,
      );
      const updateTransactions = postsToUpdate.map(({ id, post }) =>
        client
          .patch(id)
          .set({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            tags: post.tags,
            category: post.category,
            publishedAt: post.publishedAt,
            readingTime: post.readingTime,
            seo: post.seo,
            updatedAt: new Date().toISOString(),
          })
          .commit(),
      );

      const updatedResults = await Promise.all(updateTransactions);
      updatedResults.forEach((_post, index) => {
        console.log(`   ✏️  Updated: ${postsToUpdate[index].post.title}`);
      });
    }

    if (postsToCreate.length === 0 && postsToUpdate.length === 0) {
      console.log("✅ All blog posts are up to date. Nothing to do!\n");
      return;
    }

    console.log("\n✨ Seeding complete!");
  } catch (error: unknown) {
    console.error("\n❌ Error seeding blog posts:\n");

    // Check for permission errors
    const isPermissionError =
      (error as { statusCode?: number })?.statusCode === 403 ||
      (error as { details?: { type?: string } })?.details?.type ===
        "mutationError" ||
      String((error as { message?: string })?.message || "").includes(
        "permission",
      );

    if (isPermissionError) {
      console.error(
        "🔒 Permission Error: Your API token doesn't have write permissions.\n",
      );
      console.log("To fix this:");
      console.log("1. Go to https://www.sanity.io/manage/personal/api/tokens");
      console.log("2. Find your token or create a new one");
      console.log(
        "3. Make sure it has 'Editor' role (not 'Viewer' or 'Translator')",
      );
      console.log("4. Update SANITY_API_TOKEN in your .env.local file");
      console.log("5. Run the seed script again\n");
    } else {
      console.error(error);
    }

    throw error;
  }
}

// Run the seed function
if (require.main === module) {
  seedBlogPosts()
    .then(() => {
      console.log("\n🎉 Done!");
      process.exit(0);
    })
    .catch((error: unknown) => {
      console.error("\n💥 Seeding failed:", error);
      process.exit(1);
    });
}

export { seedBlogPosts };
