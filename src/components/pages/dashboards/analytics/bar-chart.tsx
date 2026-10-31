"use client";

import { ChartJs } from "@/components/plugins/chartjs";

/** Sessions per traffic source: a bar chart */
export function BarChart({ title }: { title: string }) {
  return (
    <div className="card flex-fill w-100">
      <div className="card-header">
        <h2 className="card-title mb-0">{title}</h2>
      </div>
      <div className="card-body d-flex w-100">
        <div className="align-self-center chart chart-lg">
          <ChartJs
            aria-label={title}
            config={(theme) => ({
              type: "bar",
              data: {
                labels: ["Organic", "Direct", "Referral", "Social", "Email"],
                datasets: [
                  {
                    label: "Sessions",
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                    hoverBackgroundColor: theme.primary,
                    hoverBorderColor: theme.primary,
                    data: [26480, 14120, 9310, 7560, 3840],
                    barPercentage: 0.75,
                    categoryPercentage: 0.5,
                  },
                ],
              },
              options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    grid: { display: false },
                    border: { display: false },
                    stacked: false,
                    ticks: { stepSize: 10000 },
                  },
                  x: {
                    stacked: false,
                    grid: { color: "transparent" },
                    border: { display: false },
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
