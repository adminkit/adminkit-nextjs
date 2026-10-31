"use client";

import { type ComponentPropsWithoutRef, useRef, useState } from "react";
import { useTransitionStage } from "@/hooks/use-transition-stage";
import { cx } from "@/lib/cx";
import { CloseButton } from "./close-button";

/**
 * Bootstrap's alert. With `dismissible` it gets a close button and fades out when it is
 * closed:
 * <Alert variant="primary" dismissible>...</Alert>
 */
export function Alert({
  variant = "primary",
  dismissible,
  onClose,
  className,
  children,
  ...props
}: {
  variant?: string;
  dismissible?: boolean;
  onClose?: () => void;
} & ComponentPropsWithoutRef<"div">) {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { mounted, shown } = useTransitionStage(show, ref, {
    onExited: onClose,
  });

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cx(
        "alert",
        `alert-${variant}`,
        dismissible && "alert-dismissible fade",
        dismissible && shown && "show",
        className
      )}
      {...props}
    >
      {dismissible && <CloseButton onClick={() => setShow(false)} />}
      {children}
    </div>
  );
}
