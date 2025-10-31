import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { usePersistedState } from "@/state/persistence/use-persisted-state";

import type { ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";
type ResolvedThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedMode: ResolvedThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  hydrated: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const prefersDarkQuery = "(prefers-color-scheme: dark)";
const THEME_KEY = "ui-theme-mode";
const STORAGE_NAMESPACE = "moldableClay";

const resolveMode = (mode: ThemeMode): ResolvedThemeMode => {
  if (mode === "system" && typeof window !== "undefined") {
    return window.matchMedia(prefersDarkQuery).matches ? "dark" : "light";
  }
  return mode === "dark" ? "dark" : "light";
};

const readStoredMode = (): ThemeMode | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(`${STORAGE_NAMESPACE}:${THEME_KEY}`);
    if (!stored) {
      return null;
    }
    const parsed = JSON.parse(stored) as { payload?: { mode?: ThemeMode } } | undefined;
    const candidate = parsed?.payload?.mode;
    if (candidate === "light" || candidate === "dark" || candidate === "system") {
      return candidate;
    }
  } catch (error) {
    console.warn("Failed to parse stored theme mode.", error);
  }

  return null;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [initialMode] = useState<ThemeMode>(() => readStoredMode() ?? "system");
  const [resolvedMode, setResolvedMode] = useState<ResolvedThemeMode>(() =>
    resolveMode(initialMode),
  );
  const { value, setValue, hydrated } = usePersistedState<{ mode: ThemeMode }>(
    THEME_KEY,
    { mode: initialMode },
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    const applyMode = (preference: ThemeMode) => {
      const mode = resolveMode(preference);
      root.classList.remove("light", "dark");
      root.classList.add(mode);
      root.style.colorScheme = mode;
      root.dataset.themePreference = preference;
      root.dataset.themeMode = mode;
      root.dataset.themeHydrated = hydrated ? "true" : "false";
      setResolvedMode(mode);
    };

    applyMode(value.mode);

    const mediaQuery = window.matchMedia(prefersDarkQuery);
    const listener = () => {
      if (value.mode === "system") {
        applyMode("system");
      }
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [hydrated, value.mode]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setValue({ mode: next });
    },
    [setValue],
  );

  const toggleMode = useCallback(() => {
    const next =
      value.mode === "dark" ? "light" : value.mode === "light" ? "system" : "dark";
    setMode(next);
  }, [setMode, value.mode]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      mode: value.mode,
      resolvedMode,
      setMode,
      toggleMode,
      hydrated,
    }),
    [hydrated, resolvedMode, setMode, toggleMode, value.mode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return context;
};
