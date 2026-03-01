/* ═══════════════════════════════════════════════════════
   PROJECT DATA — 최희도 포트폴리오
   SOURCE: 내경력.txt, HTML project files, PDF award docs
   RULE: Every number & title verified from actual files.
   ═══════════════════════════════════════════════════════ */

export interface ProjectMetric {
  label: string;
  value: string;
  highlight?: boolean; // renders in accent color
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  paper?: string;
  video?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: "research" | "development" | "ML" | "data";
  metrics: ProjectMetric[];
  links: ProjectLinks;
  /** CSS gradient string used as visual thumbnail placeholder */
  thumbnail: string;
  featured: boolean;
  award?: string;
  year: number;
}

export const projects: Project[] = [
  /* ──────────────────────────────────────────────────────
     1. XAI for Climate Justice — 기후정의를 위한 XAI
        Source: 내경력.txt, 한국기후변화학회 수상 증서
        Category: ML (featured)
     ────────────────────────────────────────────────────── */
  {
    id: "xai-heat-risk",
    title: "기후정의를 위한 설명가능 인공지능(XAI)",
    subtitle: "GAT + IPCC AR6 Framework — Seoul Spatiotemporal Heat Risk",
    description:
      "GAT와 IPCC AR6 프레임워크 기반 서울시 시공간 열 리스크 평가. 블랙박스 문제를 SHAP·GNNExplainer·Integrated Gradients 3종 XAI로 해결한 물리 제약 모델.",
    longDescription:
      "기존 열 취약성 지수(HVI) 연구의 한계(주관적 가중치, 블랙박스, 검증 부재)를 극복하기 위해 IPCC AR6 위험 프레임워크의 4요소(Hazard·Exposure·Vulnerability·Adaptive Capacity)를 GAT 아키텍처에 직접 구현했습니다. 13,170개 시공간 관측값으로 학습하였으며, Spatial Block CV 전 권역에서 안정적인 성능(R² 0.9675~0.9691), Temporal Forward CV 3년 연속 미래 예측 성능을 검증했습니다. NHIS/KDCA 실제 건강 데이터와의 비선형 외부 검증으로 실증적 타당성을 확보했습니다. 2025 한국기후변화학회 우수대학원생지원프로그램 구두발표 입상작.",
    tech: [
      "Python",
      "PyTorch",
      "GAT (Graph Attention Network)",
      "SHAP",
      "GNNExplainer",
      "Integrated Gradients",
      "IPCC AR6 Framework",
      "NASA LP DAAC",
      "LISA / Getis-Ord G*",
      "NHIS / KDCA",
    ],
    category: "ML",
    metrics: [
      { label: "R²",              value: "0.9681",      highlight: true },
      { label: "RMSE",            value: "0.162" },
      { label: "Observations",    value: "13,170" },
      { label: "XAI Methods",     value: "3종 교차검증" },
      { label: "Spatial Block CV",value: "0.9675~0.9691" },
    ],
    links: {
      paper: "/materials/우수대학원생_발표.pdf",
    },
    thumbnail: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 50%, #06B6D4 100%)",
    featured: true,
    award: "한국기후변화학회 우수대학원생지원프로그램 입상 (2025.12.05)",
    year: 2025,
  },

  /* ──────────────────────────────────────────────────────
     2. GAT-LSTM 기후취약성 예측
        Source: 내경력.txt, 환경데이터활용공모전 수상작.pdf
        Category: ML (featured)
     ────────────────────────────────────────────────────── */
  {
    id: "gat-lstm-vulnerability",
    title: "서울시 읍·면·동 기후변화 취약성 예측",
    subtitle: "GAT-LSTM Spatiotemporal Model — 2100 SSP Scenarios",
    description:
      "기후·위성·사회·인구 다차원 데이터 융합 GAT-LSTM 모델로 서울시 467개 읍면동 취약성을 2100년까지 예측. 환경부 2025 환경데이터 활용 공모전 우수상 (상금 250만원).",
    longDescription:
      "MKPRISMv21 기후 데이터, SSP 시나리오(SSP1~SSP5), 인구통계, NASA 원격탐사(NDVI/EVI/LST)를 통합한 GAT-LSTM 시공간 모델입니다. 서울시 467개 읍면동 단위 고해상도 취약성 지도를 생성하며 2100년까지의 장기 예측과 시나리오별 비교를 지원합니다. 11개 관련 법령 기반 정책 활용방안을 도출하여 실제 행정 활용 가능성을 입증했습니다. YouTube 시연 영상 2편 공개. 2025 환경데이터 활용 및 분석 공모전 우수상(국립공원공단이사장상) 수상.",
    tech: [
      "Python",
      "GAT (Graph Attention Network)",
      "LSTM",
      "PCA",
      "MKPRISMv21",
      "NASA LP DAAC (Earthdata)",
      "SSP Scenarios (1~5)",
      "NDVI / EVI / LST",
      "GIS",
    ],
    category: "ML",
    metrics: [
      { label: "분석 단위",        value: "467개 읍면동",  highlight: true },
      { label: "예측 기간",        value: "2100년까지" },
      { label: "SSP 시나리오",     value: "SSP1~SSP5" },
      { label: "관련 법령",        value: "11개 기반" },
      { label: "수상",             value: "우수상 250만원", highlight: true },
    ],
    links: {
      paper: "/materials/환경데이터공모전_수상작.pdf",
      video: "https://www.youtube.com/watch?v=jxCs3xLc0wY",
    },
    thumbnail: "linear-gradient(135deg, #065F46 0%, #059669 50%, #34D399 100%)",
    featured: true,
    award: "2025 환경데이터 활용 및 분석 공모전 우수상 — 국립공원공단이사장상 (상금 250만원)",
    year: 2025,
  },

  /* ──────────────────────────────────────────────────────
     3. GCN 도시열섬 리스크 평가
        Source: 내경력.txt, 한국기후변화학회 최우수포스터논문상
        Category: ML
     ────────────────────────────────────────────────────── */
  {
    id: "gcn-urban-heat",
    title: "시공간 GCN을 활용한 도시열섬 리스크 평가",
    subtitle: "Spatiotemporal GCN — Seoul Urban Heat Island",
    description:
      "시공간 그래프 신경망(GCN)으로 서울시 자치구 도시열섬 리스크를 정량화. 2025 한국기후변화학회 춘계 학술대회 최우수포스터논문상 수상.",
    longDescription:
      "도시열섬 현상의 복잡한 시공간 패턴을 그래프 신경망으로 모델링하여 서울시 25개 자치구 단위의 열 리스크를 시공간적으로 분석했습니다. 취약 지역과 취약 시기를 정량적으로 규명하고 선제적 대응 방안을 제안했습니다. 2025년도 기후변화춘계학회 포스터 발표에서 최우수포스터논문상을 수상했습니다. 동 학회에서 기후불평등·홍수리스크 논문 구두발표(2저자)도 최우수발표논문상을 수상하였습니다.",
    tech: [
      "Python",
      "GCN (Graph Convolutional Network)",
      "Spatial Analysis",
      "Climate Data",
      "Urban Remote Sensing",
    ],
    category: "ML",
    metrics: [
      { label: "분석 대상",        value: "서울시 25개 자치구" },
      { label: "발표 학회",        value: "기후변화춘계학회 2025" },
      { label: "수상",             value: "최우수포스터논문상", highlight: true },
      { label: "추가 수상",        value: "최우수발표논문상 (2저자)" },
    ],
    links: {
      paper: "/materials/기후변화학회_발표.pdf",
    },
    thumbnail: "linear-gradient(135deg, #0F2347 0%, #2563EB 60%, #60A5FA 100%)",
    featured: false,
    award: "한국기후변화학회 2025 상반기 최우수포스터논문상",
    year: 2025,
  },

  /* ──────────────────────────────────────────────────────
     4. 서울시 상권 위험도 분석 통합 플랫폼
        Source: 서울시 상권 위험도 분석 통합 플랫폼.html
        Category: development (featured, live)
     ────────────────────────────────────────────────────── */
  {
    id: "commercial-risk-platform",
    title: "서울시 상권 위험도 분석 통합 플랫폼",
    subtitle: "Full-Stack Web Platform — Real-Time Risk Monitoring",
    description:
      "정책 시뮬레이션·알림 모니터링·경제 파급효과·업종별 리스크·인터랙티브 맵 5개 모듈로 구성된 서울시 상권 위험도 분석 통합 플랫폼. Netlify 배포 완료.",
    longDescription:
      "빅데이터 기반 서울시 상권 위험도를 실시간으로 모니터링하고 정책 효과를 시뮬레이션하는 통합 플랫폼입니다. 정책 시뮬레이션·위험도 알림 모니터링·Sankey 다이어그램 기반 경제 파급효과 분석·업종별 리스크 프로파일·지역별 인터랙티브 맵의 5개 분석 모듈로 구성됩니다. 25개 상권 실시간 모니터링 및 선제적 정책 수립 지원을 목표로 합니다.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Sankey Diagram",
      "Interactive Maps",
      "Netlify",
    ],
    category: "development",
    metrics: [
      { label: "분석 모듈",        value: "5개",           highlight: true },
      { label: "모니터링 상권",    value: "25개" },
      { label: "배포",             value: "Netlify Live",   highlight: true },
      { label: "시각화",           value: "Sankey 다이어그램" },
    ],
    links: {
      demo: "https://seoul-commercial-district-risk.netlify.app",
    },
    thumbnail: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #3B82F6 100%)",
    featured: true,
    year: 2025,
  },

  /* ──────────────────────────────────────────────────────
     5. 서울시 청년 1인가구 생활안전망 통합 시스템
        Source: 최희도_서울시청년안전망지도.html (React app)
        Category: development (featured, live)
     ────────────────────────────────────────────────────── */
  {
    id: "youth-safety-map",
    title: "서울시 청년 1인가구 생활안전망 통합 시스템",
    subtitle: "React Full-Stack — 25개 자치구 AI 추천 플랫폼",
    description:
      "서울시 25개 자치구 청년 1인가구 생활안전망 종합 점수 분석 및 AI 개인화 추천. React.js 기반 6개 뷰 풀스택 플랫폼. 관악구 종합 1위(76점) 산출.",
    longDescription:
      "관악구 종합 점수 1위(76점), 월평균 임대료 37.2만원, 1인가구 136,255명(남 71,434·여 64,821), 범죄율 35.0건/천명 등 실제 데이터 기반 분석 플랫폼입니다. 메인 대시보드·3D 홀로그램·정책 시뮬레이션·AI 추천 엔진·CSV 분석·통합 플랫폼 6개 뷰를 제공하며, 안전성·편의성·경제성·커뮤니티 4축 레이더 차트로 자치구별 상세 분석이 가능합니다. Create React App 기반, TypeScript + Tailwind CSS + Recharts로 구현했습니다.",
    tech: [
      "React.js",
      "TypeScript",
      "Recharts",
      "Tailwind CSS",
      "Radar Chart",
      "Netlify",
    ],
    category: "development",
    metrics: [
      { label: "관악구 종합 점수", value: "76점 (1위)",    highlight: true },
      { label: "분석 자치구",      value: "25개" },
      { label: "1인가구 수",       value: "136,255명" },
      { label: "월평균 임대료",    value: "37.2만원" },
      { label: "분석 뷰",          value: "6개 뷰" },
    ],
    links: {
      demo: "https://seoul-youth-platform.netlify.app",
    },
    thumbnail: "linear-gradient(135deg, #0F172A 0%, #1E40AF 40%, #7C3AED 100%)",
    featured: true,
    year: 2025,
  },

  /* ──────────────────────────────────────────────────────
     6. 서울시 기후변화 취약성 지도 분석 시스템
        Source: 최희도_서울시취약성지도.html
        Category: data
     ────────────────────────────────────────────────────── */
  {
    id: "vulnerability-map",
    title: "서울시 기후변화 취약성 지도 분석 시스템",
    subtitle: "Web GIS — Leaflet.js + D3.js + Chart.js",
    description:
      "서울시 자치구별 기후변화 취약성을 인터랙티브 지도로 시각화하는 풀스택 Web GIS. Leaflet·D3·Chart.js 3종 라이브러리 복합 구현.",
    longDescription:
      "Leaflet.js로 GeoJSON 공간 데이터를 인터랙티브 지도에 렌더링하고, D3.js로 고급 데이터 시각화, Chart.js로 통계 차트를 구현했습니다. 자치구 클릭 시 기후변화 취약성 지수와 세부 지표를 팝업으로 제공합니다. 서울시 25개 자치구 전체의 취약성 지수를 색상 단계 지도(choropleth)로 표현하여 공간적 패턴을 직관적으로 파악할 수 있습니다.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Leaflet.js",
      "D3.js",
      "Chart.js",
      "GeoJSON",
    ],
    category: "data",
    metrics: [
      { label: "시각화 라이브러리", value: "3종 복합" },
      { label: "분석 자치구",       value: "서울시 25개" },
      { label: "지도 유형",          value: "Choropleth GIS" },
    ],
    links: {},
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
  all:         { label: "전체",        count: projects.length },
  ML:          { label: "AI · ML",     count: projects.filter((p) => p.category === "ML").length },
  research:    { label: "연구 · 논문", count: projects.filter((p) => p.category === "research").length },
  development: { label: "웹 개발",     count: projects.filter((p) => p.category === "development").length },
  data:        { label: "데이터 분석", count: projects.filter((p) => p.category === "data").length },
} as const;
