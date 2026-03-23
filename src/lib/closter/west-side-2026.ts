export type MunicipalStream = "garbage" | "recycling";

export type MunicipalScheduleEntry = {
  date: string;
  stream: MunicipalStream;
  side: "west";
  curbTime: "06:00";
  source: "closter-dpw-2026-pdf";
};

export const closterWestSideSchedule2026: MunicipalScheduleEntry[] = [
  {
    date: "2026-01-02",
    stream: "garbage",
    side: "west",
    curbTime: "06:00",
    source: "closter-dpw-2026-pdf"
  },
  {
    date: "2026-01-07",
    stream: "recycling",
    side: "west",
    curbTime: "06:00",
    source: "closter-dpw-2026-pdf"
  },
  {
    date: "2026-03-03",
    stream: "garbage",
    side: "west",
    curbTime: "06:00",
    source: "closter-dpw-2026-pdf"
  },
  {
    date: "2026-03-04",
    stream: "recycling",
    side: "west",
    curbTime: "06:00",
    source: "closter-dpw-2026-pdf"
  },
  {
    date: "2026-03-06",
    stream: "garbage",
    side: "west",
    curbTime: "06:00",
    source: "closter-dpw-2026-pdf"
  },
  {
    date: "2026-03-24",
    stream: "garbage",
    side: "west",
    curbTime: "06:00",
    source: "closter-dpw-2026-pdf"
  }
];

export const closterWestSideScheduleMeta2026 = {
  timezone: "America/New_York",
  curbTime: "06:00",
  baseline: {
    garbage: ["tuesday", "friday"],
    recycling: ["wednesday"]
  }
} as const;
