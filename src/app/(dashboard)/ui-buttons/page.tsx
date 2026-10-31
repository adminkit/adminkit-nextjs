import { Fragment } from "react";
import { PageTitle } from "@/components/ui/page-title";
import theme from "@/mocks/colors-theme.json";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/ui-buttons");

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const verticalGroups = ["primary", "success", "warning", "danger"];

export default function Page() {
  return (
    <>
      <PageTitle title="Buttons" badge="Get more button examples" />

      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Basic Buttons</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Default Bootstrap buttons style.
              </p>
            </div>
            <div className="card-body text-center">
              <div className="mb-3">
                {theme.map(({ name }) => (
                  <Fragment key={name}>
                    <button className={`btn btn-${name}`}>
                      {capitalize(name)}
                    </button>{" "}
                  </Fragment>
                ))}
              </div>
              <div>
                {theme.map(({ name }) => (
                  <Fragment key={name}>
                    <button className={`btn btn-${name}`} disabled>
                      {capitalize(name)}
                    </button>{" "}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Button Sizes</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Fancy larger or smaller buttons.
              </p>
            </div>
            <div className="card-body text-center">
              <div className="mb-3">
                <button className="btn btn-primary btn-sm">Small</button>{" "}
                <button className="btn btn-primary">Medium</button>{" "}
                <button className="btn btn-primary btn-lg">Large</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Button Group</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Button group components.
              </p>
            </div>
            <div className="card-body">
              <p className="h6 card-subtitle mb-2 text-body-secondary">
                Horizontal button group
              </p>
              <div
                className="btn-group btn-group-lg mb-3"
                role="group"
                aria-label="Large button group"
              >
                <button type="button" className="btn btn-secondary">
                  Left
                </button>
                <button type="button" className="btn btn-secondary">
                  Middle
                </button>
                <button type="button" className="btn btn-secondary">
                  Right
                </button>
              </div>
              <br />
              <div
                className="btn-group mb-3"
                role="group"
                aria-label="Default button group"
              >
                <button type="button" className="btn btn-secondary">
                  Left
                </button>
                <button type="button" className="btn btn-secondary">
                  Middle
                </button>
                <button type="button" className="btn btn-secondary">
                  Right
                </button>
              </div>
              <br />
              <div
                className="btn-group btn-group-sm mb-4"
                role="group"
                aria-label="Small button group"
              >
                <button type="button" className="btn btn-secondary">
                  Left
                </button>
                <button type="button" className="btn btn-secondary">
                  Middle
                </button>
                <button type="button" className="btn btn-secondary">
                  Right
                </button>
              </div>

              <p className="h6 card-subtitle mb-2 text-body-secondary">
                Button toolbar
              </p>
              <div
                className="btn-toolbar mb-4"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="First group"
                >
                  {["1", "2", "3", "4"].map((label) => (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      key={label}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="Second group"
                >
                  {["5", "6", "7"].map((label) => (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      key={label}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Third group"
                >
                  <button type="button" className="btn btn-secondary">
                    8
                  </button>
                </div>
              </div>

              <p className="h6 card-subtitle mb-2 text-body-secondary">
                Vertical button group
              </p>
              <div className="btn-toolbar">
                {verticalGroups.map((name) => (
                  <div
                    className="btn-group-vertical me-2"
                    role="group"
                    aria-label="Vertical button group"
                    key={name}
                  >
                    <button type="button" className={`btn btn-${name}`}>
                      Button
                    </button>
                    <button type="button" className={`btn btn-${name}`}>
                      Button
                    </button>
                    <button type="button" className={`btn btn-${name}`}>
                      Button
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
