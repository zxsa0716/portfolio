import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

// ── Fonts ─────────────────────────────────────────────────────────────────
// next/font handles subsetting, preloading, and self-hosting automatically.

const inter = Inter({
  variable:  "--font-inter",
  subsets:   ["latin"],
  display:   "swap",
  preload:   true,
  weight:    ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable:  "--font-space-grotesk",
  subsets:   ["latin"],
  display:   "swap",
  preload:   true,
  weight:    ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable:  "--font-geist-mono",
  subsets:   ["latin"],
  display:   "swap",
  preload:   false, // secondary font — lazy is fine
});

// ── Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  "최희도 | Climate AI Researcher & Developer",
    template: "%s | 최희도",
  },
  description:
    "국민대학교 산림환경시스템학과 학부연구생 최희도의 포트폴리오. " +
    "GAT·GCN·XAI 기반 기후변화 공간 분석 연구, 풀스택 웹 플랫폼 개발, " +
    "7개 국가자격증 보유. R²=0.9681 최고 모델 성능 달성.",
  keywords: [
    "최희도", "Heedo Choi",
    "climate AI", "GAT", "GCN", "XAI", "SHAP",
    "기후변화", "공간분석", "도시열섬",
    "빅데이터분석기사", "온실가스관리기사",
    "국민대학교", "CLIM Lab",
    "포트폴리오", "portfolio",
  ],
  authors: [{ name: "최희도 (Heedo Choi)", url: "https://github.com/zxsa0716" }],
  creator: "최희도",
  openGraph: {
    title:       "최희도 | Climate AI Researcher & Developer",
    description:
      "GAT·GCN·XAI 기반 기후변화 공간 분석 연구 & 풀스택 웹 플랫폼 개발자 · R²=0.9681 · 수상 5건",
    type:        "website",
    locale:      "ko_KR",
    siteName:    "최희도 포트폴리오",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "최희도 | Climate AI Researcher & Developer",
    description:
      "GAT·GCN·XAI 기반 기후변화 공간 분석 연구 & 풀스택 웹 플랫폼 개발자",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor:  "#080E1C",
  colorScheme: "dark",
  width:       "device-width",
  initialScale: 1,
};

// ── Root layout ───────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
