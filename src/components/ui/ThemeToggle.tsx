"use client";

/**
 * ThemeToggle — a three-position switch, matching the three states a viewer
 * actually has. "System" is offered explicitly rather than hidden behind a
 * long-press, because following the OS is the default and should be
 * returnable to.
 */

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";
import { useLang } from "@/lib/i18n";

const OPTIONS: { value: Theme; icon: typeof Sun; en: string; ko: string }[] = [
  { value: "light",  icon: Sun,     en: "Light",  ko: "밝게" },
  { value: "dark",   icon: Moon,    en: "Dark",   ko: "어둡게" },
  { value: "system", icon: Monitor, en: "System", ko: "시스템" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { lang } = useLang();

  return (
    <div
      role="group"
      aria-label={lang === "en" ? "Colour theme" : "색 테마"}
      className="flex items-center p-0.5"
      style={{ border: "1px solid var(--rule)", borderRadius: 3 }}
    >
      {OPTIONS.map((o) => {
        const active = theme === o.value;
        const label = lang === "en" ? o.en : o.ko;
        return (
          <button
            key={o.value}
            onClick={() => setTheme(o.value)}
            aria-pressed={active}
            title={label}
            aria-label={label}
            className="flex h-6 w-6 items-center justify-center transition-colors duration-150"
            style={{
              borderRadius: 2,
              background: active ? "var(--accent)" : "transparent",
              color: active ? "var(--on-accent)" : "var(--muted)",
            }}
          >
            <o.icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
