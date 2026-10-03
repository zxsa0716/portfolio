"use client";

/**
 * Credentials — fellowships, certifications, training records and awards.
 *
 * Four registers of the same kind of claim, so they share one grammar:
 * a classification mark, the thing itself, who issued it, and when.
 */

import { motion } from "framer-motion";
import { Award, Medal, CheckCircle, GraduationCap, Trophy } from "lucide-react";
import { certificates, activityCerts, awards, scholarships } from "@/data/certificates";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

// ── Classification marks ──────────────────────────────────────────────────
const CAT_STYLE: Record<string, { label: string; labelEn: string; token: string }> = {
  data:        { label: "데이터", labelEn: "Data",        token: "data" },
  environment: { label: "환경",   labelEn: "Environment", token: "accent" },
  forest:      { label: "산림",   labelEn: "Forest",      token: "accent" },
  it:          { label: "IT",     labelEn: "IT",          token: "code" },
  history:     { label: "역사",   labelEn: "History",     token: "award" },
  drone:       { label: "드론",   labelEn: "Drone",       token: "data" },
};

const TYPE_BADGE: Record<string, { label: string; labelEn: string }> = {
  "national-tech":     { label: "국가기술", labelEn: "National" },
  "national-approved": { label: "국가공인", labelEn: "National" },
  "license":           { label: "면허",     labelEn: "License" },
  "international":     { label: "국제",     labelEn: "Int'l" },
};

const ACTIVITY_STYLE: Record<string, { label: string; labelEn: string; token: string }> = {
  climate:   { label: "기후",     labelEn: "Climate",   token: "data" },
  volunteer: { label: "봉사",     labelEn: "Volunteer", token: "accent" },
  community: { label: "커뮤니티", labelEn: "Community", token: "award" },
  education: { label: "교육",     labelEn: "Training",  token: "code" },
};

// ── Sub-heading shared by all four registers ──────────────────────────────
function Register({
  icon: Icon,
  title,
  count,
}: {
  icon: typeof Award;
  title: string;
  count: number;
}) {
  return (
    <h3 className="mb-5 flex items-baseline gap-2">
      <Icon className="h-4 w-4 translate-y-0.5" style={{ color: "var(--accent)" }} />
      <span className="font-serif" style={{ fontSize: "1.1875rem", fontWeight: 600, color: "var(--ink)" }}>
        {title}
      </span>
      <span className="font-mono tabular text-[13px]" style={{ color: "var(--accent)" }}>
        {count}
      </span>
    </h3>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Certificates() {
  const { lang, t } = useLang();

  return (
    <section id="certificates" className="section-pad band-top" style={{ background: "var(--paper)" }}>
      <div className="measure">
        <SectionHeader
          index="04"
          kicker="Credentials"
          title={t("Fellowships, certifications & awards", "장학 · 자격 · 수상")}
          description={t(
            `${scholarships.length} scholarships · ${certificates.length} certifications · ${activityCerts.length} training records · ${awards.length} awards`,
            `장학 ${scholarships.length}건 · 자격증 ${certificates.length}개 · 활동수료 ${activityCerts.length}개 · 수상 ${awards.length}건`,
          )}
        />

        {/* ── 1. Fellowships ──────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <Register icon={GraduationCap} title={t("Fellowships & scholarships", "장학")} count={scholarships.length} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{ borderTop: "1px solid var(--rule-strong)" }}
          >
            {scholarships.map((s) =>
              s.competitive ? (
                /* Nationally competitive research fellowship — given its own plate */
                <motion.div
                  key={s.id}
                  variants={fadeInUp}
                  className="corner-ticks my-5 p-6"
                  style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="label" style={{ color: "var(--accent)" }}>
                      {t("Competitive research fellowship", "연구장학 · 전국 선발")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-serif mb-2.5"
                        style={{ fontSize: "1.1875rem", fontWeight: 600, lineHeight: 1.3, color: "var(--ink)" }}
                      >
                        {lang === "en" ? s.titleEn : s.title}
                      </h4>

                      <div className="mb-3 flex flex-wrap gap-2">
                        {(lang === "en" ? s.amountEn : s.amount) && (
                          <span
                            className="chip"
                            style={{ background: "var(--paper)", borderColor: "var(--accent-line)", color: "var(--accent)", fontWeight: 600 }}
                          >
                            {lang === "en" ? s.amountEn : s.amount}
                          </span>
                        )}
                        <span
                          className="chip"
                          style={{ background: "var(--paper)", borderColor: "var(--award-line)", color: "var(--award)", fontWeight: 600 }}
                        >
                          {t("5 selected nationwide", "전국 5명 선발")}
                        </span>
                      </div>

                      <p className="mb-2 text-[12.5px] leading-relaxed" style={{ color: "var(--body)" }}>
                        {lang === "en" ? s.organizerEn : s.organizer}
                      </p>
                      {(lang === "en" ? s.noteEn : s.note) && (
                        <p className="measure-text text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                          {lang === "en" ? s.noteEn : s.note}
                        </p>
                      )}
                    </div>

                    <span className="font-mono tabular shrink-0 text-[11px]" style={{ color: "var(--muted)" }}>
                      {s.period}
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* University scholarships — compact rows */
                <motion.div
                  key={s.id}
                  variants={fadeInUp}
                  className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
                  style={{ borderBottom: "1px solid var(--rule-faint)" }}
                >
                  <span className="text-[13.5px] font-semibold" style={{ color: "var(--ink)" }}>
                    {lang === "en" ? s.titleEn : s.title}
                  </span>
                  <span className="text-[12px] sm:ml-auto" style={{ color: "var(--muted)" }}>
                    {lang === "en" ? s.organizerEn : s.organizer}
                  </span>
                  <span className="font-mono tabular shrink-0 text-[11px]" style={{ color: "var(--faint)" }}>
                    {s.period}
                  </span>
                </motion.div>
              ),
            )}
          </motion.div>
        </motion.div>

        {/* ── 2. Certifications ───────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <Register icon={Medal} title={t("Certifications", "자격증")} count={certificates.length} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid gap-x-8 sm:grid-cols-2"
            style={{ borderTop: "1px solid var(--rule-strong)" }}
          >
            {certificates.map((cert) => {
              const style = CAT_STYLE[cert.category] ?? CAT_STYLE.data;
              const typeBadge = TYPE_BADGE[cert.type];
              return (
                <motion.div
                  key={cert.id}
                  variants={fadeInUp}
                  className="flex items-start justify-between gap-4 py-3.5"
                  style={{ borderBottom: "1px solid var(--rule-faint)" }}
                >
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <span
                        className="chip"
                        style={{
                          background: `var(--${style.token}-soft)`,
                          borderColor: `var(--${style.token}-line)`,
                          color: `var(--${style.token})`,
                        }}
                      >
                        {lang === "en" ? style.labelEn : style.label}
                      </span>
                      {typeBadge && (
                        <span className="label">{lang === "en" ? typeBadge.labelEn : typeBadge.label}</span>
                      )}
                    </div>
                    <p className="text-[13.5px] font-semibold leading-snug" style={{ color: "var(--ink)" }}>
                      {lang === "en" ? cert.nameEn : cert.name}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      {lang === "en" ? cert.issuerEn : cert.issuer}
                    </p>
                  </div>
                  <span className="font-mono tabular shrink-0 pt-5 text-[11px]" style={{ color: "var(--faint)" }}>
                    {cert.date}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── 3. Activities & training ────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <Register icon={CheckCircle} title={t("Activities & training", "활동 수료 · 인증")} count={activityCerts.length} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid gap-x-8 sm:grid-cols-2"
            style={{ borderTop: "1px solid var(--rule-strong)" }}
          >
            {activityCerts.map((cert) => {
              const style = ACTIVITY_STYLE[cert.category] ?? ACTIVITY_STYLE.climate;
              return (
                <motion.div
                  key={cert.id}
                  variants={fadeInUp}
                  className="flex items-start justify-between gap-4 py-3.5"
                  style={{ borderBottom: "1px solid var(--rule-faint)" }}
                >
                  <div className="min-w-0">
                    <span
                      className="chip mb-1"
                      style={{
                        background: `var(--${style.token}-soft)`,
                        borderColor: `var(--${style.token}-line)`,
                        color: `var(--${style.token})`,
                      }}
                    >
                      {lang === "en" ? style.labelEn : style.label}
                    </span>
                    <p className="text-[13.5px] font-semibold leading-snug" style={{ color: "var(--ink)" }}>
                      {lang === "en" ? cert.nameEn : cert.name}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      {lang === "en" ? cert.issuerEn : cert.issuer}
                      {cert.period && (
                        <span className="font-mono" style={{ color: "var(--faint)" }}>
                          {" · "}
                          {cert.period}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="font-mono tabular shrink-0 pt-5 text-[11px]" style={{ color: "var(--faint)" }}>
                    {cert.date}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── 4. Honours & awards ─────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <Register icon={Award} title={t("Honours & awards", "수상 이력")} count={awards.length} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{ borderTop: "1px solid var(--rule-strong)" }}
          >
            {awards.map((award) => (
              <motion.div
                key={award.id}
                variants={fadeInUp}
                className="grid gap-x-6 gap-y-2 py-5 md:grid-cols-[1fr_auto]"
                style={{ borderBottom: "1px solid var(--rule-faint)" }}
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="chip chip-award">
                      <Trophy className="h-3 w-3" />
                      {lang === "en" ? award.rankEn : award.rank}
                    </span>
                    {(lang === "en" ? award.prizeEn : award.prize) && (
                      <span className="chip chip-live">{lang === "en" ? award.prizeEn : award.prize}</span>
                    )}
                  </div>

                  <h4
                    className="font-serif"
                    style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.35, color: "var(--ink)" }}
                  >
                    {lang === "en" ? award.titleEn : award.title}
                  </h4>

                  <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {lang === "en" ? award.competitionEn : award.competition}
                  </p>

                  {(lang === "en" ? award.paperEn : award.paper) && (
                    <p className="measure-text mt-1.5 text-[12px] leading-relaxed" style={{ color: "var(--body)" }}>
                      <span className="label mr-1">{t("Work", "수상작")}</span>
                      {lang === "en" ? award.paperEn : award.paper}
                    </p>
                  )}
                </div>

                <span className="font-mono tabular shrink-0 text-[11px] md:pt-1" style={{ color: "var(--faint)" }}>
                  {award.date}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
