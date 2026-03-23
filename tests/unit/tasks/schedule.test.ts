import { buildUpcomingPickupTasks } from "@/lib/tasks/schedule";

test("builds west-side garbage for Tuesdays and Fridays", () => {
  const result = buildUpcomingPickupTasks(
    new Date("2026-03-01T12:00:00-05:00")
  );

  expect(
    result.some(
      (task) => task.title === "Take out garbage" && task.date === "2026-03-03"
    )
  ).toBe(true);
  expect(
    result.some(
      (task) => task.title === "Take out garbage" && task.date === "2026-03-06"
    )
  ).toBe(true);
});

test("honors published holiday exceptions from the borough calendar", () => {
  const result = buildUpcomingPickupTasks(
    new Date("2026-01-01T12:00:00-05:00")
  );

  expect(
    result.some((task) => task.stream === "garbage" && task.date === "2026-01-02")
  ).toBe(true);
});
