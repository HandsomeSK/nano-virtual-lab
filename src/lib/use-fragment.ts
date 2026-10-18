"use client";

import { useSyncExternalStore } from "react";
import { fragmentId } from "./navigation-scroll";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function snapshot() {
  return fragmentId(window.location.hash);
}

function serverSnapshot() {
  return "";
}

export function useFragment() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
