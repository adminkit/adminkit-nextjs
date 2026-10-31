"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Whether the media query matches; false during server rendering and hydration. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const list = matchMedia(query);
      list.addEventListener("change", callback);
      return () => list.removeEventListener("change", callback);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false
  );
}

/** From the lg breakpoint the sidebar is part of the layout; below it, a sheet. */
export const useDesktop = () => useMediaQuery("(min-width: 992px)");
