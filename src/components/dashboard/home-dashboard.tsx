import React from "react";
import { HouseSnapshot } from "@/components/dashboard/house-snapshot";
import { QuickAdd } from "@/components/dashboard/quick-add";
import { TodayList } from "@/components/dashboard/today-list";
import { UpcomingList } from "@/components/dashboard/upcoming-list";

type DashboardTask = {
  title: string;
  date: string;
};

type HomeDashboardProps = {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  today: DashboardTask[];
  nextUp: DashboardTask[];
};

export function HomeDashboard({
  addressLine1,
  city,
  state,
  postalCode,
  today,
  nextUp
}: HomeDashboardProps) {
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
      <HouseSnapshot
        addressLine1={addressLine1}
        city={city}
        state={state}
        postalCode={postalCode}
      />
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
