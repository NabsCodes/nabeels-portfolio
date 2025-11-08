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
            <div className="border-primary-base/50 bg-background-base/60 dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 flex items-center justify-between rounded-t-lg border border-b-0 px-4 py-3">
              <div className="flex items-center gap-2">
                {/* IDE-style dots */}
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
                </div>
                <span className="font-space-grotesk text-default-base dark:text-default-base-dark text-sm font-medium">
                  {filename || language || "code"}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(code, codeKey)}
                className="border-primary-base/50 bg-background-base/60 hover:bg-primary-base/10 dark:border-primary-base-dark/30 dark:bg-background-base-dark/50 dark:hover:bg-primary-base-dark/10 flex items-center gap-2 rounded-md border px-3 py-1.5 transition-colors"
              >
                {copiedCode === codeKey ? (
                  <>
                    <Check className="text-primary-base dark:text-primary-base-dark h-3 w-3" />
                    <span className="text-primary-base dark:text-primary-base-dark text-xs">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="text-primary-base dark:text-primary-base-dark h-3 w-3" />
                    <span className="text-primary-base dark:text-primary-base-dark text-xs">
                      Copy
                    </span>
                  </>
                )}
              </button>
            </div>
            {/* Code content */}
            <div className="border-primary-base/50 dark:border-primary-base-dark/30 overflow-hidden rounded-b-lg border">
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
            <div className="border-primary-base/20 dark:border-primary-base-dark/20 my-6 overflow-hidden rounded-lg border">
              <Image
                src={imageUrl}
                alt={alt || ""}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
              {(alt || caption) && (
                <div className="border-primary-base/20 bg-primary-base/5 text-primary-base dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark border-t px-4 py-2 text-center text-sm">
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
            <table className="border-primary-base/20 dark:border-primary-base-dark/20 w-full min-w-[600px] table-auto border-collapse overflow-hidden rounded-lg border text-left">
              {caption && (
                <caption className="border-primary-base/20 bg-primary-base/5 text-primary-base dark:border-primary-base-dark/20 dark:bg-primary-base-dark/5 dark:text-primary-base-dark border-b px-4 py-2 text-left text-sm">
                  {caption}
                </caption>
              )}
              <thead className="bg-primary-base/5 dark:bg-primary-base-dark/5">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="border-primary-base/20 text-default-base dark:border-primary-base-dark/20 dark:text-default-base-dark border-b px-4 py-3 text-sm font-semibold"
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
                        className="border-primary-base/10 text-primary-base dark:border-primary-base-dark/10 dark:text-primary-base-dark border-b px-4 py-3"
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
          className="font-raleway text-default-base dark:text-default-base-dark mt-6 mb-6 scroll-mt-20 text-4xl leading-tight font-bold first:mt-0"
        >
          {children}
        </h1>
      ),

      h2: ({ children, value }: any) => (
        <h2
          id={value?._key}
          className="font-raleway text-default-base dark:text-default-base-dark mt-4 mb-4 scroll-mt-20 text-3xl leading-tight font-semibold"
        >
          {children}
        </h2>
      ),

      h3: ({ children, value }: any) => (
        <h3
          id={value?._key}
          className="font-raleway text-default-base dark:text-default-base-dark mt-3 mb-3 scroll-mt-20 text-2xl leading-snug font-semibold"
        >
          {children}
        </h3>
      ),

      h4: ({ children, value }: any) => (
        <h4
          id={value?._key}
          className="font-raleway text-default-base dark:text-default-base-dark mt-3 mb-3 scroll-mt-20 text-xl leading-snug font-semibold"
        >
          {children}
        </h4>
      ),

      // Enhanced blockquotes
      blockquote: ({ children }: any) => (
        <blockquote className="border-primary-base/20 border-l-accent-base bg-accent-base/5 dark:border-primary-base-dark/20 dark:border-l-accent-base-dark dark:bg-accent-base-dark/5 my-6 rounded-r-lg border border-l-4 py-4 pr-4 pl-6 leading-relaxed text-gray-700 italic dark:text-gray-300">
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
        <ul className="[&_li::marker]:text-primary-base [&_li::marker]:dark:text-primary-base-dark my-4 list-outside list-disc space-y-2 pl-6">
          {children}
        </ul>
      ),

      number: ({ children }: any) => (
        <ol className="[&_li::marker]:text-primary-base [&_li::marker]:dark:text-primary-base-dark my-4 list-outside list-decimal space-y-2 pl-6 [&_li::marker]:font-semibold">
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
              className="text-accent-base hover:text-accent-base/80 dark:text-accent-base-dark dark:hover:text-accent-base-dark/80 inline-flex items-center gap-1 underline decoration-1 underline-offset-2 transition-all hover:decoration-2"
            >
              {children}
              <ExternalLink className="inline h-3.5 w-3.5" />
            </Link>
          );
        }

        return (
          <Link
            href={value?.href || "#"}
            className="text-accent-base hover:text-accent-base/80 dark:text-accent-base-dark dark:hover:text-accent-base-dark/80 underline decoration-1 underline-offset-2 transition-all hover:decoration-2"
          >
            {children}
          </Link>
        );
      },

      // Inline code
      code: ({ children }: any) => (
        <code className="border-primary-base/20 bg-primary-base/10 text-accent-base dark:border-primary-base-dark/20 dark:bg-primary-base-dark/10 dark:text-accent-base-dark relative rounded border px-1.5 py-0.5 font-mono text-sm">
          {children}
        </code>
      ),

      // Text formatting
      strong: ({ children }: any) => (
        <strong className="text-default-base dark:text-default-base-dark font-semibold">
          {children}
        </strong>
      ),

      em: ({ children }: any) => (
        <em className="text-default-base dark:text-default-base-dark italic">
          {children}
        </em>
      ),
    },
  };

  return (
    <div
      className={`prose prose-lg prose-headings:text-default-base prose-headings:dark:text-default-base-dark prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-strong:text-default-base prose-strong:dark:text-default-base-dark prose-em:text-default-base prose-em:dark:text-default-base-dark prose-li:text-gray-700 prose-li:dark:text-gray-300 prose-a:text-accent-base prose-a:dark:text-accent-base-dark max-w-none ${className}`}
    >
      <PortableText value={content} components={components} />
    </div>
  );
}
