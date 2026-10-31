import type { ReactNode } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/ui-forms");

function FormCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title mb-0">{title}</h2>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function Check({
  type,
  name,
  value = "",
  inline,
  defaultChecked,
  disabled,
  children,
}: {
  type: "checkbox" | "radio";
  name?: string;
  value?: string;
  inline?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={inline ? "form-check form-check-inline" : "form-check"}>
      <input
        className="form-check-input"
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <span className="form-check-label">{children}</span>
    </label>
  );
}

export default function Page() {
  return (
    <>
      <PageTitle title="Forms" badge="Get more form examples" />

      <div className="row">
        <div className="col-12 col-lg-6">
          <FormCard title="Input">
            <input type="text" className="form-control" placeholder="Input" />
          </FormCard>

          <FormCard title="Textarea">
            <textarea
              className="form-control"
              rows={2}
              placeholder="Textarea"
            />
          </FormCard>

          <FormCard title="Checkboxes">
            <div>
              <Check type="checkbox">
                Option one is this and that&mdash;be sure to include why
                it&apos;s great
              </Check>
              <Check type="checkbox" disabled>
                Option two is disabled
              </Check>
            </div>
            <div>
              <Check type="checkbox" value="option1" inline>
                1
              </Check>{" "}
              <Check type="checkbox" value="option2" inline>
                2
              </Check>{" "}
              <Check type="checkbox" value="option3" inline disabled>
                3
              </Check>
            </div>
          </FormCard>

          <FormCard title="Read only">
            <input
              className="form-control"
              type="text"
              placeholder="Readonly input"
              readOnly
            />
          </FormCard>
        </div>

        <div className="col-12 col-lg-6">
          <FormCard title="Radios">
            <div>
              <Check
                type="radio"
                name="radios-example"
                value="option1"
                defaultChecked
              >
                Option one is this and that&mdash;be sure to include why
                it&apos;s great
              </Check>
              <Check type="radio" name="radios-example" value="option2">
                Option two can be something else and selecting it will deselect
                option one
              </Check>
              <Check
                type="radio"
                name="radios-example"
                value="option3"
                disabled
              >
                Option three is disabled
              </Check>
            </div>
            <div>
              <Check
                type="radio"
                name="inline-radios-example"
                value="option1"
                inline
              >
                1
              </Check>{" "}
              <Check
                type="radio"
                name="inline-radios-example"
                value="option2"
                inline
              >
                2
              </Check>{" "}
              <Check
                type="radio"
                name="inline-radios-example"
                value="option3"
                inline
                disabled
              >
                3
              </Check>
            </div>
          </FormCard>

          <FormCard title="Selects">
            <select
              className="form-select mb-3"
              aria-label="Example select"
              defaultValue="Open this select menu"
            >
              <option>Open this select menu</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>

            <select
              multiple
              className="form-control"
              aria-label="Example multiple select"
            >
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
              <option>Four</option>
            </select>
          </FormCard>

          <FormCard title="Disabled">
            <div className="mb-3">
              <label className="form-label">Disabled input</label>
              <input
                type="text"
                className="form-control"
                placeholder="Disabled input"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="disabled-select">
                Disabled select menu
              </label>
              <select className="form-control" id="disabled-select" disabled>
                <option>Disabled select</option>
              </select>
            </div>
            <Check type="checkbox" disabled>
              Can&apos;t check this
            </Check>
          </FormCard>
        </div>
      </div>
    </>
  );
}
