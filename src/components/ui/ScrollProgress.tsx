"use client";

/**
 * ScrollProgress — thin reading-progress bar fixed at the very top.
 * Uses Framer Motion's scroll spring for a smooth, instrument-like indicator.
 */

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #2563EB, #34D399)",
      }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60]"
    />
  );
}
