import { create } from "zustand";

import { persistence, type PersistedSnapshot } from "@/state/persistence/indexed-db";

const AUTH_KEY = "site-auth";
const AUTH_VERSION = 1;

const demoCredentials = {
  email: "admin@moldableclay.dev",
  password: "moldable",
};

type AuthPayload = {
  isAuthenticated: boolean;
  email?: string;
};

type AuthStore = {
  isAuthenticated: boolean;
  loading: boolean;
  email?: string;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  loading: true,
  email: undefined,
  hydrate: async () => {
    const snapshot = await persistence.get<PersistedSnapshot<AuthPayload>>(AUTH_KEY);
    if (snapshot && snapshot.version === AUTH_VERSION) {
      set({
        isAuthenticated: snapshot.payload.isAuthenticated,
        email: snapshot.payload.email,
        loading: false,
      });
      return;
    }

    set({ isAuthenticated: false, email: undefined, loading: false });
    await persistence.set<PersistedSnapshot<AuthPayload>>(AUTH_KEY, {
      version: AUTH_VERSION,
      payload: { isAuthenticated: false },
      updatedAt: Date.now(),
    });
  },
  login: async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const valid =
      (normalizedEmail === demoCredentials.email &&
        password === demoCredentials.password) ||
      password === "demo";

    if (!valid) {
      return false;
    }

    set({ isAuthenticated: true, email: normalizedEmail });
    await persistence.set<PersistedSnapshot<AuthPayload>>(AUTH_KEY, {
      version: AUTH_VERSION,
      payload: { isAuthenticated: true, email: normalizedEmail },
      updatedAt: Date.now(),
    });
    return true;
  },
  logout: async () => {
    set({ isAuthenticated: false, email: undefined });
    await persistence.set<PersistedSnapshot<AuthPayload>>(AUTH_KEY, {
      version: AUTH_VERSION,
      payload: { isAuthenticated: false },
      updatedAt: Date.now(),
    });
  },
}));
