/** Joins the truthy class names: cx("btn", active && "active") */
export const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(Boolean).join(" ") || undefined;
