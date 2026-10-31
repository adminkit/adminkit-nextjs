import Link from "next/link";

/**
 * The page heading with a badge that links to the upgrade page. `badge` names what PRO
 * has more of ("Get more chart examples").
 */
export function PageTitle({
  title,
  badge = "Get more demos",
}: {
  title: string;
  badge?: string;
}) {
  return (
    <div className="mb-3">
      <h1 className="h3 d-inline align-middle">{title}</h1>{" "}
      <Link
        className="badge bg-dark text-light ms-2 d-print-none"
        href="/upgrade-to-pro"
      >
        {badge}
      </Link>
    </div>
  );
}
