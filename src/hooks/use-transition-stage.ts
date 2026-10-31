"use client";

import { type RefObject, useEffect, useLayoutEffect, useState } from "react";
import { afterTransition, reflow } from "@/lib/transition";

/**
 * exited: not shown (components usually render nothing). entering: shown and transitioning
 * in. entered: shown. exiting: transitioning out.
 */
export type Stage = "exited" | "entering" | "entered" | "exiting";

/**
 * Runs a Bootstrap show/hide transition for `show`: the element is rendered without .show
 * for one frame, then with it ("entering") until its transition ends ("entered"), and
 * the other way around when `show` turns false. `ready` is false for that first frame.
 */
export function useTransitionStage(
  show: boolean,
  ref: RefObject<HTMLElement | null>,
  {
    onEntered,
    onExited,
  }: { onEntered?: () => void; onExited?: () => void } = {}
) {
  const [stage, setStage] = useState<Stage>(show ? "entered" : "exited");
  const [ready, setReady] = useState(show);
  const [previous, setPrevious] = useState(show);

  // A changed `show` starts the transition with this render
  if (show !== previous) {
    setPrevious(show);
    setStage(show ? "entering" : "exiting");
    if (show) {
      setReady(false);
    }
  }

  useLayoutEffect(() => {
    if (stage !== "entering" || ready) {
      return;
    }
    // Mounted without .show: apply that style before .show is added
    if (ref.current) {
      reflow(ref.current);
    }
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, [stage, ready, ref]);

  useEffect(() => {
    if (stage === "entering" && ready) {
      return afterTransition(ref.current, () => {
        setStage("entered");
        onEntered?.();
      });
    }
    if (stage === "exiting") {
      return afterTransition(ref.current, () => {
        setStage("exited");
        onExited?.();
      });
    }
    // The callbacks are read when the transition ends; changing them restarts nothing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, ready, ref]);

  return {
    stage,
    /** Rendered at all */
    mounted: stage !== "exited",
    /** Has .show (fades in, or is shown) */
    shown: (stage === "entering" && ready) || stage === "entered",
  };
}
