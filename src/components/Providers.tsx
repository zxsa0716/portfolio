"use client";

// Global config: Framer Motion, colour theme, language.
// reducedMotion="user" makes ALL motion.* elements respect the OS-level
// prefers-reduced-motion media query automatically.

import { MotionConfig } from "framer-motion";
import { LangProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LangProvider>
    </ThemeProvider>
  );
}
