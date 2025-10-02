/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import type { BlogPost, Author, SanityBlogPost } from "@/lib/types/blog";

// GROQ queries for blog data
const BLOG_POST_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    tags,
    category,
    publishedAt,
    updatedAt,
    readingTime,
    "content": []
  }
`;

const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    tags,
    category,
    publishedAt,
    updatedAt,
    readingTime,
    seo
  }
`;

const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    tags,
    category,
    publishedAt,
    updatedAt,
    readingTime,
    "content": []
  }
`;

// Default author (me)
const DEFAULT_AUTHOR: Author = {
  id: "nabeel-hassan",
  name: "Nabeel Hassan",
  bio: "Software Developer & Tech Enthusiast",
  website: "https://nabeelhassan.dev",
  twitter: "nabeelhassan_",
  linkedin: "hassan-umar-hassan",
  github: "NabsCodes",
  avatar: "/images/nabeel.webp",
};

// Transform Sanity blog post to UI blog post
function transformBlogPost(sanityPost: SanityBlogPost): BlogPost {
  return {
    id: sanityPost._id,
    title: sanityPost.title,
    slug: sanityPost.slug.current,
    excerpt: sanityPost.excerpt,
    content: sanityPost.content,
    author: DEFAULT_AUTHOR,
    tags: sanityPost.tags || [],
    category: sanityPost.category,
    publishedAt: sanityPost.publishedAt,
    updatedAt: sanityPost.updatedAt,
    readingTime: sanityPost.readingTime,
    seo: sanityPost.seo,
  };
}

// Main API functions
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const sanityPosts: SanityBlogPost[] = await client.fetch(BLOG_POST_QUERY);
    return sanityPosts.map(transformBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const sanityPost: SanityBlogPost | null = await client.fetch(
      BLOG_POST_BY_SLUG_QUERY,
      { slug },
    );

    if (!sanityPost) {
      return null;
    }

    return transformBlogPost(sanityPost);
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

export async function getPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  try {
    const sanityPosts: SanityBlogPost[] = await client.fetch(
      POSTS_BY_CATEGORY_QUERY,
      { category },
    );
    return sanityPosts.map(transformBlogPost);
  } catch (error) {
    console.error(`Error fetching posts by category "${category}":`, error);
    return [];
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const query = `
      *[_type == "blogPost" && $tag in tags] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        tags,
        category,
        publishedAt,
        updatedAt,
        readingTime,
        "content": []
      }
    `;

    const sanityPosts: SanityBlogPost[] = await client.fetch(query, {
      tag,
    } as any);
    return sanityPosts.map(transformBlogPost);
  } catch (error) {
    console.error(`Error fetching posts by tag "${tag}":`, error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const query = `array::unique(*[_type == "blogPost"].tags[])`;
    const tags: string[] = await client.fetch(query);
    return tags.sort();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const query = `array::unique(*[_type == "blogPost"].category)`;
    const categories: string[] = await client.fetch(query);
    return categories.sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Search posts by title or content
export async function searchPosts(searchTerm: string): Promise<BlogPost[]> {
  try {
    const query = `
      *[
        _type == "blogPost"
        && (
          title match $searchTerm
          || excerpt match $searchTerm
          || pt::text(content) match $searchTerm
        )
      ] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        tags,
        category,
        publishedAt,
        updatedAt,
        readingTime,
        "content": []
      }
    `;

    const sanityPosts: SanityBlogPost[] = await client.fetch(query, {
      searchTerm: `*${searchTerm}*`,
    } as any);

    return sanityPosts.map(transformBlogPost);
  } catch (error) {
    console.error(`Error searching posts with term "${searchTerm}":`, error);
    return [];
  }
}
