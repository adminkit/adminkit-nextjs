"use client";

// Usage: https://vanilla-calendar.pro/
import type { Calendar, Options } from "vanilla-calendar-pro";
import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";

export type { Options as VanillaCalendarOptions };

/** The calendar follows the color mode of the page */
const themeOptions: Options = {
  selectedTheme: "system",
  themeAttrDetect: "html[data-bs-theme]",
};

/**
 * An inline Vanilla Calendar Pro calendar. Options are read once.
 *
 * <VanillaCalendar options={{ selectedDates: [today] }} />
 */
export function VanillaCalendar({
  options,
  ...props
}: { options?: Options } & ComponentPropsWithoutRef<"div">) {
  const element = useRef<HTMLDivElement>(null);
  const latest = useRef(options);

  useEffect(() => {
    const target = element.current;
    if (!target) {
      return;
    }
    let calendar: Calendar | null = null;
    let cancelled = false;

    import("vanilla-calendar-pro").then(({ Calendar }) => {
      if (cancelled) {
        return;
      }
      calendar = new Calendar(target, { ...themeOptions, ...latest.current });
      calendar.init();
    });

    return () => {
      cancelled = true;
      calendar?.destroy();
    };
  }, []);

  return <div ref={element} {...props} />;
}
