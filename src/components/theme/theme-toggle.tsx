import { Laptop, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useThemeMode } from "./theme-provider";

const modeIcons = {
  light: Sun,
  dark: Moon,
  system: Laptop,
} as const;

const modeLabels: Record<keyof typeof modeIcons, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  const Icon = modeIcons[mode] ?? Sun;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Toggle theme (currently ${modeLabels[mode]})`}
      onClick={toggleMode}
      className="text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};



