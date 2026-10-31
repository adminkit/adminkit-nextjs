"use client";

import { ChartJs } from "@/components/plugins/chartjs";

/** Chart.js bar chart (charts/chartjs-bar.hbs) */
export function ChartJsBar() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Bar Chart</h2>
        <p className="h6 card-subtitle text-body-secondary">
          A bar chart provides a way of showing data values represented as
          vertical bars.
        </p>
      </div>
      <div className="card-body">
        <div className="chart">
          <ChartJs
            id="chartjs-bar"
            aria-label="Bar Chart"
            config={(theme) => ({
              type: "bar",
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
                    label: "Last year",
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                    hoverBackgroundColor: theme.primary,
                    hoverBorderColor: theme.primary,
                    data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
                    barPercentage: 0.75,
                    categoryPercentage: 0.5,
                  },
                  {
                    label: "This year",
                    backgroundColor: "#dee2e6",
                    borderColor: "#dee2e6",
                    hoverBackgroundColor: "#dee2e6",
                    hoverBorderColor: "#dee2e6",
                    data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
                    barPercentage: 0.75,
                    categoryPercentage: 0.5,
                  },
                ],
              },
              options: {
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    grid: {
                      display: false,
                    },
                    border: {
                      display: false,
                    },
                    stacked: false,
                    ticks: {
                      stepSize: 20,
                    },
                  },
                  x: {
                    stacked: false,
                    grid: {
                      color: "transparent",
                    },
                    border: {
                      display: false,
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
