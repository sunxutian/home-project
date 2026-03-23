import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders dashboard heading", async () => {
  render(await HomePage());
  expect(
    screen.getByRole("heading", {
      name: /house dashboard/i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /next up/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /today/i })).toBeInTheDocument();
  expect(screen.getByText(/house snapshot/i)).toBeInTheDocument();
});
