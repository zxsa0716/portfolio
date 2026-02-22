import { Variants } from "framer-motion";
import { ease, duration } from "../../tailwind.config";

/* ─────────────────────────────────────────
   Viewport config — trigger once, slight offset
   ───────────────────────────────────────── */
export const viewportConfig = {
  once: true,
  margin: "-80px",
} as const;

/* ─────────────────────────────────────────
   Fade variants
   ───────────────────────────────────────── */
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

/* Aliases matching the user's requested names */
export const slideInLeft  = fadeInLeft;
export const slideInRight = fadeInRight;

/* ─────────────────────────────────────────
   Stagger containers
   ───────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.02 },
  },
};

/* ─────────────────────────────────────────
   Scale / pop-in
   ───────────────────────────────────────── */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.smooth },
  },
};

/* ─────────────────────────────────────────
   Slide from bottom (hero / large reveals)
   ───────────────────────────────────────── */
export const slideInFromBottom: Variants = {
  hidden:  { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slower, ease: ease.smooth },
  },
};

/* ─────────────────────────────────────────
   Hero text — custom per-element delay via custom prop
   ───────────────────────────────────────── */
export const heroTextVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.slower, delay, ease: ease.smooth },
  }),
};

/* ─────────────────────────────────────────
   Card hover (use with whileHover / animate)
   ───────────────────────────────────────── */
export const cardHover = {
  rest:  { scale: 1, y: 0, transition: { duration: duration.fast, ease: ease.smooth } },
  hover: { scale: 1.015, y: -6, transition: { duration: 0.25, ease: ease.smooth } },
};

/* ─────────────────────────────────────────
   Glow pulse (blue accent)
   ───────────────────────────────────────── */
export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.25)",
      "0 0 50px rgba(59, 130, 246, 0.55)",
      "0 0 20px rgba(59, 130, 246, 0.25)",
    ],
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ─────────────────────────────────────────
   Line draw (for SVG underlines / borders)
   ───────────────────────────────────────── */
export const lineDraw: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: ease.smooth },
  },
};
