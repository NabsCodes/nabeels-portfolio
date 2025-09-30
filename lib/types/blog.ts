import { PortableTextBlock } from "@portabletext/types";

// Sanity document base
interface SanityDocument {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: string;
}

// Sanity Image with asset reference (for content images only)
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Custom code block type from our schema
export interface CodeBlock {
  _type: "codeBlock";
  _key?: string;
  language: string;
  filename?: string;
  code: string;
  highlightedLines?: number[];
}

// Extended Portable Text with our custom blocks
export type BlogPortableText = (PortableTextBlock | CodeBlock | SanityImage)[];

// Blog Post from Sanity
export interface SanityBlogPost extends SanityDocument {
  _type: "blogPost";
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: BlogPortableText;
  tags?: string[];
  category: string;
  featured: boolean;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

// Transformed types for your UI (easier to work with)
export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogPortableText;
  author: Author;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface BlogTag {
  name: string;
  count: number;
}
