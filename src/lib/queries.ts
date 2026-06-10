import { db } from "@/lib/db";
import { buildDashboardTasks } from "@/lib/tasks/sorting";

const HOUSE_SLUG = "130-durie-ave";
const DASHBOARD_NOW = new Date("2026-03-22T09:00:00-04:00");
const DASHBOARD_TIMEZONE = "America/New_York";

export async function getDashboardView() {
  const house = await db.house.findUnique({
    where: { slug: HOUSE_SLUG },
    include: {
      tasks: {
        include: {
          assignee: true,
          occurrences: true
        },
        orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }]
      }
    }
  });

  if (!house) {
    return null;
  }

  const recurringTasks = house.tasks
    .filter((task) => Boolean(task.scheduleKey))
    .map((task) => ({
      title: task.title,
      scheduleKey: task.scheduleKey ?? "",
      status: task.status.toLowerCase() as "open" | "done"
    }));

  const adHocTasks = house.tasks
    .filter((task) => !task.scheduleKey && task.dueAt)
    .map((task) => ({
      title: task.title,
      dueAt: task.dueAt?.toISOString() ?? "",
      status: task.status.toLowerCase() as "open" | "done"
    }));

  const datedTasks = buildDashboardTasks({
    recurringTasks,
    adHocTasks,
    now: DASHBOARD_NOW,
    timezone: DASHBOARD_TIMEZONE
  });

  const today = "2026-03-22";

  return {
    addressLine1: house.addressLine1,
    city: house.city,
    state: house.state,
    postalCode: house.postalCode,
    today: datedTasks.filter((task) => task.date === today),
    nextUp: datedTasks.filter((task) => task.date !== today).slice(0, 4)
  };
}

export async function getTasksView() {
  const [tasks, members] = await Promise.all([
    db.task.findMany({
      where: {
        house: {
          slug: HOUSE_SLUG
        }
      },
      include: {
        assignee: true
      },
      orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }]
    }),
    db.householdMember.findMany({
      orderBy: { createdAt: "asc" }
    })
  ]);

  return {
    tasks,
    members
  };
}

export async function getHouseView() {
  return db.house.findUnique({
    where: { slug: HOUSE_SLUG }
  });
}

export async function getRecordsView() {
  return db.house.findUnique({
    where: { slug: HOUSE_SLUG },
    include: {
      records: {
        orderBy: { createdAt: "asc" }
      },
      contacts: {
        orderBy: { createdAt: "asc" }
      }
    }
  });
}

export async function getSettingsView() {
  return db.householdMember.findMany({
    orderBy: { createdAt: "asc" }
  });
}
