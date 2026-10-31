"use client";

import { useSyncExternalStore } from "react";

// The theme colors for charts and maps, read from the CSS custom properties of the current
// color mode. They change with data-bs-theme on <html>.
export type Theme = {
  id: "light" | "dark";
  name: "Light" | "Dark";
  primary: string;
  secondary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
  /** The surface color: white in light mode */
  white: string;
  /** The brightest text color: black in light mode */
  black: string;
  "body-bg": string;
  "body-color": string;
  "border-color": string;
  "gray-100": string;
  "gray-200": string;
  "gray-300": string;
  "gray-400": string;
  "gray-500": string;
  "gray-600": string;
  "gray-700": string;
  "gray-800": string;
  "gray-900": string;
};

const readTheme = (): Theme => {
  const style = getComputedStyle(document.documentElement);
  const value = (name: string) => style.getPropertyValue(`--${name}`).trim();
  const id =
    document.documentElement.getAttribute("data-bs-theme") === "dark"
      ? "dark"
      : "light";

  return {
    id,
    name: id === "dark" ? "Dark" : "Light",
    primary: value("bs-primary"),
    secondary: value("bs-secondary"),
    success: value("bs-success"),
    info: value("bs-info"),
    warning: value("bs-warning"),
    danger: value("bs-danger"),
    white: value("ak-surface-bg"),
    black: value("bs-emphasis-color"),
    "body-bg": value("bs-body-bg"),
    "body-color": value("bs-body-color"),
    "border-color": value("bs-border-color"),
    "gray-100": value("bs-gray-100"),
    "gray-200": value("bs-gray-200"),
    "gray-300": value("bs-gray-300"),
    "gray-400": value("bs-gray-400"),
    "gray-500": value("bs-gray-500"),
    "gray-600": value("bs-gray-600"),
    "gray-700": value("bs-gray-700"),
    "gray-800": value("bs-gray-800"),
    "gray-900": value("bs-gray-900"),
  };
};

let theme: Theme | null = null;
const listeners = new Set<() => void>();

const getTheme = () => {
  const id =
    document.documentElement.getAttribute("data-bs-theme") === "dark"
      ? "dark"
      : "light";
  if (!theme || theme.id !== id) {
    theme = readTheme();
  }
  return theme;
};

let observer: MutationObserver | null = null;

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  observer ??= new MutationObserver(() => {
    const previous = theme;
    if (getTheme() !== previous) {
      listeners.forEach((listener) => listener());
      document.dispatchEvent(
        new CustomEvent("adminkit:themechange", { detail: theme })
      );
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"],
  });
  return () => {
    listeners.delete(callback);
    if (!listeners.size) {
      observer?.disconnect();
      observer = null;
    }
  };
};

/**
 * The colors of the current color mode, or null during server rendering and hydration.
 * Components re-render with the new colors when the mode changes.
 */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, getTheme, () => null);
}
