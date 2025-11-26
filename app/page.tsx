"use client";

import { motion } from "framer-motion";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Testimonials from "@/components/sections/testimonials";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { pageTransition } from "@/lib/animation-presets";
// import Now from "@/components/sections/now";

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageTransition}
      className="relative"
    >
      <Header />
      <TracingBeam>
        <main className="flex min-h-screen flex-col overflow-hidden">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Testimonials />
          <Experience />
          {/* <Now /> */}
          <Contact />
        </main>
      </TracingBeam>
      <Footer />
    </motion.div>
  );
}
