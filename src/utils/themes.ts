import { useState, useCallback, useEffect } from "react";

export type Theme = "catppuccin" | "nord" | "default" | "tokyonight";

export const THEMES: Theme[] = ["catppuccin", "nord", "default", "tokyonight"];

export function setThemeByName(themeName: string): Theme | null {
  const theme = themeName.toLowerCase().trim() as Theme;
  if (THEMES.includes(theme)) {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
    return theme;
  }
  return null;
}

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

  // Listen for theme changes from outside React
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setTheme(e.detail);
    };
    window.addEventListener("themechange", handleThemeChange as EventListener);
    return () => {
      window.removeEventListener(
        "themechange",
        handleThemeChange as EventListener,
      );
    };
  }, []);

  return [theme, nextTheme];
}
