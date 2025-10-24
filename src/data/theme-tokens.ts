export type PaletteKey = "slate" | "emerald" | "amber" | "violet";
export type AccentKey = "orange" | "purple" | "blue" | "emerald";

type ThemeColorTokens = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  ring: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
};

export const paletteTokens: Record<PaletteKey, ThemeColorTokens> = {
  slate: {
    background: "210 40% 98%",
    foreground: "224 71% 4%",
    muted: "214 32% 91%",
    mutedForeground: "215 20% 65%",
    card: "0 0% 100%",
    cardForeground: "222 84% 5%",
    border: "221 39% 89%",
    input: "221 39% 89%",
    ring: "222 84% 5%",
    primary: "222 47% 11%",
    primaryForeground: "210 40% 98%",
    secondary: "210 40% 96%",
    secondaryForeground: "222 47% 11%",
  },
  emerald: {
    background: "152 28% 95%",
    foreground: "160 85% 15%",
    muted: "155 60% 88%",
    mutedForeground: "161 72% 22%",
    card: "0 0% 100%",
    cardForeground: "161 72% 22%",
    border: "154 47% 80%",
    input: "154 47% 80%",
    ring: "160 84% 30%",
    primary: "160 84% 39%",
    primaryForeground: "150 20% 98%",
    secondary: "150 52% 90%",
    secondaryForeground: "161 72% 22%",
  },
  amber: {
    background: "47 88% 96%",
    foreground: "23 83% 18%",
    muted: "47 80% 90%",
    mutedForeground: "28 75% 28%",
    card: "0 0% 100%",
    cardForeground: "28 75% 28%",
    border: "45 85% 84%",
    input: "45 85% 84%",
    ring: "24 94% 50%",
    primary: "24 94% 62%",
    primaryForeground: "60 20% 98%",
    secondary: "48 96% 89%",
    secondaryForeground: "24 83% 22%",
  },
  violet: {
    background: "250 60% 96%",
    foreground: "260 84% 18%",
    muted: "254 78% 92%",
    mutedForeground: "260 60% 32%",
    card: "0 0% 100%",
    cardForeground: "260 60% 32%",
    border: "256 71% 86%",
    input: "256 71% 86%",
    ring: "258 80% 60%",
    primary: "258 80% 60%",
    primaryForeground: "240 33% 99%",
    secondary: "255 85% 88%",
    secondaryForeground: "260 65% 28%",
  },
};

export const accentColors: Record<AccentKey, string> = {
  orange: "25 95% 55%",
  purple: "266 75% 53%",
  blue: "210 90% 56%",
  emerald: "160 84% 39%",
};
