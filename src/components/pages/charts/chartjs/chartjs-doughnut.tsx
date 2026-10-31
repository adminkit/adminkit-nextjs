"use client";

import { ChartJs } from "@/components/plugins/chartjs";

/** Chart.js doughnut chart (charts/chartjs-doughnut.hbs) */
export function ChartJsDoughnut() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Doughnut Chart</h2>
        <p className="h6 card-subtitle text-body-secondary">
          Doughnut charts are excellent at showing the relational proportions
          between data.
        </p>
      </div>
      <div className="card-body">
        <div className="chart chart-sm">
          <ChartJs
            id="chartjs-doughnut"
            aria-label="Doughnut Chart"
            config={(theme) => ({
              type: "doughnut",
              data: {
                labels: ["Social", "Search Engines", "Direct", "Other"],
                datasets: [
                  {
                    data: [260, 125, 54, 146],
                    backgroundColor: [
                      theme.primary,
                      theme.success,
                      theme.warning,
                      "#dee2e6",
                    ],
                    borderColor: "transparent",
                  },
                ],
              },
              options: {
                maintainAspectRatio: false,
                cutout: "65%",
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
