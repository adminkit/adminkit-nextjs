"use client";

import { type ElementType, useEffect, useRef, useState } from "react";

const duration = 1000;
const number = /(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?/;

const parse = (text: string) => {
  const match = text.match(number);
  if (!match || match.index === undefined) {
    return null;
  }

  const [digits, integer = "", fraction = ""] = match;
  const decimals = Math.max(fraction.length - 1, 0);

  return {
    before: text.slice(0, match.index),
    after: text.slice(match.index + digits.length),
    value: Number(integer.replaceAll(",", "") + fraction),
    format: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: integer.includes(","),
    }),
  };
};

/**
 * A number that counts up from zero the first time it scrolls into view. `value` is the
 * final text and sets the format: anything around the number stays ("$", "%", "+") and
 * the number keeps its "," separators and decimals ("$21,300", "+2.65%"). The server
 * renders the final value, and with reduced motion it never changes. Put it on an element
 * that sits on a line of its own, so its changing width moves nothing else.
 */
export function CountUp({
  value,
  as: Component = "span",
  className,
}: {
  value: string;
  as?: ElementType;
  className?: string;
}) {
  const [text, setText] = useState(value);
  const [previous, setPrevious] = useState(value);
  const ref = useRef<HTMLElement>(null);

  // A new value shows at once (and counts up again when it scrolls into view)
  if (value !== previous) {
    setPrevious(value);
    setText(value);
  }

  useEffect(() => {
    const element = ref.current;
    const parsed = parse(value);
    if (
      !element ||
      !parsed ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const { before, after, value: target, format } = parsed;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }
      observer.disconnect();
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        if (progress < 1) {
          const eased = 1 - (1 - progress) ** 3;
          setText(before + format.format(target * eased) + after);
          frame = requestAnimationFrame(step);
        } else {
          setText(value);
        }
      };
      frame = requestAnimationFrame(step);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <Component ref={ref} className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="visually-hidden">{value}</span>
    </Component>
  );
}
