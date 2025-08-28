import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "./Button";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      icon={theme === "light" ? Moon : Sun}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    />
  );
};
