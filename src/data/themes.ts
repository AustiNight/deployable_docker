export type ThemePreset = {
  key: string;
  label: string;
  description: string;
  palette: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  radius: "0.5rem" | "0.75rem" | "1.5rem";
  accent: "orange" | "purple" | "blue" | "emerald";
  fontFamily: "Inter" | "DM Sans" | "Sora";
  paletteKey: "slate" | "emerald" | "amber" | "violet";
};

export const themePresets: ThemePreset[] = [
  {
    key: "modern-default",
    label: "Modern Default",
    description: "Clean slate base suitable for SaaS and startups.",
    palette: {
      background: "#f1f5f9",
      foreground: "#0f172a",
      primary: "#0f172a",
      secondary: "#e2e8f0",
      accent: "#fb923c",
    },
    radius: "0.75rem",
    accent: "orange",
    fontFamily: "Inter",
    paletteKey: "slate",
  },
  {
    key: "restaurant-warm",
    label: "Restaurant Warm",
    description: "Amber accents and rounded corners for hospitality.",
    palette: {
      background: "#fef3c7",
      foreground: "#78350f",
      primary: "#f97316",
      secondary: "#fde68a",
      accent: "#fb923c",
    },
    radius: "1.5rem",
    accent: "orange",
    fontFamily: "DM Sans",
    paletteKey: "amber",
  },
  {
    key: "portfolio-modern",
    label: "Portfolio Modern",
    description: "Vibrant violet palette with crisp type.",
    palette: {
      background: "#f4f1ff",
      foreground: "#2e1065",
      primary: "#7c3aed",
      secondary: "#ddd6fe",
      accent: "#a855f7",
    },
    radius: "0.75rem",
    accent: "purple",
    fontFamily: "Sora",
    paletteKey: "violet",
  },
  {
    key: "marketplace-fresh",
    label: "Marketplace Fresh",
    description: "Green-forward palette for eco-friendly marketplaces.",
    palette: {
      background: "#ecfdf5",
      foreground: "#065f46",
      primary: "#10b981",
      secondary: "#d1fae5",
      accent: "#34d399",
    },
    radius: "0.75rem",
    accent: "emerald",
    fontFamily: "Inter",
    paletteKey: "emerald",
  },
];
