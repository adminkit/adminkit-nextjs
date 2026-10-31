import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/pages-blank");

export default function Page() {
  return (
    <>
      <h1 className="h3 mb-3">Blank Page</h1>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Empty card</h2>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </>
  );
}
