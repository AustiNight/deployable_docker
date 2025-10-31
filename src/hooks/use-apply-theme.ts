import { useEffect } from "react";

import { useThemeMode } from "@/components/theme/theme-provider";
import { accentColors, paletteTokens } from "@/data/theme-tokens";
import { useContentStore } from "@/state/content-store";

export const useApplyTheme = (): void => {
  const theme = useContentStore((state) => state.content.theme);
  const { resolvedMode } = useThemeMode();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const paletteScale = paletteTokens[theme.palette] ?? paletteTokens.slate;
    const palette = paletteScale[resolvedMode];
    const accentScale = accentColors[theme.accent] ?? accentColors.orange;
    const accent = accentScale[resolvedMode];
    const accentForeground = resolvedMode === "dark" ? palette.background : palette.foreground;
    const fontStack = `${theme.fontFamily}, system-ui, sans-serif`;

    const root = document.documentElement;
    const entries = Object.entries({
      "--background": palette.background,
      "--foreground": palette.foreground,
      "--muted": palette.muted,
      "--muted-foreground": palette.mutedForeground,
      "--card": palette.card,
      "--card-foreground": palette.cardForeground,
      "--popover": palette.popover,
      "--popover-foreground": palette.popoverForeground,
      "--border": palette.border,
      "--input": palette.input,
      "--ring": palette.ring,
      "--primary": palette.primary,
      "--primary-foreground": palette.primaryForeground,
      "--secondary": palette.secondary,
      "--secondary-foreground": palette.secondaryForeground,
      "--accent": accent,
      "--accent-foreground": accentForeground,
      "--destructive": palette.destructive,
      "--destructive-foreground": palette.destructiveForeground,
      "--radius": theme.radius,
      "--font-sans": fontStack,
      "--font-display": fontStack,
    });

    entries.forEach(([variable, value]) => {
      root.style.setProperty(variable, value);
    });
  }, [resolvedMode, theme.accent, theme.fontFamily, theme.palette, theme.radius]);
};
