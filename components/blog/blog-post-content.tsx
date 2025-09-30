"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { BlogPost } from "@/lib/types/blog";
import { BlogPortableTextRenderer } from "@/components/blog/blog-portable-text";
import { BlogPageHeader } from "./blog-page-header";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      // Use current window location in browser
      return `${window.location.origin}/blog/${post.slug}`;
    }
    // Fallback for SSR
    return `${process.env.NEXT_PUBLIC_SITE_URL || "https://nabeelhassan.dev"}/blog/${post.slug}`;
  }, [post.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyLink = useCallback(async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  }, [shareUrl]);

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: "Take a look at this article I just read",
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") {
          console.error("Share failed", error);
        }
      }
    } else {
      await handleCopyLink();
    }
  }, [handleCopyLink, post.title, shareUrl]);

  const encodedUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);
  const encodedTitle = useMemo(
    () => encodeURIComponent(post.title),
    [post.title],
  );
  const twitterShareHref = useMemo(
    () =>
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    [encodedTitle, encodedUrl],
  );
  const linkedinShareHref = useMemo(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    [encodedUrl],
  );

  return (
    <div className="mx-auto">
      <article className="relative">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Category Badge */}
          {/* <div className="mb-4">
            <span className="inline-flex items-center rounded-md bg-accent-base/10 px-2 py-1 text-xs font-medium text-accent-base ring-1 ring-inset ring-accent-base/20 dark:bg-accent-base-dark/10 dark:text-accent-base-dark dark:ring-accent-base-dark/20">
              {post.category}
            </span>
          </div> */}

          {/* Title */}
          <BlogPageHeader title={post.title} breadcrumb={post.category} />
          {/* <h1 className="mb-6 font-raleway text-4xl font-bold text-default-base dark:text-default-base-dark md:text-5xl">
            {post.title}
            <span className="text-accent-base dark:text-accent-base-dark">
              .
            </span>
          </h1> */}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-primary-base dark:text-primary-base-dark">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-primary-base/10 px-2 py-1 text-xs font-medium text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="mt-8 rounded-xl border border-primary-base/50 bg-background-base/60 backdrop-blur-sm dark:border-primary-base-dark/20 dark:bg-background-base-dark/60">
            {/* Desktop Layout */}
            <div className="hidden p-4 md:flex md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-base/10 text-accent-base dark:bg-accent-base-dark/10 dark:text-accent-base-dark">
                  <Share className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-default-base dark:text-default-base-dark">
                    Share this article
                  </p>
                  <p className="text-xs text-primary-base/70 dark:text-primary-base-dark/70">
                    Spread the word with your network
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-2 rounded-lg border border-accent-base/30 px-3 py-1.5 text-xs font-medium text-accent-base transition-colors hover:bg-accent-base/10 dark:border-accent-base-dark/30 dark:text-accent-base-dark dark:hover:bg-accent-base-dark/10"
                >
                  <Send className="h-3 w-3" />
                  Share
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-base/10 px-3 py-1.5 text-xs font-medium text-primary-base transition-colors hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20"
                >
                  {isCopied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {isCopied ? "Copied" : "Copy link"}
                </button>

                <Link
                  href={twitterShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-base/10 px-3 py-1.5 text-xs font-medium text-primary-base transition-colors hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20"
                >
                  <FaXTwitter className="h-3 w-3" />
                  Post on X
                </Link>

                <Link
                  href={linkedinShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-base/10 px-3 py-1.5 text-xs font-medium text-primary-base transition-colors hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20"
                >
                  <FaLinkedinIn className="h-3 w-3" />
                  Share on LinkedIn
                </Link>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex items-center justify-between p-3 md:hidden">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-base/10 text-accent-base dark:bg-accent-base-dark/10 dark:text-accent-base-dark">
                  <Share className="h-3 w-3" />
                </div>
                <span className="text-sm font-medium text-default-base dark:text-default-base-dark">
                  Share
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  title="Share"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-accent-base/30 text-accent-base transition-colors hover:bg-accent-base/10 dark:border-accent-base-dark/30 dark:text-accent-base-dark dark:hover:bg-accent-base-dark/10"
                >
                  <Send className="h-3 w-3" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  title={isCopied ? "Link copied!" : "Copy link"}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-base/10 text-primary-base transition-colors hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20"
                >
                  {isCopied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>

                <Link
                  href={twitterShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Post on X"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-base/10 text-primary-base transition-colors hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20"
                >
                  <FaXTwitter className="h-3 w-3" />
                </Link>

                <Link
                  href={linkedinShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-base/10 text-primary-base transition-colors hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20"
                >
                  <FaLinkedinIn className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-lg border border-primary-base/50 bg-background-base/60 p-4 backdrop-blur-sm dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 lg:px-12"
        >
          <BlogPortableTextRenderer content={post.content} />
        </motion.div>

        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 border-t border-primary-base/50 pt-8 dark:border-primary-base-dark/20"
        >
          {/* Next/Previous Post Navigation */}
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              {/* TODO: Add previous post logic */}
              {/* <Link 
                href={`/blog/${previousPost?.slug}`}
                className="block rounded-lg border border-primary-base/20 p-4 transition-colors hover:bg-secondary-base/50 dark:border-primary-base-dark/20 dark:hover:bg-secondary-base-dark/50"
              >
                <span className="text-sm text-primary-base dark:text-primary-base-dark">Previous</span>
                <h3 className="font-medium text-default-base dark:text-default-base-dark">{previousPost?.title}</h3>
              </Link> */}
            </div>
            <div className="flex-1 text-right">
              {/* TODO: Add next post logic */}
              {/* <Link 
                href={`/blog/${nextPost?.slug}`}
                className="block rounded-lg border border-primary-base/20 p-4 transition-colors hover:bg-secondary-base/50 dark:border-primary-base-dark/20 dark:hover:bg-secondary-base-dark/50"
              >
                <span className="text-sm text-primary-base dark:text-primary-base-dark">Next</span>
                <h3 className="font-medium text-default-base dark:text-default-base-dark">{nextPost?.title}</h3>
              </Link> */}
            </div>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-base transition-colors hover:text-accent-base/80 dark:text-accent-base-dark dark:hover:text-accent-base-dark/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
