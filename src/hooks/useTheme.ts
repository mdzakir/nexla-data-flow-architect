import { useState, useEffect, useCallback } from "react";
import type { Theme } from "../types/common";

export const useTheme = () => {
  const [theme, _setTheme] = useState<Theme>("system");

  const applyTheme = useCallback((t: Theme) => {
    if (t === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", t === "dark");
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initialTheme = stored || "system";
    _setTheme(initialTheme);
    applyTheme(initialTheme);
  }, [applyTheme]);

  const setTheme = (newTheme: Theme) => {
    _setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return { theme, setTheme };
};
