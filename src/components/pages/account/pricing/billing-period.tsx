"use client";

import { createContext, type ReactNode, use, useState } from "react";
import type { PeriodValue } from "@/mocks/pricing";

type Period = keyof PeriodValue;

const PeriodContext = createContext<{
  period: Period;
  setPeriod: (period: Period) => void;
}>({ period: "monthly", setPeriod: () => {} });

/** Holds the billing period that the toggle sets and the prices show */
export function BillingPeriodProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <PeriodContext value={{ period, setPeriod }}>{children}</PeriodContext>
  );
}

/** The Monthly / Yearly switch */
export function BillingPeriodToggle() {
  const { period, setPeriod } = use(PeriodContext);

  return (
    <div className="btn-group" role="group" aria-label="Billing period">
      <input
        type="radio"
        className="btn-check"
        name="billing-period"
        id="billing-monthly"
        value="monthly"
        autoComplete="off"
        checked={period === "monthly"}
        onChange={() => setPeriod("monthly")}
      />
      <label className="btn btn-outline-primary" htmlFor="billing-monthly">
        Monthly
      </label>
      <input
        type="radio"
        className="btn-check"
        name="billing-period"
        id="billing-yearly"
        value="yearly"
        autoComplete="off"
        checked={period === "yearly"}
        onChange={() => setPeriod("yearly")}
      />
      <label className="btn btn-outline-primary" htmlFor="billing-yearly">
        Yearly{" "}
        <span className="badge bg-success-subtle text-success-emphasis ms-1">
          Save 20%
        </span>
      </label>
    </div>
  );
}

/** The monthly or yearly text for the selected billing period */
export function PeriodText({ monthly, yearly }: PeriodValue) {
  const { period } = use(PeriodContext);

  return period === "monthly" ? monthly : yearly;
}
