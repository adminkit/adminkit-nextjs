"use client";

import { ChartJs } from "@/components/plugins/chartjs";

/** Chart.js line chart (charts/chartjs-line.hbs) */
export function ChartJsLine() {
  return (
    <div className="card flex-fill w-100">
      <div className="card-header">
        <h2 className="card-title">Line Chart</h2>
        <p className="h6 card-subtitle text-body-secondary">
          A line chart is a way of plotting data points on a line.
        </p>
      </div>
      <div className="card-body">
        <div className="chart">
          <ChartJs
            id="chartjs-line"
            aria-label="Line Chart"
            config={(theme) => ({
              type: "line",
              data: {
                labels: [
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
                ],
                datasets: [
                  {
                    label: "Sales ($)",
                    fill: true,
                    backgroundColor: "transparent",
                    borderColor: theme.primary,
                    data: [
                      2115, 1562, 1584, 1892, 1487, 2223, 2966, 2448, 2905,
                      3838, 2917, 3327,
                    ],
                  },
                  {
                    label: "Orders",
                    fill: true,
                    backgroundColor: "transparent",
                    borderColor: "#adb5bd",
                    borderDash: [4, 4],
                    data: [
                      958, 724, 629, 883, 915, 1214, 1476, 1212, 1554, 2128,
                      1466, 1827,
                    ],
                  },
                ],
              },
              options: {
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    intersect: false,
                  },
                  filler: {
                    propagate: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: "rgba(0,0,0,0.05)",
                    },
                    border: {
                      color: "rgba(0,0,0,0.05)",
                    },
                  },
                  y: {
                    ticks: {
                      stepSize: 500,
                    },
                    grid: {
                      color: "transparent",
                    },
                  },
                },
              },
            })}
          />
        </div>
      </div>
    </div>
  );
}
