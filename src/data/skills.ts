// ── Skill data for clean tag-grid layout ─────────────────────────────────
// Tier: expert ≥ 85 | advanced 70–84 | intermediate < 70
// Names shown as-is in the tag grid (no hex abbreviations needed)

export type SkillTier = "expert" | "advanced" | "intermediate";

export interface SkillNode {
  name: string;
  level: number;
  tier: SkillTier;
}

export interface SkillCluster {
  id: string;
  label: string;
  labelEn: string;
  textColor: string;
  rawRgb: string;
  glowColor: string;
  skills: SkillNode[];
}

function node(name: string, level: number): SkillNode {
  const tier: SkillTier =
    level >= 85 ? "expert" : level >= 70 ? "advanced" : "intermediate";
  return { name, level, tier };
}

export const skillClusters: SkillCluster[] = [
  {
    id: "ml-ai",
    label: "ML / AI",
    labelEn: "Machine Learning & AI",
    textColor: "text-blue-400",
    rawRgb: "59,130,246",
    glowColor: "rgba(59,130,246,0.5)",
    skills: [
      node("Graph Attention Network (GAT)", 90),
      node("Graph Convolutional Network (GCN)", 88),
      node("Long Short-Term Memory (LSTM)", 85),
      node("SHAP", 85),
      node("GNNExplainer", 82),
      node("Integrated Gradients", 80),
      node("Random Forest / XGBoost", 75),
    ],
  },
  {
    id: "spatial",
    label: "공간 분석",
    labelEn: "Spatial Analysis / GIS",
    textColor: "text-cyan-400",
    rawRgb: "6,182,212",
    glowColor: "rgba(6,182,212,0.5)",
    skills: [
      node("Google Earth Engine (GEE)", 83),
      node("GIS 공간 분석", 82),
      node("시공간 통계 (Moran's I, LISA)", 82),
      node("Spatial Block CV", 82),
      node("공간 클러스터링 (K-means)", 80),
      node("원격탐사 (NDVI, EVI, LST)", 78),
      node("QGIS / ArcGIS", 72),
    ],
  },
  {
    id: "programming",
    label: "프로그래밍",
    labelEn: "Programming",
    textColor: "text-emerald-400",
    rawRgb: "16,185,129",
    glowColor: "rgba(16,185,129,0.5)",
    skills: [
      node("Python (pandas, numpy, scikit-learn)", 88),
      node("HTML / CSS / JavaScript", 88),
      node("React / Next.js", 80),
      node("R (통계 분석)", 75),
      node("TypeScript", 75),
      node("C++", 65),
    ],
  },
  {
    id: "climate",
    label: "기후과학",
    labelEn: "Climate Science",
    textColor: "text-amber-400",
    rawRgb: "245,158,11",
    glowColor: "rgba(245,158,11,0.5)",
    skills: [
      node("기후변화 영향·적응 평가", 88),
      node("기후정의 / 취약성 분석", 85),
      node("기후 시나리오 (SSP / IPCC AR6)", 85),
      node("STL 시계열 분해", 82),
      node("온실가스 관리", 80),
      node("산림환경 시스템", 82),
    ],
  },
  {
    id: "tools",
    label: "도구",
    labelEn: "Tools & Frameworks",
    textColor: "text-slate-400",
    rawRgb: "100,116,139",
    glowColor: "rgba(100,116,139,0.5)",
    skills: [
      node("D3.js", 72),
      node("Leaflet.js", 78),
      node("Chart.js / Recharts", 80),
      node("Tailwind CSS", 78),
      node("Git / GitHub", 78),
      node("Netlify / Vercel", 75),
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
