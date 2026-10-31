import { Eye, LogOut, Timer, Users } from "lucide-react";
import { BarChart } from "@/components/pages/dashboards/analytics/bar-chart";
import { DashboardCalendar } from "@/components/pages/dashboards/analytics/calendar";
import { LineChart } from "@/components/pages/dashboards/analytics/line-chart";
import { PieChart } from "@/components/pages/dashboards/analytics/pie-chart";
import { Stats } from "@/components/pages/dashboards/analytics/stats";
import { TablePages } from "@/components/pages/dashboards/analytics/table-pages";
import { WorldMap } from "@/components/pages/dashboards/analytics/world-map";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/");

export default function AnalyticsDashboard() {
  return (
    <>
      <h1 className="h3 mb-3">
        <strong>Analytics</strong> Dashboard
      </h1>

      <div className="row">
        <div className="col-xl-6 col-xxl-5 d-flex">
          <div className="w-100">
            <div className="row">
              <div className="col-sm-6">
                <Stats
                  icon={Users}
                  title="Visitors"
                  number="48,920"
                  percentage="5.25"
                  percentageColor="success"
                  percentageText="Since last week"
                />
                <Stats
                  icon={Eye}
                  title="Page views"
                  number="152,384"
                  percentage="6.65"
                  percentageColor="success"
                  percentageText="Since last week"
                />
              </div>
              <div className="col-sm-6">
                <Stats
                  icon={LogOut}
                  title="Bounce rate"
                  number="41.2%"
                  percentage="-2.25"
                  percentageColor="success"
                  percentageText="Since last week"
                />
                <Stats
                  icon={Timer}
                  title="Avg. session"
                  number="3.7 min"
                  percentage="-3.65"
                  percentageColor="danger"
                  percentageText="Since last week"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-xxl-7">
          <LineChart title="Monthly Visitors" size="sm" />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
          <PieChart />
        </div>
        <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
          <WorldMap />
        </div>
        <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
          <DashboardCalendar />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8 col-xxl-9 d-flex">
          <TablePages />
        </div>
        <div className="col-12 col-lg-4 col-xxl-3 d-flex">
          <BarChart title="Traffic Sources" />
        </div>
      </div>
    </>
  );
}
