// ── Hexagonal skill grid ─────────────────────────────────────────────────
// Tier thresholds: expert ≥ 85 | advanced 70–84 | intermediate < 70
// `short` is the abbreviated label rendered inside the hexagon chip.
// `rawRgb` drives rgba() colours so opacity can vary by tier at runtime.

export type SkillTier = "expert" | "advanced" | "intermediate";

export interface SkillNode {
  name: string;   // Full name for tooltip
  short: string;  // Abbreviated name for hex chip
  level: number;  // 0–100 proficiency
  tier: SkillTier;
}

export interface SkillCluster {
  id: string;
  label: string;
  labelEn: string;
  textColor: string;  // Tailwind text-* class
  rawRgb: string;     // "R,G,B" for dynamic rgba()
  glowColor: string;  // CSS colour for text-shadow on expert nodes
  skills: SkillNode[];
}

function node(name: string, short: string, level: number): SkillNode {
  const tier: SkillTier =
    level >= 85 ? "expert" : level >= 70 ? "advanced" : "intermediate";
  return { name, short, level, tier };
}

export const skillClusters: SkillCluster[] = [
  {
    id: "ml-ai",
    label: "ML / AI",
    labelEn: "Machine Learning & AI",
    textColor: "text-blue-400",
    rawRgb: "59,130,246",
    glowColor: "rgba(59,130,246,0.6)",
    skills: [
      node("Graph Attention Network (GAT)", "GAT",      90),
      node("Graph Convolutional Network (GCN)", "GCN",  88),
      node("Long Short-Term Memory (LSTM)", "LSTM",     85),
      node("SHAP Explainability", "SHAP",               85),
      node("GNNExplainer", "GNNExp",                    82),
      node("Integrated Gradients", "Int.Grad",          80),
    ],
  },
  {
    id: "spatial",
    label: "공간 분석",
    labelEn: "Spatial Analysis / GIS",
    textColor: "text-cyan-400",
    rawRgb: "6,182,212",
    glowColor: "rgba(6,182,212,0.6)",
    skills: [
      node("기후 시나리오 (SSP/AR6)", "SSP/AR6",        85),
      node("GIS 공간 분석", "GIS",                      82),
      node("시공간 통계 (Moran's I)", "공간통계",        82),
      node("Spatial Block CV", "S-Block CV",            82),
      node("공간 클러스터링", "클러스터",                80),
      node("원격탐사 (NDVI/LST)", "원격탐사",           78),
    ],
  },
  {
    id: "programming",
    label: "프로그래밍",
    labelEn: "Programming",
    textColor: "text-emerald-400",
    rawRgb: "16,185,129",
    glowColor: "rgba(16,185,129,0.6)",
    skills: [
      node("Python (pandas, numpy, scikit-learn)", "Python", 88),
      node("HTML / CSS / JavaScript", "HTML/JS",             88),
      node("React / Next.js", "React",                       80),
      node("R (통계분석)", "R",                              75),
      node("TypeScript", "TS",                               75),
      node("C++", "C++",                                     65),
    ],
  },
  {
    id: "climate",
    label: "기후과학",
    labelEn: "Climate Science",
    textColor: "text-amber-400",
    rawRgb: "245,158,11",
    glowColor: "rgba(245,158,11,0.6)",
    skills: [
      node("기후변화 영향·적응 평가", "기후적응",        88),
      node("기후정의 / 취약성 분석", "기후정의",         85),
      node("산림환경 시스템", "산림환경",                82),
      node("온실가스 관리", "온실가스",                  80),
      node("ESG / 지속가능경영", "ESG",                  75),
    ],
  },
  {
    id: "tools",
    label: "도구 / 프레임워크",
    labelEn: "Tools & Frameworks",
    textColor: "text-slate-400",
    rawRgb: "100,116,139",
    glowColor: "rgba(100,116,139,0.6)",
    skills: [
      node("D3.js (시각화)", "D3.js",                   72),
      node("Leaflet.js (지도)", "Leaflet",               78),
      node("Chart.js / Recharts", "Chart.js",           80),
      node("Tailwind CSS", "Tailwind",                  78),
      node("Git / GitHub", "Git",                       78),
      node("Netlify / Vercel", "Deploy",                75),
    ],
  },
];

// ── Funded research projects ──────────────────────────────────────────────

export interface ResearchProject {
  id: string;
  title: string;
  code: string;
  period: string;
  funder: string;
  role: string;
}

export const researchProjects: ResearchProject[] = [
  {
    id: "unfccc",
    title: "UNFCCC 전문가 교육과정 번역과제",
    code: "—",
    period: "2025",
    funder: "UNFCCC",
    role: "참여연구원",
  },
  {
    id: "nrf-2024",
    title: "기후위기 시대의 불평등과 적응의 가치: 기후정의를 위한 공간적 접근",
    code: "A2024-0275",
    period: "2022–2024",
    funder: "교육부 · 한국연구재단 신진연구자지원사업",
    role: "참여연구원",
  },
  {
    id: "global-huss",
    title: "기후위기시대 정신건강 회복탄력성 향상을 위한 디지털 혁신 기반 정책플랫폼 개발",
    code: "—",
    period: "2025",
    funder: "글로벌인문사회융합연구지원사업",
    role: "참여연구원",
  },
  {
    id: "forest-fire",
    title: "대형산불 대응 최적 진화 자원 진입로·대피로 분석과 이해관계자 맞춤형 정보공유 기술개발",
    code: "RS-2025-25438293",
    period: "2025",
    funder: "산림청 대형산불 대응 지능형 솔루션 기술개발(R&D)",
    role: "참여연구원",
  },
  {
    id: "forest-model",
    title: "인공지능과 기후기술·정책 융합 기반 산림 통합평가모형 개발 및 국제화 기반 연구",
    code: "NR071937",
    period: "2025.03~",
    funder: "과학기술정보통신부 우수신진연구",
    role: "참여연구원",
  },
  {
    id: "overseas-forest",
    title: "해외산림자원개발 지원 제도 분석",
    code: "A2025-0565",
    period: "2025.10–2025.12",
    funder: "한국임업진흥원 학술연구용역",
    role: "참여연구원",
  },
];
