"use client";

import { ChartJs } from "@/components/plugins/chartjs";

/** Chart.js pie chart (charts/chartjs-pie.hbs) */
export function ChartJsPie() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Pie Chart</h2>
        <p className="h6 card-subtitle text-body-secondary">
          Pie charts are excellent at showing the relational proportions between
          data.
        </p>
      </div>
      <div className="card-body">
        <div className="chart chart-sm">
          <ChartJs
            id="chartjs-pie"
            aria-label="Pie Chart"
            config={(theme) => ({
              type: "pie",
              data: {
                labels: ["Social", "Search Engines", "Direct", "Other"],
                datasets: [
                  {
                    data: [260, 125, 54, 146],
                    backgroundColor: [
                      theme.primary,
                      theme.warning,
                      theme.danger,
                      "#dee2e6",
                    ],
                    borderColor: "transparent",
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
              },
            })}
          />
        </div>
      </div>
    </div>
  );
}
