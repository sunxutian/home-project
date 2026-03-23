import React from "react";
import { HouseSnapshot } from "@/components/dashboard/house-snapshot";
import { QuickAdd } from "@/components/dashboard/quick-add";
import { TodayList } from "@/components/dashboard/today-list";
import { UpcomingList } from "@/components/dashboard/upcoming-list";
import { buildDashboardTasks } from "@/lib/tasks/sorting";

export default async function HomePage() {
  const tasks = buildDashboardTasks({
    recurringTasks: [
      {
        title: "Take out garbage",
        scheduleKey: "closter-west-2026-garbage",
        status: "open"
      },
      {
        title: "Take out recycling",
        scheduleKey: "closter-west-2026-recycling",
        status: "open"
      }
    ],
    adHocTasks: [
      {
        title: "Replace HVAC filter",
        dueAt: "2026-03-21T10:00:00-04:00",
        status: "open"
      },
      {
        title: "Review utility bill",
        dueAt: "2026-03-22T18:00:00-04:00",
        status: "open"
      }
    ],
    now: new Date("2026-03-22T09:00:00-04:00"),
    timezone: "America/New_York"
  });
  const today = tasks.filter((task) => task.date === "2026-03-22");
  const nextUp = tasks.filter((task) => task.date !== "2026-03-22").slice(0, 4);

  return (
    <main className="dashboard-grid">
      <h1>House Dashboard</h1>
      <section className="panel">
        <div className="section-head">
          <h2>Next Up</h2>
          <p>Upcoming municipal pickups and house tasks.</p>
        </div>
        <UpcomingList tasks={nextUp} />
      </section>
      <section className="panel">
        <div className="section-head">
          <h2>Today</h2>
          <p>Anything due on today’s household timeline.</p>
        </div>
        <TodayList tasks={today} />
      </section>
      <HouseSnapshot />
      <section className="panel">
        <div className="section-head">
          <h2>Quick Add</h2>
          <p>Fast path into household task capture.</p>
        </div>
        <QuickAdd />
      </section>
    </main>
  );
}
