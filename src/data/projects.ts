/* ═══════════════════════════════════════════════════════
   PROJECT DATA — Heedo Choi portfolio
   SOURCE: CV, HTML project files, PDF award docs
   Bilingual: EN default with KO fields.
   ═══════════════════════════════════════════════════════ */

export interface ProjectMetric {
  label: string;
  labelEn: string;
  value: string;
  valueEn?: string;
  highlight?: boolean; // renders in accent color
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  paper?: string;
  video?: string;
  doi?: string;
}

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  description: string;
  descriptionEn: string;
  longDescription: string;
  longDescriptionEn: string;
  tech: string[];
  category: "research" | "development" | "ML" | "data";
  metrics: ProjectMetric[];
  links: ProjectLinks;
  /** CSS gradient string used as visual thumbnail placeholder */
  thumbnail: string;
  featured: boolean;
  award?: string;
  awardEn?: string;
  year: number;
}

export const projects: Project[] = [
  /* ── 1. Journal: XAI for Climate Justice (Urban Climate) ── */
  {
    id: "urban-climate-paper",
    title: "기후정의를 위한 설명가능 GNN (Urban Climate 게재)",
    titleEn: "Explainable GNNs for Climate Justice — Published in Urban Climate",
    subtitle: "First-author SCIE paper · Urban Climate (IF 6.9)",
    description:
      "GAT와 IPCC AR6 프레임워크 기반 서울시 시공간 열 리스크 평가 연구를 SCIE 저널 Urban Climate(IF 6.9, 상위 6%)에 제1저자로 게재.",
    descriptionEn:
      "First-author paper in Urban Climate (IF 6.9, top 6%): a spatiotemporal attention-based urban heat risk assessment for Seoul, built on GAT and the IPCC AR6 framework.",
    longDescription:
      "기존 열 취약성 지수(HVI) 연구의 한계(주관적 가중치·블랙박스·검증 부재)를 극복하기 위해 IPCC AR6 위험 프레임워크의 4요소(Hazard·Exposure·Vulnerability·Adaptive Capacity)를 GAT 아키텍처에 직접 구현했습니다. 13,170개 시공간 관측값으로 학습했고, SHAP·GNNExplainer·Integrated Gradients 3종 XAI로 모델 해석을 교차검증했습니다. Choi, H., Park, J. S., & Lim, C.-H. (2026), Urban Climate, Article 102981.",
    longDescriptionEn:
      "To overcome the limits of conventional heat-vulnerability indices (subjective weighting, black-box models, lack of validation), the four components of the IPCC AR6 risk framework (Hazard, Exposure, Vulnerability, Adaptive Capacity) were embedded directly into a GAT architecture. Trained on 13,170 spatiotemporal observations and interpreted via three XAI methods (SHAP, GNNExplainer, Integrated Gradients). Choi, H., Park, J. S., & Lim, C.-H. (2026), Urban Climate, Article 102981.",
    tech: [
      "Python", "PyTorch", "GAT (Graph Attention Network)",
      "SHAP", "GNNExplainer", "Integrated Gradients",
      "IPCC AR6 Framework", "NASA LP DAAC", "LISA / Getis-Ord G*",
    ],
    category: "ML",
    metrics: [
      { label: "임팩트 팩터", labelEn: "Impact Factor", value: "6.9",    highlight: true },
      { label: "R²",          labelEn: "R²",            value: "0.9681", highlight: true },
      { label: "관측 수",     labelEn: "Observations",  value: "13,170" },
      { label: "XAI 기법",    labelEn: "XAI methods",   value: "3" },
      { label: "분야 순위",   labelEn: "Field rank",    value: "Top 6%" },
    ],
    links: {
      doi: "https://doi.org/10.1016/j.uclim.2026.102981",
      paper: "/materials/우수대학원생_발표.pdf",
    },
    thumbnail: "linear-gradient(135deg, #9F1239 0%, #E11D48 45%, #FB7185 100%)",
    featured: true,
    award: "Urban Climate (IF 6.9) 제1저자 게재",
    awardEn: "Published in Urban Climate (IF 6.9)",
    year: 2026,
  },

  /* ── 2. GAT-LSTM vulnerability prediction ── */
  {
    id: "gat-lstm-vulnerability",
    title: "서울시 읍·면·동 기후변화 취약성 예측",
    titleEn: "Seoul Climate Vulnerability Prediction (GAT-LSTM)",
    subtitle: "GAT-LSTM Spatiotemporal Model — 2100 SSP Scenarios",
    description:
      "기후·위성·사회·인구 다차원 데이터 융합 GAT-LSTM 모델로 서울시 467개 읍면동 취약성을 2100년까지 예측. 환경부 2025 환경데이터 공모전 우수상.",
    descriptionEn:
      "A GAT-LSTM model fusing climate, satellite, social and demographic data to predict vulnerability for 467 Seoul administrative dongs through 2100. Excellence Award at the 2025 Environmental Data Contest.",
    longDescription:
      "MKPRISMv21 기후 데이터, SSP 시나리오(SSP1~SSP5), 인구통계, NASA 원격탐사(NDVI/EVI/LST)를 통합한 GAT-LSTM 시공간 모델입니다. 서울시 467개 읍면동 단위 고해상도 취약성 지도를 생성하며 2100년까지 장기 예측과 시나리오별 비교를 지원합니다. 11개 관련 법령 기반 정책 활용방안을 도출했습니다. 2025 환경데이터 활용 및 분석 공모전 우수상(국립공원공단이사장상, 상금 250만원).",
    longDescriptionEn:
      "A GAT-LSTM spatiotemporal model integrating MKPRISMv21 climate data, SSP scenarios (SSP1–SSP5), demographics, and NASA remote sensing (NDVI/EVI/LST). It generates high-resolution vulnerability maps for 467 Seoul administrative dongs, supporting long-term projection to 2100 and scenario comparison, with policy applications grounded in 11 related laws. Excellence Award (Korea National Park Service Chairman's Award, ₩2.5M) at the 2025 Environmental Data Utilization & Analysis Contest.",
    tech: [
      "Python", "GAT (Graph Attention Network)", "LSTM", "PCA",
      "MKPRISMv21", "NASA LP DAAC (Earthdata)", "SSP Scenarios (1~5)",
      "NDVI / EVI / LST", "GIS",
    ],
    category: "ML",
    metrics: [
      { label: "분석 단위",    labelEn: "Units",       value: "467 동", valueEn: "467 dongs",       highlight: true },
      { label: "예측 기간",    labelEn: "Horizon",     value: "~2100" },
      { label: "시나리오",     labelEn: "Scenarios",   value: "SSP1–SSP5" },
      { label: "관련 법령",    labelEn: "Laws",        value: "11" },
      { label: "수상",         labelEn: "Award",       value: "우수상 ₩2.5M", valueEn: "Excellence ₩2.5M", highlight: true },
    ],
    links: {
      paper: "/materials/환경데이터공모전_수상작.pdf",
      video: "https://www.youtube.com/watch?v=jxCs3xLc0wY",
    },
    thumbnail: "linear-gradient(135deg, #065F46 0%, #059669 50%, #34D399 100%)",
    featured: true,
    award: "2025 환경데이터 공모전 우수상 (상금 250만원)",
    awardEn: "2025 Environmental Data Contest — Excellence Award (₩2.5M)",
    year: 2025,
  },

  /* ── 3. GCN urban heat island ── */
  {
    id: "gcn-urban-heat",
    title: "시공간 GCN을 활용한 도시열섬 리스크 평가",
    titleEn: "Urban Heat Island Risk Assessment (Spatiotemporal GCN)",
    subtitle: "Spatiotemporal GCN — Seoul Urban Heat Island",
    description:
      "시공간 그래프 신경망(GCN)으로 서울시 자치구 도시열섬 리스크를 정량화. 2025 한국기후변화학회 춘계 최우수포스터논문상 수상.",
    descriptionEn:
      "Quantifying urban heat island risk across Seoul's districts with a spatiotemporal GCN. Best Poster Paper Award at the KSCCR 2025 Spring Conference.",
    longDescription:
      "도시열섬 현상의 복잡한 시공간 패턴을 그래프 신경망으로 모델링하여 서울시 25개 자치구 단위의 열 리스크를 분석했습니다. 취약 지역과 취약 시기를 정량적으로 규명하고 선제적 대응 방안을 제안했습니다. 2025 한국기후변화학회 춘계학술대회 최우수포스터논문상을 수상했습니다.",
    longDescriptionEn:
      "Modeling the complex spatiotemporal patterns of the urban heat island effect with graph neural networks to assess heat risk across Seoul's 25 districts. The study identifies vulnerable areas and periods quantitatively and proposes proactive responses. Best Poster Paper Award at the KSCCR 2025 Spring Conference.",
    tech: ["Python", "GCN (Graph Convolutional Network)", "Spatial Analysis", "Climate Data", "Urban Remote Sensing"],
    category: "ML",
    metrics: [
      { label: "분석 대상", labelEn: "Scope",     value: "서울 25구", valueEn: "Seoul · 25 districts" },
      { label: "MSE",       labelEn: "MSE",        value: "0.0397",  highlight: true },
      { label: "Moran's I", labelEn: "Moran's I",  value: "0.73" },
      { label: "수상",      labelEn: "Award",      value: "최우수포스터", valueEn: "Best Poster", highlight: true },
    ],
    links: { paper: "/materials/기후변화학회_발표.pdf" },
    thumbnail: "linear-gradient(135deg, #0F2347 0%, #2563EB 60%, #60A5FA 100%)",
    featured: false,
    award: "한국기후변화학회 2025 최우수포스터논문상",
    awardEn: "KSCCR 2025 — Best Poster Paper Award",
    year: 2025,
  },

  /* ── 4. Commercial risk platform ── */
  {
    id: "commercial-risk-platform",
    title: "서울시 상권 위험도 분석 통합 플랫폼",
    titleEn: "Seoul Commercial District Risk Platform",
    subtitle: "Full-Stack Web Platform — Real-Time Risk Monitoring",
    description:
      "정책 시뮬레이션·알림 모니터링·경제 파급효과·업종별 리스크·인터랙티브 맵 5개 모듈로 구성된 서울시 상권 위험도 분석 플랫폼. Netlify 배포.",
    descriptionEn:
      "A Seoul commercial-district risk platform with five modules: policy simulation, alert monitoring, economic ripple analysis, sector risk profiles, and interactive maps. Deployed on Netlify.",
    longDescription:
      "빅데이터 기반 서울시 상권 위험도를 실시간으로 모니터링하고 정책 효과를 시뮬레이션하는 통합 플랫폼입니다. 정책 시뮬레이션·위험도 알림 모니터링·Sankey 다이어그램 기반 경제 파급효과 분석·업종별 리스크 프로파일·지역별 인터랙티브 맵의 5개 분석 모듈로 구성됩니다.",
    longDescriptionEn:
      "An integrated platform that monitors Seoul commercial-district risk in real time and simulates policy effects using big data. It comprises five analytical modules: policy simulation, risk alert monitoring, Sankey-diagram economic ripple analysis, sector-level risk profiles, and a region-level interactive map.",
    tech: ["HTML5", "CSS3", "JavaScript", "Sankey Diagram", "Interactive Maps", "Netlify"],
    category: "development",
    metrics: [
      { label: "분석 모듈",     labelEn: "Modules",    value: "5",            highlight: true },
      { label: "모니터링 상권", labelEn: "Districts",  value: "25" },
      { label: "배포",          labelEn: "Deploy",     value: "Netlify Live", highlight: true },
      { label: "시각화",        labelEn: "Viz",        value: "Sankey" },
    ],
    links: { demo: "https://seoul-commercial-district-risk.netlify.app" },
    thumbnail: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #3B82F6 100%)",
    featured: true,
    year: 2025,
  },

  /* ── 5. Youth safety map ── */
  {
    id: "youth-safety-map",
    title: "서울시 청년 1인가구 생활안전망 통합 시스템",
    titleEn: "Seoul Youth Single-Household Safety-Net System",
    subtitle: "React Full-Stack — 25-District AI Recommendation",
    description:
      "서울시 25개 자치구 청년 1인가구 생활안전망 종합 점수 분석 및 AI 개인화 추천. React.js 기반 6개 뷰 풀스택 플랫폼.",
    descriptionEn:
      "Composite safety-net scoring and AI-personalized recommendations for young single-person households across Seoul's 25 districts. A React full-stack platform with six views.",
    longDescription:
      "관악구 종합 점수 1위(76점), 1인가구 136,255명 등 실제 데이터 기반 분석 플랫폼입니다. 메인 대시보드·3D 홀로그램·정책 시뮬레이션·AI 추천 엔진·CSV 분석·통합 플랫폼 6개 뷰를 제공하며, 안전성·편의성·경제성·커뮤니티 4축 레이더 차트로 자치구별 상세 분석이 가능합니다. TypeScript + Tailwind CSS + Recharts로 구현했습니다.",
    longDescriptionEn:
      "A data-driven platform (Gwanak-gu ranked first with 76 points; 136,255 single-person households). It offers six views — main dashboard, 3D hologram, policy simulation, AI recommendation engine, CSV analysis, and integrated platform — with per-district radar charts across four axes (safety, convenience, affordability, community). Built with TypeScript, Tailwind CSS, and Recharts.",
    tech: ["React.js", "TypeScript", "Recharts", "Tailwind CSS", "Radar Chart", "Netlify"],
    category: "development",
    metrics: [
      { label: "1위 자치구",   labelEn: "Top district", value: "관악 76점", valueEn: "Gwanak · 76 pts",  highlight: true },
      { label: "분석 자치구",  labelEn: "Districts",    value: "25" },
      { label: "1인가구 수",   labelEn: "Households",   value: "136,255" },
      { label: "분석 뷰",      labelEn: "Views",        value: "6" },
    ],
    links: { demo: "https://seoul-youth-platform.netlify.app" },
    thumbnail: "linear-gradient(135deg, #0F172A 0%, #1E40AF 40%, #7C3AED 100%)",
    featured: true,
    year: 2025,
  },

  /* ── 6. Vulnerability web map ── */
  {
    id: "vulnerability-map",
    title: "서울시 기후변화 취약성 지도 분석 시스템",
    titleEn: "Seoul Climate Vulnerability Web Map",
    subtitle: "Web GIS — Leaflet.js + D3.js + Chart.js",
    description:
      "서울시 자치구별 기후변화 취약성을 인터랙티브 지도로 시각화하는 풀스택 Web GIS. Leaflet·D3·Chart.js 3종 라이브러리 복합 구현.",
    descriptionEn:
      "A full-stack Web GIS visualizing Seoul's district-level climate vulnerability on an interactive map, combining three libraries — Leaflet, D3, and Chart.js.",
    longDescription:
      "Leaflet.js로 GeoJSON 공간 데이터를 인터랙티브 지도에 렌더링하고, D3.js로 고급 데이터 시각화, Chart.js로 통계 차트를 구현했습니다. 자치구 클릭 시 기후변화 취약성 지수와 세부 지표를 팝업으로 제공하며, 서울시 25개 자치구 전체를 색상 단계 지도(choropleth)로 표현합니다.",
    longDescriptionEn:
      "Leaflet.js renders GeoJSON spatial data on an interactive map, D3.js powers advanced visualizations, and Chart.js draws statistical charts. Clicking a district reveals its climate-vulnerability index and detailed indicators in a popup, with all 25 districts shown as a choropleth.",
    tech: ["HTML5", "CSS3", "JavaScript", "Leaflet.js", "D3.js", "Chart.js", "GeoJSON"],
    category: "data",
    metrics: [
      { label: "시각화 라이브러리", labelEn: "Libraries", value: "3종", valueEn: "3 libs" },
      { label: "분석 자치구",       labelEn: "Districts", value: "25" },
      { label: "지도 유형",         labelEn: "Map type",  value: "Choropleth" },
    ],
    links: { demo: "https://zxsa0716.github.io/vulnerability_seoul/seoul_vulnerability_dashboard.html" },
    thumbnail: "linear-gradient(135deg, #064E3B 0%, #047857 50%, #34D399 100%)",
    featured: false,
    year: 2025,
  },
];

/* ── Derived helpers ── */
export const featuredProjects  = projects.filter((p) => p.featured);
export const projectsByCategory = (cat: Project["category"] | "all") =>
  cat === "all" ? projects : projects.filter((p) => p.category === cat);

export const CATEGORY_META = {
  all:         { label: "전체",        labelEn: "All",        count: projects.length },
  ML:          { label: "AI · ML",     labelEn: "AI · ML",    count: projects.filter((p) => p.category === "ML").length },
  research:    { label: "연구 · 논문", labelEn: "Research",   count: projects.filter((p) => p.category === "research").length },
  development: { label: "웹 개발",     labelEn: "Web Dev",    count: projects.filter((p) => p.category === "development").length },
  data:        { label: "데이터 분석", labelEn: "Data",       count: projects.filter((p) => p.category === "data").length },
} as const;
