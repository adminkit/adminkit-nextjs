"use client";

import { useLayout } from "@/contexts/layout-context";
import { NavbarColorMode } from "./navbar-color-mode";
import { NavbarMessages } from "./navbar-messages";
import { NavbarNotifications } from "./navbar-notifications";
import { NavbarUser } from "./navbar-user";

/** The top bar: sidebar toggle and the menus on the right */
export function Navbar() {
  const { toggleSidebar, expanded } = useLayout();

  return (
    <nav
      className="navbar navbar-expand navbar-light navbar-bg"
      aria-label="Top bar"
    >
      <button
        type="button"
        className="sidebar-toggle js-sidebar-toggle"
        aria-controls="sidebar"
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        onClick={toggleSidebar}
      >
        <i className="hamburger align-self-center" />
      </button>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <NavbarNotifications />
          <NavbarMessages />
          <NavbarColorMode />
          <NavbarUser />
        </ul>
      </div>
    </nav>
  );
}
