"use client";

/**
 * Contact + Footer — minimal, confident.
 * Primary action: email copy-to-clipboard with animated toast.
 * No contact form. Researchers prefer direct email.
 *
 * Contact data sourced from actual CV:
 * - Email: zxsa0716@naver.com
 * - GitHub: github.com/zxsa0716
 * - Affiliation: 국민대학교 산림환경시스템학과 · CLIM Lab
 * - Location: Seoul, Korea
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const EMAIL    = "zxsa0716@naver.com";
const GITHUB   = "https://github.com/zxsa0716";

const deployedProjects = [
  {
    label: "서울시 상권 위험도 분석 플랫폼",
    sub:   "commercial risk · Netlify",
    url:   "https://seoul-commercial-district-risk.netlify.app",
  },
  {
    label: "서울시 청년 1인가구 생활안전망 지도",
    sub:   "youth safety · Netlify",
    url:   "https://seoul-youth-platform.netlify.app",
  },
  {
    label: "배밭골 오디세이",
    sub:   "eco-community · GitHub Pages",
    url:   "https://zxsa0716.github.io/baebatgol-odyssey/",
  },
];

// ── Toast notification ────────────────────────────────────────────────────
function Toast({ visible }: { visible: boolean }) {
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
            이메일 주소를 복사했습니다
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Contact() {
  const [copied,      setCopied]      = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => { setCopied(false);       }, 2000);
      setTimeout(() => { setToastVisible(false); }, 2800);
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  return (
    <>
      <Toast visible={toastVisible} />

      <section
        id="contact"
        className="relative py-28"
        style={{ backgroundColor: "#060C18" }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          {/* ── Section header ───────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="section-label mb-3">
              Contact
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-none text-[#F1F5F9] mb-4"
            >
              함께 만들어 가요
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#64748B] max-w-lg mx-auto text-base"
            >
              연구 협업, 프로젝트 문의, 아이디어 공유 — 언제든지 환영합니다.
            </motion.p>
          </motion.div>

          {/* ── Primary email CTA ────────────────────── */}
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
              style={{
                background:  "rgba(12,20,38,0.9)",
                border:      "1px solid rgba(59,130,246,0.2)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(59,130,246,0.45)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)")
              }
              aria-label={`이메일 복사: ${EMAIL}`}
            >
              {/* Subtle gradient overlay on hover */}
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
                      이메일
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                      style={{
                        background: "rgba(59,130,246,0.12)",
                        color:      "#60A5FA",
                        border:     "1px solid rgba(59,130,246,0.2)",
                      }}
                    >
                      클릭하여 복사
                    </span>
                  </div>
                  <p
                    className="font-mono text-xl sm:text-2xl font-bold text-[#F1F5F9] group-hover:text-blue-300 transition-colors duration-200 truncate"
                  >
                    {EMAIL}
                  </p>
                </div>

                {/* Copy icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105"
                  style={{
                    background: copied
                      ? "rgba(16,185,129,0.15)"
                      : "rgba(59,130,246,0.12)",
                    border: copied
                      ? "1px solid rgba(16,185,129,0.3)"
                      : "1px solid rgba(59,130,246,0.25)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1,   opacity: 1 }}
                        exit={{    scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-5 h-5 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1,   opacity: 1 }}
                        exit={{    scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy className="w-5 h-5 text-blue-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          </motion.div>

          {/* ── Secondary cards: GitHub + Location ───── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 gap-4 mb-8"
          >
            {/* GitHub */}
            <motion.a
              variants={fadeInUp}
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
              style={{
                background: "rgba(12,20,38,0.9)",
                border:     "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
              }
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border:     "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Github className="w-5 h-5 text-[#94A3B8] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-0.5">
                  GitHub
                </p>
                <p className="text-[#F1F5F9] font-medium text-sm group-hover:text-blue-300 transition-colors truncate">
                  github.com/zxsa0716
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#334155] group-hover:text-blue-400 transition-colors shrink-0" />
            </motion.a>

            {/* Location */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: "rgba(12,20,38,0.9)",
                border:     "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border:     "1px solid rgba(16,185,129,0.2)",
                }}
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-0.5">
                  위치 / Location
                </p>
                <p className="text-[#F1F5F9] font-medium text-sm">
                  Seoul, Korea
                </p>
                <p className="text-[#475569] text-[11px] truncate">
                  국민대학교 · CLIM Lab
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Deployed projects ─────────────────────── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-16"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#334155] mb-3">
              배포된 프로젝트
            </p>
            <div className="space-y-2">
              {deployedProjects.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-3 rounded-xl transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border:     "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
                  }
                >
                  <div>
                    <p className="text-[#94A3B8] text-sm group-hover:text-[#F1F5F9] transition-colors">
                      {p.label}
                    </p>
                    <p className="text-[#334155] text-[10px] font-mono">{p.sub}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#334155] group-hover:text-blue-400 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Footer ───────────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="pt-8 border-t text-center space-y-2"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-[#334155] text-xs">
              © 2026 최희도 (Heedo Choi) · All rights reserved.
            </p>
            <p className="text-[#334155] text-[11px] font-mono">
              Built with{" "}
              <span className="text-[#475569]">Next.js 16</span> ·{" "}
              <span className="text-[#475569]">TypeScript</span> ·{" "}
              <span className="text-[#475569]">Tailwind CSS v4</span> ·{" "}
              <span className="text-[#475569]">Framer Motion</span> ·{" "}
              <span className="text-[#475569]">React Three Fiber</span>
            </p>
            <p className="text-[#334155] text-[10px] font-mono">
              Last updated: 2026.02.23
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
