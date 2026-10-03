"use client";

/**
 * Skills — a tag table grouped by cluster, then the funded-project ledger.
 *
 * On paper, proficiency reads as weight rather than brightness: an expert tag
 * is filled and set in its cluster's colour, an advanced one is plain ink, a
 * basic one is outlined and grey.
 */

import { motion } from "framer-motion";
import {
  skillClusters,
  researchProjects,
  type SkillCluster,
  type SkillNode,
} from "@/data/skills";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

// ── Single skill tag ──────────────────────────────────────────────────────
function SkillTag({ skill, cluster, isEn }: { skill: SkillNode; cluster: SkillCluster; isEn: boolean }) {
  const tk = cluster.token;

  const style =
    skill.tier === "expert"
      ? {
          background: `var(--${tk}-soft)`,
          border: `1px solid var(--${tk}-line)`,
          color: `var(--${tk})`,
          fontWeight: 600,
        }
      : skill.tier === "advanced"
        ? {
            background: "var(--surface)",
            border: "1px solid var(--rule)",
            color: "var(--ink)",
            fontWeight: 500,
          }
        : {
            background: "transparent",
            border: "1px solid var(--rule)",
            color: "var(--muted)",
            fontWeight: 400,
          };

  return (
    <span
      className="inline-block px-2 py-1 font-mono text-[11px] leading-none"
      style={{ ...style, borderRadius: 3 }}
    >
      {isEn ? skill.nameEn : skill.name}
    </span>
  );
}

// ── Cluster row ───────────────────────────────────────────────────────────
function ClusterRow({ cluster, isEn }: { cluster: SkillCluster; isEn: boolean }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col gap-3 py-5 sm:flex-row sm:gap-8"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="shrink-0 pt-0.5 sm:w-44">
        <p className="text-[12px] font-semibold" style={{ color: `var(--${cluster.token})` }}>
          {isEn ? cluster.labelEn : cluster.label}
        </p>
        {!isEn && (
          <p className="label mt-1">{cluster.labelEn}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {cluster.skills.map((skill) => (
          <SkillTag key={skill.name} skill={skill} cluster={cluster} isEn={isEn} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Skills() {
  const { lang, t } = useLang();

  return (
    <section id="skills" className="section-pad band-top" style={{ background: "var(--surface-sunk)" }}>
      <div className="measure">
        <SectionHeader
          index="03"
          kicker="Skills & Methods"
          title={t("Technical skills", "기술 스택")}
          description={
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
              {t("Tag weight indicates proficiency —", "태그 농도로 숙련도를 표현합니다 —")}
              <span className="chip chip-accent">{t("expert", "전문")}</span>
              <span className="chip">{t("advanced", "숙련")}</span>
              <span
                className="chip"
                style={{ background: "transparent", color: "var(--muted)" }}
              >
                {t("basic", "기본")}
              </span>
            </span>
          }
        />

        {/* Tag table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          className="mb-20"
          style={{ borderBottom: "1px solid var(--rule)" }}
        >
          {skillClusters.map((cluster) => (
            <ClusterRow key={cluster.id} cluster={cluster} isEn={lang === "en"} />
          ))}
        </motion.div>

        {/* Funded-project ledger */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              className="font-serif"
              style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--ink)" }}
            >
              {t("Funded research projects", "참여 연구과제")}
            </h3>
            <span className="font-mono tabular text-[13px]" style={{ color: "var(--accent)" }}>
              {researchProjects.length}
            </span>
            <span className="label">{t("10 R&D · 4 commissioned", "R&D 10건 · 학술용역 4건")}</span>
          </div>

          <div className="scroll-x" style={{ borderTop: "1px solid var(--rule-strong)" }}>
            <table className="w-full" style={{ minWidth: 640, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--rule)" }}>
                  <th className="label px-0 py-2.5 pr-4 text-left">{t("Project", "과제명")}</th>
                  <th className="label hidden px-4 py-2.5 text-left md:table-cell">{t("Funder", "재원 · 주관")}</th>
                  <th className="label hidden px-4 py-2.5 text-left lg:table-cell">{t("Period", "기간")}</th>
                  <th className="label px-4 py-2.5 pr-0 text-right">{t("Role", "역할")}</th>
                </tr>
              </thead>
              <tbody>
                {researchProjects.map((rp) => {
                  const isPI = rp.roleEn === "Principal Investigator";
                  return (
                    <tr key={rp.id} style={{ borderBottom: "1px solid var(--rule-faint)" }}>
                      <td className="py-3.5 pr-4 align-top text-[13px] leading-snug">
                        <span
                          className="mr-2 inline-block px-1.5 py-0.5 align-middle font-mono text-[9px] font-semibold uppercase tracking-wider"
                          style={{
                            borderRadius: 2,
                            background: rp.kind === "rnd" ? "var(--accent-soft)" : "var(--code-soft)",
                            color: rp.kind === "rnd" ? "var(--accent)" : "var(--code)",
                          }}
                        >
                          {rp.kind === "rnd" ? "R&D" : t("Commissioned", "용역")}
                        </span>
                        <span style={{ color: "var(--ink)" }}>
                          {lang === "en" ? rp.titleEn : rp.title}
                        </span>
                        {rp.link && (
                          <a
                            href={rp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center gap-0.5 align-middle text-[10.5px] font-medium"
                            style={{ color: "var(--award)" }}
                          >
                            ↗ {t("Proposal", "연구계획서")}
                          </a>
                        )}
                      </td>
                      <td
                        className="hidden px-4 py-3.5 align-top text-[12px] leading-relaxed md:table-cell"
                        style={{ color: "var(--muted)" }}
                      >
                        {lang === "en" ? rp.funderEn : rp.funder}
                      </td>
                      <td
                        className="tabular hidden px-4 py-3.5 align-top font-mono text-[11px] whitespace-nowrap lg:table-cell"
                        style={{ color: "var(--faint)" }}
                      >
                        {rp.period}
                      </td>
                      <td className="px-4 py-3.5 pr-0 text-right align-top">
                        <span
                          className="chip whitespace-nowrap"
                          style={
                            isPI
                              ? { background: "var(--award-soft)", borderColor: "var(--award-line)", color: "var(--award)", fontWeight: 600 }
                              : undefined
                          }
                        >
                          {lang === "en" ? rp.roleEn : rp.role}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
