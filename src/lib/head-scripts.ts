// The script that runs in <head> before the first paint, inlined by src/app/layout.tsx.
// It is a self-contained function: it is turned into a string, so it must not use anything
// from outside its body (imports, constants, helpers).

/**
 * The color mode, and the hidden state of the cards that fade in
 * (src/layouts/page-effects.tsx).
 */
function head() {
  const root = document.documentElement;

  // Color mode: the stored one, or the operating system's for auto
  let colorMode: string | null = null;
  try {
    colorMode = localStorage.getItem("adminkit_config_colorMode");
  } catch {
    // Storage is unavailable (private mode)
  }
  if (colorMode !== "light" && colorMode !== "dark") {
    colorMode = matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  root.setAttribute("data-bs-theme", colorMode);

  // Cards fade in as they scroll into view. They stay visible without JavaScript, and when
  // the page has not hydrated within 3 seconds.
  root.classList.add("js-reveal");
  setTimeout(() => {
    if (!root.classList.contains("js-reveal-ready")) {
      root.classList.remove("js-reveal");
    }
  }, 3000);
}

export const headScript = `(${head.toString()})();`;
