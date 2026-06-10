import React from "react";
import { render, screen } from "@testing-library/react";
import { HomeDashboard } from "@/components/dashboard/home-dashboard";

test("renders dashboard heading", async () => {
  render(
    <HomeDashboard
      addressLine1="130 Durie Ave"
      city="Closter"
      state="NJ"
      postalCode="07624"
      today={[{ title: "Review utility bill", date: "2026-03-22" }]}
      nextUp={[{ title: "Take out garbage", date: "2026-03-24" }]}
    />
  );
  expect(
    screen.getByRole("heading", {
      name: /house dashboard/i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /next up/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /today/i })).toBeInTheDocument();
  expect(screen.getByText(/house snapshot/i)).toBeInTheDocument();
});
