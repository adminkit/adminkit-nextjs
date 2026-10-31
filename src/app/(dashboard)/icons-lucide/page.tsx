import { LucideIcons } from "@/components/pages/icons/lucide/lucide-icons";
import { PageTitle } from "@/components/ui/page-title";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/icons-lucide");

export default function Page() {
  return (
    <>
      <PageTitle title="Lucide" badge="Get more icons" />

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Lucide Icons</h2>
          <p className="h6 card-subtitle text-body-secondary">
            Open-source SVG icons
          </p>
        </div>
        <div className="card-body">
          <LucideIcons />
        </div>
      </div>
    </>
  );
}
