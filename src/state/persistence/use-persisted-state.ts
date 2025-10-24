import { useCallback, useEffect, useRef, useState } from "react";

import { persistence } from "./indexed-db";

type UsePersistedStateOptions<T> = {
  version?: number;
  onHydrated?: (value: T) => void;
};

type PersistedStateControls<T> = {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  reset: () => void;
  loading: boolean;
  hydrated: boolean;
};

export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  options: UsePersistedStateOptions<T> = {},
): PersistedStateControls<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [hydrated, setHydrated] = useState(false);
  const isMountedRef = useRef(true);
  const version = options.version ?? 1;
  const versionRef = useRef(version);
  const onHydratedRef = useRef(options.onHydrated);

  useEffect(() => {
    onHydratedRef.current = options.onHydrated;
  }, [options.onHydrated]);

  useEffect(() => {
    versionRef.current = version;
  }, [version]);

  const persist = useCallback(
    async (nextValue: T) => {
      await persistence.set(key, {
        version: versionRef.current,
        payload: nextValue,
        updatedAt: Date.now(),
      });
    },
    [key],
  );

  useEffect(() => {
    isMountedRef.current = true;
    void (async () => {
      const snapshot = await persistence.get<{
        version: number;
        payload: T;
      }>(key);

      if (!snapshot || snapshot.version !== versionRef.current) {
        await persist(defaultValue);
        setValue(defaultValue);
        setHydrated(true);
        onHydratedRef.current?.(defaultValue);
        return;
      }

      if (isMountedRef.current) {
        setValue(snapshot.payload);
        setHydrated(true);
        onHydratedRef.current?.(snapshot.payload);
      }
    })();

    return () => {
      isMountedRef.current = false;
    };
  }, [defaultValue, key, persist]);

  const setPersistedValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
        void persist(resolved);
        return resolved;
      });
    },
    [persist],
  );

  const reset = useCallback(() => {
    setValue(defaultValue);
    void persist(defaultValue);
  }, [defaultValue, persist]);

  return {
    value,
    setValue: setPersistedValue,
    reset,
    loading: !hydrated,
    hydrated,
  };
}
