import { ChartJsBar } from "@/components/pages/charts/chartjs/chartjs-bar";
import { ChartJsDoughnut } from "@/components/pages/charts/chartjs/chartjs-doughnut";
import { ChartJsLine } from "@/components/pages/charts/chartjs/chartjs-line";
import { ChartJsPie } from "@/components/pages/charts/chartjs/chartjs-pie";
import { PageTitle } from "@/components/ui/page-title";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/charts-chartjs");

export default function Page() {
  return (
    <>
      <PageTitle title="Chart.js" badge="Get more chart examples" />

      <div className="row">
        <div className="col-12 col-lg-6">
          <ChartJsLine />
        </div>

        <div className="col-12 col-lg-6">
          <ChartJsBar />
        </div>

        <div className="col-12 col-lg-6">
          <ChartJsDoughnut />
        </div>

        <div className="col-12 col-lg-6">
          <ChartJsPie />
        </div>
      </div>
    </>
  );
}
