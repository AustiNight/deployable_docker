import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "moldableClay";
const STORE_NAME = "content";
const META_STORE = "meta";
const DB_VERSION = 1;
const hasWindow = typeof window !== "undefined";

type Database = IDBPDatabase<unknown>;

let dbPromise: Promise<Database> | null = null;

const getDatabase = (): Promise<Database> => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE);
        }
      },
    });
  }

  return dbPromise;
};

const getLocalStorageKey = (key: string): string => `${DB_NAME}:${key}`;

export const persistence = {
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const db = await getDatabase();
      const value = (await db.get(STORE_NAME, key)) as T | undefined;
      if (value !== undefined) {
        return value;
      }
    } catch (error) {
      console.warn("IndexedDB retrieval failed, falling back to localStorage.", error);
    }

    if (hasWindow) {
      try {
        const fallback = window.localStorage.getItem(getLocalStorageKey(key));
        if (fallback) {
          return JSON.parse(fallback) as T;
        }
      } catch (error) {
        console.error("Local storage retrieval failed.", error);
      }
    }
    return undefined;
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      const db = await getDatabase();
      await db.put(STORE_NAME, value, key);
    } catch (error) {
      console.warn("IndexedDB write failed, falling back to localStorage.", error);
    }

    if (hasWindow) {
      try {
        window.localStorage.setItem(getLocalStorageKey(key), JSON.stringify(value));
      } catch (error) {
        console.error("Failed to persist value to localStorage.", error);
      }
    }
  },

  async remove(key: string): Promise<void> {
    try {
      const db = await getDatabase();
      await db.delete(STORE_NAME, key);
    } catch (error) {
      console.warn("IndexedDB delete failed.", error);
    }

    if (hasWindow) {
      window.localStorage.removeItem(getLocalStorageKey(key));
    }
  },

  async clear(): Promise<void> {
    try {
      const db = await getDatabase();
      await db.clear(STORE_NAME);
      await db.clear(META_STORE);
    } catch (error) {
      console.warn("IndexedDB clear failed.", error);
    }

    if (hasWindow) {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith(`${DB_NAME}:`))
        .forEach((key) => window.localStorage.removeItem(key));
    }
  },

  async setMeta<T>(key: string, value: T): Promise<void> {
    try {
      const db = await getDatabase();
      await db.put(META_STORE, value, key);
    } catch (error) {
      console.warn("IndexedDB meta write failed.", error);
    }
  },

  async getMeta<T>(key: string): Promise<T | undefined> {
    try {
      const db = await getDatabase();
      return (await db.get(META_STORE, key)) as T | undefined;
    } catch (error) {
      console.warn("IndexedDB meta read failed.", error);
      return undefined;
    }
  },
};

export type PersistedSnapshot<T> = {
  version: number;
  payload: T;
  updatedAt: number;
};
