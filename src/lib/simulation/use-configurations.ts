"use client";
import { useMemo, useSyncExternalStore } from "react";
import {
  emptySnapshot,
  parseConfigurations,
  storageKey,
  type SavedConfiguration,
} from "./configurations";
const eventName = "nanolab-configurations";
function snapshot() {
  try {
    return localStorage.getItem(storageKey) || emptySnapshot;
  } catch {
    return "unavailable";
  }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(eventName, listener);
  };
}
export function useConfigurations() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => emptySnapshot);
  return useMemo(
    () =>
      raw === "unavailable"
        ? {
            configurations: [],
            issue:
              "Browser storage is unavailable. URL-based comparison still works.",
          }
        : parseConfigurations(raw),
    [raw],
  );
}
export function writeConfigurations(configurations: SavedConfiguration[]) {
  localStorage.setItem(
    storageKey,
    JSON.stringify({ version: 1, configurations }),
  );
  window.dispatchEvent(new Event(eventName));
}
