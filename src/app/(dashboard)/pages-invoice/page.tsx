import Link from "next/link";
import { Bell, Download, Eye, File, Printer, Send } from "lucide-react";
import {
  InvoiceActivity,
  InvoicePrintButton,
  InvoiceProvider,
  InvoiceSendButton,
  InvoiceSendModal,
} from "@/components/pages/account/invoice/invoice-actions";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/pages-invoice");

const items = [
  {
    description: "Website redesign, design phase",
    detail: "Homepage, product and checkout templates",
    qty: 1,
    unitPrice: "$4,800.00",
    amount: "$4,800.00",
  },
  {
    description: "Front-end development",
    detail: "Bootstrap 5 build, hours",
    qty: 32,
    unitPrice: "$95.00",
    amount: "$3,040.00",
  },
  {
    description: "Content migration",
    detail: "Product pages moved from the old store",
    qty: 120,
    unitPrice: "$6.50",
    amount: "$780.00",
  },
  {
    description: "Hosting and maintenance",
    detail: "October 2026",
    qty: 1,
    unitPrice: "$250.00",
    amount: "$250.00",
  },
];

const activity = [
  {
    icon: Bell,
    text: "Reminder scheduled",
    dateTime: "2026-11-10",
    date: "Nov 10, 2026",
  },
  {
    icon: Eye,
    text: "Viewed by Ashton Cox",
    dateTime: "2026-10-15T14:40",
    date: "Oct 15, 2026, 2:40 PM",
  },
  {
    icon: Send,
    text: "Sent to ashton.cox@example.com",
    dateTime: "2026-10-14T09:15",
    date: "Oct 14, 2026, 9:15 AM",
  },
  {
    icon: File,
    text: "Created by Charles Hall",
    dateTime: "2026-10-14T09:12",
    date: "Oct 14, 2026, 9:12 AM",
  },
];

export default function Page() {
  return (
    <InvoiceProvider>
      <div className="row align-items-center g-2 mb-3 d-print-none">
        <div className="col-12 col-sm">
          <h1 className="h3 d-inline align-middle">Invoice</h1>{" "}
          <Link
            className="badge bg-dark text-light ms-2"
            href="/upgrade-to-pro"
          >
            Get more page examples
          </Link>
        </div>
        <div className="col-12 col-sm-auto d-flex flex-wrap gap-2">
          <InvoicePrintButton>
            <Printer className="align-middle me-1" /> Print
          </InvoicePrintButton>
          <InvoicePrintButton>
            <Download className="align-middle me-1" /> Download PDF
          </InvoicePrintButton>
          <InvoiceSendButton>
            <Send className="align-middle me-1" /> Send invoice
          </InvoiceSendButton>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-xl-8 col-xxl-9">
          <article className="card invoice" aria-labelledby="invoice-title">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div className="d-flex align-items-center text-primary">
                  <svg
                    className="me-2"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    aria-hidden="true"
                  >
                    <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z"></path>
                    <path d="M20 12L12 16L4 12"></path>
                    <path d="M20 16L12 20L4 16"></path>
                  </svg>
                  <span className="fs-3 fw-bold text-body-emphasis">
                    AdminKit
                  </span>
                </div>
                <div className="text-sm-end">
                  <h2 className="h3 mb-1" id="invoice-title">
                    Invoice
                  </h2>
                  <div className="text-body-secondary mb-2">INV-2026-0148</div>
                  <span className="badge bg-warning">Unpaid</span>
                </div>
              </div>

              <dl className="row invoice-meta g-3 mb-0">
                <div className="col-6 col-md-3">
                  <dt>Issued</dt>
                  <dd>
                    <time dateTime="2026-10-14">October 14, 2026</time>
                  </dd>
                </div>
                <div className="col-6 col-md-3">
                  <dt>Due date</dt>
                  <dd>
                    <time dateTime="2026-11-13">November 13, 2026</time>
                  </dd>
                </div>
                <div className="col-6 col-md-3">
                  <dt>Purchase order</dt>
                  <dd>PO-7731</dd>
                </div>
                <div className="col-6 col-md-3">
                  <dt>Amount due</dt>
                  <dd className="fw-bold text-body-emphasis">$9,579.60</dd>
                </div>
              </dl>

              <hr className="my-4" />

              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="h6 text-body-secondary mb-2">From</div>
                  <strong className="d-block text-body-emphasis">
                    AdminKit LLC
                  </strong>
                  <address className="text-body-secondary mb-0">
                    354 Roy Alley
                    <br />
                    Denver, CO 80202
                    <br />
                    USA
                    <br />
                    <a href="mailto:billing@example.com">billing@example.com</a>
                  </address>
                </div>
                <div className="col-sm-6">
                  <div className="h6 text-body-secondary mb-2">Billed to</div>
                  <strong className="d-block text-body-emphasis">
                    Ashton Cox
                  </strong>
                  <address className="text-body-secondary mb-0">
                    Levitz Furniture
                    <br />
                    4183 Forest Avenue
                    <br />
                    New York, NY 10011
                    <br />
                    USA
                    <br />
                    <a href="mailto:ashton.cox@example.com">
                      ashton.cox@example.com
                    </a>
                  </address>
                </div>
              </div>

              <table className="table invoice-items mb-0">
                <caption className="visually-hidden">
                  Items on invoice INV-2026-0148
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-end d-none d-sm-table-cell">
                      Qty
                    </th>
                    <th scope="col" className="text-end d-none d-sm-table-cell">
                      Unit price
                    </th>
                    <th scope="col" className="text-end">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.description}>
                      <td>
                        <div className="fw-medium text-body-emphasis">
                          {item.description}
                        </div>
                        <div className="text-body-secondary small">
                          {item.detail}
                          {item.qty > 1 && (
                            <span className="d-sm-none">
                              {" "}
                              &middot; {item.qty} &times; {item.unitPrice}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-end d-none d-sm-table-cell">
                        {item.qty}
                      </td>
                      <td className="text-end text-nowrap d-none d-sm-table-cell">
                        {item.unitPrice}
                      </td>
                      <td className="text-end text-nowrap">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row">
                <div className="col-sm-8 col-md-6 col-lg-5 ms-auto">
                  <table className="table table-sm table-borderless invoice-totals mb-0">
                    <caption className="visually-hidden">Totals</caption>
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="fw-normal text-body-secondary"
                        >
                          Subtotal
                        </th>
                        <td className="text-end">$8,870.00</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="fw-normal text-body-secondary"
                        >
                          Sales tax (8%)
                        </th>
                        <td className="text-end">$709.60</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="fw-normal text-body-secondary"
                        >
                          Total
                        </th>
                        <td className="text-end">$9,579.60</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="fw-normal text-body-secondary"
                        >
                          Amount paid
                        </th>
                        <td className="text-end">$0.00</td>
                      </tr>
                      <tr className="invoice-due">
                        <th scope="row">Amount due (USD)</th>
                        <td className="text-end">$9,579.60</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <hr className="my-4" />

              <div className="row g-4">
                <div className="col-md-6">
                  <h3 className="h6 text-body-secondary mb-2">
                    Payment details
                  </h3>
                  <dl className="row invoice-payment mb-0">
                    <dt className="col-5">Bank</dt>
                    <dd className="col-7">Front Range Bank</dd>
                    <dt className="col-5">Account name</dt>
                    <dd className="col-7">AdminKit LLC</dd>
                    <dt className="col-5">Account</dt>
                    <dd className="col-7">Ending in 4821</dd>
                    <dt className="col-5">Reference</dt>
                    <dd className="col-7">INV-2026-0148</dd>
                  </dl>
                </div>
                <div className="col-md-6">
                  <h3 className="h6 text-body-secondary mb-2">Notes</h3>
                  <p className="text-body-secondary mb-2">
                    Thank you for your business. Please include the invoice
                    number with your payment. Payment is due within 30 days.
                  </p>
                  <p className="text-body-secondary mb-0">
                    Questions about this invoice? Email{" "}
                    <a href="mailto:billing@example.com">billing@example.com</a>{" "}
                    or call +1 (303) 555-0142.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="col-12 col-xl-4 col-xxl-3 d-print-none">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Activity</h2>
            </div>
            <InvoiceActivity>
              {activity.map(({ icon: Icon, text, dateTime, date }) => (
                <li key={text} className="list-group-item d-flex gap-3">
                  <Icon className="text-body-secondary flex-shrink-0" />
                  <div>
                    <div>{text}</div>
                    <div className="text-body-secondary small">
                      <time dateTime={dateTime}>{date}</time>
                    </div>
                  </div>
                </li>
              ))}
            </InvoiceActivity>
          </div>
        </div>
      </div>

      <InvoiceSendModal />
    </InvoiceProvider>
  );
}
