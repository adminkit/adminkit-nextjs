import { PageTitle } from "@/components/ui/page-title";
import { asset, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/ui-cards");

const text =
  "Some quick example text to build on the card title and make up the bulk of the card's content.";

function CardLinks() {
  return (
    <>
      <a href="#" className="card-link">
        Card link
      </a>{" "}
      <a href="#" className="card-link">
        Another link
      </a>
    </>
  );
}

function CardButton() {
  return (
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  );
}

export default function Page() {
  return (
    <>
      <PageTitle title="Cards" badge="Get more card examples" />

      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card">
            <img
              className="card-img-top"
              src={asset("/img/photos/unsplash-1.jpg")}
              alt="Unsplash"
              width={1200}
              height={800}
            />
            <div className="card-header">
              <h2 className="card-title mb-0">Card with image and links</h2>
            </div>
            <div className="card-body">
              <p className="card-text">{text}</p>
              <CardLinks />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card">
            <img
              className="card-img-top"
              src={asset("/img/photos/unsplash-2.jpg")}
              alt="Unsplash"
              width={1200}
              height={800}
            />
            <div className="card-header">
              <h2 className="card-title mb-0">Card with image and button</h2>
            </div>
            <div className="card-body">
              <p className="card-text">{text}</p>
              <CardButton />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Card with links</h2>
            </div>
            <div className="card-body">
              <p className="card-text">{text}</p>
              <CardLinks />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Card with button</h2>
            </div>
            <div className="card-body">
              <p className="card-text">{text}</p>
              <CardButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
