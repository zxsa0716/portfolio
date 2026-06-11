"use client";

/**
 * Lightweight i18n — English default, Korean toggle.
 * - `lang` persisted to localStorage("lang"), <html lang> kept in sync.
 * - `t(en, ko)` picks the value for the active language.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Lang = "en" | "ko";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: <T>(en: T, ko: T) => T;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("lang");
    if (saved === "ko" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "en" ? "ko" : "en"),
    [lang, setLang],
  );

  const t = useCallback(
    function pick<T>(en: T, ko: T): T {
      return lang === "ko" ? ko : en;
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

// ── Shared profile links ───────────────────────────────────────────────────
export const LINKS = {
  email: "zxsa0716@naver.com",
  emailAcademic: "zxsa0716@kookmin.ac.kr",
  github: "https://github.com/zxsa0716",
  scholar: "https://scholar.google.co.kr/citations?user=e_i_D8YAAAAJ&hl=ko",
  linkedin: "https://www.linkedin.com/in/heedo-%E2%80%8Dchoi-562540346/",
  blog: "https://zxsa716.tistory.com",
  portfolio: "https://portfolio-eight-ruddy-87.vercel.app",
  paperDoi: "https://doi.org/10.1016/j.uclim.2026.102981",
} as const;
