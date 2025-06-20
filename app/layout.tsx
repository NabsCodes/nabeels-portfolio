import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/integrations/google-analytics";
import type { Metadata, Viewport } from "next";
import { Raleway, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/contexts/theme-provider";
import "./globals.css";
import ActiveSectionContextProvider from "@/contexts/active-section-context";
import { ToastProvider } from "@/contexts/toast-context";
import { SparklesBackground } from "@/components/layout/sparkles-background";
import { cn } from "@/lib/utils";

// Raleway for body text
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700"],
});

// Space Grotesk for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  // Basic
  title: {
    default: "Nabeel Hassan | Web Developer",
    template: "%s | Nabeel's Portfolio",
  },
  description:
    "Hey, I'm Nabeel! A Web Developer specialized in building modern web applications with React, Next.js, and TypeScript. Crafting responsive, user-centric solutions with clean code and optimal performance.",
  metadataBase: new URL("https://nabeelhassan.dev"),
  applicationName: "Nabeel Hassan Portfolio",

  // Keywords and Categories
  keywords: [
    "Nabeel",
    "Hassan",
    "Nabeel Hassan",
    "Hassan Umar Hassan",
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "UI Developer",
    "JavaScript Developer",
    "Full Stack Developer",
    "Software Developer",
    "Software Engineer",
    "Node.js Developer",
    "Web Development Portfolio",
    "React Portfolio",
    "Frontend Portfolio",
    "Modern Web Development",
    "Web Designer",
    "UI/UX Development",
    "Portfolio",
  ],
  category: "portfolio",

  // Creator Info
  authors: [
    {
      name: "Nabeel Hassan",
      url: "https://nabeelhassan.dev",
    },
  ],
  creator: "Nabeel Hassan",
  publisher: "Nabeel Hassan",

  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      me: [
        "https://github.com/NabsCodes",
        "https://linkedin.com/in/hassan-umar-hassan",
      ],
    },
  },

  // Alternate Languages/Versions
  alternates: {
    canonical: "https://nabeelhassan.dev",
    languages: {
      "en-US": "https://nabeelhassan.dev",
    },
  },

  // OpenGraph
  openGraph: {
    type: "website",
    siteName: "Nabeel Hassan Portfolio",
    title: "Nabeel Hassan | Web Developer",
    description:
      "Hey, I'm Nabeel! A Web Developer specialized in building modern web applications with React, Next.js, and TypeScript.",
    url: "https://nabeelhassan.dev",
    locale: "en_US",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Nabeel Hassan | Web Developer",
    description:
      "Web Developer specialized in building modern web applications with React, Next.js, and TypeScript.",
    creator: "@nabeelhassan_",
    site: "@nabeelhassan_",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Other Important SEO Tags
  referrer: "origin-when-cross-origin",
  classification: "Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1714" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={cn(
          raleway.variable,
          spaceGrotesk.variable,
          "bg-background-base font-raleway text-default-base selection:bg-primary-base/30 dark:bg-background-base-dark dark:text-default-base-dark dark:selection:bg-primary-base-dark/40",
        )}
      >
        {gaId && <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />}
        <ToastProvider>
          <ActiveSectionContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SparklesBackground />
              {children}
              <Analytics />
            </ThemeProvider>
          </ActiveSectionContextProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
