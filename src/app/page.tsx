import React from "react";
import { HomeDashboard } from "@/components/dashboard/home-dashboard";
import { requireAuth } from "@/lib/auth";
import { getDashboardView } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await requireAuth();
  const view = await getDashboardView();

  if (!view) {
    return <main className="page-stack"><h1>House Dashboard</h1><p>No house data found.</p></main>;
  }

  return <HomeDashboard {...view} />;
}
