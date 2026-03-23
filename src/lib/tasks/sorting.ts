import { buildUpcomingPickupTasks } from "@/lib/tasks/schedule";

type Status = "open" | "done";

type RecurringTask = {
  title: string;
  scheduleKey: string;
  status: Status;
};

type AdHocTask = {
  title: string;
  dueAt: string;
  status: Status;
};

type DashboardTask = {
  title: string;
  date: string;
  dueAt: string;
  status: Status;
};

type BuildDashboardTasksInput = {
  recurringTasks: RecurringTask[];
  adHocTasks: AdHocTask[];
  now: Date;
  timezone: string;
};

function compareDateOnly(dateA: string, dateB: string) {
  return dateA.localeCompare(dateB);
}

function toLocalDateString(value: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(value);

  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return `${year}-${month}-${day}`;
}

function expandRecurringTasks(tasks: RecurringTask[], now: Date) {
  const upcoming = buildUpcomingPickupTasks(now);

  return tasks.flatMap((task) =>
    upcoming
      .filter((pickup) => pickup.scheduleKey === task.scheduleKey)
      .map((pickup) => ({
        title: task.title,
        date: pickup.date,
        dueAt: pickup.dueAt,
        status: task.status
      }))
  );
}

function normalizeAdHocTasks(tasks: AdHocTask[], timezone: string): DashboardTask[] {
  return tasks.map((task) => ({
    title: task.title,
    date: toLocalDateString(new Date(task.dueAt), timezone),
    dueAt: task.dueAt,
    status: task.status
  }));
}

function priority(task: DashboardTask, today: string) {
  if (task.status === "done") {
    return 3;
  }

  if (compareDateOnly(task.date, today) < 0) {
    return 0;
  }

  if (task.date === today) {
    return 1;
  }

  return 2;
}

export function buildDashboardTasks({
  recurringTasks,
  adHocTasks,
  now,
  timezone
}: BuildDashboardTasksInput): DashboardTask[] {
  const today = toLocalDateString(now, timezone);
  const datedTasks = [
    ...normalizeAdHocTasks(adHocTasks, timezone),
    ...expandRecurringTasks(recurringTasks, now)
  ];

  return datedTasks.sort((left, right) => {
    const priorityDiff = priority(left, today) - priority(right, today);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    const dateDiff = compareDateOnly(left.date, right.date);

    if (dateDiff !== 0) {
      return dateDiff;
    }

    return left.title.localeCompare(right.title);
  });
}
