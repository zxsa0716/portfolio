export interface Certificate {
  id: string;
  name: string;
  nameEn: string;
  number: string;
  date: string;
  issuer: string;
  type: "national-tech" | "national-approved" | "license";
  category: "data" | "environment" | "forest" | "it" | "history" | "drone";
}

export const certificates: Certificate[] = [
  {
    id: "bigdata-engineer",
    name: "빅데이터분석기사",
    nameEn: "Big Data Analyst Engineer",
    number: "BAE-011002055",
    date: "2025.12.19",
    issuer: "과학기술정보통신부 · 국가데이터처 (한국데이터산업진흥원)",
    type: "national-tech",
    category: "data",
  },
  {
    id: "greenhouse-gas",
    name: "온실가스관리기사",
    nameEn: "Greenhouse Gas Management Engineer",
    number: "25203300034D",
    date: "2025.12.24",
    issuer: "기후에너지환경부 (한국산업인력공단)",
    type: "national-tech",
    category: "environment",
  },
  {
    id: "forest-industry",
    name: "산림산업기사",
    nameEn: "Forest Industry Engineer",
    number: "25202302024C",
    date: "2025.09.12",
    issuer: "산림청 (한국산업인력공단)",
    type: "national-tech",
    category: "forest",
  },
  {
    id: "adsp",
    name: "데이터 분석 준전문가 (ADsP)",
    nameEn: "Associate Data Scientist Professional",
    number: "ADsP-044007382",
    date: "2025.03.21",
    issuer: "한국데이터산업진흥원 (KDATA)",
    type: "national-approved",
    category: "data",
  },
  {
    id: "computer-level1",
    name: "컴퓨터활용능력 1급",
    nameEn: "Computer Utilization Level 1",
    number: "24-K9-047524",
    date: "2024.09.06",
    issuer: "대한상공회의소",
    type: "national-tech",
    category: "it",
  },
  {
    id: "drone",
    name: "드론 4종 자격증",
    nameEn: "Drone Pilot License (Type 4)",
    number: "—",
    date: "2022.12.02",
    issuer: "한국교통안전공단",
    type: "license",
    category: "drone",
  },
  {
    id: "korean-history",
    name: "한국사능력검정시험",
    nameEn: "Korean History Proficiency Test",
    number: "68-104983",
    date: "2023.12.02",
    issuer: "국사편찬위원회",
    type: "national-approved",
    category: "history",
  },
];

// ── Activity & completion certificates ───────────────────────────────────

export type ActivityType = "completion" | "award-cert" | "participation";
export type ActivityCategory = "climate" | "volunteer" | "community" | "education";

export interface ActivityCert {
  id: string;
  name: string;
  nameEn: string;
  number: string;
  date: string;          // Issuance / end date
  period?: string;       // Activity period if different from date
  issuer: string;
  type: ActivityType;
  category: ActivityCategory;
}

export const activityCerts: ActivityCert[] = [
  {
    id: "usavers-award",
    name: "U-SAVERS 우수상",
    nameEn: "U-SAVERS Excellence Award",
    number: "제2024-0094호",
    date: "2024.11.29",
    issuer: "재단법인 기후변화센터",
    type: "award-cert",
    category: "climate",
  },
  {
    id: "usavers-completion",
    name: "U-SAVERS 수료증",
    nameEn: "U-SAVERS Certificate of Completion",
    number: "제2024-0089호",
    date: "2024.11.29",
    period: "2024.3.8 ~ 11.29",
    issuer: "재단법인 기후변화센터",
    type: "completion",
    category: "climate",
  },
  {
    id: "climate-leadership",
    name: "기후변화 영리더쉽 아카데미 11기",
    nameEn: "Climate Change Young Leadership Academy — Cohort 11",
    number: "—",
    date: "2024.06.04",
    issuer: "기후변화센터",
    type: "completion",
    category: "climate",
  },
  {
    id: "greennare",
    name: "그린나래 수료증",
    nameEn: "Greennare Program Certificate",
    number: "제2025-17호",
    date: "2024.12.31",
    period: "2024.2.3 ~ 12.31",
    issuer: "시립문래청소년센터",
    type: "completion",
    category: "volunteer",
  },
  {
    id: "seoul-volunteer",
    name: "2025 서울동행기획 합격인증서",
    nameEn: "Seoul Youth Volunteer Planning Corps Certificate",
    number: "제2025-기획봉사-0257호",
    date: "2025.09.12",
    period: "2025.5.9 ~ 9.12",
    issuer: "서울특별시자원봉사센터",
    type: "award-cert",
    category: "volunteer",
  },
  {
    id: "seongbuk-community",
    name: "성북구 마을만들기 참여증",
    nameEn: "Seongbuk Community Building Participation Certificate",
    number: "제2025-001호",
    date: "2025.11.11",
    issuer: "성북구청 (성북구청장 이승진)",
    type: "participation",
    category: "community",
  },
  {
    id: "forest-bigdata",
    name: "산림 빅데이터 분석 및 활용 교육",
    nameEn: "Forest Big Data Analysis & Application Training",
    number: "—",
    date: "2024.02.22",
    period: "2024.02.19 ~ 22",
    issuer: "산림청 / 국립산림과학원",
    type: "completion",
    category: "education",
  },
];

export interface Award {
  id: string;
  title: string;
  titleEn: string;
  competition: string;
  rank: string;
  date: string;
  organizer: string;
  prize?: string;
  paper?: string;
}

export const awards: Award[] = [
  {
    id: "env-data-competition",
    title: "2025 환경데이터 활용 및 분석 공모전 우수상",
    titleEn: "2025 Environmental Data Competition — Excellence Award",
    competition: "2025 환경데이터 활용 및 분석 공모전 (직접분석 부문)",
    rank: "우수상 (국립공원공단이사장상)",
    date: "2025",
    organizer: "환경부 주최, 한국환경공단 주관",
    prize: "상금 250만원",
    paper:
      "기후 시나리오를 활용한 GAT-LSTM을 통한 기후 취약성 예측: 서울시 읍면동 대상으로",
  },
  {
    id: "climate-poster-best",
    title: "한국기후변화학회 최우수포스터논문상",
    titleEn: "Korean Society of Climate Change Research — Best Poster Award",
    competition: "한국기후변화학회 2025년 상반기학술대회",
    rank: "최우수포스터논문상 (제2025-29호)",
    date: "2025.12.05",
    organizer: "사단법인 한국기후변화학회",
    paper: "시공간 그래프 신경망(GCN)을 활용한 서울시의 도시열섬 리스크 평가",
  },
  {
    id: "climate-grad-award",
    title: "한국기후변화학회 우수대학원생지원프로그램 입상",
    titleEn: "Korean Society of Climate Change Research — Outstanding Graduate Student Award",
    competition: "한국기후변화학회 2025년 하반기학술대회 우수대학원생지원프로그램",
    rank: "입상 (제2025-36호)",
    date: "2025.12.05",
    organizer: "사단법인 한국기후변화학회",
    paper:
      "기후정의를 위한 설명가능 인공지능(XAI): GAT와 AR6프레임워크 기반 서울시 시공간 열 리스크 평가",
  },
  {
    id: "climate-oral-best",
    title: "한국기후변화학회 최우수발표논문상",
    titleEn: "Korean Society of Climate Change Research — Best Oral Presentation Award",
    competition: "한국기후변화학회 2025년 춘계학술대회",
    rank: "최우수발표논문상 (2저자)",
    date: "2025",
    organizer: "사단법인 한국기후변화학회",
    paper:
      "기후불평등·홍수리스크 완화를 위한 적응의 비용 및 효과 평가: 서울시 자치구를 대상으로",
  },
  {
    id: "climate-biz-idea",
    title: "기후변화대응 비즈니스 아이디어 공모전 장려상",
    titleEn: "Climate Change Response Business Idea Competition — Encouragement Award",
    competition: "2025학년도 국민대학교 기후변화대응 비즈니스 아이디어 공모전",
    rank: "장려상 (국민-2025-007호)",
    date: "2025.12.05",
    organizer: "인문사회융합인재양성사업 환경컨소시엄사업단",
    paper: "기후적응플랫폼 PCAR 금융상품",
  },
  {
    id: "kookmin-convergence",
    title: "국민대학교 연계·융합전공 이수 수기 공모전 우수상",
    titleEn: "Kookmin University Convergence Major Essay Competition — Excellence Award",
    competition: "2025학년도 연계·융합전공 이수 수기 공모전",
    rank: "우수상 (제2025-43호)",
    date: "2025.12.01",
    organizer: "국민대학교 미래융합대학",
    paper: "기후빅데이터를 배우고",
  },
];
