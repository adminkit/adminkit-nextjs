"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { cx } from "@/lib/cx";

/** The sidebar menu from src/data/navigation.ts; the current route's item is active */
export function SidebarNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="sidebar-nav">
      {navigation.map((section) => [
        <li key={`header-${section.header}`} className="sidebar-header">
          {section.header}
        </li>,
        ...section.items.map(({ title, href, icon: Icon }) => {
          const active = href === pathname;
          return (
            <li key={href} className={cx("sidebar-item", active && "active")}>
              <Link
                className="sidebar-link"
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
              >
                <Icon className="align-middle" />{" "}
                <span className="align-middle">{title}</span>
              </Link>
            </li>
          );
        }),
      ])}
    </ul>
  );
}
