"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";
import { Offcanvas } from "@/components/bootstrap/offcanvas";
import { useLayout } from "@/contexts/layout-context";
import { cx } from "@/lib/cx";
import { SidebarNav } from "./sidebar-nav";

/**
 * From lg up a column of the layout that the navbar toggle hides and shows; below lg an
 * offcanvas sheet that the toggle opens (LayoutProvider).
 */
export function Sidebar() {
  const { sheetOpen, setSheetOpen, collapsed } = useLayout();
  const ref = useRef<HTMLElement>(null);
  const previous = useRef(collapsed);

  // Charts and maps resize once the sidebar has moved; without a transition (reduced
  // motion) there is no transitionend, so they resize right away
  useEffect(() => {
    const sidebar = ref.current;
    if (!sidebar || previous.current === collapsed) {
      return;
    }
    previous.current = collapsed;
    const resize = () => window.dispatchEvent(new Event("resize"));

    if (!parseFloat(getComputedStyle(sidebar).transitionDuration)) {
      resize();
      return;
    }

    const onEnd = (event: TransitionEvent) => {
      if (event.target === sidebar && event.propertyName === "margin-left") {
        sidebar.removeEventListener("transitionend", onEnd);
        resize();
      }
    };
    sidebar.addEventListener("transitionend", onEnd);
    return () => sidebar.removeEventListener("transitionend", onEnd);
  }, [collapsed]);

  // Following a link closes the sheet
  const closeSheet = () => setSheetOpen(false);

  return (
    <Offcanvas
      as="nav"
      ref={ref}
      id="sidebar"
      responsive="lg"
      placement="start"
      show={sheetOpen}
      onHide={closeSheet}
      onHidden={() =>
        document.querySelector<HTMLElement>(".js-sidebar-toggle")?.focus()
      }
      className={cx("sidebar js-sidebar", collapsed && "collapsed")}
      aria-label="Sidebar"
    >
      <SimpleBar className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" href="/" onClick={closeSheet}>
          <span className="align-middle">AdminKit</span>
        </Link>

        <SidebarNav onNavigate={closeSheet} />

        <div className="sidebar-cta">
          <div className="sidebar-cta-content">
            <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
            <div className="mb-3 text-sm">
              AdminKit PRO, the premium version, has more components.
            </div>
            <div className="d-grid">
              <Link
                href="/upgrade-to-pro"
                className="btn btn-primary"
                onClick={closeSheet}
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </SimpleBar>
    </Offcanvas>
  );
}
