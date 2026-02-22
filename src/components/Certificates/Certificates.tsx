"use client";

/**
 * Certificates — National qualifications grid + Activity certificates + Awards.
 * Three subsections. Verified badge on all issued credentials.
 */

import { motion } from "framer-motion";
import { Award, Medal, CheckCircle, Star } from "lucide-react";
import { certificates, activityCerts, awards } from "@/data/certificates";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ── National cert category styles ────────────────────────────────────────
const CAT_STYLE: Record<string, { label: string; bg: string; text: string }> = {
  data:        { label: "데이터",   bg: "rgba(59,130,246,0.15)",  text: "#93C5FD" },
  environment: { label: "환경",     bg: "rgba(16,185,129,0.15)",  text: "#6EE7B7" },
  forest:      { label: "산림",     bg: "rgba(16,185,129,0.12)",  text: "#34D399" },
  it:          { label: "IT",       bg: "rgba(99,102,241,0.15)",  text: "#A5B4FC" },
  history:     { label: "역사",     bg: "rgba(245,158,11,0.15)",  text: "#FCD34D" },
  drone:       { label: "드론",     bg: "rgba(6,182,212,0.15)",   text: "#67E8F9" },
};

// ── Activity cert category styles ────────────────────────────────────────
const ACTIVITY_STYLE: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  climate:   { label: "기후",     bg: "rgba(59,130,246,0.10)",  text: "#93C5FD", dot: "#3B82F6" },
  volunteer: { label: "봉사",     bg: "rgba(16,185,129,0.10)",  text: "#6EE7B7", dot: "#10B981" },
  community: { label: "커뮤니티", bg: "rgba(245,158,11,0.10)",  text: "#FCD34D", dot: "#F59E0B" },
  education: { label: "교육",     bg: "rgba(139,92,246,0.10)",  text: "#C4B5FD", dot: "#8B5CF6" },
};

const TYPE_LABEL: Record<string, string> = {
  "completion":   "수료",
  "award-cert":   "인증",
  "participation":"참여",
};

// ── Award emoji map ───────────────────────────────────────────────────────
const AWARD_EMOJI = ["🏆", "🥇", "🥇", "🏅", "🏅", "🏅"];

// ── Section ───────────────────────────────────────────────────────────────
export default function Certificates() {
  return (
    <section
      id="certificates"
      className="relative py-28"
      style={{ backgroundColor: "#080E1C" }}
    >
      {/* Background texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ── Section header ─────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="section-label mb-3">
            Credentials
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-none text-[#F1F5F9] mb-4"
          >
            자격증 & 수료 & 수상
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[#64748B] max-w-xl mx-auto text-base"
          >
            7개 국가자격증 · 7개 활동수료 · 6건 수상 이력
          </motion.p>
        </motion.div>

        {/* ════════════════════════════════════════════════
            SECTION 1 — National qualifications
            ════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <h3 className="font-display font-bold text-xl text-[#F1F5F9] mb-6 flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-400" />
            국가자격증
            <span className="text-blue-400 text-base font-normal">
              ({certificates.length}개)
            </span>
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {certificates.map((cert) => {
              const style = CAT_STYLE[cert.category] ?? CAT_STYLE.data;
              return (
                <motion.div
                  key={cert.id}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl cursor-default transition-colors duration-200"
                  style={{
                    background: "rgba(12,20,38,0.85)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                  }
                >
                  {/* Category pill */}
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider mb-3"
                    style={{ background: style.bg, color: style.text }}
                  >
                    {style.label}
                  </span>

                  {/* Name */}
                  <h4 className="text-[#F1F5F9] font-bold text-sm leading-snug mb-1">
                    {cert.name}
                  </h4>
                  <p className="text-[#64748B] text-[11px] mb-3 leading-relaxed">
                    {cert.issuer}
                  </p>

                  {/* Credential ID + date + verified */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#3B82F6] text-[10px]">
                      {cert.number}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span className="text-[#475569] text-[10px]">{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════
            SECTION 2 — Activity & completion certificates
            ════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <h3 className="font-display font-bold text-xl text-[#F1F5F9] mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            활동 수료 · 인증
            <span className="text-emerald-400 text-base font-normal">
              ({activityCerts.length}개)
            </span>
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activityCerts.map((cert) => {
              const style = ACTIVITY_STYLE[cert.category] ?? ACTIVITY_STYLE.climate;
              const typeLabel = TYPE_LABEL[cert.type] ?? "수료";
              return (
                <motion.div
                  key={cert.id}
                  variants={scaleIn}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl cursor-default transition-colors duration-200"
                  style={{
                    background: "rgba(12,20,38,0.85)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = `${style.dot}50`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
                  }
                >
                  {/* Top row: category + type */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                      style={{ background: style.bg, color: style.text }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: style.dot }}
                      />
                      {style.label}
                    </span>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "#475569",
                      }}
                    >
                      {typeLabel}
                    </span>
                  </div>

                  {/* Name */}
                  <h4 className="text-[#F1F5F9] font-bold text-sm leading-snug mb-1">
                    {cert.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-3 leading-relaxed">
                    {cert.issuer}
                  </p>

                  {/* Period + date */}
                  <div className="space-y-1">
                    {cert.period && (
                      <p className="font-mono text-[10px] text-[#334155]">
                        활동기간: {cert.period}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#334155]">
                        {cert.number !== "—" ? cert.number : ""}
                      </span>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span className="text-[#475569] text-[10px]">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════
            SECTION 3 — Awards & competition results
            ════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3 className="font-display font-bold text-xl text-[#F1F5F9] mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            수상 이력
            <span className="text-amber-400 text-base font-normal">
              ({awards.length}건)
            </span>
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-4"
          >
            {awards.map((award, i) => (
              <motion.div
                key={award.id}
                variants={fadeInUp}
                className="p-6 rounded-2xl transition-colors duration-200"
                style={{
                  background: "rgba(12,20,38,0.85)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(245,158,11,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
                }
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 text-lg"
                    style={{
                      background: "rgba(245,158,11,0.12)",
                      border: "1px solid rgba(245,158,11,0.25)",
                    }}
                  >
                    {AWARD_EMOJI[i] ?? "🏅"}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <h4 className="text-[#F1F5F9] font-bold text-sm leading-snug">
                        {award.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                        style={{
                          background: "rgba(245,158,11,0.12)",
                          border: "1px solid rgba(245,158,11,0.25)",
                          color: "#FCD34D",
                        }}
                      >
                        {award.rank}
                      </span>
                      {award.prize && (
                        <span
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                          style={{
                            background: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.25)",
                            color: "#6EE7B7",
                          }}
                        >
                          {award.prize}
                        </span>
                      )}
                    </div>
                    <p className="text-[#64748B] text-xs mb-1 leading-relaxed">
                      {award.competition}
                    </p>
                    {award.paper && (
                      <p className="text-[#475569] text-[11px]">
                        <span className="text-[#334155]">논문/작품: </span>
                        {award.paper}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <span className="font-mono text-[#334155] text-xs shrink-0">
                    {award.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
