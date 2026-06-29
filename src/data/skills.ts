// ── Skill data for clean tag-grid layout ─────────────────────────────────
// Tier: expert ≥ 85 | advanced 70–84 | intermediate < 70
// Names shown as-is in the tag grid (no hex abbreviations needed)

export type SkillTier = "expert" | "advanced" | "intermediate";

export interface SkillNode {
  name: string;
  nameEn: string;
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

// node(ko, en, level) — pass one string when the term is identical in both.
function node(name: string, nameEn: string, level: number): SkillNode {
  const tier: SkillTier =
    level >= 85 ? "expert" : level >= 70 ? "advanced" : "intermediate";
  return { name, nameEn, level, tier };
}

export const skillClusters: SkillCluster[] = [
  {
    id: "ml-ai",
    label: "ML · AI",
    labelEn: "Machine Learning & AI",
    textColor: "text-blue-400",
    rawRgb: "59,130,246",
    glowColor: "rgba(59,130,246,0.5)",
    skills: [
      node("Graph Attention Network (GAT)", "Graph Attention Network (GAT)", 90),
      node("Graph Convolutional Network (GCN)", "Graph Convolutional Network (GCN)", 88),
      node("Long Short-Term Memory (LSTM)", "Long Short-Term Memory (LSTM)", 85),
      node("SHAP", "SHAP", 85),
      node("GNNExplainer", "GNNExplainer", 82),
      node("Integrated Gradients", "Integrated Gradients", 80),
      node("Random Forest / XGBoost", "Random Forest / XGBoost", 75),
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
      node("Google Earth Engine (GEE)", "Google Earth Engine (GEE)", 83),
      node("GIS 공간 분석", "GIS spatial analysis", 82),
      node("시공간 통계 (Moran's I, LISA)", "Spatiotemporal statistics (Moran's I, LISA)", 82),
      node("Spatial Block CV", "Spatial Block CV", 82),
      node("공간 클러스터링 (K-means)", "Spatial clustering (K-means)", 80),
      node("원격탐사 (NDVI, EVI, LST)", "Remote sensing (NDVI, EVI, LST)", 78),
      node("QGIS / ArcGIS", "QGIS / ArcGIS", 72),
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
      node("Python (pandas, numpy, scikit-learn)", "Python (pandas, numpy, scikit-learn)", 88),
      node("HTML / CSS / JavaScript", "HTML / CSS / JavaScript", 88),
      node("React / Next.js", "React / Next.js", 80),
      node("R (통계 분석)", "R (statistical analysis)", 75),
      node("TypeScript", "TypeScript", 75),
      node("C++", "C++", 65),
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
      node("기후변화 영향·적응 평가", "Climate impact & adaptation assessment", 88),
      node("기후정의 / 취약성 분석", "Climate justice / vulnerability analysis", 85),
      node("기후 시나리오 (SSP / IPCC AR6)", "Climate scenarios (SSP / IPCC AR6)", 85),
      node("STL 시계열 분해", "STL time-series decomposition", 82),
      node("온실가스 관리", "Greenhouse-gas management", 80),
      node("산림환경 시스템", "Forestry & environmental systems", 82),
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
      node("D3.js", "D3.js", 72),
      node("Leaflet.js", "Leaflet.js", 78),
      node("Chart.js / Recharts", "Chart.js / Recharts", 80),
      node("Tailwind CSS", "Tailwind CSS", 78),
      node("Git / GitHub", "Git / GitHub", 78),
      node("Netlify / Vercel", "Netlify / Vercel", 75),
    ],
  },
];

// ── Funded research projects (10 R&D + 4 commissioned, from CV 2026.06) ──

export interface ResearchProject {
  id: string;
  title: string;
  titleEn: string;
  kind: "rnd" | "commissioned";
  period: string;
  funder: string;
  funderEn: string;
  role: string;
  roleEn: string;
  link?: string;   // 연구계획서 등 관련 자료 (/materials/...)
}

export const researchProjects: ResearchProject[] = [
  // ── R&D ────────────────────────────────────────────────────────────────
  {
    id: "nrf-2024",
    title: "기후위기 시대의 불평등과 적응의 가치: 기후정의를 위한 공간적 접근",
    titleEn: "Inequality and the Value of Adaptation in the Era of Climate Crisis: A Spatial Approach for Climate Justice",
    kind: "rnd",
    period: "2025.03 – 2025.04",
    funder: "교육부 · 한국연구재단 신진연구자지원사업",
    funderEn: "Ministry of Education · National Research Foundation of Korea",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "mental-health",
    title: "기후위기시대 정신건강 회복탄력성 향상을 위한 디지털 혁신 기반 정책플랫폼 개발",
    titleEn: "Digital Innovation-Based Policy Platform for Mental Health Resilience in the Era of Climate Crisis",
    kind: "rnd",
    period: "2025.06 – 2026.03",
    funder: "한국연구재단",
    funderEn: "National Research Foundation of Korea",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "forest-model",
    title: "인공지능과 기후기술·정책 융합 기반 산림 통합평가모형 개발 및 국제화 기반 연구",
    titleEn: "AI and Climate Technology–Policy Integrated Forest Assessment Model and Internationalization Research",
    kind: "rnd",
    period: "2025.05 – 2026.02",
    funder: "과학기술정보통신부 우수신진연구",
    funderEn: "Ministry of Science and ICT (Outstanding Young Researcher Program)",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "forest-fire",
    title: "대형산불 대응 최적 진화 자원 진입로·대피로 분석과 이해관계자 맞춤형 정보공유 기술개발",
    titleEn: "Optimal Access/Evacuation Route Analysis for Wildfire Suppression and Stakeholder-Tailored Information Sharing",
    kind: "rnd",
    period: "2025.07 – 2026.02",
    funder: "산림청 · 한국임업진흥원",
    funderEn: "Korea Forest Service · Korea Forestry Promotion Institute",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "landslide-training",
    title: "산림산업 현장 맞춤형 인재양성(R&D): 산사태 통합관리 전문인력",
    titleEn: "Field-Tailored Workforce Training for the Forest Industry: Integrated Landslide Management Specialists",
    kind: "rnd",
    period: "2026.01 – 2026.12",
    funder: "산림청",
    funderEn: "Korea Forest Service",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "landslide-center",
    title: "산사태 통합관리 전문인력 양성 센터",
    titleEn: "Integrated Landslide Management Specialist Training Center",
    kind: "rnd",
    period: "2026.01 – ",
    funder: "산림청",
    funderEn: "Korea Forest Service",
    role: "참여연구원",
    roleEn: "Participating Researcher",
  },
  {
    id: "forest-road",
    title: "AI 기반 광역 임도망 배치 기술 개발",
    titleEn: "AI-Based Regional Forest Road Network Planning Technology",
    kind: "rnd",
    period: "2026.04 – ",
    funder: "산림청 · 한국임업진흥원",
    funderEn: "Korea Forest Service · Korea Forestry Promotion Institute",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "ecosystem-restoration",
    title: "생태계 가치 향상을 위한 생태계 복원기술개발",
    titleEn: "Ecosystem Restoration Technologies for Enhancing Ecosystem Value",
    kind: "rnd",
    period: "2026.04 – ",
    funder: "기후에너지환경부 · 한국환경산업기술원",
    funderEn: "Ministry of Climate, Energy and Environment · KEITI",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "climate-finance-risk",
    title: "기후리스크(물리적·전환)에 따른 기업의 재무적 영향도 분석 기술개발",
    titleEn: "Technology for Analyzing Corporate Financial Impacts of Physical and Transition Climate Risks",
    kind: "rnd",
    period: "2026.06 – ",
    funder: "기후에너지환경부 · 한국환경산업기술원",
    funderEn: "Ministry of Climate, Energy and Environment · KEITI",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "carbon-sink-grad",
    title: "국민대학교 탄소흡수원 특성화 대학원",
    titleEn: "Kookmin University Carbon Sink Specialized Graduate School Program",
    kind: "rnd",
    period: "2026.06 – ",
    funder: "한국임업진흥원",
    funderEn: "Korea Forestry Promotion Institute",
    role: "참여연구원",
    roleEn: "Participating Researcher",
  },
  // ── Commissioned (학술용역) ────────────────────────────────────────────
  {
    id: "unfccc",
    title: "UNFCCC 전문가 교육과정 번역과제",
    titleEn: "Translation of UNFCCC Expert Training Courses",
    kind: "commissioned",
    period: "2024.10 – 2024.11",
    funder: "국립산림과학원",
    funderEn: "National Institute of Forest Science",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "overseas-forest",
    title: "해외산림자원개발 지원 제도 분석",
    titleEn: "Analysis of Support Systems for Overseas Forest Resource Development",
    kind: "commissioned",
    period: "2025.10 – 2025.12",
    funder: "한국임업진흥원",
    funderEn: "Korea Forestry Promotion Institute",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
  {
    id: "bioclimate",
    title: "생물기후 연구 전문인력 양성(2026)",
    titleEn: "Training of Bioclimatic Research Specialists (2026)",
    kind: "commissioned",
    period: "2026.04 – 2026.12",
    funder: "국립생물자원관",
    funderEn: "National Institute of Biological Resources",
    role: "연구책임자",
    roleEn: "Principal Investigator",
    link: "/materials/생물기후_연구계획서.pdf",
  },
  {
    id: "compound-disaster",
    title: "복합 재해에 따른 기후 리스크 평가 연구(2026)",
    titleEn: "Climate Risk Assessment under Compound Disasters (2026)",
    kind: "commissioned",
    period: "2026.06 – 2026.12",
    funder: "기후에너지환경부 국립환경과학원",
    funderEn: "National Institute of Environmental Research",
    role: "연구보조원",
    roleEn: "Research Assistant",
  },
];
