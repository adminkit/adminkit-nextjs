"use client";

import { type RefObject, useEffect } from "react";

const focusable = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "[contenteditable]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const tabbables = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLElement>(focusable)].filter(
    (element) =>
      !element.closest("[inert]") &&
      getComputedStyle(element).visibility !== "hidden" &&
      element.getClientRects().length > 0
  );

/**
 * While active, focus moves into the container (to the container itself, as Bootstrap
 * does), Tab and Shift+Tab cycle inside it, and focus returns to the element that had it
 * when the trap ends. For modals and offcanvas sheets.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    const container = ref.current;
    if (!active || !container) {
      return;
    }

    const previous = document.activeElement as HTMLElement | null;
    if (!container.contains(document.activeElement)) {
      container.focus({ preventScroll: true });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }
      const elements = tabbables(container);
      const first = elements[0];
      const last = elements.at(-1);

      if (!first || !last) {
        event.preventDefault();
        container.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !container.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === container) {
        event.preventDefault();
        last.focus();
      }
    };

    // Focus that lands outside (a click on the page) is pulled back in
    const onFocusIn = (event: FocusEvent) => {
      if (!container.contains(event.target as Node)) {
        container.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      if (previous?.isConnected) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [ref, active]);
}
