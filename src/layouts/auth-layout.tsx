import type { ReactNode } from "react";

/** The centered layout of the sign-in, sign-up and error pages */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="d-flex w-100 h-100 reveal-cards">
      <div className="container d-flex flex-column">
        <div className="row gx-0 vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
