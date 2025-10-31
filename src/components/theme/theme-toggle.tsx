import { Laptop, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useThemeMode } from "./theme-provider";

const modeIcons = {
  light: Sun,
  dark: Moon,
} as const;

const modeLabels: Record<"light" | "dark" | "system", string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export const ThemeToggle = () => {
  const { mode, resolvedMode, toggleMode } = useThemeMode();
  const displayMode = mode === "system" ? resolvedMode : mode;
  const Icon = modeIcons[displayMode] ?? Sun;
  const ariaLabel =
    mode === "system"
      ? `Toggle theme (system preference, currently ${modeLabels[resolvedMode]})`
      : `Toggle theme (currently ${modeLabels[mode]})`;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={ariaLabel}
      onClick={toggleMode}
      className="text-muted-foreground hover:text-foreground"
      data-theme-toggle-mode={mode}
    >
      {mode === "system" ? (
        <span className="relative inline-flex h-4 w-4 items-center justify-center">
          <Laptop className="absolute h-3 w-3 opacity-50" />
          <Icon className="h-4 w-4" />
        </span>
      ) : (
        <Icon className="h-4 w-4" />
      )}
    </Button>
  );
};
