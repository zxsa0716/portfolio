// ── Conference papers and academic presentations ─────────────────────────
// All data sourced from CV, poster image, and award certificates.

export interface PublicationMetric {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  titleEn?: string;
  venue: string;
  venueShort: string;
  venueType: "conference" | "competition" | "program";
  date: string;
  year: number;
  role: string;          // "제1저자", "제2저자", "발표자"
  award?: string;
  awardNumber?: string;
  prizeAmount?: string;
  metrics?: PublicationMetric[];
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: "gcn-uhi",
    title:
      "시공간 그래프 신경망(GCN)을 활용한 서울시의 도시열섬 리스크 평가",
    venue:
      "한국기후변화학회 2025년 상반기 학술대회",
    venueShort: "한국기후변화학회 2025 상반기",
    venueType: "conference",
    date: "2025.05",
    year: 2025,
    role: "제1저자 · 포스터 발표",
    award: "최우수포스터논문상",
    awardNumber: "제2025-29호",
    metrics: [
      { label: "MSE",         value: "0.0397",  highlight: true },
      { label: "RSMSE",       value: "0.1834" },
      { label: "Moran's I",   value: "0.73",    highlight: true },
      { label: "클러스터 수", value: "5개" },
      { label: "R² (검증)",   value: "0.513" },
    ],
    tags: ["GCN", "도시열섬", "공간통계", "서울시 25구"],
  },
  {
    id: "xai-heat",
    title:
      "기후정의를 위한 설명가능 인공지능(XAI): GAT와 AR6 프레임워크 기반 서울시 시공간 열 리스크 평가",
    venue:
      "한국기후변화학회 2025년 하반기 학술대회 우수대학원생지원프로그램",
    venueShort: "한국기후변화학회 2025 하반기",
    venueType: "program",
    date: "2025.12.05",
    year: 2025,
    role: "제1저자 · 구두 발표",
    award: "입상",
    awardNumber: "제2025-36호",
    metrics: [
      { label: "R²",      value: "0.9681", highlight: true },
      { label: "RMSE",    value: "0.162" },
      { label: "관측 수", value: "13,170" },
      { label: "XAI 기법", value: "3종",  highlight: true },
    ],
    tags: ["GAT", "XAI", "SHAP", "AR6", "기후정의"],
  },
  {
    id: "flood-inequality",
    title:
      "기후불평등·홍수리스크 완화를 위한 적응의 비용 및 효과 평가: 서울시 자치구를 대상으로",
    venue: "한국기후변화학회 2025년 춘계학술대회",
    venueShort: "한국기후변화학회 2025 춘계",
    venueType: "conference",
    date: "2025.05",
    year: 2025,
    role: "제2저자 · 구두 발표",
    award: "최우수발표논문상",
    metrics: [
      { label: "분석 대상", value: "서울 25개 자치구" },
      { label: "방법론",    value: "비용·효과 분석" },
    ],
    tags: ["기후불평등", "홍수리스크", "적응 비용"],
  },
  {
    id: "gat-lstm-comp",
    title:
      "기후 시나리오를 활용한 GAT-LSTM을 통한 기후 취약성 예측: 서울시 읍면동 대상으로",
    venue:
      "2025 환경데이터 활용 및 분석 공모전 (직접분석 부문)",
    venueShort: "환경데이터 공모전 2025",
    venueType: "competition",
    date: "2025.11",
    year: 2025,
    role: "제1저자",
    award: "우수상 (국립공원공단이사장상)",
    prizeAmount: "250만원",
    metrics: [
      { label: "분석 단위",    value: "467 읍면동", highlight: true },
      { label: "시나리오",     value: "SSP1 ~ SSP5" },
      { label: "예측 기간",    value: "~ 2100년" },
      { label: "앙상블 모델",  value: "GAT + LSTM",  highlight: true },
    ],
    tags: ["GAT", "LSTM", "SSP", "기후취약성", "공간예측"],
  },
  {
    id: "pcar-biz",
    title: "기후적응플랫폼 PCAR 금융상품",
    venue:
      "2025학년도 국민대학교 기후변화대응 비즈니스 아이디어 공모전",
    venueShort: "국민대 기후비즈니스 공모전",
    venueType: "competition",
    date: "2025.12.05",
    year: 2025,
    role: "발표자",
    award: "장려상",
    awardNumber: "국민-2025-007호",
    tags: ["기후금융", "플랫폼", "탄소중립"],
  },
];
