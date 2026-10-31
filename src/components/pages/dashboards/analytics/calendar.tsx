"use client";

import { useState } from "react";
import { VanillaCalendar } from "@/components/plugins/vanilla-calendar";

/** An inline calendar with a date five days ago selected */
export function DashboardCalendar() {
  const [date] = useState(() => new Date(Date.now() - 5 * 24 * 60 * 60 * 1000));

  return (
    <div className="card flex-fill">
      <div className="card-header">
        <h2 className="card-title mb-0">Calendar</h2>
      </div>
      <div className="card-body d-flex">
        <div className="align-self-center w-100">
          <VanillaCalendar
            options={{
              selectedDates: [date],
              enableJumpToSelectedDate: true,
              firstWeekday: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}
