import { buildDashboardTasks } from "@/lib/tasks/sorting";

test("expands recurring tasks in America/New_York and orders overdue before today before upcoming", () => {
  const sorted = buildDashboardTasks({
    recurringTasks: [
      {
        title: "Take out garbage",
        scheduleKey: "closter-west-2026-garbage",
        status: "open"
      }
    ],
    adHocTasks: [
      {
        title: "Replace filter",
        dueAt: "2026-03-21T10:00:00-04:00",
        status: "open"
      }
    ],
    now: new Date("2026-03-22T09:00:00-04:00"),
    timezone: "America/New_York"
  });

  expect(sorted[0]?.title).toBe("Replace filter");
  expect(
    sorted.some(
      (item) => item.title === "Take out garbage" && item.date === "2026-03-24"
    )
  ).toBe(true);
});
