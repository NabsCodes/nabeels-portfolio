import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { BlogPost, Author, SanityBlogPost } from "@/lib/types/blog";

// GROQ queries for blog data
const BLOG_POST_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    tags,
    category,
    coverImage,
    publishedAt,
    updatedAt,
    readingTime,
    seo
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
    coverImage,
    publishedAt,
    updatedAt,
    readingTime,
    seo
  }
`;

const FEATURED_POSTS_QUERY = `
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    tags,
    category,
    coverImage,
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
    content,
    tags,
    category,
    featured,
    coverImage,
    publishedAt,
    updatedAt,
    readingTime,
    seo
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
    coverImage:
      sanityPost.coverImage && sanityPost.coverImage.asset
        ? urlFor(sanityPost.coverImage).width(800).height(400).url()
        : undefined,
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

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const sanityPosts: SanityBlogPost[] =
      await client.fetch(FEATURED_POSTS_QUERY);
    return sanityPosts.map(transformBlogPost);
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
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
        content,
        tags,
        category,
        coverImage,
        publishedAt,
        updatedAt,
        readingTime,
        seo
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
    const query = `*[_type == "blogPost" && defined(tags)] { tags }`;
    const results: { tags: string[] }[] = await client.fetch(query);

    // Flatten and deduplicate tags
    const allTags = results.flatMap((post) => post.tags || []);
    return Array.from(new Set(allTags)).sort();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const query = `*[_type == "blogPost" && defined(category)] { category }`;
    const results: { category: string }[] = await client.fetch(query);

    // Deduplicate categories
    const categories = results.map((post) => post.category);
    return Array.from(new Set(categories)).sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Get related posts (by same author or similar tags)
export async function getRelatedPosts(
  currentPostId: string,
  tags: string[] = [],
  limit: number = 3,
): Promise<BlogPost[]> {
  try {
    const query = `
      *[
        _type == "blogPost"
        && _id != $currentPostId
        && (
          count(tags[@ in $tags]) > 0
        )
      ] | order(publishedAt desc) [0...$limit] {
        _id,
        title,
        slug,
        excerpt,
        content,
        tags,
        category,
        coverImage,
        publishedAt,
        updatedAt,
        readingTime,
        seo
      }
    `;

    const sanityPosts: SanityBlogPost[] = await client.fetch(query, {
      currentPostId,
      tags,
      limit,
    } as any);

    return sanityPosts.map(transformBlogPost);
  } catch (error) {
    console.error("Error fetching related posts:", error);
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
        content,
        tags,
        category,
        coverImage,
        publishedAt,
        updatedAt,
        readingTime,
        seo
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
