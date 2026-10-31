import { Bell } from "lucide-react";
import { Alert } from "@/components/bootstrap/alert";
import { PageTitle } from "@/components/ui/page-title";
import theme from "@/mocks/colors-theme.json";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/ui-alerts");

const text =
  "Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.";

function AlertCard({
  title,
  subtitle,
  className,
  icon,
}: {
  title: string;
  subtitle: string;
  className?: string;
  icon?: boolean;
}) {
  return (
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
          <p className="h6 card-subtitle text-body-secondary">{subtitle}</p>
        </div>
        <div className="card-body">
          <div className="mb-3">
            {theme.map(({ name }) => (
              <Alert
                key={name}
                variant={name}
                className={className}
                dismissible
              >
                {icon && (
                  <div className="alert-icon">
                    <Bell className="align-middle" />
                  </div>
                )}
                <div className="alert-message">
                  <strong>Hello there!</strong> A simple {name} alert—check it
                  out!
                </div>
              </Alert>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageTitle title="Alerts" badge="Get more notification examples" />

      <div className="row">
        <AlertCard
          title="Default alerts"
          subtitle="Alerts with contextual background color."
        />
        <AlertCard
          title="Icon alerts"
          subtitle="Alerts with icon and background color."
          icon
        />
        <AlertCard
          title="Outline alerts"
          subtitle="Alerts with contextual icon background."
          className="alert-outline"
          icon
        />
        <AlertCard
          title="Colored outline alerts"
          subtitle="Alerts with contextual outline color."
          className="alert-outline-coloured"
          icon
        />

        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Alerts with additional content</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Alerts with large contents.
              </p>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <Alert variant="success" dismissible>
                  <div className="alert-message">
                    <h3 className="h4 alert-heading">Well done!</h3>
                    <p>{text}</p>
                    <hr />
                    <p className="mb-0">
                      Whenever you need to, be sure to use margin utilities to
                      keep things nice and tidy.
                    </p>
                  </div>
                </Alert>
              </div>

              <div className="mb-3">
                <Alert variant="primary" className="alert-outline" dismissible>
                  <div className="alert-message">
                    <h3 className="h4 alert-heading">Well done!</h3>
                    <p>{text}</p>
                    <hr />
                    <p className="mb-0">
                      Whenever you need to, be sure to use margin utilities to
                      keep things nice and tidy.
                    </p>
                  </div>
                </Alert>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Alerts with buttons</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Alerts with actions.
              </p>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <Alert variant="success" dismissible>
                  <div className="alert-message">
                    <h3 className="h4 alert-heading">Well done!</h3>
                    <p>{text}</p>
                    <hr />
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-light" type="button">
                        Okay
                      </button>
                      <button className="btn btn-secondary" type="button">
                        No, thanks
                      </button>
                    </div>
                  </div>
                </Alert>
              </div>

              <div className="mb-3">
                <Alert variant="primary" className="alert-outline" dismissible>
                  <div className="alert-message">
                    <h3 className="h4 alert-heading">Well done!</h3>
                    <p>{text}</p>
                    <hr />
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-success" type="button">
                        Okay
                      </button>
                      <button className="btn btn-danger" type="button">
                        No, thanks
                      </button>
                    </div>
                  </div>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
