import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";

// ── Latin type system ───────────────────────────────────────────────────────
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

// Academic-journal serif — used for section titles & display accents (EN).
const newsreader = Newsreader({
  variable:  "--font-serif",
  subsets:   ["latin"],
  display:   "swap",
  preload:   true,
  weight:    ["300", "400", "500", "600"],
  style:     ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable:  "--font-geist-mono",
  subsets:   ["latin"],
  display:   "swap",
  preload:   false, // secondary font — lazy is fine
});

// ── Korean type system (subset woff2, lazy — KO is a toggle) ─────────────────
// KoPubWorld Dotum → Korean sans · KoPubWorld Batang → Korean serif titles.
const kopubDotum = localFont({
  variable: "--font-kopub",
  display:  "swap",
  preload:  false,
  src: [
    { path: "./fonts/KoPubDotum-Light.woff2",  weight: "300", style: "normal" },
    { path: "./fonts/KoPubDotum-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/KoPubDotum-Bold.woff2",   weight: "700", style: "normal" },
  ],
});

const kopubBatang = localFont({
  variable: "--font-kopub-serif",
  display:  "swap",
  preload:  false,
  src: [
    { path: "./fonts/KoPubBatang-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/KoPubBatang-Bold.woff2",  weight: "700", style: "normal" },
  ],
});

// ── Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  "Heedo Choi | Climate AI Researcher",
    template: "%s | Heedo Choi",
  },
  description:
    "Heedo Choi — M.S. student at CLIM Lab, Kookmin University. " +
    "Climate risk assessment with explainable graph neural networks (GAT·GCN·XAI). " +
    "First-author paper in Urban Climate (IF 6.9). 14 funded research projects, 8 certifications.",
  keywords: [
    "Heedo Choi", "최희도",
    "climate AI", "GAT", "GCN", "XAI", "SHAP",
    "climate change", "spatial analysis", "urban heat island",
    "Urban Climate", "climate justice",
    "Kookmin University", "CLIM Lab",
    "포트폴리오", "portfolio",
  ],
  authors: [{ name: "Heedo Choi (최희도)", url: "https://github.com/zxsa0716" }],
  creator: "Heedo Choi",
  openGraph: {
    title:       "Heedo Choi | Climate AI Researcher",
    description:
      "Explainable GNNs for climate justice · First-author paper in Urban Climate (IF 6.9) · " +
      "GAT·GCN·XAI spatial analysis · Full-stack research platforms",
    type:        "website",
    locale:      "en_US",
    alternateLocale: "ko_KR",
    siteName:    "Heedo Choi — Portfolio",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Heedo Choi | Climate AI Researcher",
    description:
      "Explainable GNNs for climate justice · Urban Climate (IF 6.9) first-author · Full-stack research platforms",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${newsreader.variable} ${geistMono.variable} ${kopubDotum.variable} ${kopubBatang.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
