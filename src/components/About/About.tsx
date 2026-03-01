"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from "@/lib/animations";

const timeline = [
  {
    year: "2021",
    title: "국민대학교 입학",
    desc: "산림환경시스템학과 입학 (학번 20211818)",
  },
  {
    year: "2022",
    title: "서포터즈 활동 시작 · 드론 조종자 자격 취득",
    desc: "르탄즈 서포터즈 (2022.01~02) · 드론 자격증 취득 (2022.12)",
  },
  {
    year: "2024",
    title: "컴활 1급 취득 · 환경 서포터즈 2개",
    desc: "그린나래 서포터즈(발달장애 청소년 환경교육) · U-SAVERS(기후활동가) · 컴활 1급 취득 (2024.09)",
  },
  {
    year: "2024.12",
    title: "CLIM Lab 동계인턴",
    desc: "기후변화 인공위성 연구실 동계인턴 (2024.12.16~2025.01.31)",
  },
  {
    year: "2025.01",
    title: "그리너리 부회장 · 학부연구생",
    desc: "학과 학술동아리 그리너리 부회장 취임 · CLIM Lab 학부연구생 (2025.02~현재)",
  },
  {
    year: "2025",
    title: "학술 수상 및 자격증 취득",
    desc: "기후변화학회 수상 3건 · 환경데이터공모전 우수상 · ADsP·산림산업기사·빅데이터분석기사·온실가스관리기사 취득",
  },
];

const researchHighlights = [
  "교육부 A2024-0275 한국연구재단 신진연구자지원사업",
  "2025년 산림청 대형산불 대응 지능형 솔루션 R&D (RS-2025-25438293)",
  "과학기술정보통신부 우수신진연구 산림 통합평가모형 (NR071937)",
  "2025년도 글로벌인문사회융합연구지원사업",
  "한국임업진흥원 학술연구용역 A2025-0565",
  "UNFCCC 전문가 교육과정 번역과제",
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-20"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">저를 소개합니다</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            기후변화 연구와 AI 개발, 그리고 실제로 배포 가능한 웹 플랫폼까지 —
            도메인과 기술의 경계를 넘나드는 것을 즐깁니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🎓</span> 학력 & 소속
              </h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <span className="text-blue-400 font-semibold">국민대학교</span> 산림환경시스템학과
                  (학번 20211818)
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">CLIM Lab</span> —Global Climate
                  Change, Innovative Modeling and Monitoring Laboratory 학부연구생 (2025.02~)
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">그리너리</span> 학과 학술동아리
                  부회장 (2025.01~)
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🔬</span> 참여 연구과제 (6개)
              </h3>
              <ul className="space-y-2">
                {researchHighlights.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📅</span> 경력 타임라인
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-transparent" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportConfig}
                    transition={{ delay: i * 0.08 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-gray-950 -translate-x-1/2" />
                    <span className="text-xs font-mono text-blue-400 font-semibold">
                      {item.year}
                    </span>
                    <h4 className="text-white font-semibold mt-0.5">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
