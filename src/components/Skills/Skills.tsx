"use client";

/**
 * Skills — Hexagonal skill grid grouped by cluster.
 * Expert (≥85) = large bright hex | Advanced (70-84) = medium | Intermediate (<70) = small dim.
 * Research grants table below.
 */

import { motion } from "framer-motion";
import {
  skillClusters,
  researchProjects,
  type SkillCluster,
  type SkillNode,
} from "@/data/skills";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

// ── Hexagon clip-path (pointy-top orientation) ──────────────────────────
const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// ── Tier-based sizing ────────────────────────────────────────────────────
const TIER = {
  expert:       { w: 66, ratio: 1.155, fontSize: 9.5,  textAlpha: 1.00, bgAlpha: 0.30 },
  advanced:     { w: 54, ratio: 1.155, fontSize: 8.0,  textAlpha: 0.85, bgAlpha: 0.17 },
  intermediate: { w: 44, ratio: 1.155, fontSize: 7.0,  textAlpha: 0.60, bgAlpha: 0.09 },
} as const;

// ── Single hexagon chip ──────────────────────────────────────────────────
function HexNode({
  skill,
  cluster,
}: {
  skill: SkillNode;
  cluster: SkillCluster;
}) {
  const t = TIER[skill.tier];
  const h = Math.round(t.w * t.ratio);

  return (
    <div
      title={skill.name}
      className="relative flex items-center justify-center cursor-default transition-transform duration-200 hover:scale-110 select-none"
      style={{
        width:    t.w,
        height:   h,
        clipPath: HEX_CLIP,
        background: `rgba(${cluster.rawRgb}, ${t.bgAlpha})`,
      }}
    >
      <span
        className="relative z-10 font-bold text-center leading-tight"
        style={{
          fontSize:   t.fontSize,
          color:      `rgba(255,255,255,${t.textAlpha})`,
          padding:    "0 6px",
          textShadow:
            skill.tier === "expert"
              ? `0 0 10px ${cluster.glowColor}`
              : "none",
        }}
      >
        {skill.short}
      </span>
    </div>
  );
}

// ── Cluster card ─────────────────────────────────────────────────────────
function ClusterCard({ cluster }: { cluster: SkillCluster }) {
  const tierCounts = {
    expert:       cluster.skills.filter((s) => s.tier === "expert").length,
    advanced:     cluster.skills.filter((s) => s.tier === "advanced").length,
    intermediate: cluster.skills.filter((s) => s.tier === "intermediate").length,
  };

  const tierLabel = {
    expert:       "전문",
    advanced:     "숙련",
    intermediate: "기본",
  };

  const tierAlpha = {
    expert:       1.0,
    advanced:     0.65,
    intermediate: 0.4,
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col rounded-2xl p-5"
      style={{
        background:   "rgba(12,20,38,0.85)",
        border:       `1px solid rgba(${cluster.rawRgb},0.22)`,
      }}
    >
      {/* Header */}
      <div className="mb-5">
        <p className={`text-xs font-semibold uppercase tracking-widest ${cluster.textColor} mb-0.5`}>
          {cluster.label}
        </p>
        <p className="text-[10px] text-[#334155]">{cluster.labelEn}</p>
      </div>

      {/* Hex nodes */}
      <div className="flex flex-wrap gap-2 justify-center items-center flex-1 min-h-[128px]">
        {cluster.skills.map((skill) => (
          <HexNode key={skill.name} skill={skill} cluster={cluster} />
        ))}
      </div>

      {/* Tier legend */}
      <div className="mt-5 flex items-center gap-3 justify-center border-t pt-3"
           style={{ borderColor: `rgba(${cluster.rawRgb},0.12)` }}>
        {(["expert", "advanced", "intermediate"] as const).map((tier) => {
          const count = tierCounts[tier];
          if (count === 0) return null;
          return (
            <span
              key={tier}
              className="text-[9px] font-mono tabular-nums"
              style={{ color: `rgba(${cluster.rawRgb},${tierAlpha[tier]})` }}
            >
              {tierLabel[tier]} {count}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28"
      style={{ backgroundColor: "#080E1C" }}
    >
      {/* Faint dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ── Section header ───────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="section-label mb-3">
            Skills
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-none text-[#F1F5F9] mb-4"
          >
            기술 스택
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[#64748B] max-w-xl mx-auto text-base"
          >
            그래프 신경망부터 기후과학까지 — 크기·명도로 숙련도를 표현합니다.
          </motion.p>

          {/* Tier legend (global) */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 inline-flex items-center gap-6 px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[
              { label: "전문 (≥85)", w: 22, alpha: 0.9 },
              { label: "숙련 (70–84)", w: 18, alpha: 0.6 },
              { label: "기본 (<70)", w: 15, alpha: 0.35 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  style={{
                    width: item.w,
                    height: Math.round(item.w * 1.155),
                    clipPath: HEX_CLIP,
                    background: `rgba(100,116,139,${item.alpha * 0.5})`,
                  }}
                />
                <span className="text-[10px] text-[#475569]">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Hex skill grid ───────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-20"
        >
          {skillClusters.map((cluster) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </motion.div>

        {/* ── Research grants table ────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3 className="font-display font-bold text-xl text-[#F1F5F9] mb-6 text-center">
            참여 연구과제{" "}
            <span className="text-blue-400 text-base font-normal">
              ({researchProjects.length}건)
            </span>
          </h3>
          <div
            className="overflow-x-auto rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th className="text-left text-[#475569] font-medium px-6 py-4 text-xs uppercase tracking-wider">
                    과제명
                  </th>
                  <th className="text-left text-[#475569] font-medium px-6 py-4 text-xs uppercase tracking-wider hidden md:table-cell">
                    재원 / 주관
                  </th>
                  <th className="text-left text-[#475569] font-medium px-6 py-4 text-xs uppercase tracking-wider hidden lg:table-cell">
                    기간
                  </th>
                  <th className="text-left text-[#475569] font-medium px-6 py-4 text-xs uppercase tracking-wider">
                    역할
                  </th>
                </tr>
              </thead>
              <tbody>
                {researchProjects.map((rp, i) => (
                  <tr
                    key={rp.id}
                    className="transition-colors hover:bg-white/[0.03]"
                    style={{
                      borderBottom:
                        i < researchProjects.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                    }}
                  >
                    <td className="px-6 py-4 text-[#94A3B8] text-sm leading-snug">
                      <span className="text-[#F1F5F9] font-medium">{rp.title}</span>
                      {rp.code !== "—" && (
                        <span className="block mt-0.5 font-mono text-[10px] text-[#334155]">
                          {rp.code}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#64748B] text-xs hidden md:table-cell leading-relaxed">
                      {rp.funder}
                    </td>
                    <td className="px-6 py-4 text-[#475569] text-xs hidden lg:table-cell font-mono">
                      {rp.period}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded-md text-xs font-medium"
                        style={{
                          background: "rgba(59,130,246,0.12)",
                          border: "1px solid rgba(59,130,246,0.25)",
                          color: "#93C5FD",
                        }}
                      >
                        {rp.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
