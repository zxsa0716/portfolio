"use client";

// Wraps the app in Framer Motion global config.
// reducedMotion="user" makes ALL motion.* elements respect
// the OS-level prefers-reduced-motion media query automatically.

import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
