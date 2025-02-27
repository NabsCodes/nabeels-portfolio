"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { contactData } from "@/lib/data";
import { Code2, ArrowRight } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { useSectionInView } from "@/hooks/useSectionInView";
import ContactForm from "@/components/common/contact-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { trackEvent } from "@/utils/analytics";

// Create a client
const queryClient = new QueryClient();

export default function Contact() {
  const { ref } = useSectionInView("contact", 0.5);

  const handleSocialClick = (platform: string) => {
    trackEvent("social_click", "social", platform);
  };

  const handleEmailClick = () => {
    trackEvent("email_click", "email", "contact");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <section
        ref={ref}
        id="contact"
        className="scroll-mt-12 px-4 py-16 md:px-6"
      >
        <Toaster position="bottom-right" />
        <SectionHeader
          title={contactData.title}
          subtitle={contactData.subtitle}
          align="left"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-5 md:gap-12">
          {/* Info Section */}
          <div className="space-y-6 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              viewport={{ once: true }}
              className="border-primary-base/30 bg-background-base/80 dark:border-primary-base-dark/10 dark:bg-background-base-dark/80 rounded-lg border p-6 backdrop-blur-xs"
            >
              <div className="space-y-4">
                <h3 className="font-space-grotesk text-primary-base dark:text-primary-base-dark flex items-center gap-2 text-lg font-medium">
                  <Code2 className="h-5 w-5" />
                  Let's Connect
                </h3>
                <p className="text-default-base/80 dark:text-default-base-dark/80">
                  Have a project in mind or want to discuss opportunities? Drop
                  me a message or email me directly at{" "}
                  <Link
                    href={`mailto:${contactData.email}`}
                    onClick={handleEmailClick}
                    className="text-accent-base hover:text-accent-base/80 dark:text-accent-base-dark dark:hover:text-accent-base-dark/80 inline-flex items-center gap-1 underline decoration-dashed underline-offset-4 transition-colors"
                  >
                    {contactData.email}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </p>

                {/* Quick Links */}
                <div className="mt-6 flex flex-col gap-3">
                  <motion.a
                    href={contactData.socials.github}
                    onClick={() => handleSocialClick("github")}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="border-primary-base/10 bg-primary-base/5 text-primary-base hover:bg-primary-base/10 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/10 flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
                  >
                    <SiGithub className="h-5 w-5" />
                    <span className="text-sm">Follow on GitHub</span>
                  </motion.a>
                  <motion.a
                    href={contactData.socials.linkedin}
                    onClick={() => handleSocialClick("linkedin")}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="border-primary-base/10 bg-primary-base/5 text-primary-base hover:bg-primary-base/10 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/10 flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
                  >
                    <SiLinkedin className="h-5 w-5" />
                    <span className="text-sm">Connect on LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href={contactData.socials.twitter}
                    onClick={() => handleSocialClick("twitter")}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="border-primary-base/10 bg-primary-base/5 text-primary-base hover:bg-primary-base/10 dark:border-primary-base-dark/10 dark:bg-primary-base-dark/5 dark:text-primary-base-dark dark:hover:bg-primary-base-dark/10 flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
                  >
                    <FaXTwitter className="h-5 w-5" />
                    <span className="text-sm">Follow on X (Twitter)</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>
    </QueryClientProvider>
  );
}
