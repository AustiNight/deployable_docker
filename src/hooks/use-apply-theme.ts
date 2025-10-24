import { useEffect } from "react";

import { accentColors, paletteTokens } from "@/data/theme-tokens";
import { useContentStore } from "@/state/content-store";

export const useApplyTheme = (): void => {
  const theme = useContentStore((state) => state.content.theme);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const palette = paletteTokens[theme.palette];
    const accent = accentColors[theme.accent] ?? accentColors.orange;

    const root = document.documentElement;
    const entries = Object.entries({
      "--background": palette.background,
      "--foreground": palette.foreground,
      "--muted": palette.muted,
      "--muted-foreground": palette.mutedForeground,
      "--card": palette.card,
      "--card-foreground": palette.cardForeground,
      "--border": palette.border,
      "--input": palette.input,
      "--ring": palette.ring,
      "--primary": palette.primary,
      "--primary-foreground": palette.primaryForeground,
      "--secondary": palette.secondary,
      "--secondary-foreground": palette.secondaryForeground,
      "--accent": accent,
      "--accent-foreground": palette.foreground,
      "--radius": theme.radius,
      "--font-sans": `${theme.fontFamily}, system-ui, sans-serif`,
      "--font-display": `${theme.fontFamily}, system-ui, sans-serif`,
    });

    entries.forEach(([variable, value]) => {
      root.style.setProperty(variable, value);
    });
  }, [theme]);
};
