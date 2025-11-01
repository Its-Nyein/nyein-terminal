import { useState, useCallback, useEffect } from "react";

export type Theme = "catppuccin" | "nord" | "default" | "tokyonight";

const THEMES: Theme[] = ["catppuccin", "nord", "default", "tokyonight"];

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored && THEMES.includes(stored)
      ? stored
      : THEMES[THEMES.length - 1];
  });

  const nextTheme = useCallback(() => {
    setTheme((current: Theme) => {
      const currentIndex = THEMES.indexOf(current);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      const next = THEMES[nextIndex];
      localStorage.setItem("theme", next);
      document.documentElement.className = next;
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return [theme, nextTheme];
}
