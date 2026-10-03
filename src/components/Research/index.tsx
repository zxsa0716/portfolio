"use client";

/**
 * Research — the publication list, set as a bibliography rather than a card deck.
 *
 * Entries are numbered because a reference list is numbered, and grouped by
 * venue type because that is the distinction a reader is actually making:
 * a first-author SCIE article and a competition entry are not the same claim.
 */

import { motion } from "framer-motion";
import { Trophy, Award, ExternalLink, FileText } from "lucide-react";
import { publications, type Publication } from "@/data/research";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

/* Award marks: distinguished (top prize) vs placed. */
function awardToken(award: string) {
  const a = award.toLowerCase();
  if (award.includes("대상") || award.includes("최우수") || a.includes("grand") || a.includes("best"))
    return { token: "award", icon: <Trophy className="h-3 w-3" /> };
  if (award.includes("우수") || a.includes("excellence"))
    return { token: "award", icon: <Award className="h-3 w-3" /> };
  return { token: "accent", icon: <Award className="h-3 w-3" /> };
}

const GROUPS: { type: Publication["venueType"]; ko: string; en: string }[] = [
  { type: "journal",     ko: "학술지 논문",   en: "Journal article" },
  { type: "conference",  ko: "학술대회 발표", en: "Conference presentations" },
  { type: "competition", ko: "공모전",        en: "Competitions" },
  { type: "program",     ko: "지원 프로그램", en: "Programs" },
];

// ── One reference entry ───────────────────────────────────────────────────
function Entry({ pub, n }: { pub: Publication; n: number }) {
  const { lang, t } = useLang();
  const isJournal = pub.venueType === "journal";
  const award = lang === "en" ? pub.awardEn ?? pub.award : pub.award;
  const prize = lang === "en" ? pub.prizeAmountEn : pub.prizeAmount;
  const tags = lang === "en" ? pub.tagsEn ?? pub.tags : pub.tags;

  return (
    <motion.article
      variants={fadeInUp}
      className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-6"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      {/* Reference number */}
      <span
        className="font-mono tabular pt-0.5 text-[11px]"
        style={{ color: isJournal ? "var(--accent)" : "var(--faint)" }}
      >
        [{String(n).padStart(2, "0")}]
      </span>

      <div
        className="min-w-0"
        style={
          isJournal
            ? { borderLeft: "2px solid var(--accent)", paddingLeft: "1rem", marginLeft: "-0.25rem" }
            : undefined
        }
      >
        {/* Title */}
        <h3
          className="font-serif"
          style={{ fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1.32, color: "var(--ink)" }}
        >
          {lang === "en" ? pub.titleEn : pub.title}
        </h3>

        {/* Venue line — the citation itself */}
        <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: "var(--body)" }}>
          {lang === "en" ? pub.venueEn : pub.venue}
        </p>

        {/* Role + date + honours */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="font-mono tabular text-[11px]" style={{ color: "var(--faint)" }}>
            {pub.date}
          </span>
          <span className="text-[11.5px]" style={{ color: "var(--muted)" }}>
            {lang === "en" ? pub.roleEn : pub.role}
          </span>
          {award && (() => {
            const s = awardToken(award);
            return (
              <span
                className="chip"
                style={{
                  background: `var(--${s.token}-soft)`,
                  borderColor: `var(--${s.token}-line)`,
                  color: `var(--${s.token})`,
                }}
              >
                {s.icon}
                {award}
              </span>
            );
          })()}
          {prize && <span className="chip chip-live">{prize}</span>}
        </div>

        {/* Figures — inline, so the entry stays one block */}
        {pub.metrics && pub.metrics.length > 0 && (
          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            {pub.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1.5">
                <dt className="label" style={{ fontSize: "0.5625rem" }}>
                  {lang === "en" ? m.labelEn : m.label}
                </dt>
                <dd
                  className="tabular text-[12.5px]"
                  style={{ color: m.highlight ? "var(--accent)" : "var(--ink)", fontWeight: m.highlight ? 600 : 500 }}
                >
                  {lang === "en" ? m.valueEn ?? m.value : m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Keywords + links */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="font-mono text-[10.5px] leading-relaxed" style={{ color: "var(--faint)" }}>
            {tags.join("  ·  ")}
          </p>

          {(pub.doi || pub.paper || pub.video) && (
            <div className="flex shrink-0 flex-wrap items-center gap-x-3.5 gap-y-1.5">
              {pub.doi && (
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--doi)" }}
                >
                  <ExternalLink className="h-3 w-3" />
                  {t("DOI", "DOI")}
                </a>
              )}
              {pub.paper && (
                <a
                  href={pub.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  <FileText className="h-3 w-3" />
                  {t("Paper / Slides", "논문 · 발표자료")}
                </a>
              )}
              {pub.video && (
                <a
                  href={pub.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--live)" }}
                >
                  <ExternalLink className="h-3 w-3" />
                  {t("Demo video", "시연 영상")}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Research() {
  const { t } = useLang();
  const awardCount   = publications.filter((p) => p.award).length;
  const journalCount = publications.filter((p) => p.venueType === "journal").length;

  // Continuous numbering across groups, so [01]…[14] reads as one list.
  let n = 0;

  return (
    <section id="research" className="section-pad band-top" style={{ background: "var(--surface-sunk)" }}>
      <div className="measure">
        <SectionHeader
          index="01"
          kicker="Publications & Research"
          title={t("Publications, talks & awards", "논문 · 발표 · 수상")}
          description={t(
            `${journalCount} first-author SCIE article · ${publications.length} works · ${awardCount} awards — from the lab bench to the conference stage.`,
            `SCIE 저널 논문 ${journalCount}편 · 총 ${publications.length}건 · 수상 ${awardCount}건 — 연구실에서 학술 무대까지.`,
          )}
        />

        {/* Figures that frame the list */}
        <motion.dl
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 grid grid-cols-3"
          style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}
        >
          {[
            { label: t("Journal impact factor", "저널 IF"), value: "6.9" },
            { label: t("Awards", "수상"),                    value: String(awardCount) },
            { label: t("Best R²", "최고 R²"),                value: "0.9681" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="py-4"
              style={{
                borderLeft: i === 0 ? "none" : "1px solid var(--rule)",
                paddingLeft: i === 0 ? 0 : "1.25rem",
              }}
            >
              <dd
                className="font-serif tabular"
                style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.1 }}
              >
                {s.value}
              </dd>
              <dt className="label mt-1">{s.label}</dt>
            </div>
          ))}
        </motion.dl>

        {/* Grouped reference list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {GROUPS.map((g) => {
            const items = publications.filter((p) => p.venueType === g.type);
            if (items.length === 0) return null;
            return (
              <section key={g.type} className="mb-10 last:mb-0">
                <h3 className="label mb-1 flex items-baseline gap-2">
                  {t(g.en, g.ko)}
                  <span className="tabular" style={{ color: "var(--faint)" }}>
                    {items.length}
                  </span>
                </h3>
                <div style={{ borderBottom: "1px solid var(--rule)" }}>
                  {items.map((pub) => {
                    n += 1;
                    return <Entry key={pub.id} pub={pub} n={n} />;
                  })}
                </div>
              </section>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
