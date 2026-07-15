// ── Journal article, conference papers and academic presentations ─────────
// Data sourced from: CV (2026.06), DOI metadata, award certificates
// Ordered by date (newest first)

export interface PublicationMetric {
  label: string;
  labelEn: string;
  value: string;
  valueEn?: string;
  highlight?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  titleEn: string;
  venue: string;
  venueEn: string;
  venueType: "journal" | "conference" | "competition" | "program";
  date: string;
  year: number;
  role: string;
  roleEn: string;
  award?: string;
  awardEn?: string;
  prizeAmount?: string;
  prizeAmountEn?: string;
  metrics?: PublicationMetric[];
  tags: string[];
  tagsEn?: string[];   // EN 모드 태그(없으면 tags 사용)
  doi?: string;
  paper?: string;   // /materials/ 경로 또는 외부 URL
  video?: string;
}

export const publications: Publication[] = [
  // ── Journal (SCIE) ──────────────────────────────────────────────────────
  {
    id: "urban-climate-2026",
    title:
      "설명가능 그래프 신경망을 통한 기후정의: IPCC AR6 프레임워크 기반 시공간 어텐션 도시 열 리스크 평가",
    titleEn:
      "Climate justice through explainable graph neural networks: A spatiotemporal attention-based urban heat risk assessment under IPCC AR6 framework",
    venue: "Urban Climate · Choi, H., Park, J. S., & Lim, C.-H. (2026)",
    venueEn: "Urban Climate · Choi, H., Park, J. S., & Lim, C.-H. (2026)",
    venueType: "journal",
    date: "2026",
    year: 2026,
    role: "제1저자 · SCIE 논문",
    roleEn: "First author · SCIE journal",
    metrics: [
      { label: "임팩트 팩터",  labelEn: "Impact Factor", value: "6.9",      highlight: true },
      { label: "CiteScore",   labelEn: "CiteScore",     value: "12.2",     highlight: true },
      { label: "분야 순위",    labelEn: "Field rank",    value: "상위 6%", valueEn: "Top 6%" },
      { label: "논문 번호",    labelEn: "Article",       value: "102981" },
    ],
    tags: ["GAT", "XAI", "IPCC AR6", "Urban Climate", "Climate Justice"],
    doi: "https://doi.org/10.1016/j.uclim.2026.102981",
  },

  // ── 2026 presentations ──────────────────────────────────────────────────
  {
    id: "forest-ai-competition",
    title: "다목적 산림경영 의사결정 지원 AI",
    titleEn: "Multi-objective forest management decision-support AI",
    venue: "제1회 산림과학 AI활용 경진대회 (국립산림과학원) · 팀 ‘산림의 국민’",
    venueEn: "1st Forest Science AI Competition (NIFoS) · Team",
    venueType: "competition",
    date: "2026.07.24",
    year: 2026,
    role: "대상 (AI서비스창출상) · 팀장",
    roleEn: "Grand Prize (AI Service Creation) · Team lead",
    award: "대상 (AI서비스창출상)",
    awardEn: "Grand Prize (AI Service Creation)",
    prizeAmount: "상금 200만원",
    prizeAmountEn: "₩2M prize",
    metrics: [
      { label: "위성 바이오매스", labelEn: "Satellite biomass", value: "R² 0.479 · 90% PI 0.916", highlight: true },
      { label: "경영 시나리오",   labelEn: "Scenarios",         value: "6개 NPV 비교", valueEn: "6 NPV scenarios", highlight: true },
      { label: "처리 모듈",       labelEn: "Modules",           value: "5모듈 (A–E)", valueEn: "5 (A–E)" },
      { label: "학습 라벨",       labelEn: "Training labels",   value: "NASA GEDI 11,026" },
    ],
    tags: ["위성 바이오매스", "산림경영 의사결정", "GEDI", "탄소중립", "LLM"],
    tagsEn: ["Satellite biomass", "Forest management", "GEDI", "Carbon neutrality", "LLM"],
    paper: "/materials/산림AI경진대회_수상작.pdf",
  },
  {
    id: "ax-ghg-disclosure",
    title:
      "위성 영상을 활용한 온실가스 공시 4중 검증",
    titleEn:
      "Quadruple verification of greenhouse-gas disclosure using satellite imagery",
    venue: "2026 기후에너지환경부 AX 아이디어 경진대회 (한전KDN·한국남동발전)",
    venueEn: "2026 MCEE AX Idea Competition (KEPCO KDN · KOEN)",
    venueType: "competition",
    date: "2026.07.02",
    year: 2026,
    role: "우수상",
    roleEn: "Excellence Award",
    award: "우수상",
    awardEn: "Excellence Award",
    prizeAmount: "상금 300만원",
    prizeAmountEn: "₩3M prize",
    metrics: [
      { label: "검증 체계", labelEn: "Verification", value: "위성 기반 4중 검증", valueEn: "4-layer satellite", highlight: true },
      { label: "주최",      labelEn: "Host",         value: "기후에너지환경부", valueEn: "MCEE" },
    ],
    tags: ["위성영상", "온실가스 공시", "MRV", "AX"],
    tagsEn: ["Satellite imagery", "GHG disclosure", "MRV", "AX"],
    paper: "/materials/AX경진대회_수상작.pdf",
  },
  {
    id: "heatwave-budget",
    title:
      "폭염 대응 예산의 사망 감소 효과와 최적 배분: 서울시 25개 자치구를 중심으로",
    titleEn:
      "Mortality reduction effects and optimal allocation of heatwave response budgets: the 25 districts of Seoul",
    venue: "2026 한국기후변화학회 춘계학술대회",
    venueEn: "KSCCR 2026 Spring Conference",
    venueType: "conference",
    date: "2026",
    year: 2026,
    role: "제1저자 · 구두 발표",
    roleEn: "First author · Oral presentation",
    tags: ["폭염", "예산 최적화", "사망 감소", "서울시 25구"],
    tagsEn: ["Heatwave", "Budget optimization", "Mortality reduction", "Seoul 25 districts"],
    paper: "/materials/폭염예산_구두발표.pdf",
  },
  {
    id: "indochina-fire",
    title:
      "기후변화가 산불소실면적 추세에 미치는 영향: 인도차이나 반도를 중심으로",
    titleEn:
      "Impact of climate change on burned area trends: focusing on the Indochinese Peninsula",
    venue: "2026 한국기후변화학회 춘계학술대회",
    venueEn: "KSCCR 2026 Spring Conference",
    venueType: "conference",
    date: "2026",
    year: 2026,
    role: "제2저자 · 포스터 발표",
    roleEn: "Second author · Poster",
    tags: ["산불", "소실면적", "인도차이나", "기후변화 추세"],
    tagsEn: ["Wildfire", "Burned area", "Indochina", "Climate trend"],
    paper: "/materials/인도차이나산불_포스터.pdf",
  },
  {
    id: "forest-ews",
    title:
      "강원도 산림 생태계 복원력 분석: EWS 기반 시계열 분석 및 AR(1) 지표를 중심으로",
    titleEn:
      "Resilience analysis of forest ecosystems in Gangwon Province: EWS-based time-series analysis with AR(1) indicators",
    venue: "2026 산림과학 공동학술대회",
    venueEn: "2026 Joint Conference of Korean Forest Science Societies",
    venueType: "conference",
    date: "2026.02",
    year: 2026,
    role: "제2저자 · 포스터 발표",
    roleEn: "Second author · Poster",
    metrics: [
      { label: "데이터",     labelEn: "Data",       value: "Landsat 1990–2025", highlight: true },
      { label: "공간해상도", labelEn: "Resolution", value: "30m (GEE)" },
      { label: "방법론",     labelEn: "Method",     value: "STL + EWS + AR(1)" },
      { label: "대상",       labelEn: "Region",     value: "강원도 침엽수림", valueEn: "Gangwon conifers",   highlight: true },
    ],
    tags: ["EWS", "STL", "AR(1)", "Forest Resilience", "Google Earth Engine"],
    paper: "/materials/산림과학회_포스터.pdf",
  },

  // ── 2025 ──────────────────────────────────────────────────────────────
  {
    id: "xai-heat",
    title:
      "기후정의를 위한 설명가능 인공지능(XAI): GAT와 AR6 프레임워크 기반 서울시 시공간 열 리스크 평가",
    titleEn:
      "Explainable AI (XAI) for climate justice: GAT- and AR6 framework-based spatiotemporal heat risk assessment of Seoul",
    venue:
      "한국기후변화학회 2025년 하반기 학술대회 우수대학원생지원프로그램",
    venueEn: "KSCCR 2025 Fall Conference · Outstanding Graduate Student Program",
    venueType: "program",
    date: "2025.12",
    year: 2025,
    role: "제1저자 · 구두 발표",
    roleEn: "First author · Oral presentation",
    award: "입상",
    awardEn: "Prize Winner",
    metrics: [
      { label: "R²",       labelEn: "R²",          value: "0.9681", highlight: true },
      { label: "RMSE",     labelEn: "RMSE",        value: "0.162" },
      { label: "관측 수",  labelEn: "Observations",value: "13,170" },
      { label: "XAI 기법", labelEn: "XAI methods", value: "3종", valueEn: "3 methods",   highlight: true },
    ],
    tags: ["GAT", "XAI", "SHAP", "AR6", "Climate Justice"],
    paper: "/materials/우수대학원생_발표.pdf",
  },
  {
    id: "gat-lstm-comp",
    title:
      "기후 시나리오를 활용한 GAT-LSTM을 통한 기후 취약성 예측: 서울시 읍면동 대상으로",
    titleEn:
      "Climate vulnerability prediction using GAT-LSTM with climate scenarios: Seoul administrative dongs",
    venue: "2025 환경데이터 활용 및 분석 공모전 (직접분석 부문)",
    venueEn: "2025 Environmental Data Utilization & Analysis Contest",
    venueType: "competition",
    date: "2025.11",
    year: 2025,
    role: "제1저자",
    roleEn: "First author",
    award: "우수상 (국립공원공단이사장상)",
    awardEn: "Excellence Award (Korea National Park Service Chairman's Award)",
    prizeAmount: "상금 250만원",
    prizeAmountEn: "₩2.5M prize",
    metrics: [
      { label: "분석 단위",   labelEn: "Units",     value: "467 읍면동", valueEn: "467 dongs",  highlight: true },
      { label: "시나리오",    labelEn: "Scenarios", value: "SSP1–SSP5" },
      { label: "예측 기간",   labelEn: "Horizon",   value: "~ 2100" },
      { label: "앙상블 모델", labelEn: "Model",     value: "GAT + LSTM",  highlight: true },
    ],
    tags: ["GAT", "LSTM", "SSP", "Vulnerability", "Spatial Prediction"],
    paper: "/materials/환경데이터공모전_수상작.pdf",
    video: "https://www.youtube.com/watch?v=jxCs3xLc0wY",
  },
  {
    id: "gcn-uhi",
    title:
      "시공간 그래프 신경망(GCN)을 활용한 서울시의 도시열섬 리스크 평가",
    titleEn:
      "Urban heat island risk assessment of Seoul using spatiotemporal graph convolutional networks (GCN)",
    venue: "한국기후변화학회 2025년 춘계학술대회",
    venueEn: "KSCCR 2025 Spring Conference",
    venueType: "conference",
    date: "2025.06",
    year: 2025,
    role: "제1저자 · 포스터 발표",
    roleEn: "First author · Poster",
    award: "최우수포스터논문상",
    awardEn: "Best Poster Paper Award",
    metrics: [
      { label: "MSE",       labelEn: "MSE",        value: "0.0397", highlight: true },
      { label: "Moran's I", labelEn: "Moran's I",  value: "0.73",   highlight: true },
      { label: "클러스터",  labelEn: "Clusters",   value: "5" },
      { label: "R² (검증)", labelEn: "R² (val.)",  value: "0.513" },
    ],
    tags: ["GCN", "Urban Heat Island", "Spatial Statistics", "Seoul"],
    paper: "/materials/기후변화학회_발표.pdf",
  },
  {
    id: "flood-inequality",
    title:
      "기후불평등·홍수리스크 완화를 위한 적응의 비용 및 효과 평가: 서울시 자치구를 대상으로",
    titleEn:
      "Cost and effectiveness evaluation of adaptation for mitigating climate inequality and flood risk: districts of Seoul",
    venue: "한국기후변화학회 2025년 춘계학술대회",
    venueEn: "KSCCR 2025 Spring Conference",
    venueType: "conference",
    date: "2025.06",
    year: 2025,
    role: "제2저자 · 구두 발표",
    roleEn: "Second author · Oral presentation",
    award: "최우수발표논문상",
    awardEn: "Best Presentation Paper Award",
    metrics: [
      { label: "분석 대상", labelEn: "Scope",  value: "서울 25구", valueEn: "Seoul · 25 districts" },
      { label: "방법론",    labelEn: "Method", value: "비용·효과 분석", valueEn: "Cost–benefit analysis" },
    ],
    tags: ["Climate Inequality", "Flood Risk", "Adaptation Cost"],
  },
  {
    id: "pcar-biz",
    title: "기후적응플랫폼 PCAR 금융상품",
    titleEn: "PCAR: a climate-adaptation platform financial product",
    venue: "2025학년도 국민대학교 기후변화대응 비즈니스 아이디어 공모전",
    venueEn: "2025 Kookmin University Climate Change Response Business Idea Contest",
    venueType: "competition",
    date: "2025.12",
    year: 2025,
    role: "발표자",
    roleEn: "Presenter",
    award: "장려상",
    awardEn: "Encouragement Award",
    tags: ["Climate Finance", "Carbon Neutrality"],
  },
];
