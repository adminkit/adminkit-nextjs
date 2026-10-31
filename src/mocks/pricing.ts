// Plans, plan comparison and FAQ of the pricing page (/pages-pricing)

/** A price that depends on the billing period */
export type PeriodValue = { monthly: string; yearly: string };

export type Plan = {
  name: string;
  description: string;
  /** "$0", or the monthly and yearly price per user per month */
  price: string | PeriodValue;
  /** The line under the price */
  billing: string | PeriodValue;
  /** The plan the features add to ("Everything in Free, plus:") */
  includes?: string;
  features: string[];
  /** The card button and the comparison table button */
  cta: string;
  tableCta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Free",
    description: "For individuals and small teams getting started.",
    price: "$0",
    billing: "Free forever",
    features: [
      "Up to 3 users",
      "5 projects",
      "2 GB storage",
      "Tasks, boards and calendar",
      "Two-factor authentication",
    ],
    cta: "Get started",
    tableCta: "Get started",
  },
  {
    name: "Standard",
    description: "For growing teams that need more room and integrations.",
    price: { monthly: "$15", yearly: "$12" },
    billing: {
      monthly: "Billed monthly",
      yearly: "$144 per user, billed yearly",
    },
    includes: "Free",
    features: [
      "Up to 50 users",
      "Unlimited projects",
      "100 GB storage",
      "Advanced reports and exports",
      "Integrations and API access",
      "Email support",
    ],
    cta: "Start free trial",
    tableCta: "Start trial",
    featured: true,
  },
  {
    name: "Plus",
    description: "For companies that need security and admin controls.",
    price: { monthly: "$30", yearly: "$24" },
    billing: {
      monthly: "Billed monthly",
      yearly: "$288 per user, billed yearly",
    },
    includes: "Standard",
    features: [
      "Unlimited users",
      "1 TB storage",
      "Single sign-on (SAML)",
      "Custom roles and permissions",
      "Audit log and daily backups",
      "Priority support",
    ],
    cta: "Start free trial",
    tableCta: "Start trial",
  },
];

/** A cell of the comparison table: text, or true (check) / false (dash) */
export type ComparisonValue = string | boolean;

export type ComparisonGroup = {
  name: string;
  /** The Lucide icon of the group row */
  icon: "gauge" | "layout-grid" | "shield-check" | "life-buoy";
  rows: {
    feature: string;
    values: [ComparisonValue, ComparisonValue, ComparisonValue];
  }[];
};

export const comparison: ComparisonGroup[] = [
  {
    name: "Usage",
    icon: "gauge",
    rows: [
      { feature: "Users", values: ["Up to 3", "Up to 50", "Unlimited"] },
      { feature: "Projects", values: ["5", "Unlimited", "Unlimited"] },
      { feature: "Storage", values: ["2 GB", "100 GB", "1 TB"] },
      { feature: "Guest access", values: [false, true, true] },
    ],
  },
  {
    name: "Features",
    icon: "layout-grid",
    rows: [
      { feature: "Tasks, boards and calendar", values: [true, true, true] },
      { feature: "Reports", values: ["Basic", "Advanced", "Advanced"] },
      { feature: "Integrations and API access", values: [false, true, true] },
      { feature: "Custom roles and permissions", values: [false, false, true] },
    ],
  },
  {
    name: "Security",
    icon: "shield-check",
    rows: [
      { feature: "Two-factor authentication", values: [true, true, true] },
      { feature: "Backups", values: ["Weekly", "Weekly", "Daily"] },
      { feature: "Single sign-on (SAML)", values: [false, false, true] },
      { feature: "Audit log", values: [false, false, "1 year"] },
    ],
  },
  {
    name: "Support",
    icon: "life-buoy",
    rows: [
      { feature: "Help center and community", values: [true, true, true] },
      {
        feature: "Email support",
        values: [false, "1 business day", "4 hours"],
      },
    ],
  },
];

export const faq = [
  {
    question: "Do I need a credit card to start a trial?",
    answer:
      "No. You add a payment method only when you decide to keep a paid plan at the end of the 14-day trial.",
  },
  {
    question: "What happens when the trial ends?",
    answer:
      "You choose a paid plan or your workspace moves to Free. Your projects stay; anything above the Free limits becomes read-only.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, at any time from the billing settings. Upgrades apply right away and are prorated; downgrades apply at the next renewal.",
  },
  {
    question: "How are users counted?",
    answer:
      "You pay for each member of your workspace. Guests who can only view or comment on shared projects are free.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "All major credit and debit cards. Yearly plans can also be paid by bank transfer against an invoice.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. Your plan stays active until the end of the billing period, and you can export your data whenever you want.",
  },
];
