"use client";

import { useEffect } from "react";

let locks = 0;

/**
 * Stops the page from scrolling while active, and pads <body> by the scrollbar's width so
 * nothing moves, as Bootstrap's modal and offcanvas do. `className` goes on <body> too
 * (modal-open).
 */
export function useScrollLock(active: boolean, className?: string) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;

    if (locks++ === 0) {
      body.style.overflow = "hidden";
      if (scrollbar > 0) {
        const padding = parseFloat(getComputedStyle(body).paddingRight);
        body.style.paddingRight = `${padding + scrollbar}px`;
      }
    }
    if (className) {
      body.classList.add(className);
    }

    return () => {
      if (--locks === 0) {
        body.style.removeProperty("overflow");
        body.style.removeProperty("padding-right");
      }
      if (className) {
        body.classList.remove(className);
      }
    };
  }, [active, className]);
}
