"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, FileText, Play, Trophy, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";

/* Category marks. Each is a muted print colour, not a screen hue — the row
   is read as a catalogue entry, so the mark classifies rather than decorates. */
const CAT: Record<Project["category"], { token: string; ko: string; en: string }> = {
  ML:          { token: "accent", ko: "AI · ML",     en: "AI · ML" },
  research:    { token: "award",  ko: "연구 · 논문", en: "Research" },
  development: { token: "data",   ko: "웹 개발",     en: "Web Dev" },
  data:        { token: "live",   ko: "데이터 분석", en: "Data" },
};

interface ProjectRowProps {
  project: Project;
  onClick: (p: Project) => void;
}

export function ProjectRow({ project, onClick }: ProjectRowProps) {
  const { lang, t } = useLang();
  const cat = CAT[project.category];

  const links = [
    project.links.doi   && { href: project.links.doi,   icon: ExternalLink, label: "DOI",   token: "doi" },
    project.links.demo  && { href: project.links.demo,  icon: ExternalLink, label: t("Live", "데모"), token: "live" },
    project.links.paper && { href: project.links.paper, icon: FileText,     label: t("Paper", "자료"), token: "accent" },
    project.links.video && { href: project.links.video, icon: Play,         label: t("Video", "영상"), token: "award" },
    project.links.github&& { href: project.links.github,icon: Github,       label: "Code",  token: "muted" },
  ].filter(Boolean) as { href: string; icon: typeof Github; label: string; token: string }[];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
      className="group relative grid cursor-pointer gap-x-6 gap-y-3 py-6 md:grid-cols-[8.5rem_1fr_auto]"
      style={{ borderTop: "1px solid var(--rule)" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-sunk)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      {/* ── Column 1 — classification + year ─────────────────── */}
      <div className="flex items-start gap-2 md:flex-col md:gap-2">
        <span
          className="chip"
          style={{
            background: `var(--${cat.token}-soft)`,
            borderColor: `var(--${cat.token}-line)`,
            color: `var(--${cat.token})`,
          }}
        >
          {lang === "en" ? cat.en : cat.ko}
        </span>
        <span className="font-mono tabular text-[11px]" style={{ color: "var(--faint)" }}>
          {project.year}
        </span>
      </div>

      {/* ── Column 2 — the work itself ───────────────────────── */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h3
            className="font-serif transition-colors duration-150"
            style={{ fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1.3, color: "var(--ink)" }}
          >
            {lang === "en" ? project.titleEn : project.title}
          </h3>
          {project.award && (
            <span className="chip chip-award">
              <Trophy className="w-3 h-3" />
              {lang === "en" ? project.awardEn ?? project.award : project.award}
            </span>
          )}
        </div>

        <p className="font-mono mt-1 text-[11px]" style={{ color: "var(--faint)" }}>
          {project.subtitle}
        </p>

        <p
          className="measure-text mt-2 text-[13.5px] leading-relaxed"
          style={{ color: "var(--body)" }}
        >
          {lang === "en" ? project.descriptionEn : project.description}
        </p>

        {/* Tech — the materials the thing is made of */}
        <p className="font-mono mt-2.5 text-[10.5px] leading-relaxed" style={{ color: "var(--faint)" }}>
          {project.tech.slice(0, 6).join("  ·  ")}
          {project.tech.length > 6 && `  +${project.tech.length - 6}`}
        </p>
      </div>

      {/* ── Column 3 — figures and links ─────────────────────── */}
      <div className="flex flex-col gap-3 md:w-56 md:items-end">
        {/* Headline figures, right-aligned so they form a column down the page */}
        <dl className="flex flex-wrap gap-x-4 gap-y-1.5 md:flex-col md:items-end md:gap-1.5">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="flex items-baseline gap-1.5 md:flex-col md:items-end md:gap-0">
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

        {/* Links */}
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 md:justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium transition-opacity duration-150 hover:opacity-70"
              style={{ color: l.token === "muted" ? "var(--muted)" : `var(--${l.token})` }}
            >
              <l.icon className="w-3 h-3" />
              {l.label}
            </a>
          ))}
          <span
            className="inline-flex items-center gap-0.5 text-[10.5px] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            style={{ color: "var(--accent)" }}
          >
            {t("Details", "자세히")}
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
