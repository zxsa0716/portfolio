/**
 * Design token constants — 최희도 포트폴리오
 * Tailwind v4 uses CSS @theme directives (see globals.css).
 * This file exports typed constants for use in Framer Motion, inline styles, and JS logic.
 */

export const colors = {
  bg: {
    base:    "#080E1C",
    surface: "#0C1426",
    raised:  "#111D36",
    hover:   "#162040",
    overlay: "#1A2745",
  },
  border: {
    default: "#1E2D4A",
    subtle:  "rgba(255,255,255,0.06)",
    strong:  "rgba(255,255,255,0.14)",
    focus:   "#3B82F6",
  },
  blue: {
    950: "#0A1628",
    900: "#0F2347",
    800: "#1E3A6E",
    700: "#1D4ED8",
    600: "#2563EB",
    500: "#3B82F6",
    400: "#60A5FA",
    300: "#93C5FD",
    200: "#BFDBFE",
    100: "#DBEAFE",
  },
  emerald: {
    900: "#064E3B",
    800: "#065F46",
    700: "#047857",
    600: "#059669",
    500: "#10B981",
    400: "#34D399",
    300: "#6EE7B7",
  },
  text: {
    primary:   "#F1F5F9",
    secondary: "#94A3B8",
    muted:     "#64748B",
    disabled:  "#334155",
  },
  semantic: {
    success: "#10B981",
    warning: "#F59E0B",
    error:   "#EF4444",
    info:    "#3B82F6",
  },
} as const;

export const shadows = {
  glowBlue:    "0 0 40px rgba(59, 130, 246, 0.18)",
  glowEmerald: "0 0 40px rgba(16, 185, 129, 0.15)",
  card:        "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25)",
  cardHover:   "0 2px 8px rgba(0,0,0,0.5), 0 12px 40px rgba(0,0,0,0.3)",
} as const;

export const radii = {
  sm:  "6px",
  md:  "10px",
  lg:  "14px",
  xl:  "20px",
  "2xl": "28px",
} as const;

/** Primary easing curve — Linear.app / Vercel style */
export const ease = {
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1]    as [number, number, number, number],
  out:    [0.0,  0.0,  0.2, 1]     as [number, number, number, number],
} as const;

export const duration = {
  fast:   0.2,
  normal: 0.4,
  slow:   0.6,
  slower: 0.8,
} as const;
