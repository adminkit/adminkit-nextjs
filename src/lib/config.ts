// The color mode: data-bs-theme on <html>, stored in localStorage as
// adminkit_config_colorMode. The inline head script (src/lib/head-scripts.ts) applies the
// stored mode before the first paint; afterwards it changes only through setColorMode,
// which fires adminkit:colormodechange on document.
import appearance from "@/data/appearance.json";

export const storagePrefix = "adminkit_config_";

/** light and dark are what the stylesheet has; auto follows the operating system. */
export const colorModes = [...appearance.colorModes, "auto"] as const;
export type ColorMode = "light" | "dark" | "auto";

export const getStored = (name: string): string | null => {
  try {
    return localStorage.getItem(`${storagePrefix}${name}`);
  } catch {
    // Storage is unavailable (private mode)
    return null;
  }
};

export const setStored = (name: string, value: string) => {
  try {
    localStorage.setItem(`${storagePrefix}${name}`, value);
  } catch {
    // Storage is unavailable (private mode); the setting still applies to this page
  }
};

const systemDark = () => matchMedia("(prefers-color-scheme: dark)").matches;

export const getColorMode = (): ColorMode => {
  const mode = getStored("colorMode");
  return mode === "light" || mode === "dark" ? mode : "auto";
};

/** The mode <html> shows: light or dark. */
export const resolveColorMode = (mode: ColorMode) =>
  mode === "auto" ? (systemDark() ? "dark" : "light") : mode;

/** Stores the mode, sets data-bs-theme and announces the change. */
export const setColorMode = (mode: ColorMode) => {
  setStored("colorMode", mode);
  document.documentElement.setAttribute(
    "data-bs-theme",
    resolveColorMode(mode)
  );
  document.dispatchEvent(
    new CustomEvent("adminkit:colormodechange", { detail: { colorMode: mode } })
  );
};
