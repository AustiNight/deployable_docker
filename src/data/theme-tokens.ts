export type PaletteKey = "slate" | "emerald" | "amber" | "violet";
export type AccentKey = "orange" | "purple" | "blue" | "emerald";

type ColorModeTokens = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  border: string;
  input: string;
  ring: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  destructive: string;
  destructiveForeground: string;
};

type ThemeColorTokens = {
  light: ColorModeTokens;
  dark: ColorModeTokens;
};

type AccentColorTokens = {
  light: string;
  dark: string;
};

export const paletteTokens: Record<PaletteKey, ThemeColorTokens> = {
  slate: {
    light: {
      background: "210 40% 98%",
      foreground: "224 71% 4%",
      muted: "214 32% 91%",
      mutedForeground: "215 20% 65%",
      card: "0 0% 100%",
      cardForeground: "222 84% 5%",
      popover: "210 40% 98%",
      popoverForeground: "224 71% 4%",
      border: "221 39% 89%",
      input: "221 39% 89%",
      ring: "222 84% 5%",
      primary: "222 47% 11%",
      primaryForeground: "210 40% 98%",
      secondary: "210 40% 96%",
      secondaryForeground: "222 47% 11%",
      destructive: "0 84% 60%",
      destructiveForeground: "210 40% 98%",
    },
    dark: {
      background: "224 71% 4%",
      foreground: "210 40% 98%",
      muted: "215 28% 16%",
      mutedForeground: "216 12% 84%",
      card: "224 71% 4%",
      cardForeground: "210 40% 98%",
      popover: "224 71% 4%",
      popoverForeground: "210 40% 98%",
      border: "215 28% 16%",
      input: "215 28% 16%",
      ring: "212 27% 84%",
      primary: "210 40% 98%",
      primaryForeground: "222 47% 11%",
      secondary: "222 47% 11%",
      secondaryForeground: "210 40% 98%",
      destructive: "0 62% 30%",
      destructiveForeground: "210 40% 98%",
    },
  },
  emerald: {
    light: {
      background: "152 28% 95%",
      foreground: "160 85% 15%",
      muted: "155 60% 88%",
      mutedForeground: "161 72% 22%",
      card: "0 0% 100%",
      cardForeground: "161 72% 22%",
      popover: "0 0% 100%",
      popoverForeground: "160 85% 15%",
      border: "154 47% 80%",
      input: "154 47% 80%",
      ring: "160 84% 30%",
      primary: "160 84% 39%",
      primaryForeground: "150 20% 98%",
      secondary: "150 52% 90%",
      secondaryForeground: "161 72% 22%",
      destructive: "0 84% 60%",
      destructiveForeground: "210 40% 98%",
    },
    dark: {
      background: "163 61% 7%",
      foreground: "152 28% 88%",
      muted: "160 44% 16%",
      mutedForeground: "156 26% 70%",
      card: "162 53% 9%",
      cardForeground: "152 28% 88%",
      popover: "162 53% 9%",
      popoverForeground: "152 28% 88%",
      border: "160 44% 18%",
      input: "160 44% 18%",
      ring: "152 64% 45%",
      primary: "152 73% 45%",
      primaryForeground: "150 20% 96%",
      secondary: "160 44% 20%",
      secondaryForeground: "152 28% 88%",
      destructive: "0 62% 30%",
      destructiveForeground: "152 28% 88%",
    },
  },
  amber: {
    light: {
      background: "47 88% 96%",
      foreground: "23 83% 18%",
      muted: "47 80% 90%",
      mutedForeground: "28 75% 28%",
      card: "0 0% 100%",
      cardForeground: "28 75% 28%",
      popover: "0 0% 100%",
      popoverForeground: "23 83% 18%",
      border: "45 85% 84%",
      input: "45 85% 84%",
      ring: "24 94% 50%",
      primary: "24 94% 62%",
      primaryForeground: "60 20% 98%",
      secondary: "48 96% 89%",
      secondaryForeground: "24 83% 22%",
      destructive: "0 84% 60%",
      destructiveForeground: "210 40% 98%",
    },
    dark: {
      background: "32 61% 10%",
      foreground: "48 96% 88%",
      muted: "35 46% 20%",
      mutedForeground: "48 94% 74%",
      card: "33 53% 12%",
      cardForeground: "48 96% 88%",
      popover: "33 53% 12%",
      popoverForeground: "48 96% 88%",
      border: "35 46% 24%",
      input: "35 46% 24%",
      ring: "33 96% 62%",
      primary: "32 94% 58%",
      primaryForeground: "60 20% 98%",
      secondary: "35 46% 26%",
      secondaryForeground: "48 96% 88%",
      destructive: "0 62% 30%",
      destructiveForeground: "48 96% 88%",
    },
  },
  violet: {
    light: {
      background: "250 60% 96%",
      foreground: "260 84% 18%",
      muted: "254 78% 92%",
      mutedForeground: "260 60% 32%",
      card: "0 0% 100%",
      cardForeground: "260 60% 32%",
      popover: "0 0% 100%",
      popoverForeground: "260 84% 18%",
      border: "256 71% 86%",
      input: "256 71% 86%",
      ring: "258 80% 60%",
      primary: "258 80% 60%",
      primaryForeground: "240 33% 99%",
      secondary: "255 85% 88%",
      secondaryForeground: "260 65% 28%",
      destructive: "0 84% 60%",
      destructiveForeground: "210 40% 98%",
    },
    dark: {
      background: "261 60% 12%",
      foreground: "260 60% 96%",
      muted: "263 50% 20%",
      mutedForeground: "262 70% 80%",
      card: "262 58% 14%",
      cardForeground: "260 60% 96%",
      popover: "262 58% 14%",
      popoverForeground: "260 60% 96%",
      border: "263 45% 26%",
      input: "263 45% 26%",
      ring: "259 82% 70%",
      primary: "258 80% 65%",
      primaryForeground: "247 43% 98%",
      secondary: "265 45% 24%",
      secondaryForeground: "260 60% 96%",
      destructive: "0 62% 30%",
      destructiveForeground: "260 60% 96%",
    },
  },
};

export const accentColors: Record<AccentKey, AccentColorTokens> = {
  orange: {
    light: "25 95% 55%",
    dark: "26 96% 58%",
  },
  purple: {
    light: "266 75% 53%",
    dark: "268 90% 66%",
  },
  blue: {
    light: "210 90% 56%",
    dark: "212 92% 64%",
  },
  emerald: {
    light: "160 84% 39%",
    dark: "154 80% 50%",
  },
};
