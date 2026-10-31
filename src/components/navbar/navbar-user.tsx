import Link from "next/link";
import { ChartPie, CircleQuestionMark, Settings, User } from "lucide-react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "@/components/bootstrap/dropdown";
import { asset } from "@/lib/site";

/** The account menu: a settings icon on small screens, the avatar and name from sm up */
export function NavbarUser() {
  return (
    <Dropdown as="li" className="nav-item dropdown" display="static">
      <DropdownToggle
        className="nav-icon dropdown-toggle d-inline-block d-sm-none"
        aria-label="Account"
      >
        <Settings className="align-middle" />
      </DropdownToggle>{" "}
      <DropdownToggle className="nav-link dropdown-toggle d-none d-sm-inline-block">
        <img
          src={asset("/img/avatars/avatar.jpg")}
          className="avatar img-fluid rounded me-1"
          alt="Charles Hall"
          width={40}
          height={40}
        />{" "}
        <span className="text-dark">Charles Hall</span>{" "}
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <Link className="dropdown-item" href="/pages-profile">
          <User className="align-middle me-1" /> Profile
        </Link>
        <a className="dropdown-item" href="#">
          <ChartPie className="align-middle me-1" /> Analytics
        </a>
        <div className="dropdown-divider" />
        <Link className="dropdown-item" href="/">
          <Settings className="align-middle me-1" /> Settings &amp; Privacy
        </Link>
        <a className="dropdown-item" href="#">
          <CircleQuestionMark className="align-middle me-1" /> Help Center
        </a>
        <div className="dropdown-divider" />
        <a className="dropdown-item" href="#">
          Log out
        </a>
      </DropdownMenu>
    </Dropdown>
  );
}
