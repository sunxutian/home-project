# Closter House Dashboard Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shared household web app for 130 Durie Ave with a task-first dashboard, west-side Closter trash and recycling schedule, house details, records, contacts, and simple household-member assignment.

**Architecture:** Build a Next.js App Router application with server-rendered pages and server actions for CRUD flows. Use Prisma with SQLite for local persistence in v1, seed the house profile plus Closter west-side municipal schedule data, and keep authentication intentionally simple with a single credentials-based household login.

**Tech Stack:** Next.js, TypeScript, React, Prisma, SQLite, NextAuth, Zod, Vitest, Testing Library, Playwright, Tailwind CSS

---

## File Structure

Planned file ownership and responsibilities:

- Create: `package.json` for app scripts and dependencies
- Create: `tsconfig.json` for TypeScript configuration
- Create: `next.config.ts` for Next.js configuration
- Create: `postcss.config.js` for Tailwind/PostCSS integration
- Create: `prisma/schema.prisma` for database schema
- Create: `prisma/seed.ts` for property, household members, and municipal schedule seed data
- Create: `src/auth.ts` for shared NextAuth configuration
- Create: `src/lib/db.ts` for Prisma client singleton
- Create: `src/lib/env.ts` for environment validation
- Create: `src/lib/tasks/schedule.ts` for recurring and municipal task expansion
- Create: `src/lib/tasks/sorting.ts` for dashboard ordering logic
- Create: `src/lib/closter/west-side-2026.ts` for the published 2026 pickup dataset
- Create: `src/app/layout.tsx` for app shell
- Create: `src/app/page.tsx` for the dashboard home screen
- Create: `src/app/tasks/page.tsx` for the task list page
- Create: `src/app/house/page.tsx` for the house details page
- Create: `src/app/records/page.tsx` for records and contacts page
- Create: `src/app/settings/page.tsx` for household member CRUD
- Create: `src/app/login/page.tsx` for shared-login UI
- Create: `src/app/actions/tasks.ts` for task mutations
- Create: `src/app/actions/house.ts` for house mutations
- Create: `src/app/actions/records.ts` for record/contact mutations
- Create: `src/app/actions/settings.ts` for household-member mutations
- Create: `src/components/navigation.tsx` for top-level app navigation
- Create: `src/components/dashboard/upcoming-list.tsx` for home screen task sections
- Create: `src/components/dashboard/house-snapshot.tsx` for the home snapshot card
- Create: `src/components/tasks/task-form.tsx` for create/edit task UI
- Create: `src/components/records/record-form.tsx` for create/edit record UI
- Create: `src/components/records/contact-form.tsx` for create/edit contact UI
- Create: `src/components/settings/member-form.tsx` for household-member CRUD UI
- Create: `src/styles/globals.css` for Tailwind base styles and dashboard theme variables
- Create: `vitest.config.ts` for unit/component test configuration
- Create: `playwright.config.ts` for end-to-end test configuration
- Create: `tests/unit/tasks/schedule.test.ts` for recurrence and municipal expansion tests
- Create: `tests/unit/tasks/sorting.test.ts` for dashboard ordering tests
- Create: `tests/integration/actions/tasks.test.ts` for task action tests
- Create: `tests/e2e/dashboard.spec.ts` for end-to-end task-first dashboard flows
- Create: `.env.example` for required environment variables
- Create: `README.md` for local setup and app usage

### Task 1: Initialize the application skeleton

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/styles/globals.css`
- Create: `.env.example`
- Create: `README.md`

- [ ] **Step 1: Write the failing smoke test for the root dashboard page**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders dashboard heading", async () => {
  render(await HomePage());
  expect(screen.getByRole("heading", { name: /house dashboard/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/app/home.test.tsx`
Expected: FAIL because the app files and test configuration do not exist yet.

- [ ] **Step 3: Create the Next.js/Tailwind project files with a minimal dashboard shell**

```tsx
export default function HomePage() {
  return <h1>House Dashboard</h1>;
}
```

- [ ] **Step 4: Run the smoke test again**

Run: `pnpm vitest tests/unit/app/home.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: initialize closter house dashboard app"
```

### Task 2: Define the database schema and seed baseline house data

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `src/lib/db.ts`
- Create: `src/lib/env.ts`
- Modify: `package.json`
- Test: `tests/unit/data/seed-shape.test.ts`

- [ ] **Step 1: Write a failing schema-oriented test for seed data shape**

```ts
import { closterWestSideSchedule2026 } from "@/lib/closter/west-side-2026";

test("contains west-side garbage and recycling schedule entries", () => {
  expect(closterWestSideSchedule2026.some((item) => item.stream === "garbage")).toBe(true);
  expect(closterWestSideSchedule2026.some((item) => item.stream === "recycling")).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/data/seed-shape.test.ts`
Expected: FAIL because the municipal dataset and data layer do not exist.

- [ ] **Step 3: Create the Prisma schema and seed script**

```prisma
model HouseholdMember {
  id        String   @id @default(cuid())
  name      String
  active    Boolean  @default(true)
  color     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}
```

- [ ] **Step 4: Add the initial property record and shared-login seed configuration**

```ts
await prisma.house.upsert({
  where: { slug: "130-durie-ave" },
  update: {},
  create: {
    slug: "130-durie-ave",
    addressLine1: "130 Durie Ave",
    city: "Closter",
    state: "NJ",
    postalCode: "07624",
  },
});
```

- [ ] **Step 5: Run Prisma generation and the seed-shape test**

Run: `pnpm prisma generate`
Expected: PASS

Run: `pnpm vitest tests/unit/data/seed-shape.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add prisma package.json src/lib .env.example tests/unit/data/seed-shape.test.ts
git commit -m "feat: add data schema and baseline seed"
```

### Task 3: Encode the Closter west-side 2026 municipal schedule

**Files:**
- Create: `src/lib/closter/west-side-2026.ts`
- Create: `docs/references/closter-2026-dpw-schedule.md`
- Test: `tests/unit/tasks/schedule.test.ts`

- [ ] **Step 1: Write a failing test for west-side recurring pickup expansion**

```ts
import { buildUpcomingPickupTasks } from "@/lib/tasks/schedule";

test("builds west-side garbage for Tuesdays and Fridays", () => {
  const result = buildUpcomingPickupTasks(new Date("2026-03-01T12:00:00-05:00"));
  expect(result.some((task) => task.title === "Take out garbage" && task.dueDate === "2026-03-03")).toBe(true);
  expect(result.some((task) => task.title === "Take out garbage" && task.dueDate === "2026-03-06")).toBe(true);
});

test("honors published holiday exceptions from the borough calendar", () => {
  const result = buildUpcomingPickupTasks(new Date("2026-01-01T12:00:00-05:00"));
  expect(result.some((task) => task.stream === "garbage" && task.date === "2026-01-02")).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/tasks/schedule.test.ts`
Expected: FAIL because schedule expansion and holiday exceptions are not implemented.

- [ ] **Step 3: Extract the published west-side 2026 rules into a checked-in reference file**

```md
# Closter DPW 2026 West Side Schedule Notes

- Source PDF: 2026-DPW-Recycling---Trash-Schedule.pdf
- Baseline garbage: Tuesdays and Fridays
- Baseline recycling: Wednesdays
- Curb deadline: 6:00 a.m.
- Holiday overrides: list each west-side date exception explicitly from the published calendar
```

- [ ] **Step 4: Add the full west-side 2026 dataset and expansion helper**

```ts
export const closterWestSideSchedule2026 = {
  timezone: "America/New_York",
  curbTime: "06:00",
  baseline: {
    garbage: ["tuesday", "friday"],
    recycling: ["wednesday"],
  },
  exceptions: [
    { originalDate: "2026-01-01", observedDate: "2026-01-02", stream: "garbage" },
  ],
};
```

- [ ] **Step 5: Run the schedule tests**

Run: `pnpm vitest tests/unit/tasks/schedule.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add docs/references/closter-2026-dpw-schedule.md src/lib/closter src/lib/tasks tests/unit/tasks/schedule.test.ts
git commit -m "feat: add closter west-side pickup schedule"
```

### Task 4: Implement dashboard task ordering and display-state logic

**Files:**
- Create: `src/lib/tasks/sorting.ts`
- Modify: `src/lib/tasks/schedule.ts`
- Modify: `src/app/page.tsx`
- Test: `tests/unit/tasks/sorting.test.ts`

- [ ] **Step 1: Write a failing test for America/New_York occurrence expansion and dashboard ordering**

```ts
import { buildDashboardTasks } from "@/lib/tasks/sorting";

test("expands recurring tasks in America/New_York and orders overdue before today before upcoming", () => {
  const sorted = buildDashboardTasks({
    recurringTasks: [{ title: "Take out garbage", scheduleKey: "closter-west-2026-garbage", status: "open" }],
    adHocTasks: [{ title: "Replace filter", dueAt: "2026-03-21T10:00:00-04:00", status: "open" }],
    now: new Date("2026-03-22T09:00:00-04:00"),
    timezone: "America/New_York",
  });

  expect(sorted.map((item) => item.title)).toContain("Replace filter");
  expect(sorted.some((item) => item.title === "Take out garbage" && item.date === "2026-03-24")).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/unit/tasks/sorting.test.ts`
Expected: FAIL because occurrence expansion, timezone handling, and sorting are not implemented.

- [ ] **Step 3: Implement occurrence expansion and dashboard sort helpers**

```ts
const datedTasks = expandRecurringTasksInTimezone(tasks, "America/New_York", now);
return sortDashboardTasks(datedTasks, now, "America/New_York");
```

- [ ] **Step 4: Connect the home page loader to the dated dashboard task builder**

```ts
const dashboardTasks = await buildDashboardTasksFromStore({ now: new Date(), timezone: "America/New_York" });
```

- [ ] **Step 5: Run sorting and schedule tests**

Run: `pnpm vitest tests/unit/tasks/sorting.test.ts tests/unit/tasks/schedule.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/tasks src/app/page.tsx tests/unit/tasks/sorting.test.ts
git commit -m "feat: add dashboard task ordering"
```

### Task 5: Add shared authentication and route protection

**Files:**
- Create: `src/auth.ts`
- Create: `src/app/login/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `.env.example`
- Test: `tests/integration/auth/login.test.ts`

- [ ] **Step 1: Write a failing test for shared-login access control**

```ts
test("redirects unauthenticated users to login", async () => {
  const response = await loadDashboardWithoutSession();
  expect(response.status).toBe(302);
  expect(response.headers.get("location")).toContain("/login");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/auth/login.test.ts`
Expected: FAIL because auth is not configured.

- [ ] **Step 3: Implement a single-household credentials flow**

```ts
Credentials({
  name: "Household Login",
  credentials: {
    password: { label: "Password", type: "password" },
  },
});
```

- [ ] **Step 4: Run auth integration tests**

Run: `pnpm vitest tests/integration/auth/login.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/auth.ts src/app/login .env.example tests/integration/auth/login.test.ts
git commit -m "feat: add shared household login"
```

### Task 6: Build task CRUD, household-member assignment, and recurring-occurrence completion

**Files:**
- Create: `src/app/actions/tasks.ts`
- Create: `src/components/tasks/task-form.tsx`
- Create: `src/app/tasks/page.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/integration/actions/tasks.test.ts`

- [ ] **Step 1: Write a failing test for creating an assigned recurring task and completing one occurrence**

```ts
test("creates an assigned recurring task and marks only one occurrence done", async () => {
  const member = await createMember({ name: "Avery" });
  const created = await createTask({
    title: "Take out garbage",
    category: "municipal",
    dueDate: "2026-03-03",
    notes: "Published by Closter DPW for west side pickup",
    recurrence: "municipal",
    assigneeId: member.id,
    sourceMetadata: { source: "closter-dpw-2026-pdf", side: "west" },
  });
  const completed = await completeOccurrence(created.id, "2026-03-03");
  expect(created.assigneeId).toBe(member.id);
  expect(created.category).toBe("municipal");
  expect(completed.status).toBe("done");
  expect(await findOccurrence(created.id, "2026-03-06")).toMatchObject({ status: "open" });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/actions/tasks.test.ts`
Expected: FAIL because task actions do not exist.

- [ ] **Step 3: Implement task actions and form UI with assignee selection from active household members**

```ts
export async function createTask(input: CreateTaskInput) {
  return prisma.task.create({ data: input });
}
```

The task form must explicitly support:

- Title
- Category
- Due date
- Notes
- Assignee from active household members
- Recurrence settings
- Source metadata for municipal imports when applicable

- [ ] **Step 4: Run task integration tests**

Run: `pnpm vitest tests/integration/actions/tasks.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/actions/tasks.ts src/components/tasks src/app/tasks src/app/page.tsx tests/integration/actions/tasks.test.ts
git commit -m "feat: add task management flows"
```

### Task 7: Build the dashboard home screen

**Files:**
- Create: `src/components/navigation.tsx`
- Create: `src/components/dashboard/upcoming-list.tsx`
- Create: `src/components/dashboard/today-list.tsx`
- Create: `src/components/dashboard/quick-add.tsx`
- Create: `src/components/dashboard/house-snapshot.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/e2e/dashboard.spec.ts`

- [ ] **Step 1: Write a failing end-to-end test for the task-first home screen**

```ts
test("shows next upcoming west-side pickup tasks on the home screen", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Take out garbage")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Today" })).toBeVisible();
  await expect(page.getByRole("button", { name: /quick add/i })).toBeVisible();
  await expect(page.getByText("House Snapshot")).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm playwright test tests/e2e/dashboard.spec.ts`
Expected: FAIL because the dashboard UI is incomplete.

- [ ] **Step 3: Implement the dashboard sections and navigation**

```tsx
<section>
  <h2>Next Up</h2>
  <UpcomingList tasks={tasks.nextUp} />
</section>

<section>
  <h2>Today</h2>
  <TodayList tasks={tasks.today} />
</section>

<QuickAdd />
```

- [ ] **Step 4: Run the end-to-end dashboard test**

Run: `pnpm playwright test tests/e2e/dashboard.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/navigation.tsx src/components/dashboard src/app/layout.tsx src/app/page.tsx tests/e2e/dashboard.spec.ts
git commit -m "feat: build dashboard home screen"
```

### Task 8: Build the House page and editable property details

**Files:**
- Create: `src/app/actions/house.ts`
- Create: `src/app/house/page.tsx`
- Test: `tests/integration/actions/house.test.ts`

- [ ] **Step 1: Write a failing test for updating house details**

```ts
test("updates house systems, appliances, warranty details, and service notes", async () => {
  const updated = await updateHouseDetails({
    systems: "Boiler, sump pump, central air",
    appliances: "Washer, dryer, refrigerator",
    warrantyDetails: "Boiler warranty active through 2028",
    serviceNotes: "Boiler serviced in March 2026",
  });
  expect(updated.serviceNotes).toContain("March 2026");
  expect(updated.systems).toContain("Boiler");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/actions/house.test.ts`
Expected: FAIL because house actions do not exist.

- [ ] **Step 3: Implement the house page and mutation flow**

```ts
export async function updateHouseDetails(input: UpdateHouseInput) {
  return prisma.house.update({ where: { slug: "130-durie-ave" }, data: input });
}
```

The house page must support editing:

- Address fields
- Home systems
- Appliances
- Warranty details
- Service notes

- [ ] **Step 4: Run the house integration test**

Run: `pnpm vitest tests/integration/actions/house.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/actions/house.ts src/app/house tests/integration/actions/house.test.ts
git commit -m "feat: add house details management"
```

### Task 9: Build the Records page with records and contacts

**Files:**
- Create: `src/app/actions/records.ts`
- Create: `src/app/records/page.tsx`
- Create: `src/components/records/record-form.tsx`
- Create: `src/components/records/contact-form.tsx`
- Test: `tests/integration/actions/records.test.ts`

- [ ] **Step 1: Write a failing test for records and contacts CRUD**

```ts
test("creates a vendor contact linked to a utility record", async () => {
  const record = await createRecord({
    title: "PSE&G",
    type: "utility",
    date: "2026-03-01",
    provider: "PSE&G",
    notes: "Monthly electric bill",
    fileUrl: "https://example.com/pseg-march.pdf",
  });
  const contact = await createContact({
    name: "PSE&G Support",
    type: "utility",
    phone: "800-436-7734",
    email: "support@pseg.example",
    notes: "Use for outage and billing issues",
    linkedRecordId: record.id,
  });
  expect(contact.linkedRecordId).toBe(record.id);
  expect(contact.phone).toContain("800");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/actions/records.test.ts`
Expected: FAIL because records actions do not exist.

- [ ] **Step 3: Implement the records page, record form, and contact form**

```ts
export async function createContact(input: CreateContactInput) {
  return prisma.contact.create({ data: input });
}
```

The records and contacts forms must explicitly support:

- Record title, type, date, provider/source, notes, and optional file or link
- Contact name, type, phone, email, notes, and optional linked record

- [ ] **Step 4: Run the records integration test**

Run: `pnpm vitest tests/integration/actions/records.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/actions/records.ts src/app/records src/components/records tests/integration/actions/records.test.ts
git commit -m "feat: add records and contacts management"
```

### Task 10: Build household-member settings CRUD

**Files:**
- Create: `src/app/actions/settings.ts`
- Create: `src/app/settings/page.tsx`
- Create: `src/components/settings/member-form.tsx`
- Test: `tests/integration/actions/settings.test.ts`

- [ ] **Step 1: Write a failing test for member add/rename/deactivate**

```ts
test("adds, renames, and deactivates a household member without deleting tasks", async () => {
  const member = await createMember({ name: "Alex" });
  const renamed = await renameMember(member.id, "Avery");
  expect(renamed.name).toBe("Avery");
  await deactivateMember(member.id);
  expect((await getMember(member.id)).active).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest tests/integration/actions/settings.test.ts`
Expected: FAIL because member settings actions do not exist.

- [ ] **Step 3: Implement the settings page and member CRUD**

```ts
export async function renameMember(id: string, name: string) {
  return prisma.householdMember.update({ where: { id }, data: { name } });
}

export async function deactivateMember(id: string) {
  return prisma.householdMember.update({ where: { id }, data: { active: false } });
}
```

- [ ] **Step 4: Run the settings integration test**

Run: `pnpm vitest tests/integration/actions/settings.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/actions/settings.ts src/app/settings src/components/settings tests/integration/actions/settings.test.ts
git commit -m "feat: add household member settings"
```

### Task 11: Verification and polish

**Files:**
- Modify: `README.md`
- Modify: `tests/e2e/dashboard.spec.ts`
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Run the full unit and integration test suite**

Run: `pnpm vitest`
Expected: PASS

- [ ] **Step 2: Run the end-to-end suite**

Run: `pnpm playwright test`
Expected: PASS

- [ ] **Step 3: Run production validation**

Run: `pnpm build`
Expected: PASS with a production-ready Next.js build

- [ ] **Step 4: Update setup instructions and seed usage in the README**

```md
pnpm install
pnpm prisma db push
pnpm prisma db seed
pnpm dev
```

- [ ] **Step 5: Commit**

```bash
git add README.md src/styles/globals.css tests/e2e/dashboard.spec.ts
git commit -m "docs: finalize setup and verification notes"
```
