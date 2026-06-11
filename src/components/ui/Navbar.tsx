"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";

const navItems = [
  { label: "About",        href: "#about"        },
  { label: "Publications", href: "#research"      },
  { label: "Projects",     href: "#projects"      },
  { label: "Skills",       href: "#skills"        },
  { label: "Credentials",  href: "#certificates"  },
  { label: "Contact",      href: "#contact"       },
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
      className={`flex items-center rounded-full p-0.5 ${compact ? "" : "ml-2"}`}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200"
          style={
            lang === opt.value
              ? {
                  background: "rgba(59,130,246,0.2)",
                  border: "1px solid rgba(59,130,246,0.4)",
                  color: "#93C5FD",
                }
              : { border: "1px solid transparent", color: "#475569" }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { t } = useLang();

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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background:   "rgba(8,14,28,0.88)",
              backdropFilter: "blur(20px) saturate(1.4)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              boxShadow:    "0 1px 24px rgba(0,0,0,0.4)",
            }
          : {}
      }
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / wordmark */}
        <a
          href="#hero"
          className="font-display font-bold text-lg tracking-tight"
          style={{
            background:   "linear-gradient(90deg, #60A5FA, #34D399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("Heedo Choi", "최희도")}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#64748B] hover:text-[#F1F5F9] transition-colors duration-200 font-medium"
            >
              {item.label}
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
              className="block w-full h-px bg-[#94A3B8] transition-transform duration-300 origin-center"
              style={{ transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-full h-px bg-[#94A3B8] transition-opacity duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-full h-px bg-[#94A3B8] transition-transform duration-300 origin-center"
              style={{ transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
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
            exit={{    opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background:   "rgba(8,14,28,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#64748B] hover:text-[#F1F5F9] transition-colors duration-150 py-2.5 text-sm font-medium border-b last:border-0"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
