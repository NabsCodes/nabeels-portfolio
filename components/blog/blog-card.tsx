import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="overflow-hidden rounded-lg border border-primary-base/20 bg-background-base/60 backdrop-blur-sm transition-all duration-300 hover:border-accent-base hover:bg-background-base/80 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 dark:hover:border-accent-base-dark dark:hover:bg-background-base-dark/80">
          {/* Cover Image */}
          {post.coverImage ? (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-base-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ) : (
            <div className="relative flex h-48 w-full items-center justify-center bg-gradient-to-br from-primary-base/10 to-accent-base/5 dark:from-primary-base-dark/10 dark:to-accent-base-dark/5">
              <ImageIcon className="h-12 w-12 text-primary-base/30 dark:text-primary-base-dark/30" />
            </div>
          )}

          <div className="p-6">
            {/* Header with meta info */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4 font-mono text-xs text-primary-base/70 dark:text-primary-base-dark/70">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Arrow that appears on hover */}
              <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowRight className="h-4 w-4 text-accent-base dark:text-accent-base-dark" />
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-xl font-semibold text-default-base transition-colors group-hover:text-accent-base dark:text-default-base-dark dark:group-hover:text-accent-base-dark">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="mb-4 line-clamp-3 leading-relaxed text-primary-base dark:text-primary-base-dark">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="rounded-lg border border-primary-base/20 bg-primary-base/10 px-2 py-1 font-mono text-xs text-primary-base transition-colors group-hover:border-accent-base/30 group-hover:bg-accent-base/10 dark:border-primary-base-dark/20 dark:bg-primary-base-dark/10 dark:text-primary-base-dark dark:group-hover:border-accent-base-dark/30 dark:group-hover:bg-accent-base-dark/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -right-1 -top-1 h-8 w-8 rounded-bl-lg bg-gradient-to-br from-accent-base/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-accent-base-dark/20" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
