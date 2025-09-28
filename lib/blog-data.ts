import { Author, BlogPost } from "@/lib/types/blog";

// Sample author data
export const author: Author = {
  id: "nabeel-hassan",
  name: "Nabeel Hassan",
  bio: "Software Developer & Tech Enthusiast",
  website: "https://nabeelhassan.dev",
  twitter: "@nabeelhassan_",
  linkedin: "hassan-umar-hassan",
  avatar: "/images/nabeel.webp",
};

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-modern-web-apps",
    title: "Building Modern Web Applications with Next.js and TypeScript",
    excerpt:
      "Learn how to create scalable and maintainable web applications using the latest technologies and best practices.",
    content: `

Web development has evolved significantly over the past few years. In this comprehensive guide, we'll explore how to build modern, scalable web applications using **Next.js** and **TypeScript**.

## Why Next.js and TypeScript?

Next.js provides an excellent foundation for React applications with features like:

- **Server-Side Rendering (SSR)** for better SEO
- **Static Site Generation (SSG)** for optimal performance  
- **API Routes** for backend functionality
- **Image Optimization** out of the box

TypeScript adds **type safety** and **developer experience** improvements that are crucial for large-scale applications.

### Getting Started

First, let's create a new Next.js project with TypeScript:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm run dev
\`\`\`

This will set up a project with:
- TypeScript configuration
- Tailwind CSS for styling
- ESLint for code quality

## Project Structure

A well-organized project structure is crucial for maintainability:

\`\`\`
app/
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── types/            # TypeScript type definitions
└── (routes)/         # App Router pages
\`\`\`

### Key Features to Implement

| Feature | Description | Benefits |
|---------|-------------|----------|
| **App Router** | New routing system | Better performance, layouts |
| **Server Components** | Render on server | Reduced bundle size |
| **Middleware** | Edge functions | Authentication, redirects |
| **API Routes** | Backend endpoints | Full-stack capabilities |

## Advanced Patterns

### Custom Hooks

Creating reusable logic with custom hooks:

\`\`\`typescript
import { useState, useEffect } from 'react';

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
}
\`\`\`

### Theme Provider

Implementing a dark mode theme provider:

\`\`\`typescript
"use client";

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
}
\`\`\`

> **Pro Tip:** Always handle edge cases like SSR when working with browser APIs like \`localStorage\` or \`window\`.

## Performance Optimization

### Image Optimization

Next.js provides excellent image optimization out of the box:

\`\`\`jsx
import Image from 'next/image';

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
}
\`\`\`

### Code Splitting

Implement dynamic imports for better performance:

\`\`\`typescript
import { lazy, Suspense } from 'react';

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
}
\`\`\`

## Deployment Considerations

When deploying your Next.js application:

1. **Environment Variables** - Use \`.env.local\` for development
2. **Build Optimization** - Enable compression and minification
3. **CDN Integration** - Use Vercel or similar platforms
4. **Database Setup** - Consider serverless databases like PlanetScale

For more advanced topics, check out the [official Next.js documentation](https://nextjs.org/docs).

---

*Happy coding! 🚀*`,
    author,
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-16",
    readingTime: 8,
    tags: ["Next.js", "TypeScript", "React", "Web Development"],
    category: "Tutorial",
    coverImage: "/blog/nextjs-typescript.jpg",
  },
  {
    id: "2",
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
    excerpt:
      "Discover how to leverage Tailwind CSS for rapid UI development and learn advanced techniques for creating beautiful, responsive designs.",
    content: `# Mastering Tailwind CSS: From Basics to Advanced Techniques

Tailwind CSS has revolutionized how we write CSS. Instead of writing custom stylesheets, we compose designs using utility classes. This approach offers incredible flexibility and maintainability.

## Why Tailwind CSS?

Tailwind CSS provides several advantages over traditional CSS approaches:

- **Utility-First Philosophy** - Build designs rapidly with low-level utility classes
- **Responsive Design** - Mobile-first responsive variants
- **Dark Mode Support** - Built-in dark mode utilities
- **Customization** - Highly configurable design system

### Installation and Setup

Getting started with Tailwind CSS in a Next.js project:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure your \`tailwind.config.js\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
\`\`\`

## Core Concepts

### Utility Classes

Tailwind provides thousands of utility classes. Here are some essential categories:

| Category | Examples | Usage |
|----------|----------|-------|
| **Layout** | \`flex\`, \`grid\`, \`block\` | Positioning elements |
| **Spacing** | \`p-4\`, \`m-2\`, \`space-x-4\` | Padding and margins |
| **Typography** | \`text-lg\`, \`font-bold\` | Text styling |
| **Colors** | \`bg-blue-500\`, \`text-red-600\` | Background and text colors |

### Responsive Design

Tailwind uses a mobile-first approach with responsive breakpoints:

\`\`\`html
<div class="text-center sm:text-left md:text-right lg:text-center">
  Responsive text alignment
</div>
\`\`\`

Breakpoints:
- \`sm\`: 640px and up
- \`md\`: 768px and up  
- \`lg\`: 1024px and up
- \`xl\`: 1280px and up
- \`2xl\`: 1536px and up

## Advanced Techniques

### Component Variants with Class Variance Authority

For complex components, use \`cva\` (Class Variance Authority):

\`\`\`typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
\`\`\`

### Custom Animations

Create smooth animations with Tailwind:

\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  from {
    background-position: -200px 0;
  }
  to {
    background-position: calc(200px + 100%) 0;
  }
}
\`\`\`

Add to your Tailwind config:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      }
    }
  }
}
\`\`\`

### Dark Mode Implementation

Implement a professional dark mode:

\`\`\`html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
    Dark Mode Content
  </h1>
  <p class="text-gray-600 dark:text-gray-400">
    This content adapts to the theme automatically.
  </p>
</div>
\`\`\`

## Performance Optimization

### Purging Unused CSS

Tailwind automatically purges unused styles in production:

\`\`\`javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of config
}
\`\`\`

### Using @apply for Component Styles

When you need to extract repeated patterns:

\`\`\`css
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}

.card {
  @apply bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800;
}
\`\`\`

> **Best Practice:** Use \`@apply\` sparingly. The utility-first approach is usually better for maintainability.

## Common Patterns

### Flexbox Layouts

\`\`\`html
<!-- Centered content -->
<div class="flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-4xl font-bold">Centered Content</h1>
  </div>
</div>

<!-- Navigation bar -->
<nav class="flex items-center justify-between p-4 bg-white shadow">
  <div class="flex items-center space-x-4">
    <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
    <span class="text-xl font-semibold">Brand</span>
  </div>
  <div class="hidden md:flex space-x-4">
    <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
    <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
    <a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>
  </div>
</nav>
\`\`\`

### Grid Layouts

\`\`\`html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-white p-6 rounded-lg shadow">Card 1</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 2</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 3</div>
</div>
\`\`\`

## Conclusion

Tailwind CSS empowers developers to build beautiful, responsive interfaces quickly. The utility-first approach might feel different initially, but it leads to more maintainable and consistent codebases.

**Key takeaways:**
- Start with utility classes for rapid prototyping
- Use component variants for complex, reusable components  
- Leverage responsive utilities for mobile-first design
- Implement dark mode thoughtfully across your application

For more advanced techniques, explore the [Tailwind CSS documentation](https://tailwindcss.com/docs).

---

*Keep building amazing interfaces! ✨*`,
    author,
    publishedAt: "2024-01-10",
    readingTime: 12,
    tags: ["Tailwind CSS", "CSS", "Design", "Frontend"],
    category: "Tutorial",
    featured: true,
    coverImage: "/blog/tailwind-css.jpg",
  },
  {
    id: "3",
    slug: "react-performance-optimization",
    title: "React Performance Optimization: A Complete Guide",
    excerpt:
      "Learn essential techniques to optimize React applications for better performance and user experience.",
    content: `# React Performance Optimization: A Complete Guide

Performance is crucial for providing excellent user experiences. In this guide, we'll explore various techniques to optimize React applications.

## Understanding React Performance

React's performance is affected by several factors:

- **Re-renders** - Unnecessary component updates
- **Bundle Size** - Large JavaScript bundles  
- **Memory Leaks** - Improper cleanup of resources
- **Network Requests** - Inefficient data fetching

### React DevTools Profiler

Use the React DevTools Profiler to identify performance bottlenecks:

\`\`\`jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Main />
      <Footer />
    </Profiler>
  );
}
\`\`\`

## Optimization Techniques

### 1. Memoization with React.memo

Prevent unnecessary re-renders:

\`\`\`tsx
import React from 'react';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onEdit: (id: number) => void;
}

const UserCard = React.memo(({ user, onEdit }: UserCardProps) => {
  console.log('UserCard rendered for:', user.name);
  
  return (
    <div className="p-4 border rounded">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>
        Edit
      </button>
    </div>
  );
});

UserCard.displayName = 'UserCard';
\`\`\`

### 2. useMemo and useCallback

Optimize expensive calculations and stable references:

\`\`\`tsx
import { useMemo, useCallback, useState } from 'react';

function ProductList({ products, category }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize expensive filtering operation
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.category === category &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, category, searchTerm]);

  // Memoize callback to prevent child re-renders
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
\`\`\`

### 3. Code Splitting with React.lazy

Split your code for better loading performance:

\`\`\`tsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
\`\`\`

### 4. Virtual Scrolling

For large lists, implement virtual scrolling:

\`\`\`tsx
import { FixedSizeList as List } from 'react-window';

interface ItemData {
  items: Array<{ id: number; name: string; }>;
}

const Row = ({ index, style, data }: { 
  index: number; 
  style: React.CSSProperties; 
  data: ItemData;
}) => (
  <div style={style} className="flex items-center p-2 border-b">
    <span>Item {data.items[index].name}</span>
  </div>
);

function VirtualizedList({ items }: { items: ItemData['items'] }) {
  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={50}
      itemData={{ items }}
    >
      {Row}
    </List>
  );
}
\`\`\`

## Advanced Optimization Patterns

### Custom Hooks for Performance

Create reusable performance-focused hooks:

\`\`\`tsx
import { useRef, useEffect } from 'react';

// Debounce hook for search inputs
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Previous value hook for dependency comparison
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const previousSearchTerm = usePrevious(debouncedSearchTerm);

  useEffect(() => {
    if (debouncedSearchTerm !== previousSearchTerm) {
      // Perform search
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, previousSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
\`\`\`

### Optimizing Context Usage

Avoid context performance pitfalls:

\`\`\`tsx
// Split contexts by update frequency
const ThemeContext = createContext();
const UserContext = createContext();

// Use context selectors for large objects
const StateContext = createContext();

function useStateSelector<T>(selector: (state: AppState) => T): T {
  const state = useContext(StateContext);
  return useMemo(() => selector(state), [state, selector]);
}

// Usage
function UserProfile() {
  const userName = useStateSelector(state => state.user.name);
  const userEmail = useStateSelector(state => state.user.email);
  
  return (
    <div>
      <h1>{userName}</h1>
      <p>{userEmail}</p>
    </div>
  );
}
\`\`\`

## Bundle Optimization

### Analyzing Bundle Size

Use tools to analyze your bundle:

\`\`\`bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});

# Run analysis
ANALYZE=true npm run build
\`\`\`

### Tree Shaking

Ensure proper tree shaking:

\`\`\`tsx
// ❌ Imports entire library
import * as _ from 'lodash';

// ✅ Import only what you need
import { debounce, throttle } from 'lodash';

// ✅ Even better - use individual packages
import debounce from 'lodash.debounce';
\`\`\`

## Performance Monitoring

### Performance Metrics

Track key performance indicators:

\`\`\`tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

// Track Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
\`\`\`

### Error Boundaries for Performance

Prevent cascading failures:

\`\`\`tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2>Something went wrong.</h2>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
\`\`\`

## Performance Checklist

- [ ] Use React.memo for pure components
- [ ] Implement useMemo for expensive calculations  
- [ ] Use useCallback for stable function references
- [ ] Implement code splitting with React.lazy
- [ ] Optimize images with next/image
- [ ] Use virtual scrolling for large lists
- [ ] Minimize bundle size with tree shaking
- [ ] Implement proper error boundaries
- [ ] Monitor Core Web Vitals
- [ ] Profile with React DevTools

## Conclusion

React performance optimization is an ongoing process. Start with measuring, identify bottlenecks, and apply optimizations incrementally. Focus on user-facing performance improvements first.

Remember: **Premature optimization is the root of all evil**. Always measure before optimizing!

---

*Performance matters. Every millisecond counts! ⚡*`,
    author,
    publishedAt: "2024-01-05",
    readingTime: 15,
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    category: "Advanced",
    coverImage: "/blog/react-performance.jpg",
  },
];

// Helper functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
}

export function getAllTags(): string[] {
  const tags = blogPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
}

export function getAllCategories(): string[] {
  const categories = blogPosts.map((post) => post.category);
  return Array.from(new Set(categories));
}
