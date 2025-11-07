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
    title: "Building Websites That Grow: Simple Patterns for Success",
    slug: "building-websites-that-grow",
    excerpt:
      "Learn how to structure web applications so they can grow without breaking. When everything has its place, finding and adding new features becomes easy. Here are practical patterns that help teams work faster and build better products.",
    category: "Web Development",
    tags: ["React", "Architecture", "Best Practices"],
    publishedAt: new Date("2025-11-05T10:00:00Z").toISOString(),
    readingTime: 6,
    seo: {
      metaTitle: "Building Scalable Web Applications: Simple Patterns",
      metaDescription:
        "Learn simple patterns for building web applications that can grow and scale without complexity. Practical advice for developers and product teams.",
    },
    content: [
      createHeadingBlock("Why Organization Matters", 2),
      createTextBlock(
        "Imagine building a house without a blueprint, or organizing a library where books are randomly placed. That's what happens when web applications aren't structured well. As your project grows, adding new features becomes harder, finding bugs takes longer, and new team members struggle to understand how everything fits together.",
      ),
      createTextBlock(
        "The good news is you don't need to be a technical expert to understand good organization. It's really about creating clear patterns that make sense. Think about organizing a kitchen where you know exactly where to find everything you need.",
      ),
      createHeadingBlock("Organizing by Features, Not by Type", 2),
      createTextBlock(
        "One of the most effective ways to structure a web application is to organize code by what it does (features) rather than what it is (types). Think of it like organizing a store: instead of putting all the boxes together, all the labels together, and all the products together, you organize by departments (electronics, clothing, groceries).",
      ),
      createTextBlock(
        "In web development, this means grouping everything related to user authentication together. So your login form, password reset, and user profile all live in the same place. Instead of putting all forms in one folder and all buttons in another, you keep related functionality together. This makes it way easier to find code and understand how features actually work together.",
      ),
      createCodeBlock(
        `// Good organization: Everything related to authentication together
src/
  features/
    authentication/
      login-form.tsx
      password-reset.tsx
      user-profile.tsx
    shopping-cart/
      cart-items.tsx
      checkout.tsx
    shared/
      buttons.tsx
      inputs.tsx`,
        "typescript",
        "project-structure.ts",
      ),
      createHeadingBlock("Managing Information Flow", 2),
      createTextBlock(
        "Every web application needs to manage information. User data, product listings, shopping cart contents. Think of it like managing inventory in a store. You need to know what you have, where it is, and how to update it when things change.",
      ),
      createTextBlock(
        "The key is choosing the right tool for the job. Simple information that only one part of your app needs can stay local (like a shopping cart that only appears on one page). Information that needs to be shared across multiple pages (like user login status) needs a more centralized approach.",
      ),
      createHeadingBlock("Making Things Fast", 2),
      createTextBlock(
        "Speed matters. Users expect websites to load quickly and respond instantly. But here's the thing: you don't need to optimize everything. It's like cooking. You don't need to use every spice in your cabinet. Focus on what actually matters.",
      ),
      createTextBlock(
        "The best approach? Measure first. See what's actually slow, then fix those specific issues. Often, the biggest wins come from simple changes: loading images more efficiently, showing content as it becomes available, and not loading everything at once.",
      ),
      createHeadingBlock("Real-World Impact", 2),
      createTextBlock(
        "I've worked on projects where code organization made all the difference. When applications are well-organized, everyone benefits. Developers can add features faster, which means products get to market sooner. Bugs are easier to find and fix, which means fewer frustrated users. New team members can contribute sooner, which means better collaboration.",
      ),
      createTextBlock(
        "The investment in good structure pays off quickly. It's like keeping your workspace organized. It takes a bit of effort upfront, but it saves time every single day afterward. I've seen teams cut their development time in half just by organizing their code better.",
      ),
    ],
  },
  {
    title: "Making Websites Faster: A Simple Guide to Better Performance",
    slug: "making-websites-faster-performance-guide",
    excerpt:
      "Learn how modern web development techniques can make websites load faster and feel more responsive. No technical background needed. Just practical insights about why speed matters and how to achieve it.",
    category: "Web Development",
    tags: ["Next.js", "Performance", "Web Development"],
    publishedAt: new Date("2025-10-29T10:00:00Z").toISOString(),
    readingTime: 5,
    seo: {
      metaTitle: "Making Websites Faster: Performance Guide",
      metaDescription:
        "Learn simple techniques to make websites load faster and feel more responsive. Practical advice for better user experience.",
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
      "Why Website Speed Affects Your Business: Understanding Core Web Vitals",
    slug: "why-website-speed-affects-business",
    excerpt:
      "Learn why website speed matters for your business and how Google measures it. Simple explanations of technical metrics that affect your search rankings and user experience.",
    category: "Web Development",
    tags: ["Performance", "SEO", "Web Development"],
    publishedAt: new Date("2025-10-22T10:00:00Z").toISOString(),
    readingTime: 7,
    seo: {
      metaTitle: "Why Website Speed Affects Your Business",
      metaDescription:
        "Learn why website speed matters for business success and how Google measures it. Simple guide to Core Web Vitals.",
    },
    content: [
      createHeadingBlock("Why Speed Is a Business Issue", 2),
      createTextBlock(
        "Imagine you're shopping at a physical store. If it takes forever to find what you need, you'll probably leave. The same thing happens online, but faster. Studies show that every second of delay can cost businesses 7% in conversions. That's real money walking out the door.",
      ),
      createTextBlock(
        "Google knows this too, which is why they've created Core Web Vitals. These are three simple measurements that tell you how fast and responsive your website is. These metrics don't just affect user experience. They directly impact your search rankings. Better rankings mean more visitors, which means more business.",
      ),
      createHeadingBlock("The Three Measurements That Matter", 2),
      createTextBlock(
        "Google measures three main things: how quickly your main content appears (like the headline of an article), how fast your site responds when someone clicks something, and whether things jump around on the page while loading.",
      ),
      createHeadingBlock("1. How Fast Content Appears", 2),
      createTextBlock(
        "The first measurement is like timing how long it takes for the main course to arrive at your table. Google wants to see your most important content (like a hero image or main headline) appear within 2.5 seconds. If it takes longer, users get frustrated and leave.",
      ),
      createTextBlock(
        "The solution? Optimize your images, don't load everything at once, and show the most important content first. It's like serving appetizers while the main course is being prepared. Users see something useful immediately, which keeps them engaged.",
      ),
      createHeadingBlock("2. How Fast Your Site Responds", 2),
      createTextBlock(
        "The second measurement checks how quickly your site responds when someone clicks a button or link. Think of it like testing how fast a door opens when you push it. Google wants this to happen in under 100 milliseconds. That's basically instant.",
      ),
      createTextBlock(
        "This is about making sure your website doesn't feel sluggish. When someone clicks something, it should respond immediately. If there's a delay, it feels broken, even if it's working correctly.",
      ),
      createHeadingBlock("3. Preventing Page Jumps", 2),
      createTextBlock(
        "The third measurement checks if things on your page jump around while loading. Have you ever been reading an article when suddenly an ad loads and pushes everything down? That's what Google is trying to prevent.",
      ),
      createTextBlock(
        "The solution is simple: reserve space for content that will load later. It's like setting the table before guests arrive. Everything has its place, so nothing moves unexpectedly. This prevents that jarring experience where you're reading something and suddenly everything shifts.",
      ),
      createHeadingBlock("How to Improve", 2),
      createTextBlock(
        "The good news? You don't need to be a technical expert to understand these concepts. Start by measuring your current performance using free tools like Google's PageSpeed Insights. Then, work with your development team to address the biggest issues first.",
      ),
      createTextBlock(
        "Often, the biggest improvements come from simple changes. Optimizing images, loading content progressively, and ensuring your site responds quickly to user interactions. These improvements don't just make Google happy. They make your users happy too, which is what really matters.",
      ),
      createHeadingBlock("The Business Impact", 2),
      createTextBlock(
        "When websites are fast, everyone wins. Users get a better experience, which means they're more likely to convert. Google ranks your site higher, which means more organic traffic. And faster sites often have lower hosting costs because they use resources more efficiently.",
      ),
      createTextBlock(
        "It's one of those rare situations where doing the right thing for users also happens to be the right thing for business. Speed isn't just a technical metric. It's a competitive advantage. When your site loads faster than your competitors, you win.",
      ),
    ],
  },
  {
    title: "Writing Better Code: How TypeScript Helps Prevent Mistakes",
    slug: "typescript-helps-prevent-mistakes",
    excerpt:
      "Learn how TypeScript helps developers catch errors before they become problems. It's a tool that adds structure to JavaScript. Think of it like spell-check for code, but much more powerful.",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    publishedAt: new Date("2025-10-15T10:00:00Z").toISOString(),
    readingTime: 6,
    seo: {
      metaTitle: "How TypeScript Helps Prevent Coding Mistakes",
      metaDescription:
        "Learn how TypeScript helps developers write better code and catch errors early. Simple explanation of a powerful tool.",
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
    title: "Building Websites Everyone Can Use: Why Accessibility Matters",
    slug: "building-websites-everyone-can-use",
    excerpt:
      "Learn why building accessible websites isn't just the right thing to do. It's good for business too. Discover simple ways to make your website usable by everyone, including people with disabilities.",
    category: "Web Development",
    tags: ["Accessibility", "Web Development", "Best Practices"],
    publishedAt: new Date("2025-10-08T10:00:00Z").toISOString(),
    readingTime: 7,
    seo: {
      metaTitle: "Building Accessible Websites: Why It Matters",
      metaDescription:
        "Learn why accessibility matters for websites and how to make your site usable by everyone. Good for users and business.",
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
    title: "Managing Information in Web Applications: A Simple Guide",
    slug: "managing-information-web-applications",
    excerpt:
      "Learn how web applications keep track of information. From user data to shopping cart contents. Simple explanations of different approaches and when to use each one.",
    category: "React",
    tags: ["React", "State Management", "Best Practices"],
    publishedAt: new Date("2025-10-01T10:00:00Z").toISOString(),
    readingTime: 6,
    seo: {
      metaTitle: "Managing Information in Web Applications",
      metaDescription:
        "Learn how web applications manage information and data. Simple guide to state management concepts.",
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
  {
    title: "Styling Websites: Two Popular Approaches Explained",
    slug: "styling-websites-two-approaches",
    excerpt:
      "Learn about two popular ways to style websites: writing styles in JavaScript files or using utility classes. Simple explanations of each approach and when to use them.",
    category: "Frontend",
    tags: ["CSS", "Tailwind CSS", "Frontend"],
    publishedAt: new Date("2025-09-28T10:00:00Z").toISOString(),
    readingTime: 5,
    seo: {
      metaTitle: "Styling Websites: CSS Approaches Explained",
      metaDescription:
        "Learn about different approaches to styling websites. Simple guide to CSS-in-JS and utility-first CSS.",
    },
    content: [
      createHeadingBlock("The Styling Challenge", 2),
      createTextBlock(
        "Every website needs styling. Colors, spacing, fonts, layouts. But there are different ways to add styles, and each has its advantages. Think of it like decorating a room. You could paint each wall individually, which is traditional CSS. You could write detailed instructions for each wall, which is CSS-in-JS. Or you could use pre-made color swatches, which is utility-first CSS.",
      ),
      createHeadingBlock("The Traditional Way: Separate CSS Files", 2),
      createTextBlock(
        "Traditionally, websites used separate CSS files. You'd write styles in one file and reference them in your HTML. It's like having a style guide in a separate notebook. It's organized, but sometimes hard to keep track of what styles apply to which components. As projects grew, this became a problem.",
      ),
      createTextBlock(
        "This works, but as websites got more complex, developers wanted styles to be closer to the components they styled. That's where newer approaches came in.",
      ),
      createHeadingBlock("CSS-in-JS: Styles in JavaScript", 2),
      createTextBlock(
        "CSS-in-JS is like writing styling instructions directly in your component code. Instead of having styles in a separate file, you write them alongside the component they style. It's like having the decoration instructions right next to the furniture description.",
      ),
      createTextBlock(
        "The advantage? Styles are scoped to specific components, so you don't have to worry about styles from one component affecting another. It's like having separate rooms where each room's decoration doesn't affect the others.",
      ),
      createTextBlock(
        "This approach is great for complex, dynamic styling. Like components that change appearance based on user interactions or data. But it can be slower to develop simple, consistent designs. Sometimes you just need to style a button, and writing JavaScript for that feels like overkill.",
      ),
      createHeadingBlock("Utility-First: Pre-Made Building Blocks", 2),
      createTextBlock(
        "Utility-first CSS (like Tailwind CSS) is like having a box of pre-made building blocks. Instead of writing custom styles, you use small, reusable utility classes. Want a blue button? Use the 'blue' and 'button' classes. Want spacing? Use the 'padding' classes.",
      ),
      createTextBlock(
        "Think of it like LEGO blocks. You have standard pieces that you combine to build what you need. This makes it fast to build consistent designs because everyone uses the same building blocks. There's less decision fatigue. You just pick the pieces you need.",
      ),
      createTextBlock(
        "The advantage? Speed and consistency. You can build interfaces quickly, and everything looks consistent because everyone uses the same design tokens (colors, spacing, etc.). The downside? For highly custom designs, you might need to write custom CSS anyway.",
      ),
      createHeadingBlock("Which Should You Choose?", 2),
      createTextBlock(
        "The answer depends on your project. For most websites, utility-first CSS like Tailwind is faster and easier to maintain. It's like using a well-stocked toolbox. You have everything you need, and it's organized. But for highly custom designs, you might need something more flexible.",
      ),
      createTextBlock(
        "For component libraries or applications with highly dynamic, complex styling needs, CSS-in-JS might be better. It's like having a custom workshop where you can build exactly what you need.",
      ),
      createTextBlock(
        "Many successful projects use both: utility classes for layout and common styles, and custom CSS (or CSS-in-JS) for complex, component-specific styling. It's like using standard furniture for most rooms, but custom pieces for special areas.",
      ),
      createHeadingBlock("The Bottom Line", 2),
      createTextBlock(
        "Both approaches have their place. Utility-first CSS is great for speed and consistency. CSS-in-JS is great for complex, dynamic styling. The best choice depends on your team, your project, and your specific needs.",
      ),
      createTextBlock(
        "The good news? You don't have to choose exclusively. Many teams use utility classes for 80% of their styling and custom CSS for the remaining 20%. This gives you the speed of utilities with the flexibility of custom styles when you need it.",
      ),
      createTextBlock(
        "At the end of the day, the best approach is the one that helps your team build better websites faster. Whether that's utility-first, CSS-in-JS, or a combination, the goal is always the same: create beautiful, functional websites that users love.",
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

    const existingPostsMap = new Map<string, string>(
      existingPosts.map((post: { _id: string; slug: string }) => [
        post.slug,
        post._id,
      ]),
    );

    const postsToCreate: SeedBlogPost[] = [];
    const postsToUpdate: Array<{ id: string; post: SeedBlogPost }> = [];

    // Separate posts into create and update lists
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
      createdResults.forEach((post, index) => {
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
      updatedResults.forEach((post, index) => {
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
    .catch((error) => {
      console.error("\n💥 Seeding failed:", error);
      process.exit(1);
    });
}

export { seedBlogPosts };
