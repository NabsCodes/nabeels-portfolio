import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
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
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-primary-base/50 bg-background-base/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-base hover:shadow-lg hover:shadow-accent-base/5 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 dark:hover:border-accent-base-dark dark:hover:shadow-accent-base-dark/5">
          {/* Category Badge */}
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center rounded-md bg-accent-base/10 px-2.5 py-1 text-xs font-medium text-accent-base ring-1 ring-inset ring-accent-base/20 dark:bg-accent-base-dark/10 dark:text-accent-base-dark dark:ring-accent-base-dark/20">
              {post.category}
            </span>
            <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ArrowRight className="h-4 w-4 text-accent-base dark:text-accent-base-dark" />
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-3 line-clamp-2 text-xl font-semibold leading-tight text-default-base transition-colors group-hover:text-accent-base dark:text-default-base-dark dark:group-hover:text-accent-base-dark">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-3 flex-grow text-sm leading-relaxed text-primary-base/80 dark:text-primary-base-dark/80">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center gap-1 rounded-md bg-primary-base/10 px-2 py-1 text-xs font-medium text-primary-base transition-colors group-hover:bg-accent-base/10 group-hover:text-accent-base dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:group-hover:bg-accent-base-dark/10 dark:group-hover:text-accent-base-dark"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-primary-base/60 dark:text-primary-base-dark/60">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 border-t border-primary-base/50 pt-4 font-mono text-xs text-primary-base/70 dark:border-primary-base-dark/20 dark:text-primary-base-dark/70">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime} min</span>
            </div>
          </div>

          {/* Decorative corner accent */}
          <div className="absolute -right-1 -top-1 h-12 w-12 rounded-bl-2xl bg-gradient-to-br from-accent-base/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-accent-base-dark/10" />
        </div>
      </Link>
    </motion.article>
  );
}
