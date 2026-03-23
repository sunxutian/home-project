import {
  closterWestSideSchedule2026,
  type MunicipalStream
} from "@/lib/closter/west-side-2026";

export type PickupTask = {
  title: string;
  stream: MunicipalStream;
  date: string;
  dueAt: string;
  status: "open" | "done";
  scheduleKey: string;
};

function toDueAt(date: string, curbTime: string) {
  return `${date}T${curbTime}:00-05:00`;
}

export function buildUpcomingPickupTasks(now: Date): PickupTask[] {
  const pivot = now.toISOString().slice(0, 10);

  return closterWestSideSchedule2026
    .filter((entry) => entry.date >= pivot)
    .map((entry) => ({
      title:
        entry.stream === "garbage" ? "Take out garbage" : "Take out recycling",
      stream: entry.stream,
      date: entry.date,
      dueAt: toDueAt(entry.date, entry.curbTime),
      status: "open" as const,
      scheduleKey: `closter-west-2026-${entry.stream}`
    }));
}
