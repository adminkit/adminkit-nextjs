import { Fragment } from "react";
import { PageTitle } from "@/components/ui/page-title";
import theme from "@/mocks/colors-theme.json";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/ui-typography");

const headings: {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
}[] = [
  {
    level: "h1",
    text: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero.",
  },
  {
    level: "h2",
    text: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
  },
  {
    level: "h3",
    text: "Etiam rhoncus. Maecenas tempus, tellus condimentum rhoncus, sem quam libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, vel.",
  },
  {
    level: "h4",
    text: "Etiam rhoncus. Maecenas tempus, tellus condimentum rhoncus, sem quam libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, vel.",
  },
  {
    level: "h5",
    text: "Sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel.",
  },
  {
    level: "h6",
    text: "Sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel.",
  },
];

const listItems = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit",
  "Nulla volutpat aliquam velit",
  "Phasellus iaculis neque",
  "Eget porttitor lorem",
];

function Quote({ className }: { className?: string }) {
  return (
    <blockquote className={className}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
        erat a ante.
      </p>
      <footer>
        Someone famous in <cite title="Source Title">Source Title</cite>
      </footer>
    </blockquote>
  );
}

export default function Page() {
  return (
    <>
      <PageTitle title="Typography" badge="Get more typography examples" />

      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Headings</h2>
              <p className="h6 card-subtitle text-body-secondary">
                All HTML headings, <code>&lt;h1&gt;</code> through{" "}
                <code>&lt;h6&gt;</code>, are available.
              </p>
            </div>
            <div className="card-body">
              {headings.map(({ level: Heading, text }) => (
                <Fragment key={Heading}>
                  <Heading>This is a heading {Heading}</Heading>
                  <p className="text-body-secondary">{text}</p>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Coloured text</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Contextual text classes.
              </p>
            </div>
            <div className="card-body">
              {theme.map(({ name }) => (
                <p key={name} className={`text-${name}`}>
                  This line of text contains the text-{name} class.
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Inline text</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Styling for common inline HTML5 elements.
              </p>
            </div>
            <div className="card-body">
              <p>
                You can use the mark-tag to <mark>highlight</mark> text.
              </p>
              <p>
                <del>This line of text can be treated as deleted text.</del>
              </p>
              <p>
                <ins>
                  This line of text can be treated as an addition to the
                  document.
                </ins>
              </p>
              <p>
                <strong>Bold text using the strong-tag</strong>
              </p>
              <p>
                <em>Italicized text using the em-tag</em>
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Blockquotes</h2>
              <p className="h6 card-subtitle text-body-secondary">
                For quoting blocks of content from another source within your
                document.
              </p>
            </div>
            <div className="card-body">
              <Quote />
              <p className="text-body-secondary m-b-15 m-t-20">
                Add <code>.blockquote-reverse</code> for a blockquote with
                right-aligned content.
              </p>
              <Quote className="blockquote-reverse m-b-0" />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">List unordered</h2>
              <p className="h6 card-subtitle text-body-secondary">
                The unordered list items are marked with bullets.
              </p>
            </div>
            <div className="card-body">
              <ul>
                {listItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">List ordered</h2>
              <p className="h6 card-subtitle text-body-secondary">
                The ordered list items are marked with numbers.
              </p>
            </div>
            <div className="card-body">
              <ol>
                {listItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
