"use client";

/**
 * Projects — Filterable grid with glassmorphism cards and animated modal.
 *
 * Filter tabs: 전체 / AI·ML / 웹 개발 / 데이터 분석
 * Featured projects span 2 columns in "all" view.
 * Smooth Framer Motion layout animations on filter switch.
 * Project modal with full detail on card click.
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, CATEGORY_META, type Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

type FilterKey = "all" | Project["category"];

const FILTERS: FilterKey[] = ["all", "ML", "development", "data"];

export default function Projects() {
  const { lang, t } = useLang();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleSelect = useCallback((p: Project) => setSelectedProject(p), []);
  const handleClose  = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      {/* ══════════════════════════════════════════════
          SECTION
          ══════════════════════════════════════════════ */}
      <section
        id="projects"
        className="relative py-28"
        style={{ backgroundColor: "#080E1C" }}
      >
        {/* Faint grid background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* ── Section header ─────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="section-label mb-3">
              Projects
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-none text-[#F1F5F9] mb-4"
            >
              {t("Selected Projects", "주요 프로젝트")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#64748B] max-w-xl mx-auto text-base">
              {t(
                "From climate-AI research to deployed platforms — crossing the line between research and engineering.",
                "기후 AI 연구부터 실제 배포 플랫폼까지 — 연구와 개발의 경계를 넘습니다.",
              )}
            </motion.p>
          </motion.div>

          {/* ── Filter tabs ────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {FILTERS.map((f) => {
              const meta = CATEGORY_META[f];
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500/50"
                      : "border border-white/12 text-[#64748B] hover:text-[#F1F5F9] hover:border-white/25 bg-transparent",
                  )}
                >
                  {lang === "en" ? meta.labelEn : meta.label}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none",
                      isActive ? "bg-white/20 text-white" : "bg-white/8 text-[#475569]",
                    )}
                  >
                    {meta.count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Project grid ───────────────────────── */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  wide={project.featured && activeFilter === "all"}
                  onClick={handleSelect}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Empty state ────────────────────────── */}
          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[#475569] py-16"
            >
              {t("No projects in this category.", "해당 카테고리의 프로젝트가 없습니다.")}
            </motion.p>
          )}

          {/* ── Stats footer ───────────────────────── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "IF 6.9",  label: t("Journal paper", "저널 논문"),  sub: t("Urban Climate · 1st author", "Urban Climate 1저자") },
              { value: "3",       label: t("Award-winning", "수상 프로젝트"), sub: t("Best · Excellence · Prize", "최우수·우수·입상") },
              { value: "R²=0.97", label: t("Best model perf.", "최고 모델 성능"), sub: t("GAT-based XAI", "GAT 기반 XAI") },
              { value: "₩2.5M",   label: t("Contest prize", "공모전 수상금"),  sub: t("Env. Data Contest", "환경데이터공모전") },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-4 rounded-2xl text-center"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span className="font-display font-bold text-xl text-blue-400 mb-0.5">
                  {stat.value}
                </span>
                <span className="text-xs text-[#F1F5F9] font-medium">{stat.label}</span>
                <span className="text-[10px] text-[#334155] mt-0.5">{stat.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Project detail modal ─────────────────── */}
      <ProjectModal project={selectedProject} onClose={handleClose} />
    </>
  );
}
