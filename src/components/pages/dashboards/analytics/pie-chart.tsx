"use client";

import { ChartJs } from "@/components/plugins/chartjs";

const browsers = [
  { name: "Chrome", value: 4306 },
  { name: "Firefox", value: 3801 },
  { name: "Edge", value: 1689 },
];

/** Browser usage: a doughnut chart over a table */
export function PieChart() {
  return (
    <div className="card flex-fill w-100">
      <div className="card-header">
        <h2 className="card-title mb-0">Browser Usage</h2>
      </div>
      <div className="card-body d-flex">
        <div className="align-self-center w-100">
          <div className="py-3">
            <div className="chart chart-xs">
              <ChartJs
                aria-label="Browser usage"
                config={(theme) => ({
                  type: "pie",
                  data: {
                    labels: browsers.map((browser) => browser.name),
                    datasets: [
                      {
                        data: browsers.map((browser) => browser.value),
                        backgroundColor: [
                          theme.primary,
                          theme.warning,
                          theme.danger,
                        ],
                        borderWidth: 5,
                      },
                    ],
                  },
                  options: {
                    maintainAspectRatio: false,
                    cutout: "75%",
                    plugins: { legend: { display: false } },
                  },
                })}
              />
            </div>
          </div>

          <table className="table mb-0">
            <tbody>
              {browsers.map((browser) => (
                <tr key={browser.name}>
                  <td>{browser.name}</td>
                  <td className="text-end">{browser.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
