"use client";

import Hero from "@/components/Hero";
import About from "@/components/About/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills/Skills";
import Research from "@/components/Research";
import Certificates from "@/components/Certificates/Certificates";
import Contact from "@/components/Contact/Contact";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Research />
      <Certificates />
      <Contact />
    </main>
  );
}
