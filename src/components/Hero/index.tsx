"use client";

/**
 * Hero — the title page of the dossier.
 * Affiliation rule, name, the one-line claim, the citation that backs it,
 * then a mono strip of the figures a reader would otherwise scroll to find.
 */

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, GraduationCap, Mail } from "lucide-react";
import { useLang, LINKS } from "@/lib/i18n";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function Hero() {
  const { lang, t } = useLang();

  const socials = [
    { href: LINKS.scholar,                   icon: GraduationCap, label: "Google Scholar" },
    { href: LINKS.linkedin,                  icon: Linkedin,      label: "LinkedIn" },
    { href: LINKS.github,                    icon: Github,        label: "GitHub" },
    { href: `mailto:${LINKS.emailAcademic}`, icon: Mail,          label: "Email" },
  ];

  const cvHref = lang === "en" ? "/Huido_Choi_CV_EN.pdf" : "/최희도_CV_국문.pdf";
  const cvName = lang === "en" ? "Huido_Choi_CV.pdf" : "최희도_CV.pdf";

  /* The four figures that establish standing, in the order a reviewer reads them. */
  const facts = [
    { k: t("First-author SCIE", "SCIE 1저자"),     v: t("Urban Climate · IF 6.9", "Urban Climate · IF 6.9") },
    { k: t("Funded projects", "참여 연구과제"),     v: t("14", "14건") },
    { k: t("Competition awards", "공모전 수상"),    v: t("4", "4건") },
    { k: t("Research fellowship", "연구장학"),      v: t("Forest Pioneer, 5th", "산림 Pioneer 5기") },
  ];

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center"
      style={{ background: "var(--paper)", minHeight: "92vh" }}
    >
      {/* Graph-paper ruling, fading out before it meets the text */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none ledger-fine"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 42%, transparent 35%, black 100%)",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 42%, transparent 35%, black 100%)",
          opacity: 0.85,
        }}
      />

      <div className="relative z-10 measure pt-28 pb-20 flex flex-col items-center text-center">

        {/* Affiliation */}
        <motion.p {...fade(0)} className="label mb-9" style={{ letterSpacing: "0.16em" }}>
          {t(
            "M.S. · Climate Technology Convergence, Kookmin University · CLIM Lab",
            "국민대학교 기후기술융합학과 기후환경학전공 석사과정 · CLIM Lab",
          )}
        </motion.p>

        {/* Name */}
        <motion.div {...fade(0.08)} className="select-none">
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              lineHeight: 0.98,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
            }}
          >
            {t("Heedo Choi", "최희도")}
          </h1>
          <p
            className="font-mono mt-4"
            style={{
              fontSize: "clamp(0.75rem, 1.6vw, 0.9375rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--faint)",
            }}
          >
            {t("최희도", "Heedo Choi")}
          </p>
        </motion.div>

        {/* Rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" as const }}
          className="w-14 h-px my-8"
          style={{ background: "var(--accent)" }}
        />

        {/* Role */}
        <motion.p
          {...fade(0.28)}
          className="text-sm font-medium tracking-wide mb-5"
          style={{ color: "var(--accent)" }}
        >
          {t("Urban Climate & Machine Learning Researcher", "도시기후 · 머신러닝 연구자")}
        </motion.p>

        {/* Statement */}
        <motion.p
          {...fade(0.34)}
          className="font-serif mb-8"
          style={{
            maxWidth: "38rem",
            fontSize: "clamp(1.0625rem, 2vw, 1.3125rem)",
            lineHeight: 1.55,
            color: "var(--body)",
          }}
        >
          {t(
            "I model urban climate risk with satellite data and graph neural networks, and turn it into platforms that support policy decisions.",
            "위성 데이터와 그래프 신경망으로 도시 기후 위험을 모델링하고, 이를 정책 결정을 돕는 플랫폼으로 구현합니다.",
          )}
        </motion.p>

        {/* The citation that backs the claim */}
        <motion.a
          {...fade(0.4)}
          href={LINKS.paperDoi}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mb-9 px-4 py-2 transition-colors duration-200"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--rule)",
            borderRadius: 3,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-line)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; }}
        >
          <span className="label" style={{ color: "var(--accent)" }}>
            {t("Latest", "최신 논문")}
          </span>
          <span style={{ fontSize: 12.5, color: "var(--ink)" }}>Choi, H. et al. (2026)</span>
          <span className="font-serif italic" style={{ fontSize: 13, color: "var(--body)" }}>
            Urban Climate
          </span>
          <span
            className="font-mono"
            style={{ fontSize: 10.5, color: "var(--muted)" }}
          >
            doi:10.1016/j.uclim.2026.102981 ↗
          </span>
        </motion.a>

        {/* Social links */}
        <motion.div {...fade(0.46)} className="flex items-center gap-2 mb-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="w-9 h-9 flex items-center justify-center transition-colors duration-150"
              style={{ color: "var(--muted)", border: "1px solid var(--rule)", borderRadius: 3 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent-line)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.borderColor = "var(--rule)";
              }}
            >
              <s.icon className="w-[17px] h-[17px]" />
            </a>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fade(0.52)} className="flex flex-col sm:flex-row items-center gap-3">
          <a href="#research" className="btn btn-primary">
            {t("View Research", "연구 보기")}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a href={cvHref} download={cvName} className="btn btn-ghost">
            <Download className="w-3.5 h-3.5" />
            {t("Download CV", "이력서 다운로드")}
          </a>
        </motion.div>
      </div>

      {/* Standing, in figures — the strip a reviewer would otherwise scroll for */}
      <motion.div
        {...fade(0.6)}
        className="relative z-10 w-full"
        style={{ borderTop: "1px solid var(--rule)", background: "var(--surface-sunk)" }}
      >
        <div className="measure">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.k}
                className="py-5 px-1"
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid var(--rule)",
                  paddingLeft: i === 0 ? 0 : "1.25rem",
                }}
              >
                <dt className="label mb-1.5">{f.k}</dt>
                <dd
                  className="tabular"
                  style={{ color: "var(--ink)", fontSize: "0.9375rem", fontWeight: 500 }}
                >
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
