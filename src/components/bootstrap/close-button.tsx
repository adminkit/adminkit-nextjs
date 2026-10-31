import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

export function CloseButton({
  white,
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  /** For dark backgrounds (.btn-close-white) */
  white?: boolean;
}) {
  return (
    <button
      type="button"
      className={cx("btn-close", white && "btn-close-white", className)}
      aria-label="Close"
      {...props}
    />
  );
}
