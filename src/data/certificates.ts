export interface Certificate {
  id: string;
  name: string;
  nameEn: string;
  issuer: string;
  issuerEn: string;
  date: string;
  type: "national-tech" | "national-approved" | "license" | "international";
  category: "data" | "environment" | "forest" | "it" | "history" | "drone";
}

export const certificates: Certificate[] = [
  {
    id: "fao-ghg",
    name: "온실가스 인벤토리 작성 과정 (ETF 기반)",
    nameEn: "Preparing a GHG Inventory under the Enhanced Transparency Framework",
    issuer: "FAO eLearning Academy",
    issuerEn: "FAO eLearning Academy",
    date: "2026.04",
    type: "international",
    category: "environment",
  },
  {
    id: "greenhouse-gas",
    name: "온실가스관리기사",
    nameEn: "Engineer, Greenhouse Gas Management",
    issuer: "기후에너지환경부 (한국산업인력공단)",
    issuerEn: "Human Resources Development Service of Korea",
    date: "2025.12",
    type: "national-tech",
    category: "environment",
  },
  {
    id: "bigdata-engineer",
    name: "빅데이터분석기사",
    nameEn: "Engineer, Big Data Analysis",
    issuer: "과학기술정보통신부 (한국데이터산업진흥원)",
    issuerEn: "Korea Data Agency (K-DATA)",
    date: "2025.12",
    type: "national-tech",
    category: "data",
  },
  {
    id: "forest-industry",
    name: "산림산업기사",
    nameEn: "Industrial Engineer, Forest",
    issuer: "산림청 (한국산업인력공단)",
    issuerEn: "Human Resources Development Service of Korea",
    date: "2025.09",
    type: "national-tech",
    category: "forest",
  },
  {
    id: "adsp",
    name: "데이터 분석 준전문가 (ADsP)",
    nameEn: "ADsP (Advanced Data Analytics Semi-Professional)",
    issuer: "한국데이터산업진흥원",
    issuerEn: "Korea Data Agency (K-DATA)",
    date: "2025.03",
    type: "national-approved",
    category: "data",
  },
  {
    id: "computer-level1",
    name: "컴퓨터활용능력 1급",
    nameEn: "Computer Specialist in Spreadsheet & Database, Level 1",
    issuer: "대한상공회의소",
    issuerEn: "Korea Chamber of Commerce & Industry",
    date: "2024.09",
    type: "national-tech",
    category: "it",
  },
  {
    id: "korean-history",
    name: "한국사능력검정시험 1급",
    nameEn: "Korean History Proficiency Test, Level 1",
    issuer: "국사편찬위원회",
    issuerEn: "National Institute of Korean History",
    date: "2023.12",
    type: "national-approved",
    category: "history",
  },
  {
    id: "drone",
    name: "초경량비행장치(드론) 조종자 4종",
    nameEn: "Ultra-light Vehicle (Drone) Pilot, Class 4",
    issuer: "한국교통안전공단",
    issuerEn: "Korea Transportation Safety Authority",
    date: "2022.12",
    type: "license",
    category: "drone",
  },
];

// ── Activity & completion certificates ───────────────────────────────────

export type ActivityType = "completion" | "award-cert" | "participation";
export type ActivityCategory = "climate" | "volunteer" | "community" | "education";

export interface ActivityCert {
  id: string;
  name: string;
  nameEn: string;
  date: string;          // Issuance / end date
  period?: string;       // Activity period if different from date
  issuer: string;
  issuerEn: string;
  type: ActivityType;
  category: ActivityCategory;
}

export const activityCerts: ActivityCert[] = [
  {
    id: "usavers-award",
    name: "U-SAVERS 우수상",
    nameEn: "U-SAVERS Outstanding Activist Award",
    date: "2024.11.29",
    issuer: "재단법인 기후변화센터",
    issuerEn: "Climate Change Center",
    type: "award-cert",
    category: "climate",
  },
  {
    id: "usavers-completion",
    name: "U-SAVERS 수료증",
    nameEn: "U-SAVERS Certificate of Completion",
    date: "2024.11.29",
    period: "2024.3.8 ~ 11.29",
    issuer: "재단법인 기후변화센터",
    issuerEn: "Climate Change Center",
    type: "completion",
    category: "climate",
  },
  {
    id: "climate-leadership",
    name: "기후변화 영리더십 아카데미 11기",
    nameEn: "Climate Change Young Leadership Academy — Cohort 11",
    date: "2024.06.04",
    issuer: "재단법인 기후변화센터",
    issuerEn: "Climate Change Center",
    type: "completion",
    category: "climate",
  },
  {
    id: "greennare",
    name: "그린나래 환경교육 수료증",
    nameEn: "Green Narae Environmental Education Certificate",
    date: "2024.12.31",
    period: "2024.2.3 ~ 12.31",
    issuer: "시립문래청소년센터",
    issuerEn: "Mullae Youth Center",
    type: "completion",
    category: "volunteer",
  },
  {
    id: "seoul-volunteer",
    name: "2025 서울동행기획 청년 기획봉사단 인증서",
    nameEn: "Seoul Youth Volunteer Planning Corps Certificate",
    date: "2025.09.12",
    period: "2025.5.9 ~ 9.12",
    issuer: "서울특별시자원봉사센터",
    issuerEn: "Seoul Volunteer Center",
    type: "award-cert",
    category: "volunteer",
  },
  {
    id: "seongbuk-community",
    name: "성북구 마을만들기 참여증",
    nameEn: "Seongbuk Community Building Participation Certificate",
    date: "2025.11.11",
    issuer: "성북구청",
    issuerEn: "Seongbuk-gu Office",
    type: "participation",
    category: "community",
  },
  {
    id: "forest-bigdata",
    name: "산림 빅데이터 분석 및 활용 교육",
    nameEn: "Forest Big Data Analysis & Application Training",
    date: "2024.02.22",
    period: "2024.02.19 ~ 22",
    issuer: "산림청 · 한국임업진흥원",
    issuerEn: "Korea Forest Service · Korea Forestry Promotion Institute",
    type: "completion",
    category: "education",
  },
];

export interface Award {
  id: string;
  title: string;
  titleEn: string;
  competition: string;
  competitionEn: string;
  rank: string;
  rankEn: string;
  date: string;
  organizer: string;
  organizerEn: string;
  prize?: string;
  prizeEn?: string;
  paper?: string;
  paperEn?: string;
}

export const awards: Award[] = [
  {
    id: "ax-idea-competition",
    title: "2026 기후에너지환경부 AX 아이디어 경진대회 우수상",
    titleEn: "Excellence Award — 2026 MCEE AX Idea Competition",
    competition: "2026 기후에너지환경부 AX 아이디어 경진대회 (한전KDN·한국남동발전)",
    competitionEn: "2026 MCEE AX Idea Competition (KEPCO KDN · KOEN)",
    rank: "우수상",
    rankEn: "Excellence Award",
    date: "2026.07",
    organizer: "기후에너지환경부 (한전KDN·한국남동발전)",
    organizerEn: "Ministry of Climate, Energy and Environment (KEPCO KDN · KOEN)",
    prize: "상금 300만원",
    prizeEn: "₩3M prize",
    paper: "위성 영상을 활용한 온실가스 공시 4중 검증",
    paperEn: "Quadruple verification of greenhouse-gas disclosure using satellite imagery",
  },
  {
    id: "env-data-competition",
    title: "2025 환경데이터 활용 및 분석 공모전 우수상",
    titleEn: "Excellence Award — 2025 Environmental Data Utilization & Analysis Contest",
    competition: "2025 환경데이터 활용 및 분석 공모전 (직접분석 부문)",
    competitionEn: "2025 Environmental Data Utilization & Analysis Contest (Direct Analysis)",
    rank: "우수상 (국립공원공단이사장상)",
    rankEn: "Excellence Award (KNPS Chairman's Award)",
    date: "2025",
    organizer: "환경부 주최, 한국환경공단 주관",
    organizerEn: "Ministry of Environment · Korea Environment Corporation",
    prize: "상금 250만원",
    prizeEn: "₩2.5M prize",
    paper:
      "기후 시나리오를 활용한 GAT-LSTM을 통한 기후 취약성 예측: 서울시 읍면동 대상으로",
    paperEn:
      "Climate vulnerability prediction using GAT-LSTM with climate scenarios: Seoul administrative dongs",
  },
  {
    id: "climate-poster-best",
    title: "한국기후변화학회 최우수포스터논문상",
    titleEn: "Best Poster Paper Award — KSCCR",
    competition: "한국기후변화학회 2025년 상반기학술대회",
    competitionEn: "KSCCR 2025 Spring Conference",
    rank: "최우수포스터논문상",
    rankEn: "Best Poster Paper Award",
    date: "2025.06",
    organizer: "사단법인 한국기후변화학회",
    organizerEn: "Korean Society of Climate Change Research",
    paper: "시공간 그래프 신경망(GCN)을 활용한 서울시의 도시열섬 리스크 평가",
    paperEn: "Urban heat island risk assessment of Seoul using spatiotemporal GCN",
  },
  {
    id: "climate-grad-award",
    title: "한국기후변화학회 우수대학원생지원프로그램 입상",
    titleEn: "Prize — KSCCR Outstanding Graduate Student Program",
    competition: "한국기후변화학회 2025년 하반기학술대회 우수대학원생지원프로그램",
    competitionEn: "KSCCR 2025 Fall Conference · Outstanding Graduate Student Program",
    rank: "입상",
    rankEn: "Prize Winner",
    date: "2025.12",
    organizer: "사단법인 한국기후변화학회",
    organizerEn: "Korean Society of Climate Change Research",
    paper:
      "기후정의를 위한 설명가능 인공지능(XAI): GAT와 AR6프레임워크 기반 서울시 시공간 열 리스크 평가",
    paperEn:
      "Explainable AI (XAI) for climate justice: GAT- and AR6 framework-based spatiotemporal heat risk assessment of Seoul",
  },
  {
    id: "climate-oral-best",
    title: "한국기후변화학회 최우수발표논문상",
    titleEn: "Best Presentation Paper Award — KSCCR",
    competition: "한국기후변화학회 2025년 춘계학술대회",
    competitionEn: "KSCCR 2025 Spring Conference",
    rank: "최우수발표논문상 (2저자)",
    rankEn: "Best Presentation Paper Award (2nd author)",
    date: "2025.06",
    organizer: "사단법인 한국기후변화학회",
    organizerEn: "Korean Society of Climate Change Research",
    paper:
      "기후불평등·홍수리스크 완화를 위한 적응의 비용 및 효과 평가: 서울시 자치구를 대상으로",
    paperEn:
      "Cost and effectiveness evaluation of adaptation for mitigating climate inequality and flood risk: districts of Seoul",
  },
  {
    id: "climate-biz-idea",
    title: "기후변화대응 비즈니스 아이디어 공모전 장려상",
    titleEn: "Encouragement Award — Climate Change Response Business Idea Contest",
    competition: "2025학년도 국민대학교 기후변화대응 비즈니스 아이디어 공모전",
    competitionEn: "2025 Kookmin University Climate Change Response Business Idea Contest",
    rank: "장려상",
    rankEn: "Encouragement Award",
    date: "2025.12",
    organizer: "인문사회융합인재양성사업 환경컨소시엄사업단",
    organizerEn: "HUSS Environmental Consortium",
    paper: "기후적응플랫폼 PCAR 금융상품",
    paperEn: "PCAR: a climate-adaptation platform financial product",
  },
  {
    id: "kookmin-convergence",
    title: "국민대학교 연계·융합전공 이수 수기 공모전 우수상",
    titleEn: "Excellence Award — Kookmin University Interdisciplinary Major Essay Contest",
    competition: "2025학년도 연계·융합전공 이수 수기 공모전",
    competitionEn: "2025 Kookmin University Interdisciplinary Major Essay Contest",
    rank: "우수상",
    rankEn: "Excellence Award",
    date: "2025.12",
    organizer: "국민대학교 미래융합대학",
    organizerEn: "Kookmin University College of Future Convergence",
    paper: "기후빅데이터를 배우고",
    paperEn: "\"Learning Climate Big Data\" (essay)",
  },
];
