"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, FileText, Play, Trophy, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";

const CAT: Record<Project["category"], { token: string; ko: string; en: string }> = {
  ML:          { token: "accent", ko: "AI · ML",     en: "AI · ML" },
  research:    { token: "award",  ko: "연구 · 논문", en: "Research" },
  development: { token: "data",   ko: "웹 개발",     en: "Web Dev" },
  data:        { token: "live",   ko: "데이터 분석", en: "Data" },
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang, t } = useLang();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open, and move focus into the panel
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const cat = project ? CAT[project.category] : null;

  const actions = project
    ? ([
        project.links.doi   && { href: project.links.doi,    icon: ExternalLink, label: t("View on DOI", "DOI 보기"),      token: "doi",    ext: true },
        project.links.demo  && { href: project.links.demo,   icon: ExternalLink, label: t("Live demo", "라이브 데모"),     token: "live",   ext: true },
        project.links.paper && { href: project.links.paper,  icon: FileText,     label: t("Paper / Slides", "논문 · 발표자료"), token: "accent", ext: false },
        project.links.video && { href: project.links.video,  icon: Play,         label: t("Demo video", "시연 영상"),      token: "award",  ext: false },
        project.links.github&& { href: project.links.github, icon: Github,       label: "GitHub",                          token: "muted",  ext: true },
      ].filter(Boolean) as { href: string; icon: typeof Github; label: string; token: string; ext: boolean }[])
    : [];

  return (
    <AnimatePresence>
      {project && cat && (
        <>
          {/* ── Backdrop ─────────────────────────────── */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            style={{ background: "var(--scrim)", backdropFilter: "blur(3px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* ── Panel ────────────────────────────────── */}
          <motion.div
            key={`modal-${project.id}`}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={lang === "en" ? project.titleEn : project.title}
              className="pointer-events-auto relative max-h-[88vh] w-full max-w-2xl overflow-y-auto outline-none"
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule-strong)",
                borderRadius: 5,
                boxShadow: "var(--lift-3)",
              }}
              initial={{ scale: 0.97, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 12, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Masthead */}
              <div
                className="sticky top-0 z-10 flex items-start justify-between gap-4 px-7 py-5"
                style={{ background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
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
                    {project.award && (
                      <span className="chip chip-award">
                        <Trophy className="h-3 w-3" />
                        {lang === "en" ? project.awardEn ?? project.award : project.award}
                      </span>
                    )}
                  </div>

                  <h2
                    className="font-serif"
                    style={{ fontSize: "1.4375rem", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}
                  >
                    {lang === "en" ? project.titleEn : project.title}
                  </h2>
                  <p className="font-mono mt-1 text-[11px]" style={{ color: "var(--faint)" }}>
                    {project.subtitle}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center transition-colors"
                  style={{ border: "1px solid var(--rule)", borderRadius: 3, color: "var(--muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--rule)"; }}
                  aria-label={t("Close", "닫기")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-7 pb-8 pt-6">
                {/* Abstract */}
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--body)" }}>
                  {lang === "en" ? project.longDescriptionEn : project.longDescription}
                </p>

                {/* Figures — a table, because they are measurements */}
                <h4 className="label mt-7 mb-3">{t("Key figures", "핵심 지표")}</h4>
                <div style={{ borderTop: "1px solid var(--rule)" }}>
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-baseline justify-between gap-4 py-2"
                      style={{ borderBottom: "1px solid var(--rule-faint)" }}
                    >
                      <span className="text-[12.5px]" style={{ color: "var(--muted)" }}>
                        {lang === "en" ? m.labelEn : m.label}
                      </span>
                      <span
                        className="tabular text-right text-[13px]"
                        style={{ color: m.highlight ? "var(--accent)" : "var(--ink)", fontWeight: m.highlight ? 600 : 500 }}
                      >
                        {lang === "en" ? m.valueEn ?? m.value : m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Materials */}
                <h4 className="label mt-7 mb-2.5">{t("Tech stack", "기술 스택")}</h4>
                <p className="font-mono text-[11.5px] leading-relaxed" style={{ color: "var(--body)" }}>
                  {project.tech.join("  ·  ")}
                </p>

                {/* Actions */}
                {actions.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {actions.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium transition-colors"
                        style={{
                          borderRadius: 3,
                          color: a.token === "muted" ? "var(--body)" : `var(--${a.token})`,
                          background: a.token === "muted" ? "var(--surface)" : `var(--${a.token}-soft)`,
                          border: `1px solid ${a.token === "muted" ? "var(--rule)" : `var(--${a.token}-line)`}`,
                        }}
                      >
                        <a.icon className="h-3.5 w-3.5" />
                        {a.label}
                        {a.ext && <ArrowUpRight className="h-3 w-3 opacity-60" />}
                      </a>
                    ))}
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
