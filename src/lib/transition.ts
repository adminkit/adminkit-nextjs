// Helpers for Bootstrap's CSS transitions (.fade/.show, .collapsing, .offcanvas.showing),
// which the components run without Bootstrap's JavaScript.

/** Forces a style recalculation, so a class added next starts a transition. */
export const reflow = (element: HTMLElement) => {
  void element.offsetHeight;
};

/**
 * Calls back once the element's transition has ended, or on the next frame when it has
 * none (reduced motion turns Bootstrap's transitions off). Returns a cancel function.
 */
export const afterTransition = (
  element: HTMLElement | null,
  callback: () => void
) => {
  const style = element ? getComputedStyle(element) : null;
  const duration = style
    ? (parseFloat(style.transitionDuration) +
        parseFloat(style.transitionDelay)) *
      1000
    : 0;

  if (!element || !duration) {
    const frame = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(frame);
  }

  let done = false;
  const finish = (event?: TransitionEvent) => {
    if (done || (event && event.target !== element)) {
      return;
    }
    cancel();
    callback();
  };
  const cancel = () => {
    done = true;
    element.removeEventListener("transitionend", finish);
    clearTimeout(timer);
  };

  element.addEventListener("transitionend", finish);
  // transitionend does not fire when nothing changed; Bootstrap waits 5ms longer too
  const timer = setTimeout(finish, duration + 5);

  return cancel;
};
