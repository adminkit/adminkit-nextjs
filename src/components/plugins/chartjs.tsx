"use client";

// Usage: https://www.chartjs.org/
import Chart, {
  type ChartConfiguration,
  type ChartType,
  type DefaultDataPoint,
} from "chart.js/auto";
import { color } from "chart.js/helpers";
import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Theme, useTheme } from "@/hooks/use-theme";

const setDefaults = (theme: Theme) => {
  Chart.defaults.color = theme["gray-600"];
  Chart.defaults.borderColor = color(theme.black).alpha(0.1).rgbString();
};

Chart.defaults.font.family =
  "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

// Bars get rounded top corners; lines are curved, except on radar charts
Chart.defaults.elements.bar.borderRadius = 10;
Chart.defaults.elements.line.tension = 0.4;
Object.assign(Chart.overrides.radar, { elements: { line: { tension: 0 } } });

export type ChartJsConfig<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
> = (theme: Theme) => ChartConfiguration<TType, TData>;

/**
 * A Chart.js chart drawn from config(theme). The config is called again with the new
 * colors when the color mode changes, so read colors from its `theme` argument. Put it in
 * an element with a height, such as <div className="chart">.
 *
 * <ChartJs config={(theme) => ({ type: "line", data, options })} />
 */
export function ChartJs<
  TType extends ChartType,
  TData = DefaultDataPoint<TType>,
>({
  config,
  ...props
}: {
  config: ChartJsConfig<TType, TData>;
} & ComponentPropsWithoutRef<"canvas">) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart<TType, TData> | null>(null);
  const latest = useRef(config);
  const theme = useTheme();

  useEffect(() => {
    latest.current = config;
  });

  useEffect(() => {
    if (!theme || !canvas.current) {
      return;
    }
    setDefaults(theme);

    // Charts animate in, except under reduced motion; color mode changes don't animate
    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const next = latest.current(theme);

    if (!chart.current) {
      if (reducedMotion) {
        next.options = {
          ...next.options,
          animation: false,
        } as typeof next.options;
      }
      chart.current = new Chart(canvas.current, next);
    } else {
      chart.current.data = next.data;
      chart.current.options =
        next.options ?? ({} as NonNullable<typeof next.options>);
      chart.current.update("none");
    }
  }, [theme]);

  useEffect(
    () => () => {
      chart.current?.destroy();
      chart.current = null;
    },
    []
  );

  return (
    <>
      <canvas ref={canvas} role="img" {...props} />
      {!theme && <Skeleton />}
    </>
  );
}
