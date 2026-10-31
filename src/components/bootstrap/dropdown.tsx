"use client";

import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useFloating,
  useMergeRefs,
} from "@floating-ui/react";
import {
  type ComponentPropsWithRef,
  createContext,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  use,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cx } from "@/lib/cx";

type Context = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  id: string;
  static: boolean;
  strategy: "absolute" | "fixed";
  autoClose: boolean | "inside" | "outside";
  drop: "down" | "up" | "start" | "end";
  setToggle: (element: HTMLElement | null) => void;
  setMenu: (element: HTMLElement | null) => void;
  toggleElement: React.RefObject<HTMLElement | null>;
  menuElement: React.RefObject<HTMLElement | null>;
};

const DropdownContext = createContext<Context | null>(null);

const useDropdown = () => {
  const context = use(DropdownContext);
  if (!context) {
    throw new Error("Dropdown parts must be inside a <Dropdown>");
  }
  return context;
};

const itemSelector =
  ".dropdown-item:not(.disabled):not(:disabled), .list-group-item";

const items = (menu: HTMLElement | null) =>
  menu ? [...menu.querySelectorAll<HTMLElement>(itemSelector)] : [];

type DropdownProps<T extends ElementType> = {
  as?: T;
  /**
   * static leaves the menu where the CSS puts it (Bootstrap's data-bs-display="static",
   * and what it does in a navbar); dynamic positions it with Floating UI and flips it to
   * stay in view.
   */
  display?: "dynamic" | "static";
  /**
   * fixed positions the menu relative to the window, so it escapes containers that clip
   * or scroll (Bootstrap's data-bs-popper-config strategy)
   */
  strategy?: "absolute" | "fixed";
  /** Which clicks close the menu: true (any), inside, outside or false (only the toggle) */
  autoClose?: boolean | "inside" | "outside";
  /** The side the menu opens on; read from the dropup/dropend/dropstart class by default */
  drop?: "down" | "up" | "start" | "end";
} & Omit<ComponentPropsWithRef<T>, "as">;

/**
 * Bootstrap's dropdown without its JavaScript. The markup is Bootstrap's:
 *
 * <Dropdown as="li" className="nav-item dropdown">
 *   <DropdownToggle className="nav-link dropdown-toggle">Menu</DropdownToggle>
 *   <DropdownMenu className="dropdown-menu-end">
 *     <a className="dropdown-item" href="#">Action</a>
 *   </DropdownMenu>
 * </Dropdown>
 */
export function Dropdown<T extends ElementType = "div">({
  as,
  display = "dynamic",
  strategy = "absolute",
  autoClose = true,
  drop,
  className,
  ...props
}: DropdownProps<T>) {
  const Component: ElementType = as ?? "div";
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const toggleElement = useRef<HTMLElement | null>(null);
  const menuElement = useRef<HTMLElement | null>(null);
  const classes = String(className ?? "");
  const side =
    drop ??
    (classes.includes("dropup")
      ? "up"
      : classes.includes("dropend")
        ? "end"
        : classes.includes("dropstart")
          ? "start"
          : "down");

  const toggle = useCallback(() => setOpen((value) => !value), []);
  const setToggle = useCallback((element: HTMLElement | null) => {
    toggleElement.current = element;
  }, []);
  const setMenu = useCallback((element: HTMLElement | null) => {
    menuElement.current = element;
  }, []);

  // Clicks outside and Escape close the menu
  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        root.current?.contains(target) ||
        menuElement.current?.contains(target)
      ) {
        return;
      }
      if (autoClose === true || autoClose === "outside") {
        setOpen(false);
      }
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleElement.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, autoClose]);

  return (
    <DropdownContext
      value={{
        open,
        setOpen,
        toggle,
        id,
        static: display === "static",
        strategy,
        autoClose,
        drop: side,
        setToggle,
        setMenu,
        toggleElement,
        menuElement,
      }}
    >
      <Component ref={root} className={className} {...props} />
    </DropdownContext>
  );
}

type ToggleProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, "as">;

/** The element that opens the menu: a link (href="#") by default, or as="button". */
export function DropdownToggle<T extends ElementType = "a">({
  as,
  className,
  onClick,
  onKeyDown,
  ref: forwardedRef,
  ...props
}: ToggleProps<T>) {
  const Component: ElementType = as ?? "a";
  const dropdown = useDropdown();
  const isLink = Component === "a";
  const ref = useMergeRefs([dropdown.setToggle, forwardedRef]);

  return (
    <Component
      ref={ref}
      href={isLink ? "#" : undefined}
      role={isLink ? "button" : undefined}
      type={Component === "button" ? "button" : undefined}
      aria-expanded={dropdown.open}
      aria-controls={dropdown.id}
      className={cx(className, dropdown.open && "show")}
      onClick={(event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // A menu can have one toggle per breakpoint; Escape returns focus to the one used
        dropdown.setToggle(event.currentTarget);
        dropdown.toggle();
        onClick?.(event);
      }}
      onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
        // Arrow keys open the menu and move to its first or last item
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          dropdown.setToggle(event.currentTarget);
          dropdown.setOpen(true);
          requestAnimationFrame(() => {
            const list = items(dropdown.menuElement.current);
            (event.key === "ArrowDown" ? list[0] : list.at(-1))?.focus();
          });
        }
        onKeyDown?.(event);
      }}
      {...props}
    />
  );
}

const placements: Record<Context["drop"], [Placement, Placement]> = {
  down: ["bottom-start", "bottom-end"],
  up: ["top-start", "top-end"],
  end: ["right-start", "right-start"],
  start: ["left-start", "left-start"],
};

type MenuProps<T extends ElementType> = {
  as?: T;
  /** Aligns the menu to the toggle's end; read from .dropdown-menu-end by default */
  align?: "start" | "end";
} & Omit<ComponentPropsWithRef<T>, "as">;

export function DropdownMenu<T extends ElementType = "div">({
  as,
  align,
  className,
  style,
  onClick,
  onKeyDown,
  ref: forwardedRef,
  ...props
}: MenuProps<T>) {
  const Component: ElementType = as ?? "div";
  const dropdown = useDropdown();
  const end =
    (align ?? (String(className).includes("dropdown-menu-end") && "end")) ===
    "end";
  const dynamic = !dropdown.static && dropdown.open;

  const { refs, floatingStyles, placement } = useFloating({
    open: dynamic,
    placement: placements[dropdown.drop][end ? 1 : 0],
    strategy: dropdown.strategy,
    middleware: [offset(2), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const menuRef = useMergeRefs([
    refs.setFloating,
    (element: HTMLElement | null) => {
      dropdown.setMenu(element);
    },
    forwardedRef,
  ]);

  useEffect(() => {
    refs.setReference(dropdown.toggleElement.current);
  }, [refs, dropdown.toggleElement, dropdown.open]);

  return (
    <Component
      ref={menuRef}
      id={dropdown.id}
      className={cx("dropdown-menu", className, dropdown.open && "show")}
      data-bs-popper={dropdown.static && dropdown.open ? "static" : undefined}
      data-popper-placement={dynamic ? placement : undefined}
      style={dynamic ? { ...floatingStyles, margin: 0, ...style } : style}
      onClick={(event: MouseEvent<HTMLElement>) => {
        onClick?.(event);
        const target = event.target as HTMLElement;
        // Form controls in a menu keep it open, as in Bootstrap
        if (
          (dropdown.autoClose === true || dropdown.autoClose === "inside") &&
          target.closest("a, button") &&
          !target.closest("form")
        ) {
          dropdown.setOpen(false);
        }
      }}
      onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(event);
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
          return;
        }
        event.preventDefault();
        const list = items(event.currentTarget);
        const index = list.indexOf(document.activeElement as HTMLElement);
        const next =
          event.key === "ArrowDown"
            ? Math.min(index + 1, list.length - 1)
            : Math.max(index - 1, 0);
        list[next]?.focus();
      }}
      {...props}
    />
  );
}
