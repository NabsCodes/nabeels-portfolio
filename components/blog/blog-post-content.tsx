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
import { BlogPageHeader } from "@/components/blog/blog-page-header";

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
          {/* Title */}
          <BlogPageHeader title={post.title} breadcrumb={post.category} />

          {/* Meta Information */}
          <div className="text-primary-base dark:text-primary-base-dark flex flex-wrap items-center gap-6 text-sm">
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
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-primary-base/10 text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="border-primary-base/50 bg-background-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 mt-8 rounded-xl border backdrop-blur-sm">
            {/* Desktop Layout */}
            <div className="hidden p-4 md:flex md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent-base/10 text-accent-base dark:bg-accent-base-dark/10 dark:text-accent-base-dark flex h-10 w-10 items-center justify-center rounded-lg">
                  <Share className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-default-base dark:text-default-base-dark font-semibold">
                    Share this article
                  </p>
                  <p className="text-primary-base/70 dark:text-primary-base-dark/70 text-xs">
                    Spread the word with your network
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="border-accent-base/30 text-accent-base hover:bg-accent-base/10 dark:border-accent-base-dark/30 dark:text-accent-base-dark dark:hover:bg-accent-base-dark/10 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  <Send className="h-3 w-3" />
                  Share
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  {isCopied ? (
                    <Check className="text-primary-base dark:text-primary-base-dark h-3 w-3" />
                  ) : (
                    <Copy className="text-primary-base dark:text-primary-base-dark h-3 w-3" />
                  )}
                  {isCopied ? "Copied" : "Copy link"}
                </button>

                <Link
                  href={twitterShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  <FaXTwitter className="h-3 w-3" />
                  Post on X
                </Link>

                <Link
                  href={linkedinShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  <FaLinkedinIn className="h-3 w-3" />
                  Share on LinkedIn
                </Link>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex items-center justify-between p-3 md:hidden">
              <div className="flex items-center gap-2">
                <div className="bg-accent-base/10 text-accent-base dark:bg-accent-base-dark/10 dark:text-accent-base-dark flex h-8 w-8 items-center justify-center rounded-md">
                  <Share className="h-3 w-3" />
                </div>
                <span className="text-default-base dark:text-default-base-dark text-sm font-medium">
                  Share
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  title="Share"
                  className="border-accent-base/30 text-accent-base hover:bg-accent-base/10 dark:border-accent-base-dark/30 dark:text-accent-base-dark dark:hover:bg-accent-base-dark/10 flex h-8 w-8 items-center justify-center rounded-md border transition-colors"
                >
                  <Send className="h-3 w-3" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  title={isCopied ? "Link copied!" : "Copy link"}
                  className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                >
                  {isCopied ? (
                    <Check className="text-primary-base dark:text-primary-base-dark h-3 w-3" />
                  ) : (
                    <Copy className="text-primary-base dark:text-primary-base-dark h-3 w-3" />
                  )}
                </button>

                <Link
                  href={twitterShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Post on X"
                  className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                >
                  <FaXTwitter className="h-3 w-3" />
                </Link>

                <Link
                  href={linkedinShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on LinkedIn"
                  className="bg-primary-base/10 text-primary-base hover:bg-primary-base/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/20 flex h-8 w-8 items-center justify-center rounded-md transition-colors"
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
          className="border-primary-base/50 bg-background-base/60 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 rounded-lg border p-4 backdrop-blur-sm lg:px-12"
        >
          <BlogPortableTextRenderer content={post.content} />
        </motion.div>

        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-primary-base/50 dark:border-primary-base-dark/20 mt-8 border-t pt-8"
        >
          <Link
            href="/blog"
            className="text-accent-base hover:text-accent-base/80 dark:text-accent-base-dark dark:hover:text-accent-base-dark/80 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
