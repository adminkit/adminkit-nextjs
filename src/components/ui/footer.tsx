import { Fragment } from "react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer reveal">
      <div className="container-fluid">
        <div className="row text-body-secondary">
          <div className="col-6 text-start">
            <p className="mb-0">
              <a
                className="text-body-secondary"
                href="https://adminkit.io/"
                target="_blank"
              >
                <strong>AdminKit</strong>
              </a>{" "}
              -{" "}
              <a
                className="text-body-secondary"
                href="https://adminkit.io/"
                target="_blank"
              >
                <strong>Bootstrap Admin Template</strong>
              </a>{" "}
              &copy; {site.year}
            </p>
          </div>
          <div className="col-6 text-end">
            <ul className="list-inline">
              {["Support", "Help Center", "Privacy", "Terms"].map((link) => (
                <Fragment key={link}>
                  <li className="list-inline-item">
                    <a
                      className="text-body-secondary"
                      href="https://adminkit.io/"
                      target="_blank"
                    >
                      {link}
                    </a>
                  </li>{" "}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
