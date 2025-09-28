import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/", "/studio"],
    },
    sitemap: "https://nabeelhassan.dev/sitemap.xml",
  };
}
