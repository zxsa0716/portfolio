"use client";

/**
 * Contact + Footer — minimal, confident.
 * Primary action: email copy-to-clipboard with animated toast.
 * Social links: Google Scholar, LinkedIn, GitHub, Blog. Bilingual.
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Github, Linkedin, GraduationCap, MapPin,
  Copy, Check, ExternalLink, ArrowUpRight, BookText,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useLang, LINKS } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

const EMAIL = LINKS.emailAcademic;

// ── Toast notification ────────────────────────────────────────────────────
function Toast({ visible, label }: { visible: boolean; label: string }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 12, scale: 0.97  }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div
            className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium"
            style={{
              background:  "rgba(12,20,38,0.95)",
              border:      "1px solid rgba(16,185,129,0.4)",
              backdropFilter: "blur(16px)",
              boxShadow:   "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.12)",
              color:       "#6EE7B7",
            }}
          >
            <Check className="w-4 h-4 shrink-0" />
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
  const [copied,       setCopied]       = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => setCopied(false),       2000);
      setTimeout(() => setToastVisible(false), 2800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  const socials = [
    {
      label: "Google Scholar",
      sub: t("Publications & citations", "논문 및 인용"),
      url: LINKS.scholar,
      icon: GraduationCap,
      accent: "#FDA4AF",
      accentBg: "rgba(244,63,94,0.1)",
      accentBd: "rgba(244,63,94,0.2)",
    },
    {
      label: "LinkedIn",
      sub: t("Professional profile", "전문 프로필"),
      url: LINKS.linkedin,
      icon: Linkedin,
      accent: "#7DD3FC",
      accentBg: "rgba(14,165,233,0.1)",
      accentBd: "rgba(14,165,233,0.2)",
    },
    {
      label: "GitHub",
      sub: "github.com/zxsa0716",
      url: LINKS.github,
      icon: Github,
      accent: "#E2E8F0",
      accentBg: "rgba(255,255,255,0.06)",
      accentBd: "rgba(255,255,255,0.1)",
    },
    {
      label: t("Tech Blog", "기술 블로그"),
      sub: "zxsa716.tistory.com",
      url: LINKS.blog,
      icon: BookText,
      accent: "#FCD34D",
      accentBg: "rgba(245,158,11,0.1)",
      accentBd: "rgba(245,158,11,0.2)",
    },
  ];

  return (
    <>
      <Toast visible={toastVisible} label={t("Email address copied", "이메일 주소를 복사했습니다")} />

      <section id="contact" className="relative py-28" style={{ backgroundColor: "#060C18" }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          {/* Header */}
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

          {/* Email CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-6"
          >
            <button
              onClick={handleCopy}
              className="group relative w-full text-left rounded-2xl p-6 sm:p-8 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={{ background: "rgba(12,20,38,0.9)", border: "1px solid rgba(59,130,246,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.45)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)")}
              aria-label={`${t("Copy email", "이메일 복사")}: ${EMAIL}`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-[#475569] text-xs font-medium uppercase tracking-wider">
                      {t("Email", "이메일")}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                      style={{ background: "rgba(59,130,246,0.12)", color: "#60A5FA", border: "1px solid rgba(59,130,246,0.2)" }}
                    >
                      {t("click to copy", "클릭하여 복사")}
                    </span>
                  </div>
                  <p className="font-mono text-lg sm:text-2xl font-bold text-[#F1F5F9] group-hover:text-blue-300 transition-colors duration-200 truncate">
                    {EMAIL}
                  </p>
                </div>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105"
                  style={{
                    background: copied ? "rgba(16,185,129,0.15)" : "rgba(59,130,246,0.12)",
                    border: copied ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(59,130,246,0.25)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Check className="w-5 h-5 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Copy className="w-5 h-5 text-blue-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Social grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 gap-4 mb-4"
          >
            {socials.map((s) => (
              <motion.a
                key={s.label}
                variants={fadeInUp}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
                style={{ background: "rgba(12,20,38,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = s.accentBd)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: s.accentBg, border: `1px solid ${s.accentBd}` }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F1F5F9] font-medium text-sm">{s.label}</p>
                  <p className="text-[#475569] text-[11px] truncate">{s.sub}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#334155] group-hover:text-blue-400 transition-colors shrink-0" />
              </motion.a>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex items-center gap-4 p-5 rounded-2xl mb-16"
            style={{ background: "rgba(12,20,38,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-0.5">
                {t("Location", "위치")}
              </p>
              <p className="text-[#F1F5F9] font-medium text-sm">
                {t(
                  "CLIM Lab, Kookmin University · Seoul, Korea",
                  "국민대학교 글로벌기후변화연구실(CLIM Lab) · 서울",
                )}
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="pt-8 border-t text-center space-y-2"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-[#334155] text-xs">© 2026 Heedo Choi (최희도) · All rights reserved.</p>
            <p className="text-[#334155] text-[11px] font-mono">
              Built with <span className="text-[#475569]">Next.js 16</span> ·{" "}
              <span className="text-[#475569]">TypeScript</span> ·{" "}
              <span className="text-[#475569]">Tailwind CSS v4</span> ·{" "}
              <span className="text-[#475569]">Framer Motion</span>
            </p>
            <p className="text-[#334155] text-[10px] font-mono">Last updated: 2026.06</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
