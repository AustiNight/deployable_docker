import { createContext, useCallback, useContext, useEffect } from "react";

import { usePersistedState } from "@/state/persistence/use-persisted-state";

import type { ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  hydrated: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const prefersDarkQuery = "(prefers-color-scheme: dark)";
const THEME_KEY = "ui-theme-mode";

const resolveMode = (mode: ThemeMode): "light" | "dark" => {
  if (mode === "system" && typeof window !== "undefined") {
    return window.matchMedia(prefersDarkQuery).matches ? "dark" : "light";
  }
  return mode === "dark" ? "dark" : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { value, setValue, hydrated } = usePersistedState<{ mode: ThemeMode }>(
    THEME_KEY,
    { mode: "system" },
  );

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    const applyMode = () => {
      const mode = resolveMode(value.mode);
      root.classList.remove("light", "dark");
      root.classList.add(mode);
    };

    applyMode();

    const mediaQuery = window.matchMedia(prefersDarkQuery);
    const listener = () => {
      if (value.mode === "system") {
        applyMode();
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

  const contextValue: ThemeContextValue = {
    mode: value.mode,
    setMode,
    toggleMode,
    hydrated,
  };

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

