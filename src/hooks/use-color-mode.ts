"use client";

import { useSyncExternalStore } from "react";
import { type ColorMode, getColorMode, setColorMode } from "@/lib/config";

const subscribe = (callback: () => void) => {
  document.addEventListener("adminkit:colormodechange", callback);
  return () =>
    document.removeEventListener("adminkit:colormodechange", callback);
};

/** The chosen color mode (light, dark or auto) and its setter. */
export function useColorMode() {
  const mode = useSyncExternalStore<ColorMode>(
    subscribe,
    getColorMode,
    () => "auto"
  );
  return [mode, setColorMode] as const;
}
