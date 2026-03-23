import { closterWestSideSchedule2026 } from "@/lib/closter/west-side-2026";

test("contains west-side garbage and recycling schedule entries", () => {
  expect(
    closterWestSideSchedule2026.some((item) => item.stream === "garbage")
  ).toBe(true);
  expect(
    closterWestSideSchedule2026.some((item) => item.stream === "recycling")
  ).toBe(true);
});
