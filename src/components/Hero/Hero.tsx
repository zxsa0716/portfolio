"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, heroTextVariants, viewportConfig } from "@/lib/animations";

const stats = [
  { value: "R² 0.9681", label: "GAT 모델 성능" },
  { value: "7개", label: "국가자격증" },
  { value: "5개", label: "국가연구과제 참여" },
  { value: "6건", label: "수상 이력" },
];

export default function Hero() {
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
            국민대학교 산림환경시스템학과 · CLIM Lab 학부연구생
          </motion.div>

          {/* Name */}
          <motion.h1
            custom={0.15}
            variants={heroTextVariants}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
              최희도
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            custom={0.3}
            variants={heroTextVariants}
            className="text-xl md:text-2xl text-gray-400 mb-4 font-light"
          >
            Climate AI Researcher & Full-Stack Developer
          </motion.p>

          {/* One-liner */}
          <motion.p
            custom={0.45}
            variants={heroTextVariants}
            className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed mb-10"
          >
            GAT · GCN · XAI로 기후정의를 실현하는 공간 분석 연구자.
            <br />
            데이터에서 정책까지, 연구에서 배포까지 end-to-end로 만듭니다.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={0.6}
            variants={heroTextVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              프로젝트 보기
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300"
            >
              연락하기
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
