import {
  Check,
  Gauge,
  LayoutGrid,
  LifeBuoy,
  Minus,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  BillingPeriodProvider,
  BillingPeriodToggle,
  PeriodText,
} from "@/components/pages/account/pricing/billing-period";
import { PageTitle } from "@/components/ui/page-title";
import {
  type ComparisonGroup,
  type ComparisonValue,
  comparison,
  faq,
  type PeriodValue,
  plans,
} from "@/mocks/pricing";
import { cx } from "@/lib/cx";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/pages-pricing");

const groupIcons: Record<ComparisonGroup["icon"], typeof Gauge> = {
  gauge: Gauge,
  "layout-grid": LayoutGrid,
  "shield-check": ShieldCheck,
  "life-buoy": LifeBuoy,
};

/** A fixed text, or the text for the selected billing period */
const periodText = (value: string | PeriodValue) =>
  typeof value === "string" ? value : <PeriodText {...value} />;

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <td>
        <Check className="text-success" aria-hidden="true" />
        <span className="visually-hidden">Yes</span>
      </td>
    );
  }
  if (value === false) {
    return (
      <td>
        <Minus className="text-body-secondary" aria-hidden="true" />
        <span className="visually-hidden">No</span>
      </td>
    );
  }
  return <td>{value}</td>;
}

export default function Page() {
  return (
    <BillingPeriodProvider>
      <PageTitle title="Pricing" badge="Get more page examples" />

      <div className="row">
        <div className="col-12 col-xxl-10 mx-auto">
          <div className="text-center mb-4">
            <h2 className="h3">Choose the plan that fits your team</h2>
            <p className="text-body-secondary mb-4">
              Start free and upgrade when you need more. Paid plans come with a
              14-day trial, no credit card required.
            </p>

            <BillingPeriodToggle />
          </div>

          <div className="pricing-plans mb-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cx("card", plan.featured && "pricing-plan-featured")}
              >
                <div className="card-body p-3 p-xl-4">
                  {plan.featured ? (
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                      <h3 className="h5 mb-0">{plan.name}</h3>
                      <span className="badge bg-primary">Most popular</span>
                    </div>
                  ) : (
                    <h3 className="h5 mb-1">{plan.name}</h3>
                  )}
                  <p className="text-body-secondary">{plan.description}</p>
                  <p className="pricing-price mb-0">
                    <span className="display-6 fw-semibold">
                      {periodText(plan.price)}
                    </span>{" "}
                    <span className="text-body-secondary text-nowrap">
                      per user / month
                    </span>
                  </p>
                  <p className="small text-body-secondary mb-4">
                    {periodText(plan.billing)}
                  </p>
                  <div className="mb-4">
                    <Link
                      href="/pages-sign-up"
                      className={cx(
                        "btn w-100",
                        plan.featured ? "btn-primary" : "btn-outline-primary"
                      )}
                    >
                      {plan.cta}
                      <span className="visually-hidden"> with {plan.name}</span>
                    </Link>
                  </div>
                  <ul className="pricing-features list-unstyled border-top pt-4 mb-0">
                    {plan.includes && (
                      <li className="fw-semibold">
                        Everything in {plan.includes}, plus:
                      </li>
                    )}
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check className="text-success" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center small text-body-secondary mb-5">
            Prices in USD, excluding VAT. Need more than 500 users or an
            invoice-based contract? <a href="#">Contact sales</a>
          </p>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Compare plans</h2>
              <p className="h6 card-subtitle text-body-secondary">
                Every limit and feature, side by side.
              </p>
            </div>
            <div className="table-responsive-lg">
              <table className="table pricing-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="visually-hidden">Feature</span>
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.name} scope="col">
                        <span className="d-block h5 mb-1">{plan.name}</span>
                        <span className="d-block mb-2">
                          <span className="fs-4 fw-semibold">
                            {periodText(plan.price)}
                          </span>{" "}
                          <span className="small fw-normal text-body-secondary">
                            per user / month
                          </span>
                        </span>
                        <Link
                          href="/pages-sign-up"
                          className={cx(
                            "btn btn-sm",
                            plan.featured
                              ? "btn-primary"
                              : "btn-outline-primary"
                          )}
                        >
                          {plan.tableCta}
                          <span className="visually-hidden">
                            {" "}
                            with {plan.name}
                          </span>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((group) => {
                    const Icon = groupIcons[group.icon];
                    return (
                      <Fragment key={group.name}>
                        <tr className="pricing-table-group">
                          <th scope="colgroup" colSpan={4}>
                            <Icon aria-hidden="true" />
                            {group.name}
                          </th>
                        </tr>
                        {group.rows.map((row) => (
                          <tr key={row.feature}>
                            <th scope="row">{row.feature}</th>
                            {row.values.map((value, index) => (
                              <ComparisonCell key={index} value={value} />
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Frequently asked questions</h2>
            </div>
            <div className="card-body">
              <div className="row g-4">
                {faq.map(({ question, answer }) => (
                  <div key={question} className="col-12 col-md-6">
                    <h3 className="h6">{question}</h3>
                    <p className="text-body-secondary mb-0">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BillingPeriodProvider>
  );
}
