import { defineField, defineType } from "sanity";
import { CodeBlockIcon } from "@sanity/icons";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
        },
        {
          // Simple table block for structured data in posts
          type: "object",
          name: "table",
          title: "Table",
          fields: [
            {
              name: "headers",
              title: "Headers",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "row",
                  fields: [
                    {
                      name: "cells",
                      title: "Cells",
                      type: "array",
                      of: [{ type: "string" }],
                      validation: (Rule) => Rule.required().min(1),
                    },
                  ],
                },
              ],
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .custom((rows, context) => {
                    const headers = (context?.parent as { headers: string[] })
                      ?.headers as string[] | undefined;
                    if (
                      !rows ||
                      !Array.isArray(rows) ||
                      !headers ||
                      !headers.length
                    )
                      return true;
                    const mismatch = rows.some(
                      (r: { cells: string[] }) =>
                        !r?.cells || r.cells.length !== headers.length,
                    );
                    return mismatch
                      ? "Each row must have the same number of cells as headers"
                      : true;
                  }),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional table caption",
            },
          ],
          preview: {
            select: { caption: "caption", headers: "headers" },
            prepare({ caption, headers }) {
              return {
                title: caption || "Table",
                subtitle: Array.isArray(headers)
                  ? `${headers.length} column${headers.length === 1 ? "" : "s"}`
                  : "",
              };
            },
          },
        },
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          icon: CodeBlockIcon,
          fields: [
            {
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "TypeScript", value: "typescript" },
                  { title: "JavaScript", value: "javascript" },
                  { title: "JSX", value: "jsx" },
                  { title: "TSX", value: "tsx" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                  { title: "SCSS", value: "scss" },
                  { title: "JSON", value: "json" },
                  { title: "Markdown", value: "markdown" },
                  { title: "Bash", value: "bash" },
                  { title: "Python", value: "python" },
                  { title: "SQL", value: "sql" },
                  { title: "Go", value: "go" },
                  { title: "Rust", value: "rust" },
                  { title: "PHP", value: "php" },
                  { title: "Java", value: "java" },
                  { title: "C#", value: "csharp" },
                  { title: "C++", value: "cpp" },
                  { title: "Swift", value: "swift" },
                  { title: "Kotlin", value: "kotlin" },
                  { title: "Dart", value: "dart" },
                  { title: "YAML", value: "yaml" },
                  { title: "XML", value: "xml" },
                  { title: "GraphQL", value: "graphql" },
                ],
              },
              initialValue: "typescript",
            },
            {
              name: "filename",
              title: "Filename",
              type: "string",
              description: "Optional filename to display",
            },
            {
              name: "code",
              title: "Code",
              type: "text",
              rows: 10,
            },
            {
              name: "highlightedLines",
              title: "Highlighted Lines",
              type: "array",
              of: [{ type: "number" }],
              description: "Line numbers to highlight (optional)",
            },
          ],
          preview: {
            select: {
              title: "filename",
              subtitle: "language",
              code: "code",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Code Block",
                subtitle: subtitle || "No language specified",
                media: CodeBlockIcon,
              };
            },
          },
        },
        {
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Important for SEO and accessibility",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption displayed below image",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          // Web Development
          { title: "Frontend", value: "Frontend" },
          { title: "Backend", value: "Backend" },
          { title: "Full Stack", value: "Full Stack" },
          { title: "Web Development", value: "Web Development" },

          // Frameworks & Libraries
          { title: "React", value: "React" },
          { title: "Next.js", value: "Next.js" },
          { title: "Vue", value: "Vue" },
          { title: "Angular", value: "Angular" },
          { title: "Node.js", value: "Node.js" },

          // Programming Languages
          { title: "JavaScript", value: "JavaScript" },
          { title: "TypeScript", value: "TypeScript" },
          { title: "Python", value: "Python" },
          { title: "Go", value: "Go" },
          { title: "Rust", value: "Rust" },

          // DevOps & Tools
          { title: "DevOps", value: "DevOps" },
          { title: "Docker", value: "Docker" },
          { title: "CI/CD", value: "CI/CD" },
          { title: "AWS", value: "AWS" },
          { title: "Database", value: "Database" },

          // Content Types
          { title: "Tutorial", value: "Tutorial" },
          { title: "Guide", value: "Guide" },
          { title: "Tips & Tricks", value: "Tips & Tricks" },
          { title: "Best Practices", value: "Best Practices" },
          { title: "Case Study", value: "Case Study" },
          { title: "Review", value: "Review" },
          { title: "Opinion", value: "Opinion" },
          { title: "Career", value: "Career" },
          { title: "Industry News", value: "Industry News" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Important for SEO and accessibility",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Title for search engines (max 60 characters)",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Description for search engines (max 160 characters)",
          validation: (Rule) => Rule.max(160),
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      category: "category",
    },
    prepare(selection) {
      const { author, category } = selection;
      return {
        ...selection,
        subtitle: `${category} by ${author}`,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
