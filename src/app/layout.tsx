import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Newsreader } from "next/font/google";
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

// Academic-journal serif — used for section titles & display accents (EN).
const newsreader = Newsreader({
  variable:  "--font-serif-latin",
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

// One place to change if the site ever moves to a custom domain: this constant,
// the JSON_LD ids below, and the URL printed on public/og.png (regenerate from
// scripts/og/og-card.html).
const SITE_URL = "https://portfolio-eight-ruddy-87.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
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
    url:         SITE_URL,
    locale:      "en_US",
    alternateLocale: "ko_KR",
    siteName:    "Heedo Choi — Portfolio",
    images: [
      {
        url:    "/og.png",
        width:  1200,
        height: 630,
        type:   "image/png",
        alt:
          "Heedo Choi (최희도) — M.S., Climate Technology Convergence, Kookmin University. " +
          "First-author in Urban Climate (IF 6.9), 14 funded projects, Forest Pioneer research fellow, 4 competition awards.",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Heedo Choi | Climate AI Researcher",
    description:
      "Explainable GNNs for climate justice · Urban Climate (IF 6.9) first-author · Full-stack research platforms",
    images:      ["/og.png"],
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)",  color: "#0F1311" },
  ],
  colorScheme:  "light dark",
  width:        "device-width",
  initialScale: 1,
};

// ── Theme bootstrap ────────────────────────────────────────────────────────
// Runs before first paint so a viewer who chose dark never sees a white flash.
// Mirrors THEME_KEY and the data-theme contract in src/lib/theme.tsx.
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

// ── Structured data ────────────────────────────────────────────────────────
// Lets search and scholarly indexes read the person and the paper as records
// rather than as prose.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Heedo Choi",
      alternateName: "최희도",
      jobTitle: "M.S. Student, Climate Technology Convergence",
      email: "mailto:zxsa0716@kookmin.ac.kr",
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Kookmin University",
        department: {
          "@type": "Organization",
          name: "Global Climate Change, Innovative Monitoring & Modeling Lab (CLIM Lab)",
        },
      },
      knowsAbout: [
        "Climate risk assessment",
        "Explainable AI",
        "Graph neural networks",
        "Remote sensing",
        "Forest carbon modelling",
      ],
      sameAs: [
        "https://scholar.google.co.kr/citations?user=e_i_D8YAAAAJ",
        "https://github.com/zxsa0716",
        "https://zxsa716.tistory.com",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      headline:
        "Climate justice through explainable graph neural networks: A spatiotemporal attention-based urban heat risk assessment under IPCC AR6 framework",
      author: { "@id": `${SITE_URL}/#person` },
      datePublished: "2026",
      isPartOf: { "@type": "Periodical", name: "Urban Climate" },
      identifier: "https://doi.org/10.1016/j.uclim.2026.102981",
      url: "https://doi.org/10.1016/j.uclim.2026.102981",
    },
  ],
};

// ── Root layout ───────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body
        className={`${inter.variable} ${newsreader.variable} ${geistMono.variable} ${kopubDotum.variable} ${kopubBatang.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
