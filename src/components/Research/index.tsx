"use client";

/**
 * Research — Journal article + conference presentations timeline.
 * Award badges, key metrics, DOI links. Bilingual (EN default / KO toggle).
 */

import { motion } from "framer-motion";
import { Trophy, Award, TrendingUp, BookOpen, ExternalLink, FileText } from "lucide-react";
import { publications, type Publication } from "@/data/research";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

// ── Award badge colour map ────────────────────────────────────────────────
function awardStyle(award: string) {
  if (award.includes("최우수") || award.includes("우수상") || award.toLowerCase().includes("best") || award.toLowerCase().includes("excellence"))
    return {
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.28)",
      text: "#FCD34D",
      icon: <Trophy className="w-3 h-3" />,
    };
  if (award.includes("입상") || award.toLowerCase().includes("prize"))
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
const VENUE_STYLE: Record<Publication["venueType"], { label: string; labelEn: string; color: string }> = {
  journal:     { label: "저널 논문",   labelEn: "Journal",     color: "rgba(244,63,94,0.16)"  },
  conference:  { label: "학술대회",     labelEn: "Conference",  color: "rgba(6,182,212,0.15)"  },
  competition: { label: "공모전",       labelEn: "Competition", color: "rgba(16,185,129,0.15)" },
  program:     { label: "지원프로그램", labelEn: "Program",     color: "rgba(139,92,246,0.15)" },
};

// ── Publication card ──────────────────────────────────────────────────────
function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const { lang, t } = useLang();
  const vStyle = VENUE_STYLE[pub.venueType];
  const isJournal = pub.venueType === "journal";
  const award = lang === "en" ? pub.awardEn ?? pub.award : pub.award;

  return (
    <motion.div variants={fadeInUp} className="relative flex gap-5">
      {/* Timeline connector */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold"
          style={{
            background: isJournal ? "rgba(244,63,94,0.18)" : "rgba(59,130,246,0.15)",
            border: isJournal ? "1px solid rgba(244,63,94,0.4)" : "1px solid rgba(59,130,246,0.35)",
            color: isJournal ? "#FDA4AF" : "#93C5FD",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {index < publications.length - 1 && (
          <div className="w-px flex-1 mt-3" style={{ background: "rgba(255,255,255,0.06)" }} />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-8 rounded-2xl p-6 transition-colors duration-200"
        style={{
          background: "rgba(12,20,38,0.85)",
          border: isJournal ? "1px solid rgba(244,63,94,0.25)" : "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Top row: type + date */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: vStyle.color, color: isJournal ? "#FDA4AF" : "#94A3B8" }}
          >
            {lang === "en" ? vStyle.labelEn : vStyle.label}
          </span>
          <span className="font-mono text-[11px] text-[#334155]">{pub.date}</span>
          <span className="text-[11px] text-[#475569]">{lang === "en" ? pub.roleEn : pub.role}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base text-[#F1F5F9] leading-snug mb-1">
          {lang === "en" ? pub.titleEn : pub.title}
        </h3>

        {/* Venue */}
        <p className="text-[#64748B] text-xs mb-4 leading-relaxed">
          {lang === "en" ? pub.venueEn : pub.venue}
        </p>

        {/* Award badge(s) */}
        {award && (() => {
          const s = awardStyle(award);
          const prize = lang === "en" ? pub.prizeAmountEn : pub.prizeAmount;
          return (
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
              >
                {s.icon}
                {award}
              </span>
              {prize && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.28)",
                    color: "#6EE7B7",
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {prize}
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
                  background: m.highlight ? "rgba(59,130,246,0.10)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${m.highlight ? "rgba(59,130,246,0.22)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <span className="text-[#475569] text-[9px] uppercase tracking-wider">
                  {lang === "en" ? m.labelEn : m.label}
                </span>
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: m.highlight ? "#93C5FD" : "#F1F5F9" }}
                >
                  {lang === "en" ? m.valueEn ?? m.value : m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(lang === "en" ? pub.tagsEn ?? pub.tags : pub.tags).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono text-[#64748B]"
              style={{ background: "rgba(17,29,54,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(pub.doi || pub.paper || pub.video) && (
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {pub.doi && (
              <a
                href={pub.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#FDA4AF] hover:text-rose-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {t("View on DOI", "DOI 보기")}
              </a>
            )}
            {pub.paper && (
              <a
                href={pub.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#93C5FD] hover:text-blue-300 transition-colors"
              >
                <FileText className="w-3 h-3" />
                {t("Paper / Slides", "논문 / 발표자료")}
              </a>
            )}
            {pub.video && (
              <a
                href={pub.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#6EE7B7] hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {t("Demo video", "시연 영상")}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Research() {
  const { t } = useLang();
  const awardCount = publications.filter((p) => p.award).length;
  const journalCount = publications.filter((p) => p.venueType === "journal").length;

  return (
    <section id="research" className="relative py-28" style={{ backgroundColor: "#060C18" }}>
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
        <SectionHeader
          index="01"
          kicker="Publications & Research"
          title={t("Publications, talks & awards", "논문 · 발표 · 수상")}
          description={t(
            `${journalCount} first-author SCIE article · ${publications.length} works · ${awardCount} awards — from the lab bench to the conference stage.`,
            `SCIE 저널 논문 ${journalCount}편 · 총 ${publications.length}건 · 수상 ${awardCount}건 — 연구실에서 학술 무대까지.`,
          )}
        />

        {/* Quick stats strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap items-stretch gap-px mb-12 rounded-xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { icon: <BookOpen className="w-4 h-4 text-rose-400" />,      label: t("Journal IF", "저널 IF"),  value: "6.9" },
            { icon: <Trophy className="w-4 h-4 text-amber-400" />,       label: t("Awards", "수상"),          value: `${awardCount}` },
            { icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, label: t("Best R²", "최고 R²"),      value: "0.9681" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex-1 min-w-[110px] flex flex-col gap-1 px-5 py-4"
              style={{ background: "#060C18" }}
            >
              <div className="flex items-center gap-1.5">
                {s.icon}
                <span className="font-display font-bold text-lg text-[#F1F5F9] tabular">{s.value}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#475569]">{s.label}</span>
            </div>
          ))}
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
