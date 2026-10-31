"use client";

import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDesktop } from "@/hooks/use-media-query";

type LayoutContext = {
  /** The sidebar sheet below the lg breakpoint */
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  /** From lg up, the sidebar is hidden (.collapsed) */
  collapsed: boolean;
  /**
   * The navbar toggle: from lg up it hides and shows the sidebar, below lg it opens and
   * closes the sheet
   */
  toggleSidebar: () => void;
  /** Whether the sidebar is shown: in the layout on desktop, as the sheet below lg */
  expanded: boolean;
};

const Context = createContext<LayoutContext | null>(null);

export const useLayout = () => {
  const context = use(Context);
  if (!context) {
    throw new Error("useLayout must be used inside <LayoutProvider>");
  }
  return context;
};

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const desktop = useDesktop();

  // The sheet only exists below lg: growing past it closes the sheet, as in Bootstrap
  useEffect(() => {
    if (desktop) {
      const frame = requestAnimationFrame(() => setSheetOpen(false));
      return () => cancelAnimationFrame(frame);
    }
  }, [desktop]);

  const toggleSidebar = useCallback(() => {
    if (matchMedia("(min-width: 992px)").matches) {
      setCollapsed((value) => !value);
    } else {
      setSheetOpen((open) => !open);
    }
  }, []);

  return (
    <Context
      value={{
        sheetOpen,
        setSheetOpen,
        collapsed,
        toggleSidebar,
        expanded: desktop ? !collapsed : sheetOpen,
      }}
    >
      {children}
    </Context>
  );
}
