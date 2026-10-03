"use client";

/**
 * Projects — a catalogue of built work, read as an index rather than a stack.
 *
 * Earlier this section rendered eight tall cards, six of which spanned two
 * columns, so reaching the end took most of a screen each. One compact row per
 * project keeps the whole catalogue in about a screen and a half, and lines the
 * headline figures up in a column the eye can run down. Detail stays in the modal.
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, CATEGORY_META, type Project } from "@/data/projects";
import { ProjectRow } from "./ProjectRow";
import { ProjectModal } from "./ProjectModal";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

type FilterKey = "all" | Project["category"];

const FILTERS: FilterKey[] = ["all", "ML", "development", "data", "research"];

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
      <section
        id="projects"
        className="section-pad band-top relative"
        style={{ background: "var(--paper)" }}
      >
        <div className="measure">
          <SectionHeader
            index="02"
            kicker="Projects"
            title={t("Selected projects", "주요 프로젝트")}
            description={t(
              "From climate-AI research to deployed platforms — crossing the line between research and engineering.",
              "기후 AI 연구부터 실제 배포 플랫폼까지 — 연구와 개발의 경계를 넘습니다.",
            )}
          />

          {/* ── Filter — text tabs on a rule, as a catalogue would index ── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="scroll-x -mb-px flex items-center gap-6"
            style={{ borderBottom: "1px solid var(--rule)" }}
            role="tablist"
            aria-label={t("Filter projects by category", "분야별 프로젝트 필터")}
          >
            {FILTERS.map((f) => {
              const meta = CATEGORY_META[f];
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(f)}
                  className="relative shrink-0 pb-2.5 text-[13px] font-medium transition-colors duration-150"
                  style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                >
                  {lang === "en" ? meta.labelEn : meta.label}
                  <span className="font-mono tabular ml-1.5 text-[10px]" style={{ color: "var(--faint)" }}>
                    {meta.count}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-underline"
                      className="absolute inset-x-0 -bottom-px h-0.5"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* ── Catalogue ──────────────────────────────────────── */}
          <motion.div layout style={{ borderBottom: "1px solid var(--rule)" }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectRow key={project.id} project={project} onClick={handleSelect} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center text-sm"
              style={{ color: "var(--muted)" }}
            >
              {t("No projects in this category.", "해당 분야의 프로젝트가 없습니다.")}
            </motion.p>
          )}
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={handleClose} />
    </>
  );
}
