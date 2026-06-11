"use client";

/**
 * Certificates — National & international qualifications + activity certs + awards.
 * Bilingual (EN default / KO toggle). Verified badge on all credentials.
 */

import { motion } from "framer-motion";
import { Award, Medal, CheckCircle } from "lucide-react";
import { certificates, activityCerts, awards } from "@/data/certificates";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

// ── National cert category styles ────────────────────────────────────────
const CAT_STYLE: Record<string, { label: string; labelEn: string; bg: string; text: string }> = {
  data:        { label: "데이터", labelEn: "Data",        bg: "rgba(59,130,246,0.15)",  text: "#93C5FD" },
  environment: { label: "환경",   labelEn: "Environment", bg: "rgba(16,185,129,0.15)",  text: "#6EE7B7" },
  forest:      { label: "산림",   labelEn: "Forest",      bg: "rgba(16,185,129,0.12)",  text: "#34D399" },
  it:          { label: "IT",     labelEn: "IT",          bg: "rgba(99,102,241,0.15)",  text: "#A5B4FC" },
  history:     { label: "역사",   labelEn: "History",     bg: "rgba(245,158,11,0.15)",  text: "#FCD34D" },
  drone:       { label: "드론",   labelEn: "Drone",       bg: "rgba(6,182,212,0.15)",   text: "#67E8F9" },
};

const TYPE_BADGE: Record<string, { label: string; labelEn: string }> = {
  "national-tech":     { label: "국가기술", labelEn: "National" },
  "national-approved": { label: "국가공인", labelEn: "National" },
  "license":           { label: "면허",     labelEn: "License" },
  "international":      { label: "국제",     labelEn: "Int'l" },
};

// ── Activity cert category styles ────────────────────────────────────────
const ACTIVITY_STYLE: Record<string, { label: string; labelEn: string; bg: string; text: string; dot: string }> = {
  climate:   { label: "기후",     labelEn: "Climate",   bg: "rgba(59,130,246,0.10)", text: "#93C5FD", dot: "#3B82F6" },
  volunteer: { label: "봉사",     labelEn: "Volunteer", bg: "rgba(16,185,129,0.10)", text: "#6EE7B7", dot: "#10B981" },
  community: { label: "커뮤니티", labelEn: "Community", bg: "rgba(245,158,11,0.10)", text: "#FCD34D", dot: "#F59E0B" },
  education: { label: "교육",     labelEn: "Training",  bg: "rgba(139,92,246,0.10)", text: "#C4B5FD", dot: "#8B5CF6" },
};

const AWARD_EMOJI = ["🏆", "🥇", "🥇", "🏅", "🏅", "🏅"];

// ── Section ───────────────────────────────────────────────────────────────
export default function Certificates() {
  const { lang, t } = useLang();

  return (
    <section id="certificates" className="relative py-28" style={{ backgroundColor: "#080E1C" }}>
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
        <SectionHeader
          index="04"
          kicker="Credentials"
          title={t("Certifications, training & awards", "자격 · 수료 · 수상")}
          description={t(
            `${certificates.length} certifications · ${activityCerts.length} training records · ${awards.length} awards`,
            `자격증 ${certificates.length}개 · 활동수료 ${activityCerts.length}개 · 수상 ${awards.length}건`,
          )}
        />

        {/* SECTION 1 — Certifications */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <h3 className="font-display font-bold text-xl text-[#F1F5F9] mb-6 flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-400" />
            {t("Certifications", "자격증")}
            <span className="text-blue-400 text-base font-normal">({certificates.length})</span>
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
              const typeBadge = TYPE_BADGE[cert.type];
              return (
                <motion.div
                  key={cert.id}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl cursor-default transition-colors duration-200"
                  style={{ background: "rgba(12,20,38,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                      style={{ background: style.bg, color: style.text }}
                    >
                      {lang === "en" ? style.labelEn : style.label}
                    </span>
                    {typeBadge && (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium"
                        style={{ background: "rgba(255,255,255,0.05)", color: "#475569" }}
                      >
                        {lang === "en" ? typeBadge.labelEn : typeBadge.label}
                      </span>
                    )}
                  </div>

                  <h4 className="text-[#F1F5F9] font-bold text-sm leading-snug mb-1 min-h-[2.5rem]">
                    {lang === "en" ? cert.nameEn : cert.name}
                  </h4>
                  <p className="text-[#64748B] text-[11px] mb-3 leading-relaxed">
                    {lang === "en" ? cert.issuerEn : cert.issuer}
                  </p>

                  <div className="flex items-center justify-end">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span className="text-[#475569] text-[10px] font-mono">{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* SECTION 2 — Activity & completion */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <h3 className="font-display font-bold text-xl text-[#F1F5F9] mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            {t("Activities & Training", "활동 수료 · 인증")}
            <span className="text-emerald-400 text-base font-normal">({activityCerts.length})</span>
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
              return (
                <motion.div
                  key={cert.id}
                  variants={scaleIn}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl cursor-default transition-colors duration-200"
                  style={{ background: "rgba(12,20,38,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${style.dot}50`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                      style={{ background: style.bg, color: style.text }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: style.dot }} />
                      {lang === "en" ? style.labelEn : style.label}
                    </span>
                  </div>

                  <h4 className="text-[#F1F5F9] font-bold text-sm leading-snug mb-1">
                    {lang === "en" ? cert.nameEn : cert.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-3 leading-relaxed">
                    {lang === "en" ? cert.issuerEn : cert.issuer}
                  </p>

                  <div className="space-y-1">
                    {cert.period && (
                      <p className="font-mono text-[10px] text-[#334155]">
                        {t("Period", "활동기간")}: {cert.period}
                      </p>
                    )}
                    <div className="flex items-center justify-end">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span className="text-[#475569] text-[10px] font-mono">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* SECTION 3 — Awards */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3 className="font-display font-bold text-xl text-[#F1F5F9] mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            {t("Honors & Awards", "수상 이력")}
            <span className="text-amber-400 text-base font-normal">({awards.length})</span>
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
                style={{ background: "rgba(12,20,38,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,158,11,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 text-lg"
                    style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}
                  >
                    {AWARD_EMOJI[i] ?? "🏅"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F1F5F9] font-bold text-sm leading-snug mb-2">
                      {lang === "en" ? award.titleEn : award.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                        style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#FCD34D" }}
                      >
                        {lang === "en" ? award.rankEn : award.rank}
                      </span>
                      {(lang === "en" ? award.prizeEn : award.prize) && (
                        <span
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#6EE7B7" }}
                        >
                          {lang === "en" ? award.prizeEn : award.prize}
                        </span>
                      )}
                    </div>
                    <p className="text-[#64748B] text-xs mb-1 leading-relaxed">
                      {lang === "en" ? award.competitionEn : award.competition}
                    </p>
                    {(lang === "en" ? award.paperEn : award.paper) && (
                      <p className="text-[#475569] text-[11px]">
                        <span className="text-[#334155]">{t("Work: ", "논문/작품: ")}</span>
                        {lang === "en" ? award.paperEn : award.paper}
                      </p>
                    )}
                  </div>

                  <span className="font-mono text-[#334155] text-xs shrink-0">{award.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
