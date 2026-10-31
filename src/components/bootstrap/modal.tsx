"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useTransitionStage } from "@/hooks/use-transition-stage";
import { cx } from "@/lib/cx";
import { afterTransition } from "@/lib/transition";

type ModalProps = {
  show: boolean;
  onHide: () => void;
  /** Called once the modal has faded out */
  onExited?: () => void;
  /** true closes on a click outside the dialog; static shakes the dialog instead */
  backdrop?: boolean | "static";
  /** Escape closes the modal */
  keyboard?: boolean;
  /** Classes for .modal-dialog: modal-lg, modal-dialog-centered, modal-fullscreen, ... */
  dialogClassName?: string;
  /** Classes for .modal-content */
  contentClassName?: string;
  /** The element .modal-content is, div by default: form for a dialog that is a form */
  contentAs?: ElementType;
  /** Other props for .modal-content, such as onSubmit when it is a form */
  contentProps?: Record<string, unknown>;
  /** The id of the modal title */
  "aria-labelledby"?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/**
 * Bootstrap's modal without its JavaScript. The children are the .modal-content:
 *
 * <Modal show={show} onHide={() => setShow(false)} aria-labelledby="title">
 *   <div className="modal-header">
 *     <h2 className="modal-title h5" id="title">Title</h2>
 *     <CloseButton onClick={() => setShow(false)} />
 *   </div>
 *   <div className="modal-body">...</div>
 * </Modal>
 */
export function Modal({
  show,
  onHide,
  onExited,
  backdrop = true,
  keyboard = true,
  dialogClassName,
  contentClassName,
  contentAs: Content = "div",
  contentProps,
  className,
  children,
  ...props
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mounted, shown, stage } = useTransitionStage(show, ref, {
    onExited,
  });
  const [shaking, setShaking] = useState(false);

  useScrollLock(mounted, "modal-open");
  useFocusTrap(ref, stage === "entered" || stage === "entering");

  useEffect(() => {
    if (!show) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      if (keyboard) {
        onHide();
      } else {
        setShaking(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show, keyboard, onHide]);

  // A static backdrop answers clicks and Escape with a short bounce (.modal-static)
  useEffect(() => {
    if (shaking) {
      return afterTransition(
        ref.current?.querySelector(".modal-dialog") ?? null,
        () => setShaking(false)
      );
    }
  }, [shaking]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (backdrop === "static") {
      setShaking(true);
    } else if (backdrop) {
      onHide();
    }
  };

  return createPortal(
    <>
      <div
        ref={ref}
        className={cx(
          "modal fade",
          shown && "show",
          shaking && "modal-static",
          className
        )}
        style={{ display: "block" }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onClick={onClick}
        {...props}
      >
        <div className={cx("modal-dialog", dialogClassName)}>
          <Content
            className={cx("modal-content", contentClassName)}
            {...contentProps}
          >
            {children}
          </Content>
        </div>
      </div>
      {backdrop !== false && (
        <div className={cx("modal-backdrop fade", shown && "show")} />
      )}
    </>,
    document.body
  );
}
