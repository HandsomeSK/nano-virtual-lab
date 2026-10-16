"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import {
  appreciationStorageKey,
  createAppreciationPreference,
} from "@/lib/appreciation";
import styles from "./appreciation-button.module.css";

const preference = createAppreciationPreference(() => window.localStorage);
const changeEvent = "nanolab-appreciation";
const serverSnapshot = () => false;

function subscribe(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== null && event.key !== appreciationStorageKey) return;
    preference.sync();
    listener();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, listener);
  };
}

export function AppreciationButton({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const liked = useSyncExternalStore(
    subscribe,
    preference.snapshot,
    serverSnapshot,
  );
  return (
    <button
      type="button"
      className={`metal-button metal-solid header-cta ${styles.button} ${className}`}
      style={style}
      aria-label="Like NanoLab"
      aria-pressed={liked}
      title={
        liked
          ? "Thanks for the encouragement. Click to remove your like"
          : "Enjoying NanoLab? Give it a like"
      }
      onClick={() => {
        preference.toggle();
        window.dispatchEvent(new Event(changeEvent));
      }}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24">
          <path
            d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>Like NanoLab</span>
    </button>
  );
}
