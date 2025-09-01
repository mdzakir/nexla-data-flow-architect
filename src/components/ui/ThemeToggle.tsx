import React, { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "./Button";
import type { Theme } from "../../types/common";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [currentIcon, setCurrentIcon] = useState(<Monitor />);

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setCurrentIcon(prefersDark ? <Moon /> : <Sun />);
    } else {
      setCurrentIcon(theme === "light" ? <Sun /> : <Moon />);
    }
  }, [theme]);

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      title={`Switch to ${
        theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
      } mode`}
      aria-label="Toggle theme"
    >
      {currentIcon}
    </Button>
  );
};
