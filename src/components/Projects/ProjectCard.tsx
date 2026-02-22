"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, FileText, Play, Trophy, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/* ── Category color map ─────────────────────────────────
   No purple/pink per design system. Blue + Emerald only.
   ────────────────────────────────────────────────────── */
const CAT_STYLE: Record<Project["category"], { bg: string; text: string; dot: string }> = {
  ML:          { bg: "bg-blue-500/12  border border-blue-500/25",  text: "text-blue-400",    dot: "bg-blue-400" },
  research:    { bg: "bg-amber-500/12 border border-amber-500/25", text: "text-amber-400",   dot: "bg-amber-400" },
  development: { bg: "bg-emerald-500/12 border border-emerald-500/25", text: "text-emerald-400", dot: "bg-emerald-400" },
  data:        { bg: "bg-cyan-500/12  border border-cyan-500/25",  text: "text-cyan-400",    dot: "bg-cyan-400" },
};

const CAT_LABEL: Record<Project["category"], string> = {
  ML:          "AI · ML",
  research:    "연구 · 논문",
  development: "웹 개발",
  data:        "데이터 분석",
};

interface ProjectCardProps {
  project: Project;
  /** Whether this card spans 2 columns (featured layout) */
  wide?: boolean;
  onClick: (p: Project) => void;
}

export function ProjectCard({ project, wide = false, onClick }: ProjectCardProps) {
  const cat = CAT_STYLE[project.category];
  const hasDemo  = !!project.links.demo;
  const hasPaper = !!project.links.paper;
  const hasVideo = !!project.links.video;

  return (
    <motion.article
      layout
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(project)}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer",
        "border border-white/8 bg-[#0C1426]",
        "transition-shadow duration-300",
        "hover:border-blue-500/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(59,130,246,0.1)]",
        wide && "md:col-span-2",
      )}
    >
      {/* ── Thumbnail strip ──────────────────────────── */}
      <div
        className={cn(
          "w-full shrink-0 relative overflow-hidden",
          wide ? "h-44" : "h-28",
        )}
        style={{ background: project.thumbnail }}
      >
        {/* Scan-line shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(transparent_49%,rgba(255,255,255,0.04)_50%,transparent_51%)] bg-[length:100%_4px]" />
        {/* Corner glow */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:bg-blue-400/10 transition-colors duration-500" />

        {/* Award badge — top-left */}
        {project.award && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold leading-none">
            <Trophy className="w-3 h-3" />
            수상
          </span>
        )}

        {/* Year badge — top-right */}
        <span className="absolute top-3 right-3 font-mono text-[11px] text-white/40 bg-black/30 px-2 py-0.5 rounded">
          {project.year}
        </span>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category pill */}
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide", cat.bg, cat.text)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", cat.dot)} />
            {CAT_LABEL[project.category]}
          </span>
        </div>

        {/* Title + subtitle */}
        <div>
          <h3 className="font-display font-bold text-base leading-snug text-[#F1F5F9] group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-[#64748B] text-[11px] mt-0.5 font-mono leading-relaxed line-clamp-1">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-[#64748B] text-xs leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Metric badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.metrics.slice(0, wide ? 5 : 3).map((m) => (
            <span
              key={m.label}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium",
                m.highlight
                  ? "bg-blue-500/15 border border-blue-500/25 text-blue-300"
                  : "bg-white/5 border border-white/8 text-[#94A3B8]",
              )}
            >
              <span className="text-[#475569] text-[9px]">{m.label}</span>
              <span>{m.value}</span>
            </span>
          ))}
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, wide ? 6 : 4).map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[rgba(17,29,54,0.8)] border border-white/8 text-[#64748B]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > (wide ? 6 : 4) && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[rgba(17,29,54,0.8)] border border-white/8 text-[#475569]">
              +{project.tech.length - (wide ? 6 : 4)}
            </span>
          )}
        </div>

        {/* Footer: links + expand hint */}
        <div className="flex items-center justify-between pt-1 border-t border-white/6 mt-auto">
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {hasDemo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Live
              </a>
            )}
            {hasPaper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FileText className="w-3 h-3" />
                Paper
              </a>
            )}
            {hasVideo && (
              <a
                href={project.links.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Play className="w-3 h-3" />
                Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#64748B] hover:text-white transition-colors"
              >
                <Github className="w-3 h-3" />
                Code
              </a>
            )}
          </div>

          {/* Expand hint */}
          <span className="inline-flex items-center gap-1 text-[10px] text-[#334155] group-hover:text-blue-500 transition-colors duration-200">
            자세히
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
