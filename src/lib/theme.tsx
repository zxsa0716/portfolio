"use client";

/**
 * Theme — three states, not two.
 *
 * "system" is the default and stamps nothing on <html>, so the page follows
 * prefers-color-scheme. An explicit choice stamps data-theme, which the
 * stylesheet gives priority over the OS in both directions.
 *
 * The stored key is read twice: once by the blocking script in layout.tsx so
 * the first paint is already correct, and once here so React holds the same
 * value. Keep THEME_KEY and that script in step.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Theme = "system" | "light" | "dark";

export const THEME_KEY = "theme";

interface ThemeContextValue {
  /** What the viewer chose. */
  theme: Theme;
  /** What that resolves to right now — what is actually on screen. */
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolved: "light",
  setTheme: () => {},
});

function systemPrefersDark() {
  return typeof window !== "undefined"
    && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  // Adopt whatever the blocking script already applied.
  useEffect(() => {
    let saved: Theme = "system";
    try {
      const v = window.localStorage.getItem(THEME_KEY);
      if (v === "light" || v === "dark" || v === "system") saved = v;
    } catch {
      /* private mode or blocked storage — "system" is a fine default */
    }
    setThemeState(saved);
    setResolved(saved === "system" ? (systemPrefersDark() ? "dark" : "light") : saved);
  }, []);

  // While on "system", follow the OS if it changes mid-session.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolved(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setResolved(t === "system" ? (systemPrefersDark() ? "dark" : "light") : t);
    apply(t);
    try {
      window.localStorage.setItem(THEME_KEY, t);
    } catch {
      /* the choice just will not survive a reload */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
