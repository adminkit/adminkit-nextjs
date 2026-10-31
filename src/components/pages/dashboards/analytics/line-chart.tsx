"use client";

import { ChartJs } from "@/components/plugins/chartjs";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const visitors = [
  168400, 159200, 176900, 181300, 174800, 189600, 201200, 196500, 212800,
  228400, 219700, 236100,
];

/** Monthly visitors: a line chart with a gradient fill */
export function LineChart({
  title,
  size,
}: {
  title: string;
  /** The chart height: chart-sm, chart-lg, ... */
  size: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div className="card flex-fill w-100">
      <div className="card-header">
        <h2 className="card-title mb-0">{title}</h2>
      </div>
      <div className="card-body py-3">
        <div className={`chart chart-${size}`}>
          <ChartJs
            aria-label={title}
            config={(theme) => {
              // The canvas context is only there in the browser; the gradient follows
              // the color mode
              const context = document.createElement("canvas").getContext("2d");
              const gradient = context?.createLinearGradient(0, 0, 0, 225);
              if (theme.id === "light") {
                gradient?.addColorStop(0, "rgba(215, 227, 244, 1)");
                gradient?.addColorStop(1, "rgba(215, 227, 244, 0)");
              } else {
                gradient?.addColorStop(0, "rgba(51, 66, 84, 1)");
                gradient?.addColorStop(1, "rgba(51, 66, 84, 0)");
              }

              return {
                type: "line",
                data: {
                  labels: months,
                  datasets: [
                    {
                      label: "Visitors",
                      fill: true,
                      backgroundColor: gradient ?? "transparent",
                      borderColor: theme.primary,
                      data: visitors,
                    },
                  ],
                },
                options: {
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { intersect: false },
                    filler: { propagate: false },
                  },
                  scales: {
                    x: {
                      grid: { color: "transparent" },
                      border: { display: false },
                    },
                    y: {
                      ticks: { stepSize: 20000 },
                      grid: { color: "transparent" },
                    },
                  },
                },
              };
            }}
          />
        </div>
      </div>
    </div>
  );
}
