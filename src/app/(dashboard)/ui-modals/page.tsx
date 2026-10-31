import { Fragment, type ReactNode } from "react";
import { PageTitle } from "@/components/ui/page-title";
import theme from "@/mocks/colors-theme.json";
import { pageMetadata } from "@/lib/site";
import { ModalDemo } from "@/components/pages/ui/modals/modal-demo";

export const metadata = pageMetadata("/ui-modals");

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

// The theme colors but secondary, first four
const colors = theme
  .map(({ name }) => name)
  .filter((name) => name !== "secondary")
  .slice(0, 4);

const sizes = { small: "sm", medium: "md", large: "lg" };

function ModalCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
          <p className="h6 card-subtitle text-body-secondary">{subtitle}</p>
        </div>
        <div className="card-body text-center">
          <p>
            Use Bootstrap’s JavaScript modal plugin to add dialogs to your site
            for lightboxes, user notifications, or completely custom content.
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageTitle title="Modals" badge="Get more component examples" />

      <div className="row">
        <ModalCard title="Default modal" subtitle="Default Bootstrap modal.">
          {colors.map((name) => (
            <Fragment key={name}>
              <ModalDemo
                id={`defaultModal${capitalize(name)}`}
                label={capitalize(name)}
                title="Default modal"
                buttonClassName={`btn btn-${name}`}
                closeClassName="btn btn-secondary"
                saveClassName={`btn btn-${name}`}
              />{" "}
            </Fragment>
          ))}
        </ModalCard>

        <ModalCard title="Colored modal" subtitle="Colored Bootstrap modal.">
          {colors.map((name) => (
            <Fragment key={name}>
              <ModalDemo
                id={`coloredModal${capitalize(name)}`}
                label={capitalize(name)}
                title="Colored modal"
                buttonClassName={`btn btn-${name}`}
                modalClassName={`modal-colored modal-${name}`}
                closeClassName="btn btn-light"
                saveClassName="btn btn-light"
              />{" "}
            </Fragment>
          ))}
        </ModalCard>

        <ModalCard title="Centered modal" subtitle="Vertically centered modal.">
          {colors.map((name) => (
            <Fragment key={name}>
              <ModalDemo
                id={`centeredModal${capitalize(name)}`}
                label={capitalize(name)}
                title="Centered modal"
                buttonClassName={`btn btn-${name}`}
                dialogClassName="modal-dialog-centered"
                closeClassName="btn btn-secondary"
                saveClassName={`btn btn-${name}`}
              />{" "}
            </Fragment>
          ))}
        </ModalCard>

        <ModalCard
          title="Modal sizes"
          subtitle="These sizes kick in at certain breakpoints to avoid scrollbars on smaller viewports."
        >
          {Object.entries(sizes).map(([name, size]) => (
            <Fragment key={size}>
              <ModalDemo
                id={`sizedModal${capitalize(size)}`}
                label={capitalize(name)}
                title={`${capitalize(name)} modal`}
                buttonClassName="btn btn-primary"
                dialogClassName={`modal-${size}`}
                closeClassName="btn btn-secondary"
                saveClassName="btn btn-primary"
              />{" "}
            </Fragment>
          ))}
        </ModalCard>
      </div>
    </>
  );
}
