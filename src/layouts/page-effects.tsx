"use client";

import { useEffect } from "react";
import { resolveColorMode, getColorMode } from "@/lib/config";

const revealSelector = ".reveal, .reveal-cards .card:not(.card .card)";
const maxStagger = 8;

/**
 * Effects for the whole document, set up once in the root layout:
 * - Cards fade up as they scroll into view: every top-level .card inside .reveal-cards
 *   (the layouts put it on <main>, which itself fades in once the page has hydrated) and
 *   any .reveal element, also when a route change or a component adds them later.
 *   Elements that come into view together are staggered through --ak-reveal-index. The
 *   hidden state is CSS under html.js-reveal, which the head script sets; the state lives
 *   in data attributes, so React re-rendering a card's className keeps it.
 *   Styles: scss/3-components/_reveal.scss.
 * - The auto color mode follows the operating system while the page is open.
 */
export function PageEffects() {
  useEffect(() => {
    const root = document.documentElement;
    // The head script shows everything again if this has not run within a few seconds
    root.classList.add("js-reveal-ready");

    if (!root.classList.contains("js-reveal")) {
      return;
    }

    const reveal = (elements: Element[]) => {
      elements.forEach((element, index) => {
        const target = element as HTMLElement;
        const onTransitionEnd = (event: TransitionEvent) => {
          if (event.target === target && event.propertyName === "opacity") {
            target.removeEventListener("transitionend", onTransitionEnd);
            target.removeAttribute("data-revealing");
            target.style.removeProperty("--ak-reveal-index");
          }
        };

        target.addEventListener("transitionend", onTransitionEnd);
        target.style.setProperty(
          "--ak-reveal-index",
          String(Math.min(index, maxStagger))
        );
        target.setAttribute("data-revealed", "");
        target.setAttribute("data-revealing", "");
      });
    };

    const intersection = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target);
      visible.forEach((element) => intersection.unobserve(element));
      reveal(visible);
    });

    const scan = () => {
      document
        .querySelectorAll(".reveal-cards:not([data-revealed])")
        .forEach((element) => element.setAttribute("data-revealed", ""));
      document
        .querySelectorAll(`:is(${revealSelector}):not([data-revealed])`)
        .forEach((element) => intersection.observe(element));
    };

    scan();
    // Route changes and client components add cards later
    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      intersection.disconnect();
    };
  }, []);

  useEffect(() => {
    const systemDark = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const mode = getColorMode();
      if (mode === "auto") {
        document.documentElement.setAttribute(
          "data-bs-theme",
          resolveColorMode(mode)
        );
      }
    };
    systemDark.addEventListener("change", onChange);
    return () => systemDark.removeEventListener("change", onChange);
  }, []);

  return null;
}
