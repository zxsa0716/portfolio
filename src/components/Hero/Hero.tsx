"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, GraduationCap, Mail } from "lucide-react";
import { staggerContainer, heroTextVariants } from "@/lib/animations";
import { useLang, LINKS } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLang();

  const stats = [
    {
      value: "IF 6.9",
      label: t("Urban Climate · 1st-author paper", "Urban Climate 제1저자 논문"),
    },
    {
      value: "R² 0.9681",
      label: t("Best GAT model performance", "GAT 모델 최고 성능"),
    },
    {
      value: "14",
      label: t("Funded research projects", "참여 연구과제"),
    },
    {
      value: "8",
      label: t("Awards & honors", "수상 이력"),
    },
  ];

  const socials = [
    { href: LINKS.scholar,  icon: GraduationCap, label: "Google Scholar" },
    { href: LINKS.linkedin, icon: Linkedin,      label: "LinkedIn" },
    { href: LINKS.github,   icon: Github,        label: "GitHub" },
    { href: `mailto:${LINKS.email}`, icon: Mail, label: "Email" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            custom={0}
            variants={heroTextVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t(
              "M.S. Student · CLIM Lab, Kookmin University",
              "국민대학교 기후기술융합학과 석사과정 · 글로벌기후변화연구실(CLIM Lab)",
            )}
          </motion.div>

          {/* Name */}
          <motion.h1
            custom={0.15}
            variants={heroTextVariants}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
              {t("Heedo Choi", "최희도")}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            custom={0.3}
            variants={heroTextVariants}
            className="text-xl md:text-2xl text-gray-400 mb-4 font-light"
          >
            {t(
              "Climate AI Researcher · Explainable GNNs for Climate Justice",
              "Climate AI Researcher · 기후정의를 위한 설명가능 GNN",
            )}
          </motion.p>

          {/* One-liner */}
          <motion.p
            custom={0.45}
            variants={heroTextVariants}
            className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed mb-8"
          >
            {t(
              <>
                I build explainable spatiotemporal AI (GAT · GCN · XAI) for climate risk
                assessment — from satellite data to policy, from research to deployment.
              </>,
              <>
                GAT · GCN · XAI로 기후 리스크를 평가하는 공간 분석 연구자.
                <br />
                위성 데이터에서 정책까지, 연구에서 배포까지 end-to-end로 만듭니다.
              </>,
            )}
          </motion.p>

          {/* Social icon row */}
          <motion.div
            custom={0.55}
            variants={heroTextVariants}
            className="flex items-center justify-center gap-3 mb-10"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 bg-white/5 text-gray-400 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-200"
              >
                <s.icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            custom={0.6}
            variants={heroTextVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a
              href="#research"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("View Research", "연구 보기")}
            </a>
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300"
            >
              {t("View Projects", "프로젝트 보기")}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={0.75}
            variants={heroTextVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 rounded-full bg-gradient-to-b from-gray-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
