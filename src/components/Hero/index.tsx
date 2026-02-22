"use client";

/**
 * Hero — Full-viewport landing section
 *
 * Layout hierarchy:
 *   [label]    Urban Climate × Machine Learning Researcher & Developer
 *   [H1 huge]  최희도
 *   [H2 sub]   Heedo Choi
 *   [typing]   I build [rotating keyword]
 *   [body]     One-liner value proposition
 *   [CTAs]     View Projects  /  Download CV
 *   [stats]    R² 0.9681 · 7개 국가자격증 · 5건 연구과제 · 6건 수상
 *   [scroll]   Animated chevron indicator
 *
 * Background:
 *   Three.js particle field (dynamically imported, SSR disabled)
 *   + CSS grid + radial glows (no GPU cost)
 */

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

import { TypeWriter } from "./TypeWriter";
import { heroTextVariants, staggerContainer } from "@/lib/animations";

/* Three.js canvas — client-only, lazy loaded */
const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr:     false,
  loading: () => null,
});

/* ─── Real data from CV / 내경력.txt ─── */
const STATS = [
  { value: "R² 0.9681",  label: "XAI 열 위험 모델",   sub: "GAT 기반 / 13,170 obs" },
  { value: "7개",        label: "국가자격증",          sub: "빅데이터·환경·산림·IT" },
  { value: "5건",        label: "국가연구과제",         sub: "학부연구생 참여" },
  { value: "6건",        label: "수상 이력",           sub: "최우수 · 우수 · 장려" },
] as const;

/* ─── Animation config ─── */
const viewport = { once: true } as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#080E1C" }}
    >
      {/* ── Three.js particle field (z: 1) ──────────────────── */}
      <div className="absolute inset-0 z-[1]" aria-hidden>
        <ParticleField />
      </div>

      {/* ── CSS: subtle grid lines (z: 2) ───────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(59,130,246,0.035) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(59,130,246,0.035) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── CSS: central blue radial glow (z: 2) ─────────────── */}
      <div
        aria-hidden
        className="absolute z-[2] pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "780px",
          height: "520px",
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.10) 0%, transparent 68%)",
        }}
      />

      {/* ── CSS: secondary emerald accent glow (z: 2) ─────────── */}
      <div
        aria-hidden
        className="absolute z-[2] pointer-events-none"
        style={{
          top: "30%",
          right: "15%",
          width: "340px",
          height: "340px",
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── CSS: edge vignette to fade particles at borders (z: 3) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 45%, #080E1C 100%)",
        }}
      />

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT  (z: 10 — above all backgrounds)
          ══════════════════════════════════════════════════ */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center"
      >
        {/* ── Status badge ─────────────────────────────── */}
        <motion.div custom={0} variants={heroTextVariants} className="mb-10">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-300 text-sm font-medium tracking-wide">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
              style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)", animation: "pulse 2s infinite" }}
            />
            Urban Climate × Machine Learning Researcher&nbsp;&amp;&nbsp;Developer
          </span>
        </motion.div>

        {/* ── Name ─────────────────────────────────────── */}
        <motion.div custom={0.15} variants={heroTextVariants} className="mb-6 select-none">
          {/* Korean name — huge, gradient */}
          <h1
            className="font-display font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(4.5rem, 14vw, 10.5rem)" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(160deg, #FFFFFF 0%, #E0EEFF 35%, #93C5FD 70%, #60A5FA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip:      "text",
              }}
            >
              최희도
            </span>
          </h1>

          {/* Romanization — refined, subtle */}
          <p
            className="font-display font-light tracking-[0.3em] uppercase mt-1"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.75rem)",
              color: "#64748B",
            }}
          >
            Heedo&nbsp;Choi
          </p>
        </motion.div>

        {/* ── Divider line ─────────────────────────────── */}
        <motion.div
          custom={0.28}
          variants={heroTextVariants}
          className="w-24 h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
          }}
        />

        {/* ── Typing line ───────────────────────────────── */}
        <motion.p
          custom={0.35}
          variants={heroTextVariants}
          className="text-xl md:text-2xl font-light mb-5"
          style={{ color: "#94A3B8" }}
        >
          I&nbsp;build&nbsp;
          <TypeWriter />
        </motion.p>

        {/* ── One-liner value proposition ───────────────── */}
        <motion.p
          custom={0.48}
          variants={heroTextVariants}
          className="max-w-[42rem] text-base md:text-lg leading-relaxed mb-12"
          style={{ color: "#64748B" }}
        >
          위성 데이터와 그래프 신경망으로{" "}
          <span style={{ color: "#94A3B8" }}>도시 기후 위험을 모델링하고</span>
          {" "}—{" "}
          <span style={{ color: "#94A3B8" }}>실제 배포 플랫폼으로 정책 결정을 지원합니다.</span>
        </motion.p>

        {/* ── CTA buttons ──────────────────────────────── */}
        <motion.div
          custom={0.6}
          variants={heroTextVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          {/* Primary: View Projects */}
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
              boxShadow: "0 0 0 1px rgba(37,99,235,0.5), 0 4px 20px rgba(37,99,235,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(59,130,246,0.6), 0 8px 32px rgba(59,130,246,0.30)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(37,99,235,0.5), 0 4px 20px rgba(37,99,235,0.25)";
            }}
          >
            View Projects
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>

          {/* Secondary: Download CV */}
          <a
            href="/최희도_CV.pdf"
            download="최희도_CV.pdf"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200"
            style={{
              color:        "#94A3B8",
              border:       "1px solid rgba(255,255,255,0.12)",
              background:   "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#F1F5F9";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#94A3B8";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <Download className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Download CV
          </a>
        </motion.div>

        {/* ── Stat cards ───────────────────────────────── */}
        <motion.div
          custom={0.75}
          variants={heroTextVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-5 px-4 rounded-2xl text-center transition-all duration-200"
              style={{
                background:   "rgba(255,255,255,0.035)",
                border:       "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                (e.currentTarget as HTMLElement).style.background  = "rgba(59,130,246,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.035)";
              }}
            >
              <span
                className="font-display font-bold leading-none mb-1.5"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "#60A5FA" }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-medium leading-tight" style={{ color: "#F1F5F9" }}>
                {stat.label}
              </span>
              <span className="text-[10px] mt-0.5 leading-tight" style={{ color: "#64748B" }}>
                {stat.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] font-medium tracking-[0.25em] uppercase"
          style={{ color: "#334155" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: "#475569" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
