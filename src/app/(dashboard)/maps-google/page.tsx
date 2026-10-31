import { GoogleMap } from "@/components/pages/maps/google/google-map";
import { PageTitle } from "@/components/ui/page-title";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/maps-google");

export default function Page() {
  return (
    <>
      <PageTitle title="Google Maps" badge="Get more Google Maps examples" />

      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Default Map</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Displays the default road map view.
              </p>
            </div>
            <div className="card-body">
              <GoogleMap id="default_map" type="default" title="Default Map" />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Hybrid Map</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Displays a mixture of normal and satellite views.
              </p>
            </div>
            <div className="card-body">
              <GoogleMap id="hybrid_map" type="hybrid" title="Hybrid Map" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
