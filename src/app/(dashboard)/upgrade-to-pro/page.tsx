import { Check, Minus } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import pro from "@/data/editions/pro.json";
import stats from "@/data/stats.json";
import { asset, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/upgrade-to-pro");

const pricing = "https://adminkit.io/pricing/";
const demo = "https://nextjs-demo.adminkit.io/";

const screenshots = [
  {
    name: "analytics",
    title: "Analytics dashboard",
    text: "Visitors, page views, bounce rate and session duration, with browser usage, real-time visitors and top pages.",
  },
  {
    name: "ecommerce",
    title: "E-commerce dashboard",
    text: "Income, orders and revenue by month, with sales by state and the top-selling products.",
  },
  {
    name: "crm",
    title: "CRM dashboard",
    text: "Customers, deals, revenue and win rate, with revenue against target, the sales pipeline and upcoming tasks.",
  },
  {
    name: "crypto",
    title: "Crypto dashboard",
    text: "Balances and rates per coin, a candlestick chart with time ranges and a markets table.",
  },
  {
    name: "ai-usage",
    title: "AI analytics dashboard",
    text: "Tokens, cost, requests, latency and error rate per model over 7, 30 or 90 days.",
  },
  {
    name: "ai-chat",
    title: "AI chat",
    text: "Conversation history, streamed replies with tables and code, reasoning, tool calls, sources and a model picker.",
  },
  {
    name: "calendar",
    title: "Calendar",
    text: "Month, week and day views with events you can drag to another day or time.",
  },
  {
    name: "datatables",
    title: "Advanced tables",
    text: "Sorting, search and paging, responsive columns, export buttons, fixed headers and row selection.",
  },
  {
    name: "settings",
    title: "Settings panel",
    text: "Color mode, sidebar color scheme, sidebar layout and position and the page layout, remembered for the next visit.",
  },
];

const faq = [
  {
    question: "Can I move a project from the free version?",
    answer:
      "Yes. PRO uses the same markup, Sass variables and React components, so pages built on the free version carry over and you add the PRO pages and components you need.",
  },
  {
    question: "Is it a one-time payment?",
    answer:
      "Yes. You pay once, use the code in your product for as long as you like and get every update.",
  },
  {
    question: "Is support included?",
    answer:
      "Every license comes with premium email support; how long depends on the license.",
  },
  {
    question: "Does it work with my back end?",
    answer:
      "Yes. The build is plain HTML, CSS and JavaScript, so it works with Laravel, Rails, ASP.NET, Django or any other stack.",
  },
];

const format = (value: number) => value.toLocaleString("en-US");

/**
 * One color mode of a screenshot; the other mode's picture is hidden and, being lazy,
 * never loads. className and sizes default to a card's top image in a two-column grid.
 */
function Screenshot({
  name,
  title,
  mode,
  className = "card-img-top",
  sizes = "(min-width: 992px) 45vw, 100vw",
}: {
  name: string;
  title: string;
  mode: "light" | "dark";
  className?: string;
  sizes?: string;
}) {
  const file = `/img/screenshots/pro/${name}-${mode}`;

  return (
    <picture className={`${mode}-only`}>
      <img
        className={className}
        src={asset(`${file}.webp`)}
        srcSet={`${asset(`${file}-800.webp`)} 800w, ${asset(`${file}.webp`)} 1600w`}
        sizes={sizes}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        alt={`AdminKit PRO: ${title}${mode === "dark" ? ", dark mode" : ""}`}
      />
    </picture>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <li className="col-6 col-sm-3">
      <CountUp as="div" className="h1 mb-1" value={format(value)} />
      <div className="text-body-secondary">{label}</div>
    </li>
  );
}

function Value({ value }: { value: unknown }) {
  if (typeof value === "boolean") {
    return value ? (
      <>
        <Check className="text-success" aria-hidden="true" />
        <span className="visually-hidden">Yes</span>
      </>
    ) : (
      <>
        <Minus className="text-body-secondary" aria-hidden="true" />
        <span className="visually-hidden">No</span>
      </>
    );
  }
  return typeof value === "number" ? format(value) : String(value);
}

export default function Page() {
  return (
    <>
      <div className="card">
        <div className="card-body p-4 p-xl-5">
          <div className="row g-4 g-xl-5 align-items-center">
            <div className="col-12 col-xl-5">
              <h1 className="h2 mb-3">Upgrade to AdminKit PRO</h1>
              <p className="lead mb-4">
                The commercial edition of this template: the same Bootstrap 5
                code and conventions, with more dashboards, pages and
                components.
              </p>
              <ul className="upgrade-features list-unstyled mb-4">
                <li>
                  <Check className="text-success" aria-hidden="true" />
                  {pro.dashboards.count} dashboards and {pro.pages.count} pages
                  in total
                </li>
                <li>
                  <Check className="text-success" aria-hidden="true" />
                  An AI chat and a settings panel for color mode and layout
                </li>
                <li>
                  <Check className="text-success" aria-hidden="true" />
                  Advanced tables, a calendar, rich text editors and more form
                  inputs
                </li>
                <li>
                  <Check className="text-success" aria-hidden="true" />
                  {pro.colorSchemes.count} sidebar color schemes and email
                  support
                </li>
              </ul>
              <div className="d-flex flex-wrap gap-2">
                <a href={pricing} className="btn btn-primary btn-lg">
                  Get AdminKit PRO
                </a>
                <a href={demo} className="btn btn-outline-primary btn-lg">
                  View the live demo
                </a>
              </div>
            </div>
            <div className="col-12 col-xl-7">
              <div className="upgrade-hero-shot border rounded-3 overflow-hidden">
                {(["light", "dark"] as const).map((mode) => (
                  <Screenshot
                    key={mode}
                    name="crm"
                    title="CRM dashboard"
                    mode={mode}
                    className="img-fluid d-block"
                    sizes="(min-width: 1200px) 50vw, 100vw"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body border-top px-4 px-xl-5">
          <ul className="row g-3 list-unstyled mb-0 text-center">
            <Stat value={pro.pages.count} label="pages" />
            <Stat value={pro.dashboards.count} label="dashboards" />
            <Stat value={pro.plugins.count} label="plugins" />
            <Stat value={pro.icons.total} label="icons" />
          </ul>
        </div>
      </div>

      <div className="mt-4 mb-3">
        <h2 className="h4 mb-1">What&apos;s in AdminKit PRO</h2>
        <p className="text-body-secondary mb-0">
          Screenshots of the PRO demo, in the color mode you have selected.
        </p>
      </div>

      <div className="row">
        {screenshots.map(({ name, title, text }) => (
          <div className="col-12 col-md-6 col-xl-4" key={name}>
            <figure className="card">
              {(["light", "dark"] as const).map((mode) => (
                <Screenshot
                  key={mode}
                  name={name}
                  title={title}
                  mode={mode}
                  sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
              ))}
              <figcaption className="card-body border-top">
                <h3 className="h5 mb-1">{title}</h3>
                <p className="mb-0 text-body-secondary">{text}</p>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-12 col-xl-7">
          <div className="card" id="compare">
            <div className="card-header">
              <h2 className="card-title">AdminKit and AdminKit PRO compared</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Counted from the source of each edition.
              </p>
            </div>
            <div className="table-responsive">
              <table className="table upgrade-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="visually-hidden">Feature</span>
                    </th>
                    <th scope="col">AdminKit</th>
                    <th scope="col">AdminKit PRO</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.comparison.map((row) => (
                    <tr key={row.id}>
                      <th scope="row">{row.label}</th>
                      <td>
                        <Value value={row.free} />
                      </td>
                      <td className="fw-semibold">
                        <Value value={row.pro} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-body border-top">
              <p className="mb-3">
                One-time licenses: <strong>Hobby</strong> for one developer,{" "}
                <strong>Company</strong> for teams of up to five and{" "}
                <strong>Enterprise</strong> for unlimited developers.
              </p>
              <a href={pricing} className="btn btn-primary">
                See prices and licenses
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Frequently asked questions</h2>
            </div>
            <div className="card-body">
              <div className="vstack gap-4">
                {faq.map(({ question, answer }) => (
                  <div key={question}>
                    <h3 className="h6">{question}</h3>
                    <p className="text-body-secondary mb-0">{answer}</p>
                  </div>
                ))}
                <div>
                  <h3 className="h6">Can I get a refund?</h3>
                  <p className="text-body-secondary mb-0">
                    Within 30 days of purchase. Email{" "}
                    <a href="mailto:info@adminkit.io">info@adminkit.io</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
