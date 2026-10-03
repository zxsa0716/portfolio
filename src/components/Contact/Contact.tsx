"use client";

/**
 * Contact + colophon. The email is the primary action, so it is the only
 * element here set at display size; everything else is a quiet index of places
 * the same person can be found.
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Github, Linkedin, GraduationCap, MapPin,
  Copy, Check, ArrowUpRight, BookText,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useLang, LINKS } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

const EMAIL = LINKS.emailAcademic;

// ── Toast ─────────────────────────────────────────────────────────────────
function Toast({ visible, label }: { visible: boolean; label: string }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium"
            style={{
              background: "var(--ink)",
              color: "#FFFFFF",
              borderRadius: 3,
              boxShadow: "var(--lift-3)",
            }}
          >
            <Check className="h-4 w-4 shrink-0" />
            {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setToastVisible(false), 2800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  const socials = [
    { label: "Google Scholar",                 sub: t("Publications & citations", "논문 및 인용"), url: LINKS.scholar,  icon: GraduationCap, token: "doi" },
    { label: "LinkedIn",                       sub: t("Professional profile", "전문 프로필"),      url: LINKS.linkedin, icon: Linkedin,      token: "data" },
    { label: "GitHub",                         sub: "github.com/zxsa0716",                        url: LINKS.github,   icon: Github,        token: "neutral" },
    { label: t("Tech Blog", "기술 블로그"),     sub: "zxsa716.tistory.com",                        url: LINKS.blog,     icon: BookText,      token: "award" },
  ];

  return (
    <>
      <Toast visible={toastVisible} label={t("Email address copied", "이메일 주소를 복사했습니다")} />

      <section id="contact" className="section-pad band-top" style={{ background: "var(--paper)" }}>
        <div className="measure" style={{ maxWidth: 820 }}>
          <SectionHeader
            index="05"
            kicker="Contact"
            align="center"
            title={t("Let's build together", "함께 만들어 가요")}
            description={t(
              "Research collaboration, project inquiries, or just sharing ideas — always welcome.",
              "연구 협업, 프로젝트 문의, 아이디어 공유 — 언제든지 환영합니다.",
            )}
          />

          {/* Email */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-4"
          >
            <button
              onClick={handleCopy}
              className="group w-full p-6 text-left transition-colors duration-200 sm:p-7"
              style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 4 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; }}
              aria-label={`${t("Copy email", "이메일 복사")}: ${EMAIL}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent)" }} />
                    <span className="label">{t("Email", "이메일")}</span>
                    <span className="label" style={{ color: "var(--faint)" }}>
                      {t("click to copy", "클릭하여 복사")}
                    </span>
                  </div>
                  <p
                    className="truncate font-mono"
                    style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)", fontWeight: 500, color: "var(--ink)" }}
                  >
                    {EMAIL}
                  </p>
                </div>

                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-200"
                  style={{
                    borderRadius: 3,
                    background: copied ? "var(--accent)" : "var(--paper)",
                    border: `1px solid ${copied ? "var(--accent)" : "var(--rule-strong)"}`,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <Check className="h-4 w-4" style={{ color: "#FFFFFF" }} />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <Copy className="h-4 w-4" style={{ color: "var(--muted)" }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Elsewhere */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-4 grid gap-3 sm:grid-cols-2"
          >
            {socials.map((s) => (
              <motion.a
                key={s.label}
                variants={fadeInUp}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 p-4 transition-colors duration-200"
                style={{ border: "1px solid var(--rule)", borderRadius: 4 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `var(--${s.token}-line)`; e.currentTarget.style.background = "var(--surface-sunk)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.background = "transparent"; }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center"
                  style={{ borderRadius: 3, background: `var(--${s.token}-soft)`, border: `1px solid var(--${s.token}-line)` }}
                >
                  <s.icon className="h-4 w-4" style={{ color: `var(--${s.token})` }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{s.label}</p>
                  <p className="truncate text-[11px]" style={{ color: "var(--muted)" }}>{s.sub}</p>
                </div>
                <ArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 transition-colors"
                  style={{ color: "var(--faint)" }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-16 flex items-center gap-3.5 p-4"
            style={{ border: "1px solid var(--rule)", borderRadius: 4 }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center"
              style={{ borderRadius: 3, background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}
            >
              <MapPin className="h-4 w-4" style={{ color: "var(--accent)" }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="label mb-0.5">{t("Location", "위치")}</p>
              <p className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>
                {t(
                  "CLIM Lab, Kookmin University · Seoul, Korea",
                  "국민대학교 글로벌기후변화연구실(CLIM Lab) · 서울",
                )}
              </p>
            </div>
          </motion.div>

          {/* Colophon */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-1.5 pt-8 text-center"
            style={{ borderTop: "1px solid var(--rule)" }}
          >
            <p className="text-[12px]" style={{ color: "var(--muted)" }}>
              © 2026 Heedo Choi (최희도) · All rights reserved.
            </p>
            <p className="font-mono text-[11px]" style={{ color: "var(--faint)" }}>
              Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion
            </p>
            <p className="font-mono tabular text-[10.5px]" style={{ color: "var(--faint)" }}>
              {t("Last updated", "최종 갱신")}: 2026.10
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
