import type { LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { cx } from "@/lib/cx";

/** A stat card: title, icon, a number that counts up and the change since last period */
export function Stats({
  icon: Icon,
  title,
  number,
  percentage,
  percentageColor,
  percentageText,
  color = "primary",
  big,
}: {
  icon: LucideIcon;
  title: string;
  /** The value as shown, such as "48,920" or "41.2%" */
  number: string;
  percentage: string;
  percentageColor: "success" | "danger" | "warning";
  percentageText: string;
  color?: string;
  big?: boolean;
}) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col mt-0">
            <h2 className="card-title">{title}</h2>
          </div>

          <div className="col-auto">
            <div className={`stat text-${color}`}>
              <Icon className="align-middle" />
            </div>
          </div>
        </div>
        <CountUp
          as="div"
          className={cx("h1", big ? "mt-2 mb-4" : "mt-1 mb-3")}
          value={number}
        />
        <div className="mb-0">
          <span className={`text-${percentageColor}`}>{percentage}%</span>{" "}
          <span className="text-body-secondary">{percentageText}</span>
        </div>
      </div>
    </div>
  );
}
