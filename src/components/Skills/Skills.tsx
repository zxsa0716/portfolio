"use client";

/**
 * Skills — Clean tag-table layout grouped by cluster.
 * Each cluster is a row: label (left) + skill tags (right).
 * Tag opacity/weight indicates tier: expert > advanced > intermediate.
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

// ── Single skill tag ──────────────────────────────────────────────────────
function SkillTag({ skill, cluster }: { skill: SkillNode; cluster: SkillCluster }) {
  const bgAlpha   = skill.tier === "expert" ? 0.18 : skill.tier === "advanced" ? 0.10 : 0.05;
  const bdrAlpha  = skill.tier === "expert" ? 0.40 : skill.tier === "advanced" ? 0.22 : 0.12;
  const textAlpha = skill.tier === "expert" ? 1.00 : skill.tier === "advanced" ? 0.72 : 0.45;

  return (
    <span
      className="inline-block px-2.5 py-1 text-xs font-mono rounded leading-none"
      style={{
        background: `rgba(${cluster.rawRgb}, ${bgAlpha})`,
        border:     `1px solid rgba(${cluster.rawRgb}, ${bdrAlpha})`,
        color:      `rgba(255,255,255,${textAlpha})`,
      }}
    >
      {skill.name}
    </span>
  );
}

// ── Cluster row ───────────────────────────────────────────────────────────
function ClusterRow({ cluster, isEn }: { cluster: SkillCluster; isEn: boolean }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-5 border-b last:border-0"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Left: cluster label */}
      <div className="sm:w-40 shrink-0 pt-0.5">
        <p className={`text-xs font-semibold uppercase tracking-widest ${cluster.textColor}`}>
          {isEn ? cluster.labelEn : cluster.label}
        </p>
        <p className="text-[10px] mt-1" style={{ color: "#334155" }}>
          {isEn ? cluster.label : cluster.labelEn}
        </p>
      </div>

      {/* Right: skill tags */}
      <div className="flex flex-wrap gap-2">
        {cluster.skills.map((skill) => (
          <SkillTag key={skill.name} skill={skill} cluster={cluster} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Skills() {
  const { lang, t } = useLang();
  return (
    <section
      id="skills"
      className="relative py-28"
      style={{ backgroundColor: "#080E1C" }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#3B82F6" }}>
            Skills
          </p>
          <h2
            className="font-bold tracking-tight text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            {t("Technical Skills", "기술 스택")}
          </h2>
          <p className="text-sm" style={{ color: "#475569" }}>
            {t("Tag brightness indicates proficiency —", "태그 밝기로 숙련도를 표현합니다 —")}&nbsp;
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{t("expert", "전문")}</span>
            &nbsp;/&nbsp;
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{t("advanced", "숙련")}</span>
            &nbsp;/&nbsp;
            <span style={{ color: "rgba(255,255,255,0.32)" }}>{t("basic", "기본")}</span>
          </p>
        </motion.div>

        {/* Tag table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="mb-20 rounded-xl px-6 py-2"
          style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
        >
          {skillClusters.map((cluster) => (
            <ClusterRow key={cluster.id} cluster={cluster} isEn={lang === "en"} />
          ))}
        </motion.div>

        {/* Research grants table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3
            className="font-bold text-white mb-6"
            style={{ fontSize: "1.125rem" }}
          >
            {t("Funded Research Projects", "참여 연구과제")}{" "}
            <span className="font-normal text-sm" style={{ color: "#3B82F6" }}>
              ({researchProjects.length}
              {t("", "건")})
            </span>
            <span className="block sm:inline sm:ml-3 font-normal text-xs mt-1 sm:mt-0" style={{ color: "#475569" }}>
              {t("10 R&D · 4 commissioned", "R&D 10건 · 학술용역 4건")}
            </span>
          </h3>
          <div
            className="overflow-x-auto rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider" style={{ color: "#475569" }}>
                    {t("Project", "과제명")}
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider hidden md:table-cell" style={{ color: "#475569" }}>
                    {t("Funder", "재원 / 주관")}
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider hidden lg:table-cell" style={{ color: "#475569" }}>
                    {t("Period", "기간")}
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider" style={{ color: "#475569" }}>
                    {t("Role", "역할")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {researchProjects.map((rp, i) => {
                  const isPI = rp.roleEn === "Principal Investigator";
                  return (
                    <tr
                      key={rp.id}
                      style={{
                        borderBottom:
                          i < researchProjects.length - 1
                            ? "1px solid rgba(255,255,255,0.04)"
                            : "none",
                      }}
                    >
                      <td className="px-6 py-4 text-sm leading-snug">
                        <span
                          className="inline-block mr-2 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider align-middle"
                          style={{
                            background: rp.kind === "rnd" ? "rgba(59,130,246,0.10)" : "rgba(139,92,246,0.10)",
                            color: rp.kind === "rnd" ? "#60A5FA" : "#A78BFA",
                          }}
                        >
                          {rp.kind === "rnd" ? "R&D" : t("Commissioned", "용역")}
                        </span>
                        <span style={{ color: "#CBD5E1" }}>
                          {lang === "en" ? rp.titleEn : rp.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs hidden md:table-cell leading-relaxed" style={{ color: "#475569" }}>
                        {lang === "en" ? rp.funderEn : rp.funder}
                      </td>
                      <td className="px-6 py-4 text-xs hidden lg:table-cell font-mono" style={{ color: "#334155" }}>
                        {rp.period}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                          style={{
                            background: isPI ? "rgba(245,158,11,0.12)" : "rgba(59,130,246,0.10)",
                            border: isPI ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(59,130,246,0.22)",
                            color: isPI ? "#FCD34D" : "#93C5FD",
                          }}
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
