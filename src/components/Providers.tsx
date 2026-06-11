"use client";

// Wraps the app in Framer Motion global config + language provider.
// reducedMotion="user" makes ALL motion.* elements respect
// the OS-level prefers-reduced-motion media query automatically.

import { MotionConfig } from "framer-motion";
import { LangProvider } from "@/lib/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangProvider>
  );
}
