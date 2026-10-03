"use client";

import Hero from "@/components/Hero";
import About from "@/components/About/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills/Skills";
import Research from "@/components/Research";
import Certificates from "@/components/Certificates/Certificates";
import Contact from "@/components/Contact/Contact";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <main className="relative">
      {/* Keyboard users land on the masthead first; this lets them pass it. */}
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Research />
      <Projects />
      <Skills />
      <Certificates />
      <Contact />
    </main>
  );
}
