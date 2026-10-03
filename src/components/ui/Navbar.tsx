"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";

const navItems = [
  { href: "#about",        en: "About",        ko: "소개" },
  { href: "#research",     en: "Publications", ko: "논문·발표" },
  { href: "#projects",     en: "Projects",     ko: "프로젝트" },
  { href: "#skills",       en: "Skills",       ko: "역량·과제" },
  { href: "#certificates", en: "Credentials",  ko: "장학·자격" },
  { href: "#contact",      en: "Contact",      ko: "연락처" },
];

// ── EN / KO segmented toggle ──────────────────────────────────────────────
function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const options: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ko", label: "한국어" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center p-0.5 ${compact ? "" : "ml-1"}`}
      style={{ border: "1px solid var(--rule)", borderRadius: 3 }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          className="px-2.5 py-1 text-[11px] font-semibold transition-colors duration-150"
          style={
            lang === opt.value
              ? { background: "var(--accent)", color: "#FFFFFF", borderRadius: 2 }
              : { background: "transparent", color: "var(--muted)", borderRadius: 2 }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px) saturate(1.2)",
              WebkitBackdropFilter: "blur(16px) saturate(1.2)",
              borderBottom: "1px solid var(--rule)",
            }
          : { borderBottom: "1px solid transparent" }
      }
    >
      <div className="measure py-3.5 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#hero"
          className="font-serif"
          style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)" }}
        >
          {t("Heedo Choi", "최희도")}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium transition-colors duration-150"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
            >
              {lang === "en" ? item.en : item.ko}
            </a>
          ))}
          <LangToggle />
        </nav>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LangToggle compact />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex flex-col justify-center gap-[5px] w-9 h-9 p-2"
            aria-label={mobileOpen ? t("Close menu", "메뉴 닫기") : t("Open menu", "메뉴 열기")}
            aria-expanded={mobileOpen}
          >
            <span
              className="block w-full h-px transition-transform duration-300 origin-center"
              style={{ background: "var(--ink)", transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-full h-px transition-opacity duration-300"
              style={{ background: "var(--ink)", opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-full h-px transition-transform duration-300 origin-center"
              style={{ background: "var(--ink)", transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{ background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium transition-colors duration-150"
                  style={{ color: "var(--body)", borderBottom: "1px solid var(--rule-faint)" }}
                >
                  {lang === "en" ? item.en : item.ko}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
