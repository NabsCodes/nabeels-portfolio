import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group relative h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="border-primary-base/50 bg-background-base/60 hover:border-accent-base dark:border-primary-base-dark/20 dark:bg-background-base-dark dark:hover:border-accent-base-dark flex h-full flex-col rounded-lg border p-6 backdrop-blur-sm transition-all duration-300">
          {/* Header: Date + Category */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <time className="text-primary-base/70 dark:text-primary-base-dark/70 font-mono text-xs">
              {formatDate(post.publishedAt)}
            </time>
            <span className="bg-accent-base/10 text-accent-base dark:bg-accent-base-dark/10 dark:text-accent-base-dark shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-default-base group-hover:text-accent-base dark:text-default-base-dark dark:group-hover:text-accent-base-dark mb-3 line-clamp-2 text-xl leading-snug font-semibold transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-primary-base dark:text-primary-base-dark mb-4 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="bg-primary-base/10 text-primary-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark rounded-md px-2.5 py-1 text-xs font-medium transition-opacity duration-200 hover:opacity-70"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-primary-base/50 dark:text-primary-base-dark/50 rounded-md px-2.5 py-1 text-xs font-medium">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="border-primary-base/30 dark:border-primary-base-dark/10 flex items-center justify-between border-t pt-4">
            <span className="text-primary-base/70 dark:text-primary-base-dark/70 text-xs font-medium">
              {post.readingTime} min read
            </span>

            <div className="bg-primary-base/10 dark:bg-primary-base-dark/10 flex h-7 w-7 items-center justify-center rounded-full transition-colors">
              <ArrowUpRight className="text-primary-base group-hover:text-accent-base dark:text-primary-base-dark dark:group-hover:text-accent-base-dark h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
