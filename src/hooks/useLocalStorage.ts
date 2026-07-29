"use client";

import { useCallback, useMemo, useReducer, useSyncExternalStore } from "react";

function parseStorage<T>(raw: string | null, fallback: T): T {
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [, refresh] = useReducer((count: number) => count + 1, 0);
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const onStorage = (event: StorageEvent) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          onStoreChange();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    },
    [key]
  );
  const getSnapshot = useCallback(() => window.localStorage.getItem(key), [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const value = useMemo(() => parseStorage(raw, initial), [raw, initial]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const previous = parseStorage(window.localStorage.getItem(key), initial);
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(previous) : next;
      writeStorage(key, resolved);
      refresh();
    },
    [initial, key]
  );

  return [value, set, hydrated] as const;
}

export function storageKey(
  profile: string,
  area: string,
  suffix?: string | number
) {
  return suffix != null
    ? `fg:${profile}:${area}:${suffix}`
    : `fg:${profile}:${area}`;
}
