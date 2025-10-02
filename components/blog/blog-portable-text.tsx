/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PortableText } from "@portabletext/react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type {
  BlogPortableText,
  CodeBlock,
  SanityImage,
} from "@/lib/types/blog";

interface BlogPortableTextProps {
  content: BlogPortableText;
  className?: string;
}

export function BlogPortableTextRenderer({
  content,
  className = "",
}: BlogPortableTextProps) {
  const { theme } = useTheme();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, codeKey: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(codeKey);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const components = {
    types: {
      // Custom code block renderer
      codeBlock: ({ value }: { value: CodeBlock }) => {
        const { language, filename, code, highlightedLines } = value;
        const isDark = theme === "dark";
        const codeKey = `${language}-${code.slice(0, 20)}`;

        return (
          <div className="group relative my-6">
            {/* IDE-style header */}
            <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-primary-base/50 bg-background-base/60 px-4 py-3 dark:border-primary-base-dark/30 dark:bg-background-base-dark/50">
              <div className="flex items-center gap-2">
                {/* IDE-style dots */}
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
                </div>
                <span className="font-space-grotesk text-sm font-medium text-slate-300 dark:text-slate-400">
                  {filename || language || "code"}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(code, codeKey)}
                className="flex items-center gap-2 rounded-md border border-primary-base/50 bg-background-base/60 px-3 py-1.5 transition-colors hover:bg-primary-base/10 dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 dark:hover:bg-primary-base-dark/10"
              >
                {copiedCode === codeKey ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>
            {/* Code content */}
            <div className="overflow-hidden rounded-b-lg border border-primary-base/50 dark:border-primary-base-dark/30">
              <SyntaxHighlighter
                language={language || "text"}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: isDark ? "#1a1b26" : "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: "1.7",
                  padding: "1.25rem",
                  fontFamily: "Space Grotesk",
                }}
                wrapLines={true}
                wrapLongLines={true}
                showLineNumbers={code.split("\n").length > 5}
                lineNumberStyle={{
                  color: isDark ? "#565f89" : "#9ca3af",
                  fontSize: "0.75rem",
                  paddingRight: "1rem",
                  userSelect: "none",
                  minWidth: "2.5rem",
                }}
                lineProps={(lineNumber) => {
                  const style: React.CSSProperties = {};
                  if (highlightedLines?.includes(lineNumber)) {
                    style.backgroundColor = isDark ? "#292e42" : "#f3f4f6";
                    style.display = "block";
                    style.marginLeft = "-1.25rem";
                    style.marginRight = "-1.25rem";
                    style.paddingLeft = "1.25rem";
                    style.paddingRight = "1.25rem";
                  }
                  return { style };
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      },

      // Enhanced image renderer
      image: ({ value }: { value: SanityImage }) => {
        const { alt, caption } = value;

        if (!value.asset || !value.asset._ref) {
          return null;
        }

        try {
          const imageUrl = urlFor(value).width(800).height(600).url();

          return (
            <div className="my-6 overflow-hidden rounded-lg border border-primary-base/20 dark:border-primary-base-dark/20">
              <Image
                src={imageUrl}
                alt={alt || ""}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
              {(alt || caption) && (
                <div className="border-t border-primary-base/20 bg-primary-base/5 px-4 py-2 text-center text-sm text-primary-base dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark">
                  {caption || alt}
                </div>
              )}
            </div>
          );
        } catch (error) {
          console.warn("Failed to generate image URL:", error);
          return null;
        }
      },

      // Table renderer
      table: ({
        value,
      }: {
        value: {
          headers: string[];
          rows: { cells: string[] }[];
          caption?: string;
        };
      }) => {
        const { headers = [], rows = [], caption } = value ?? {};
        if (!headers.length || !rows.length) return null;

        return (
          <div className="my-6 overflow-x-auto">
            <table className="w-full min-w-[600px] table-auto border-collapse overflow-hidden rounded-lg border border-primary-base/20 text-left dark:border-primary-base-dark/20">
              {caption && (
                <caption className="border-b border-primary-base/20 bg-primary-base/5 px-4 py-2 text-left text-sm text-primary-base dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark">
                  {caption}
                </caption>
              )}
              <thead className="bg-primary-base/5 dark:bg-primary-base-dark/5">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="border-b border-primary-base/20 px-4 py-3 text-sm font-semibold text-default-base dark:border-primary-base-dark/20 dark:text-default-base-dark"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="even:bg-primary-base/5 dark:even:bg-primary-base-dark/5"
                  >
                    {row.cells?.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="border-b border-primary-base/10 px-4 py-3 text-primary-base dark:border-primary-base-dark/10 dark:text-primary-base-dark"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },

    block: {
      // Enhanced headings
      h1: ({ children, value }: any) => (
        <h1
          id={value?._key}
          className="mb-6 mt-12 scroll-mt-20 font-raleway text-4xl font-bold leading-tight text-default-base first:mt-0 dark:text-default-base-dark"
        >
          {children}
        </h1>
      ),

      h2: ({ children, value }: any) => (
        <h2
          id={value?._key}
          className="mb-4 mt-10 scroll-mt-20 font-raleway text-3xl font-semibold leading-tight text-default-base dark:text-default-base-dark"
        >
          {children}
        </h2>
      ),

      h3: ({ children, value }: any) => (
        <h3
          id={value?._key}
          className="mb-3 mt-8 scroll-mt-20 font-raleway text-2xl font-semibold leading-snug text-default-base dark:text-default-base-dark"
        >
          {children}
        </h3>
      ),

      h4: ({ children, value }: any) => (
        <h4
          id={value?._key}
          className="mb-3 mt-6 scroll-mt-20 font-raleway text-xl font-semibold leading-snug text-default-base dark:text-default-base-dark"
        >
          {children}
        </h4>
      ),

      // Enhanced blockquotes
      blockquote: ({ children }: any) => (
        <blockquote className="my-6 rounded-r-lg border border-l-4 border-primary-base/20 border-l-accent-base bg-accent-base/5 py-4 pl-6 pr-4 italic leading-relaxed text-gray-700 dark:border-primary-base-dark/20 dark:border-l-accent-base-dark dark:bg-accent-base-dark/5 dark:text-gray-300">
          {children}
        </blockquote>
      ),

      // Normal paragraphs
      normal: ({ children }: any) => (
        <p className="my-4 leading-[1.75] text-gray-700 dark:text-gray-300">
          {children}
        </p>
      ),
    },

    list: {
      // Enhanced lists
      bullet: ({ children }: any) => (
        <ul className="my-4 list-outside list-disc space-y-2 pl-6">
          {children}
        </ul>
      ),

      number: ({ children }: any) => (
        <ol className="my-4 list-outside list-decimal space-y-2 pl-6">
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }: any) => (
        <li className="leading-[1.75] text-gray-700 dark:text-gray-300">
          {children}
        </li>
      ),

      number: ({ children }: any) => (
        <li className="leading-[1.75] text-gray-700 dark:text-gray-300">
          {children}
        </li>
      ),
    },

    marks: {
      // Enhanced links
      link: ({ children, value }: any) => {
        const isExternal = value?.href?.startsWith("http");

        if (isExternal) {
          return (
            <Link
              href={value.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent-base underline decoration-1 underline-offset-2 transition-all hover:text-accent-base/80 hover:decoration-2 dark:text-accent-base-dark dark:hover:text-accent-base-dark/80"
            >
              {children}
              <ExternalLink className="inline h-3.5 w-3.5" />
            </Link>
          );
        }

        return (
          <Link
            href={value?.href || "#"}
            className="text-accent-base underline decoration-1 underline-offset-2 transition-all hover:text-accent-base/80 hover:decoration-2 dark:text-accent-base-dark dark:hover:text-accent-base-dark/80"
          >
            {children}
          </Link>
        );
      },

      // Inline code
      code: ({ children }: any) => (
        <code className="relative rounded border border-primary-base/20 bg-primary-base/10 px-1.5 py-0.5 font-mono text-sm text-accent-base dark:border-primary-base-dark/20 dark:bg-primary-base-dark/10 dark:text-accent-base-dark">
          {children}
        </code>
      ),

      // Text formatting
      strong: ({ children }: any) => (
        <strong className="font-semibold">{children}</strong>
      ),

      em: ({ children }: any) => <em className="italic">{children}</em>,
    },
  };

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  );
}
