"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, FileText, Play, Trophy, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const CAT_LABEL: Record<Project["category"], string> = {
  ML:          "AI · ML",
  research:    "연구 · 논문",
  development: "웹 개발",
  data:        "데이터 분석",
};

const CAT_ACCENT: Record<Project["category"], string> = {
  ML:          "text-blue-400",
  research:    "text-amber-400",
  development: "text-emerald-400",
  data:        "text-cyan-400",
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ─────────────────────────────── */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* ── Modal panel ──────────────────────────── */}
          <motion.div
            key={`modal-${project.id}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/12 bg-[#0C1426] shadow-[0_32px_80px_rgba(0,0,0,0.7)] pointer-events-auto"
              initial={{ scale: 0.92, y: 32, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Gradient header ──────────────────── */}
              <div
                className="relative h-40 flex-shrink-0 rounded-t-2xl overflow-hidden"
                style={{ background: project.thumbnail }}
              >
                {/* Scan-line texture */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,rgba(0,0,0,0.08)_50%,transparent_51%)] bg-[length:100%_4px]" />
                {/* Bottom fade to card bg */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0C1426] to-transparent" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Award badge */}
                {project.award && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <Trophy className="w-3.5 h-3.5" />
                    {project.award}
                  </span>
                )}
              </div>

              {/* ── Content ──────────────────────────── */}
              <div className="px-6 pb-8 -mt-4">
                {/* Category + year */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={cn("text-xs font-semibold uppercase tracking-widest", CAT_ACCENT[project.category])}>
                    {CAT_LABEL[project.category]}
                  </span>
                  <span className="text-[#334155] text-xs font-mono">{project.year}</span>
                </div>

                {/* Title */}
                <h2 className="font-display font-bold text-2xl text-[#F1F5F9] leading-snug mb-1">
                  {project.title}
                </h2>
                <p className="text-[#475569] text-xs font-mono mb-5">{project.subtitle}</p>

                {/* Long description */}
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  {project.longDescription}
                </p>

                {/* Metrics grid */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#475569] mb-3">
                    핵심 지표
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className={cn(
                          "flex flex-col gap-0.5 px-3 py-2.5 rounded-xl",
                          m.highlight
                            ? "bg-blue-500/12 border border-blue-500/20"
                            : "bg-white/4 border border-white/8",
                        )}
                      >
                        <span className="text-[#475569] text-[10px]">{m.label}</span>
                        <span className={cn(
                          "font-display font-bold text-base leading-tight",
                          m.highlight ? "text-blue-400" : "text-[#F1F5F9]",
                        )}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full tech stack */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#475569] mb-3">
                    기술 스택
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#111D36] border border-white/10 text-[#94A3B8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(project.links.demo || project.links.paper || project.links.video || project.links.github) && (
                  <div className="flex flex-wrap gap-3">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-sm font-medium hover:bg-emerald-500/25 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live 데모
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    )}
                    {project.links.paper && (
                      <a
                        href={project.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-sm font-medium hover:bg-blue-500/25 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        논문 / 발표
                      </a>
                    )}
                    {project.links.video && (
                      <a
                        href={project.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-sm font-medium hover:bg-amber-500/25 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        시연 영상
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 border border-white/12 text-[#94A3B8] text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
