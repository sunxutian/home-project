# Closter House Dashboard

Shared household dashboard for `130 Durie Ave, Closter, NJ 07624`.

## Current Scope

- Task-first home screen
- Closter west-side trash and recycling schedule seed data
- House reference page
- Records and contacts page
- Household members settings page

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

3. Generate Prisma client:

```bash
XDG_CACHE_HOME=/tmp npm run prisma:generate
```

4. Create the local SQLite database schema:

```bash
XDG_CACHE_HOME=/tmp npm run prisma:push
```

5. Seed the dashboard data:

```bash
node --import tsx prisma/seed.ts
```

6. Start the app:

```bash
npm run dev
```

7. Sign in at `/login` with the shared password from `.env`.

## Verification

```bash
npm test
npm run build
```
