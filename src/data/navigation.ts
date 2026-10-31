import {
  AppWindow,
  Bell,
  Book,
  ChartNoAxesColumn,
  Coffee,
  CreditCard,
  LayoutGrid,
  List,
  LogIn,
  type LucideIcon,
  Map,
  SearchX,
  ServerCrash,
  SlidersVertical,
  Square,
  SquareCheckBig,
  Tag,
  TextAlignStart,
  User,
  UserPlus,
} from "lucide-react";

export type NavItem = {
  title: string;
  /** A route */
  href: string;
  icon: LucideIcon;
};

export type NavSection = { header: string; items: NavItem[] };

/** The sidebar menu. An item is active when its href is the current route. */
export const navigation: NavSection[] = [
  {
    header: "Pages",
    items: [
      { title: "Analytics", href: "/", icon: SlidersVertical },
      { title: "Profile", href: "/pages-profile", icon: User },
      { title: "Invoice", href: "/pages-invoice", icon: CreditCard },
      { title: "Sign In", href: "/pages-sign-in", icon: LogIn },
      { title: "Sign Up", href: "/pages-sign-up", icon: UserPlus },
      { title: "404 Page", href: "/pages-404", icon: SearchX },
      { title: "500 Page", href: "/pages-500", icon: ServerCrash },
      { title: "Pricing", href: "/pages-pricing", icon: Tag },
      { title: "Blank", href: "/pages-blank", icon: Book },
    ],
  },
  {
    header: "Tools & Components",
    items: [
      { title: "Alerts", href: "/ui-alerts", icon: Bell },
      { title: "Buttons", href: "/ui-buttons", icon: Square },
      { title: "Forms", href: "/ui-forms", icon: SquareCheckBig },
      { title: "Cards", href: "/ui-cards", icon: LayoutGrid },
      { title: "Modals", href: "/ui-modals", icon: AppWindow },
      { title: "Typography", href: "/ui-typography", icon: TextAlignStart },
      { title: "Icons", href: "/icons-lucide", icon: Coffee },
      { title: "Tables", href: "/tables-bootstrap", icon: List },
    ],
  },
  {
    header: "Plugins & Addons",
    items: [
      { title: "Charts", href: "/charts-chartjs", icon: ChartNoAxesColumn },
      { title: "Maps", href: "/maps-google", icon: Map },
    ],
  },
];
