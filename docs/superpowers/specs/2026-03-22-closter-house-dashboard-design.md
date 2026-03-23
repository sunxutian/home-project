# Closter House Dashboard Design

Date: 2026-03-22
Property: 130 Durie Ave, Closter, NJ 07624

## Goal

Build a shared household web app that acts as the operational dashboard for the home. The app should give the household one place to manage upcoming house-related tasks, reference important property information, and keep records such as bills, documents, and service contacts.

The day-one focus is an upcoming-tasks home screen, starting with trash and recycling schedule management.

For 2026, trash and recycling schedule data should be sourced from the published Closter Department of Public Works PDF calendar. The property is on the west side.

## Product Scope

This is a shared dashboard for the household, not a portal for outside users. Version 1 uses one shared login for the home rather than separate user accounts.

The product should feel like a practical, mobile-friendly web app that anyone in the household can open in a browser on phone or desktop.

Although authentication is shared, task assignment should use a fixed household member list maintained inside the app. Assignment is not tied to separate user accounts in v1.

## Recommended Approach

The recommended direction is a lightweight dashboard:

- A task-first home screen
- Shared login
- Persistent saved data
- Secondary sections for house information, records, and contacts
- Seeded recurring tasks so the app is useful immediately

Alternative approaches considered:

- Calendar-first planner: stronger scheduling emphasis, weaker as a house operations hub
- Property binder first: stronger long-term documentation system, but less useful for day-to-day household operations in v1

## Information Architecture

Version 1 navigation:

- Home
- Tasks
- House
- Records

### Home

The home screen prioritizes upcoming items. It should surface:

- Next up: the next few upcoming tasks
- Today: anything currently due
- Quick add: create a new task
- House snapshot: address and a few important household references

The home screen is intentionally centered on action, not reporting.

Home screen ordering rules for v1:

- Overdue open tasks appear first
- Then tasks due today
- Then future upcoming tasks sorted by due date ascending
- Recurring tasks must be expanded into dated upcoming instances before rendering
- All date calculations should use the America/New_York timezone

### Tasks

The Tasks section is the full list and management view for household work. It should support:

- One-time tasks
- Recurring tasks
- Status tracking using open/done only
- Category tagging
- Due dates
- Assignment to a fixed household member list
- Notes

Initial seeded recurring tasks will include trash and recycling.

Household members should be managed through a simple settings CRUD screen inside the app. The shared login can add, rename, and deactivate household members used for assignment.

### House

The House section stores semi-static property information, including:

- Address
- Home systems
- Appliances
- Warranty details
- Service notes

This section should become the reference page for the home itself.

### Records

The Records section stores household operational records, including:

- Documents
- Bills and utility information
- Vendor and service contacts

The v1 goal is structured storage and retrieval, not document intelligence or workflow automation.

Minimum record fields:

- Title
- Type
- Date
- Provider or source
- Notes
- Optional file or link reference

Contacts are a separate simple list in v1, not only embedded inside records.
Contacts should live inside the Records section in v1 rather than as a top-level navigation item.

## Core Data Model

V1 entities:

- Tasks
- House details
- Records
- Contacts
- Household members

### Task model

Each task should include:

- Title
- Category
- Due date
- Status
- Notes (optional)
- Household member assignee (optional)
- Recurrence settings for recurring tasks
- Source metadata when generated from a municipal schedule

Trash and recycling should be represented as recurring tasks, not static informational content. That allows the dashboard to always compute and display the next actionable household items.

V1 task statuses:

- Open
- Done

Overdue, today, and upcoming are computed display states based on due date and timezone rather than stored statuses.

### Household member model

Each household member should include:

- Display name
- Optional color marker for UI use
- Active/inactive status

### Record model

Each record should include:

- Title
- Type
- Date
- Provider or source
- Notes (optional)
- Optional file path or external link

### Contact model

Each contact should include:

- Name
- Type
- Phone
- Email
- Notes
- Optional linked record

## User Experience Principles

- Mobile-friendly first, but fully usable on desktop
- Household members should understand the next action immediately on load
- Empty states should guide setup and data entry
- Seed data should prevent the app from feeling blank on first run
- V1 should avoid low-value complexity

## Technical Shape

Recommended implementation shape:

- React-based web app framework
- Relational database for structured household data
- Simple authentication model with one shared household login
- Seed script that creates the property record and recurring starter tasks

Municipal schedule behavior for v1:

- Use the Closter 2026 published PDF as the source of truth for west side pickup behavior
- Seed west side garbage for Tuesdays and Fridays
- Seed west side recycling for Wednesdays
- Store the curb deadline context as 6:00 a.m. on pickup day
- Keep holiday exceptions data-driven so the borough calendar can override baseline weekday rules
- Completing a recurring pickup task marks only that dated occurrence complete; future occurrences continue to follow the published schedule

This technical shape supports a clean progression from a simple household dashboard to a more complete home management system without overbuilding v1.

## Non-Goals For V1

Do not include the following in the first release:

- Separate user accounts per household member
- SMS or push reminder automation
- OCR or document extraction
- Vendor portals or complex contractor workflows
- Advanced analytics

## Error Handling

V1 error handling should stay practical:

- Form validation for missing or invalid input
- Clear save failure messaging
- Empty states for sections with no data
- Predictable handling for recurring task generation and status updates

## Testing Strategy

V1 testing should focus on:

- Recurring task generation behavior
- Correct sorting and display of upcoming tasks on the dashboard
- Basic create/update flows for tasks
- Basic create/update flows for house records
- Assignment using the fixed household member list
- Correct west side trash and recycling generation from borough schedule data

## Success Criteria

The project is successful when:

- The household can log in with one shared account
- The home screen clearly shows upcoming items
- Trash and recycling appear as recurring actionable tasks
- The household can store and retrieve house details, records, and contacts
- The app is usable on both desktop and mobile browsers
