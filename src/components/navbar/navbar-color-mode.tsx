"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "@/components/bootstrap/dropdown";
import { useColorMode } from "@/hooks/use-color-mode";
import type { ColorMode } from "@/lib/config";

const colorModes: { mode: ColorMode; label: string; icon: typeof Sun }[] = [
  { mode: "light", label: "Light", icon: Sun },
  { mode: "dark", label: "Dark", icon: Moon },
  { mode: "auto", label: "Auto", icon: SunMoon },
];

/** Light, dark or auto; the toggle shows the current mode's icon */
export function NavbarColorMode() {
  const [colorMode, setColorMode] = useColorMode();
  const CurrentMode =
    colorModes.find(({ mode }) => mode === colorMode)?.icon ?? SunMoon;

  return (
    <Dropdown as="li" className="nav-item dropdown" display="static">
      <DropdownToggle
        className="nav-icon dropdown-toggle"
        aria-label={`Color mode (${colorMode})`}
      >
        <CurrentMode className="align-middle" />
      </DropdownToggle>
      <DropdownMenu as="ul" className="dropdown-menu-end">
        {colorModes.map(({ mode, label, icon: Icon }) => (
          <li key={mode}>
            <button
              type="button"
              className={`dropdown-item${colorMode === mode ? " active" : ""}`}
              aria-pressed={colorMode === mode}
              onClick={() => setColorMode(mode)}
            >
              <Icon className="align-middle me-1" /> {label}
            </button>
          </li>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
