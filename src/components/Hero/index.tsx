"use client";

/**
 * Hero — Academic researcher homepage style
 * Clean, typography-forward. No particles, no stat cards, no gradient text.
 */

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0B1120" }}
    >
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">

        {/* Affiliation */}
        <motion.p
          {...fade(0)}
          className="text-xs font-mono tracking-widest uppercase mb-10"
          style={{ color: "#475569" }}
        >
          국민대학교 산림환경시스템학과 · CLIM Lab
        </motion.p>

        {/* Name */}
        <motion.div {...fade(0.1)} className="mb-3 select-none">
          <h1
            className="font-bold leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(4rem, 13vw, 9rem)" }}
          >
            최희도
          </h1>
          <p
            className="font-light tracking-[0.28em] uppercase mt-3"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)", color: "#334155" }}
          >
            Heedo&nbsp;Choi
          </p>
        </motion.div>

        {/* Rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" as const }}
          className="w-12 h-px my-8"
          style={{ background: "#1E3A5F" }}
        />

        {/* Research label */}
        <motion.p
          {...fade(0.3)}
          className="text-sm font-medium tracking-wide mb-5"
          style={{ color: "#3B82F6" }}
        >
          Urban Climate &amp; Machine Learning Researcher
        </motion.p>

        {/* Statement */}
        <motion.p
          {...fade(0.38)}
          className="max-w-[38rem] text-base leading-relaxed mb-12"
          style={{ color: "#64748B" }}
        >
          위성 데이터와 그래프 신경망으로 도시 기후 위험을 모델링하고,
          실제 배포 플랫폼으로 정책 결정을 지원합니다.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.46)}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-2.5 text-sm font-medium text-white transition-colors duration-150"
            style={{ background: "#1D4ED8", border: "1px solid #2563EB" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2563EB"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1D4ED8"; }}
          >
            View Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/최희도_CV.pdf"
            download="최희도_CV.pdf"
            className="inline-flex items-center gap-2 px-7 py-2.5 text-sm font-medium transition-colors duration-150"
            style={{ color: "#64748B", border: "1px solid #1E293B" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#94A3B8";
              (e.currentTarget as HTMLElement).style.borderColor = "#334155";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#64748B";
              (e.currentTarget as HTMLElement).style.borderColor = "#1E293B";
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#1E293B" }}
      >
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "#334155" }}>
          scroll
        </span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #334155, transparent)" }} />
      </div>
    </section>
  );
}
