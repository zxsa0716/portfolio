"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, viewportConfig } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  const { t } = useLang();

  /* A record, read top to bottom. The year gutter carries the sequence, so the
     entries need no numbering of their own. */
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
        "ROK Army, 75th Division CBRN Battalion (Sergeant) · Drone pilot certificate (Dec 2022)",
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
      title: t("Undergraduate researcher · 4 awards · 4 certifications", "학부연구생 · 학술 수상 4건 · 자격증 4개"),
      desc: t(
        "KSCCR Best Poster & Best Presentation · Environmental Data Contest Excellence Award · President of the 'Greenery' academic society · ADsP, Forest Industrial Engineer, Big Data Engineer, GHG Management Engineer",
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
    {
      year: "2026.08",
      title: t("Forest Pioneer Research Fellow", "산림 Pioneer 연구장학생 선발"),
      desc: t(
        "5th cohort, Chung In-wook Academic Scholarship Foundation — five graduate researchers selected nationwide",
        "제5기 정인욱학술장학재단 산림 Pioneer — 전국 석·박사 5명 선발",
      ),
      mark: true,
    },
  ];

  const facts = [
    {
      k: t("M.S. student", "석사과정"),
      v: t(
        "Dept. of Climate Technology Convergence (Climate & Environmental Science), Kookmin University · 2026.02 –",
        "국민대학교 일반대학원 기후기술융합학과 기후환경학전공 · 2026.02 –",
      ),
    },
    {
      k: t("Laboratory", "연구실"),
      v: t(
        "CLIM Lab — Global Climate Change, Innovative Monitoring & Modeling Lab · Advisor: Prof. Chul-Hee Lim",
        "글로벌기후변화연구실(CLIM Lab) · 지도교수 임철희",
      ),
    },
    {
      k: t("B.S.", "학사"),
      v: t(
        "Forestry, Environment and Systems, Kookmin University · 2021–2026 · GPA 4.19 / 4.5",
        "국민대학교 산림환경시스템학과 · 2021–2026 · 평점 4.19/4.5 (전공 4.3/4.5)",
      ),
    },
    {
      k: t("Society", "학술동아리"),
      v: t("President, 'Greenery' departmental academic society · 2025", "그리너리 학과 학술동아리 회장 · 2025"),
    },
  ];

  const researchHighlights = [
    t(
      "Wildfire response route analysis & info-sharing technology (Korea Forest Service R&D)",
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
    <section id="about" className="section-pad band-top" style={{ background: "var(--paper)" }}>
      <div className="measure">
        <SectionHeader
          index="00"
          kicker="About"
          title={t("Who I am", "저를 소개합니다")}
          description={t(
            "Climate research, AI development, and deployable web platforms — I enjoy crossing the boundary between domain science and engineering.",
            "기후변화 연구와 AI 개발, 그리고 실제로 배포 가능한 웹 플랫폼까지 — 도메인과 기술의 경계를 넘나드는 것을 즐깁니다.",
          )}
        />

        <div className="grid items-start gap-x-14 gap-y-12 lg:grid-cols-2">
          {/* ── Left — the record of fact ─────────────────────── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h3 className="label mb-4">{t("Education & affiliation", "학력 · 소속")}</h3>
            <dl style={{ borderTop: "1px solid var(--rule)" }}>
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="grid gap-x-5 gap-y-1 py-3.5 sm:grid-cols-[7rem_1fr]"
                  style={{ borderBottom: "1px solid var(--rule-faint)" }}
                >
                  <dt
                    className="text-[12.5px] font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {f.k}
                  </dt>
                  <dd className="text-[13.5px] leading-relaxed" style={{ color: "var(--body)" }}>
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="label mt-10 mb-4">
              {t("Funded research projects · 14 in total", "참여 연구과제 · 총 14건")}
            </h3>
            <ul style={{ borderTop: "1px solid var(--rule)" }}>
              {researchHighlights.map((r) => (
                <li
                  key={r}
                  className="py-3 pl-4 text-[13.5px] leading-relaxed"
                  style={{
                    borderBottom: "1px solid var(--rule-faint)",
                    borderLeft: "2px solid var(--accent-line)",
                    color: "var(--body)",
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-3.5 text-[12.5px]" style={{ color: "var(--muted)" }}>
              {t(
                "Full list in §03 below — 10 R&D projects and 4 commissioned studies.",
                "전체 목록은 아래 §03 참조 — R&D 10건, 학술용역 4건.",
              )}
            </p>
          </motion.div>

          {/* ── Right — the timeline ──────────────────────────── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h3 className="label mb-4">{t("Timeline", "연혁")}</h3>

            <div className="relative" style={{ borderTop: "1px solid var(--rule)" }}>
              {/* The spine */}
              <div
                aria-hidden
                className="absolute top-0 bottom-0 w-px"
                style={{ left: "4.75rem", background: "var(--rule)" }}
              />

              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  className="relative grid grid-cols-[4.75rem_1fr] gap-x-6 py-4"
                >
                  <span
                    className="font-mono tabular pt-0.5 text-right text-[11px]"
                    style={{ color: item.mark ? "var(--accent)" : "var(--muted)", paddingRight: "0.9rem" }}
                  >
                    {item.year}
                  </span>

                  {/* Node on the spine */}
                  <span
                    aria-hidden
                    className="absolute top-[1.4rem] h-[7px] w-[7px] rounded-full"
                    style={{
                      left: "4.75rem",
                      transform: "translateX(-50%)",
                      background: item.mark ? "var(--accent)" : "var(--paper)",
                      border: `1px solid ${item.mark ? "var(--accent)" : "var(--rule-strong)"}`,
                    }}
                  />

                  <div className="pl-1">
                    <h4
                      className="text-[13.5px] font-semibold leading-snug"
                      style={{ color: "var(--ink)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
