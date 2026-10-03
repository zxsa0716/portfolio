"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "#about",        id: "about",        en: "About",        ko: "소개" },
  { href: "#research",     id: "research",     en: "Publications", ko: "논문·발표" },
  { href: "#projects",     id: "projects",     en: "Projects",     ko: "프로젝트" },
  { href: "#skills",       id: "skills",       en: "Skills",       ko: "역량·과제" },
  { href: "#certificates", id: "certificates", en: "Credentials",  ko: "장학·자격" },
  { href: "#contact",      id: "contact",      en: "Contact",      ko: "연락처" },
];

// ── EN / KO segmented toggle ──────────────────────────────────────────────
function LangToggle() {
  const { lang, setLang } = useLang();
  const options: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ko", label: "한국어" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center p-0.5"
      style={{ border: "1px solid var(--rule)", borderRadius: 3 }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          className="px-2 py-1 text-[11px] font-semibold transition-colors duration-150"
          style={
            lang === opt.value
              ? { background: "var(--accent)", color: "var(--on-accent)", borderRadius: 2 }
              : { background: "transparent", color: "var(--muted)", borderRadius: 2 }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Which section the reader is in ────────────────────────────────────────
// A long single page needs a position indicator the same way a long document
// needs a running head. The band is the top third of the viewport, so the
// marker moves when a section takes over the reading position rather than
// when it first appears.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const seen = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio);
        let best: string | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const r = seen.get(id) ?? 0;
          if (r > bestRatio) { bestRatio = r; best = id; }
        }
        setActive(bestRatio > 0 ? best : null);
      },
      { rootMargin: "-72px 0px -62% 0px", threshold: [0, 0.05, 0.25, 0.5, 1] },
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const SECTION_IDS = navItems.map((n) => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, t } = useLang();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className="fixed top-0 right-0 left-0 z-50 transition-colors duration-300"
      style={
        scrolled
          ? {
              background: "var(--masthead)",
              backdropFilter: "blur(16px) saturate(1.2)",
              WebkitBackdropFilter: "blur(16px) saturate(1.2)",
              borderBottom: "1px solid var(--rule)",
            }
          : { borderBottom: "1px solid transparent" }
      }
    >
      <div className="measure flex items-center justify-between py-3.5">
        {/* Wordmark */}
        <a
          href="#hero"
          className="font-serif shrink-0"
          style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)" }}
        >
          {t("Heedo Choi", "최희도")}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className="relative py-1 text-[13px] font-medium transition-colors duration-150"
                style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--muted)"; }}
              >
                {lang === "en" ? item.en : item.ko}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: "var(--accent)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
              </a>
            );
          })}

          <span className="h-4 w-px" style={{ background: "var(--rule)" }} />
          <ThemeToggle />
          <LangToggle />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2.5 md:hidden">
          <LangToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 flex-col justify-center gap-[5px] p-2"
            aria-label={mobileOpen ? t("Close menu", "메뉴 닫기") : t("Open menu", "메뉴 열기")}
            aria-expanded={mobileOpen}
          >
            <span
              className="block h-px w-full origin-center transition-transform duration-300"
              style={{ background: "var(--ink)", transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-px w-full transition-opacity duration-300"
              style={{ background: "var(--ink)", opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-full origin-center transition-transform duration-300"
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
            className="overflow-hidden md:hidden"
            style={{ background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className="py-2.5 text-sm font-medium transition-colors duration-150"
                  style={{
                    color: active === item.id ? "var(--accent)" : "var(--body)",
                    borderBottom: "1px solid var(--rule-faint)",
                  }}
                >
                  {lang === "en" ? item.en : item.ko}
                </a>
              ))}

              <div className="flex items-center justify-between pt-4">
                <span className="label">{t("Theme", "테마")}</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
