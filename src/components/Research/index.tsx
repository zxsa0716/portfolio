"use client";

/**
 * Research — Conference papers & academic presentations timeline.
 * Award badges, key metrics, and APA-style venue info.
 * Data: 5 presentations from actual CV / award certificates.
 */

import { motion } from "framer-motion";
import { Trophy, Award, TrendingUp, BookOpen } from "lucide-react";
import { publications, type Publication } from "@/data/research";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ── Award badge colour map ────────────────────────────────────────────────
function awardStyle(award: string) {
  if (award.includes("최우수") || award.includes("우수상"))
    return {
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.28)",
      text: "#FCD34D",
      icon: <Trophy className="w-3 h-3" />,
    };
  if (award.includes("입상"))
    return {
      bg: "rgba(59,130,246,0.12)",
      border: "rgba(59,130,246,0.28)",
      text: "#93C5FD",
      icon: <Award className="w-3 h-3" />,
    };
  return {
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.28)",
    text: "#6EE7B7",
    icon: <Award className="w-3 h-3" />,
  };
}

// ── Venue type pill ───────────────────────────────────────────────────────
const VENUE_STYLE: Record<Publication["venueType"], { label: string; color: string }> = {
  conference:  { label: "학술대회",   color: "rgba(6,182,212,0.15)"   },
  competition: { label: "공모전",     color: "rgba(16,185,129,0.15)"  },
  program:     { label: "지원프로그램", color: "rgba(139,92,246,0.15)" },
};

// ── Publication card ──────────────────────────────────────────────────────
function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const vStyle = VENUE_STYLE[pub.venueType];

  return (
    <motion.div
      variants={fadeInUp}
      className="relative flex gap-5"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold"
          style={{
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.35)",
            color: "#93C5FD",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {index < publications.length - 1 && (
          <div
            className="w-px flex-1 mt-3"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-8 rounded-2xl p-6 transition-colors duration-200"
        style={{
          background: "rgba(12,20,38,0.85)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Top row: type + date */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]"
            style={{ background: vStyle.color }}
          >
            {vStyle.label}
          </span>
          <span className="font-mono text-[11px] text-[#334155]">{pub.date}</span>
          <span className="text-[11px] text-[#475569]">{pub.role}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base text-[#F1F5F9] leading-snug mb-1">
          {pub.title}
        </h3>

        {/* Venue */}
        <p className="text-[#64748B] text-xs mb-4 leading-relaxed">
          {pub.venue}
        </p>

        {/* Award badge(s) */}
        {pub.award && (() => {
          const s = awardStyle(pub.award!);
          return (
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
              >
                {s.icon}
                {pub.award}
                {pub.awardNumber && (
                  <span className="opacity-60 font-mono text-[10px]">
                    {pub.awardNumber}
                  </span>
                )}
              </span>
              {pub.prizeAmount && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.28)",
                    color: "#6EE7B7",
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {pub.prizeAmount}
                </span>
              )}
            </div>
          );
        })()}

        {/* Metrics grid */}
        {pub.metrics && pub.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {pub.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-0.5 px-3 py-2 rounded-xl"
                style={{
                  background: m.highlight
                    ? "rgba(59,130,246,0.10)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${m.highlight ? "rgba(59,130,246,0.22)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <span className="text-[#475569] text-[9px] uppercase tracking-wider">
                  {m.label}
                </span>
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: m.highlight ? "#93C5FD" : "#F1F5F9" }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {pub.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[10px] font-mono text-[#64748B]"
              style={{ background: "rgba(17,29,54,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Research() {
  const awardCount = publications.filter((p) => p.award).length;

  return (
    <section
      id="research"
      className="relative py-28"
      style={{ backgroundColor: "#060C18" }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="section-label mb-3">
            Research
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-none text-[#F1F5F9] mb-4"
          >
            논문 · 발표 · 공모
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[#64748B] max-w-xl mx-auto text-base"
          >
            {publications.length}건의 학술발표 · {awardCount}건 수상 — 연구실에서 공모전 무대까지.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 inline-flex items-center gap-6 px-6 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[
              { icon: <BookOpen className="w-4 h-4 text-blue-400" />,   label: "발표 논문", value: `${publications.length}편` },
              { icon: <Trophy className="w-4 h-4 text-amber-400" />,    label: "수상",     value: `${awardCount}건` },
              { icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, label: "최고 R²", value: "0.9681" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  {s.icon}
                  <span className="font-display font-bold text-sm text-[#F1F5F9]">
                    {s.value}
                  </span>
                </div>
                <span className="text-[10px] text-[#475569]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Timeline ─────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {publications.map((pub, i) => (
            <PublicationCard key={pub.id} pub={pub} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
