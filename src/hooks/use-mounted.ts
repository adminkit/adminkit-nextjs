"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False during server rendering and hydration, true after: for portals to <body>. */
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
