"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("lab-settings", callback);
  return () => window.removeEventListener("lab-settings", callback);
};

export function useMotionPreference() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.motion === "reduced",
    () => false,
  );
}
