"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  const { t } = useLang();

  const timeline = [
    {
      year: "2021",
      title: t("Entered Kookmin University", "국민대학교 입학"),
      desc: t(
        "B.S. in Forestry, Environment and Systems · Minor in Software Convergence · Interdisciplinary major in Climate Big Data",
        "산림환경시스템학과 입학 · 부전공 소프트웨어융합학부 · 복수(연계)전공 기후빅데이터",
      ),
    },
    {
      year: "2022–24",
      title: t("Military service · First certifications", "군 복무 · 첫 자격증 취득"),
      desc: t(
        "ROK Army, 75th Division CBRN Battalion (Sergeant) · Drone pilot certificate (2022.12)",
        "육군 75사단 화생방대대 병장 만기전역 · 드론 조종자 자격 취득 (2022.12)",
      ),
    },
    {
      year: "2024",
      title: t("Climate activism & education", "기후 대외활동 · 교육"),
      desc: t(
        "U-SAVERS climate activist (Outstanding Award) · Green Narae environmental education · Forest Big Data training",
        "U-SAVERS 기후활동가(우수상) · 그린나래 환경교육 · 산림 빅데이터 교육 수료",
      ),
    },
    {
      year: "2024.12",
      title: t("Joined CLIM Lab as winter intern", "CLIM Lab 동계인턴"),
      desc: t(
        "Global Climate Change, Innovative Monitoring & Modeling Lab (Advisor: Prof. Chul-Hee Lim)",
        "글로벌기후변화연구실 동계인턴 (지도교수: 임철희)",
      ),
    },
    {
      year: "2025",
      title: t(
        "Undergraduate researcher · 4 academic awards · 4 certifications",
        "학부연구생 · 학술 수상 4건 · 자격증 4개 취득",
      ),
      desc: t(
        "KSCCR Best Poster & Best Presentation · Environmental Data Contest Excellence Award · President of 'Greenery' academic society · ADsP, Forest Industrial Engineer, Big Data Engineer, GHG Management Engineer",
        "기후변화학회 최우수포스터·최우수발표 · 환경데이터공모전 우수상 · 그리너리 회장 · ADsP·산림산업기사·빅데이터분석기사·온실가스관리기사",
      ),
    },
    {
      year: "2026.02",
      title: t("M.S. student, Climate Technology Convergence", "기후기술융합학과 석사과정 입학"),
      desc: t(
        "Dept. of Climate Technology Convergence (Climate & Environmental Science), CLIM Lab",
        "국민대학교 일반대학원 기후기술융합학과 기후환경학전공 · CLIM Lab",
      ),
    },
    {
      year: "2026",
      title: t("First-author paper in Urban Climate", "Urban Climate 제1저자 논문 게재"),
      desc: t(
        "\"Climate justice through explainable graph neural networks\" — Urban Climate (IF 6.9, top 6%)",
        "\"Climate justice through explainable graph neural networks\" — Urban Climate (IF 6.9, 상위 6%)",
      ),
    },
  ];

  const researchHighlights = [
    t(
      "Wildfire response route analysis & info-sharing tech (Korea Forest Service R&D)",
      "대형산불 대응 진입로·대피로 분석 기술개발 (산림청 R&D)",
    ),
    t(
      "AI & climate tech–policy integrated forest assessment model (MSIT Outstanding Young Researcher)",
      "AI·기후기술 융합 산림 통합평가모형 (과기정통부 우수신진연구)",
    ),
    t(
      "Corporate financial impacts of physical & transition climate risks (MCEE · KEITI)",
      "기후리스크(물리적·전환)에 따른 기업 재무영향 분석 (기후에너지환경부)",
    ),
    t(
      "Ecosystem restoration technologies for ecosystem value (MCEE · KEITI)",
      "생태계 가치 향상을 위한 생태계 복원기술개발 (기후에너지환경부)",
    ),
    t(
      "Bioclimatic research specialist training — Principal Investigator (NIBR)",
      "생물기후 연구 전문인력 양성 — 연구책임자 (국립생물자원관)",
    ),
    t(
      "Digital policy platform for mental health resilience in the climate crisis (NRF)",
      "기후위기시대 정신건강 회복탄력성 정책플랫폼 개발 (한국연구재단)",
    ),
  ];

  return (
    <section id="about" className="py-28 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <SectionHeader
            index="00"
            kicker="About"
            title={t("Who I am", "저를 소개합니다")}
            description={t(
              "Climate research, AI development, and deployable web platforms — I enjoy crossing the boundary between domain science and engineering.",
              "기후변화 연구와 AI 개발, 그리고 실제로 배포 가능한 웹 플랫폼까지 — 도메인과 기술의 경계를 넘나드는 것을 즐깁니다.",
            )}
          />
        </div>

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
                <span className="text-2xl">🎓</span> {t("Education & Affiliation", "학력 & 소속")}
              </h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <span className="text-blue-400 font-semibold">
                    {t("M.S. Student", "석사과정")}
                  </span>{" "}
                  {t(
                    "— Dept. of Climate Technology Convergence (Climate & Environmental Science), Kookmin University (2026.02–)",
                    "— 국민대학교 일반대학원 기후기술융합학과 기후환경학전공 (2026.02~)",
                  )}
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">CLIM Lab</span>{" "}
                  {t(
                    "— Global Climate Change, Innovative Monitoring & Modeling Lab · Advisor: Prof. Chul-Hee Lim",
                    "— 글로벌기후변화연구실 · 지도교수: 임철희",
                  )}
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">
                    {t("B.S.", "학사")}
                  </span>{" "}
                  {t(
                    "— Forestry, Environment and Systems, Kookmin University (2021–2026) · GPA 4.19/4.5",
                    "— 산림환경시스템학과 (2021–2026) · 평점 4.19/4.5 (전공 4.3/4.5)",
                  )}
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">
                    {t("Greenery", "그리너리")}
                  </span>{" "}
                  {t(
                    "— President, departmental academic society (2025)",
                    "— 학과 학술동아리 회장 (2025)",
                  )}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🔬</span>{" "}
                {t("Funded Research Projects (14 total)", "참여 연구과제 (총 14건)")}
              </h3>
              <ul className="space-y-2">
                {researchHighlights.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                    {r}
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-xs mt-4">
                {t(
                  "Full list in the Skills section below — 10 R&D + 4 commissioned projects.",
                  "전체 목록은 아래 Skills 섹션 참조 — R&D 10건 + 학술용역 4건.",
                )}
              </p>
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
              <span className="text-2xl">📅</span> {t("Timeline", "경력 타임라인")}
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
