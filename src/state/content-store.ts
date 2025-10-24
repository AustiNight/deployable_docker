import { create } from "zustand";

import { defaultContent } from "@/data/fixtures";
import { templateIndex, templates } from "@/data/templates";
import { persistence, type PersistedSnapshot } from "@/state/persistence/indexed-db";
import type { SiteContent } from "@/types/content";

const CONTENT_KEY = "site-content";
const CONTENT_VERSION = 1;

type ContentSnapshot = {
  content: SiteContent;
  selectedTemplate: string;
};

type ContentStore = {
  content: SiteContent;
  selectedTemplate: string;
  loaded: boolean;
  hydrate: () => Promise<void>;
  updateContent: (content: Partial<SiteContent>) => void;
  updateNavigation: (navigation: SiteContent["navigation"]) => void;
  updateHero: (hero: Partial<SiteContent["home"]["hero"]>) => void;
  updateLayout: (layout: Partial<SiteContent["layout"]>) => void;
  updateTheme: (
    updater: (theme: SiteContent["theme"]) => SiteContent["theme"],
  ) => void;
  applyTemplate: (templateId: string) => Promise<void>;
  reset: (templateId?: string) => Promise<void>;
};

const persistState = async (state: ContentSnapshot): Promise<void> => {
  await persistence.set<PersistedSnapshot<ContentSnapshot>>(CONTENT_KEY, {
    version: CONTENT_VERSION,
    payload: state,
    updatedAt: Date.now(),
  });
};

export const useContentStore = create<ContentStore>((set, get) => ({
  content: defaultContent,
  selectedTemplate: defaultContent.theme.preset,
  loaded: false,
  hydrate: async () => {
    const snapshot = await persistence.get<PersistedSnapshot<ContentSnapshot>>(
      CONTENT_KEY,
    );

    if (snapshot && snapshot.version === CONTENT_VERSION) {
      set({
        content: snapshot.payload.content,
        selectedTemplate: snapshot.payload.selectedTemplate,
        loaded: true,
      });
      return;
    }

    const fallbackSnapshot: ContentSnapshot = {
      content: defaultContent,
      selectedTemplate: defaultContent.theme.preset,
    };
    set({ ...fallbackSnapshot, loaded: true });
    await persistState(fallbackSnapshot);
  },
  updateContent: (partial) => {
    set((state) => {
      const nextContent = { ...state.content, ...partial };
      void persistState({
        content: nextContent,
        selectedTemplate: state.selectedTemplate,
      });
      return { content: nextContent };
    });
  },
  updateNavigation: (navigation) => {
    set((state) => {
      const content: SiteContent = { ...state.content, navigation };
      void persistState({ content, selectedTemplate: state.selectedTemplate });
      return { content };
    });
  },
  updateHero: (hero) => {
    set((state) => {
      const content: SiteContent = {
        ...state.content,
        home: {
          ...state.content.home,
          hero: { ...state.content.home.hero, ...hero },
        },
      };
      void persistState({ content, selectedTemplate: state.selectedTemplate });
      return { content };
    });
  },
  updateLayout: (layout) => {
    set((state) => {
      const content: SiteContent = {
        ...state.content,
        layout: { ...state.content.layout, ...layout },
      };
      void persistState({ content, selectedTemplate: state.selectedTemplate });
      return { content };
    });
  },
  updateTheme: (updater) => {
    set((state) => {
      const nextTheme = updater(state.content.theme);
      const content: SiteContent = {
        ...state.content,
        theme: nextTheme,
      };
      void persistState({ content, selectedTemplate: state.selectedTemplate });
      return { content };
    });
  },
  applyTemplate: async (templateId) => {
    const template = templateIndex[templateId];
    if (!template) {
      console.warn(`Template with id ${templateId} not found.`);
      return;
    }
    const snapshot: ContentSnapshot = {
      content: template.content,
      selectedTemplate: templateId,
    };
    set({
      content: snapshot.content,
      selectedTemplate: templateId,
    });
    await persistState(snapshot);
  },
  reset: async (templateId) => {
    if (templateId && templateIndex[templateId]) {
      await get().applyTemplate(templateId);
      return;
    }

    const snapshot: ContentSnapshot = {
      content: defaultContent,
      selectedTemplate: defaultContent.theme.preset,
    };
    set(snapshot);
    await persistState(snapshot);
  },
}));

export const availableTemplates = templates;
