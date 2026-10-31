"use client";

// Every Lucide icon, searchable by name and tag. Only this component imports all icons, so
// the other pages bundle just the icons they use.
import { icons, type LucideIcon } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import lucide from "@/data/icons-lucide.json";
import { cx } from "@/lib/cx";

const toPascalCase = (name: string) =>
  name.replace(/(?:^|-)([a-z0-9])/g, (match, character: string) =>
    character.toUpperCase()
  );

const list = lucide.map(({ name, tags }) => ({
  name,
  Icon: icons[toPascalCase(name) as keyof typeof icons],
  keywords: [name, ...tags].join("\n").toLowerCase(),
}));

// Memoized, so a search re-renders only the icons that appear or disappear
const IconItem = memo(function IconItem({
  name,
  Icon,
  hidden,
}: {
  name: string;
  Icon: LucideIcon;
  hidden: boolean;
}) {
  return (
    <div
      className={cx("col-12 col-md-6 col-lg-3 mb-2", hidden && "d-none")}
      data-name={name}
    >
      <Icon className="align-middle me-2" />{" "}
      <span className="align-middle">{name}</span>
    </div>
  );
});

/** The search field and the icon list of the Lucide icons page */
export function LucideIcons() {
  const [terms, setTerms] = useState<string[]>([]);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  // Filter the icons by name and tag
  const search = (value: string) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setTerms(value.toLowerCase().trim().split(/\s+/).filter(Boolean));
    }, 150);
  };

  const visible = list.map(({ keywords }) =>
    terms.every((term) => keywords.includes(term))
  );
  const matches = visible.filter(Boolean).length;

  return (
    <>
      <input
        type="search"
        className="form-control mb-4 js-icons-search"
        placeholder={`Search ${list.length} icons by name or tag`}
        aria-label="Search icons"
        autoComplete="off"
        onChange={(event) => search(event.target.value)}
      />
      <div className="row js-icons">
        {list.map(({ name, Icon }, index) => (
          <IconItem
            key={name}
            name={name}
            Icon={Icon}
            hidden={!visible[index]}
          />
        ))}
      </div>
      <p
        className={cx(
          "text-body-secondary mb-0 js-icons-empty",
          matches > 0 && "d-none"
        )}
      >
        No icons match your search.
      </p>
    </>
  );
}
