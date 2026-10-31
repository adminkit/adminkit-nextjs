"use client";

import {
  type ComponentPropsWithRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useMounted } from "@/hooks/use-mounted";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useTransitionStage } from "@/hooks/use-transition-stage";
import { cx } from "@/lib/cx";

type OffcanvasProps<T extends ElementType> = {
  show: boolean;
  onHide: () => void;
  onShown?: () => void;
  onHidden?: () => void;
  /** The side it slides in from */
  placement?: "start" | "end" | "top" | "bottom";
  /** Below which breakpoint it is a sheet (.offcanvas-lg); always one by default */
  responsive?: "sm" | "md" | "lg" | "xl" | "xxl";
  /** true: a backdrop that closes it on click; static: one that doesn't; false: none */
  backdrop?: boolean | "static";
  /** Keep the page scrollable while it is open */
  scroll?: boolean;
  /** Escape closes it */
  keyboard?: boolean;
  as?: T;
  children: ReactNode;
} & Omit<ComponentPropsWithRef<T>, "as" | "children">;

/**
 * Bootstrap's offcanvas without its JavaScript: .showing, .show and .hiding drive the CSS
 * transition. It stays in the DOM while hidden, as in Bootstrap.
 */
export function Offcanvas<T extends ElementType = "div">({
  show,
  onHide,
  onShown,
  onHidden,
  placement = "start",
  responsive,
  backdrop = true,
  scroll = false,
  keyboard = true,
  as,
  className,
  children,
  ref: forwardedRef,
  ...props
}: OffcanvasProps<T>) {
  const Component: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { stage, shown } = useTransitionStage(show, ref, {
    onEntered: onShown,
    onExited: onHidden,
  });
  const open = stage !== "exited";
  const backdropStage = useTransitionStage(show, backdropRef);
  const mountedOnClient = useMounted();

  useScrollLock(open && !scroll);
  // Once it is visible (.showing): a hidden element can't take focus. As in Bootstrap, a
  // sheet that leaves the page scrollable without a backdrop doesn't trap focus.
  useFocusTrap(ref, show && shown && (!scroll || backdrop !== false));

  useEffect(() => {
    if (!show || !keyboard) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onHide();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show, keyboard, onHide]);

  return (
    <>
      <Component
        ref={(element: HTMLElement | null) => {
          ref.current = element;
          if (typeof forwardedRef === "function") {
            forwardedRef(element);
          } else if (forwardedRef) {
            forwardedRef.current = element;
          }
        }}
        className={cx(
          responsive ? `offcanvas-${responsive}` : "offcanvas",
          `offcanvas-${placement}`,
          stage === "entering" && shown && "showing",
          (stage === "entered" || stage === "exiting") && "show",
          stage === "exiting" && "hiding",
          className
        )}
        tabIndex={-1}
        {...(open ? { role: "dialog", "aria-modal": true } : {})}
        {...props}
      >
        {children}
      </Component>
      {mountedOnClient &&
        backdrop !== false &&
        backdropStage.mounted &&
        createPortal(
          <div
            ref={backdropRef}
            className={cx(
              "offcanvas-backdrop fade",
              backdropStage.shown && "show"
            )}
            onClick={backdrop === true ? onHide : undefined}
          />,
          document.body
        )}
    </>
  );
}
