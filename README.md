# Soccer Trainer Directory + Map (MVP v1)

A production-ready MVP for discovering soccer trainers and training centers in the USA. Built with Next.js (App Router), Tailwind, Prisma, and Supabase-ready auth.

## Features
- Public landing + results (map + list, clustered pins).
- ZIP distance using straight-line Haversine formula and local ZIP centroid data.
- City/state and region filtering (no paid geocoding).
- Trainer and training center profiles with privacy-first contact links.
- Trainer/Center dashboard scaffolding for locations + availability.
- Admin console scaffold (reports, analytics, lookup tables).
- Modular adapters for future payments, booking, messaging, routing.

## Tech Stack
- **Frontend**: Next.js App Router + TypeScript + Tailwind CSS
- **Database/Auth**: Supabase Postgres + Auth (free tier)
- **ORM**: Prisma
- **Maps**: Leaflet + OpenStreetMap tiles
- **Validation**: Zod
- **Testing**: Vitest

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Create a `.env` file:
```bash
cp .env.example .env
```

Update values to match your Supabase project. The app will fall back to demo data if `DATABASE_URL` is missing.

### 3) Set up Prisma + database
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 4) Run the app
```bash
npm run dev
```

Visit `http://localhost:3000`.

## Supabase Setup
- Create a new Supabase project (free tier).
- Use the Postgres connection string for `DATABASE_URL`.
- Configure email auth or magic link in Supabase Auth settings.
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env`.

## ZIP Distance Dataset
For MVP, a minimal ZIP centroid dataset is seeded. To expand:
1. Download a public ZIP centroid dataset (CSV with `zip,lat,lng,city,state`).
2. Import into the `ZipCentroid` table using the helper script:
   ```bash
   npx tsx scripts/import-zip-centroids.ts path/to/zip_centroids.csv
   ```
3. Ensure fields: `zip`, `lat`, `lng`, `city`, `state`.

## Map Tiles
The MVP uses OpenStreetMap tiles:
- **Low traffic** only (free to run).
- For higher usage, swap in another tile provider by editing `adapters/map-provider.ts`.

## Folder Structure
```
/app
/components
/lib
/domain
/services
/adapters
/prisma
/tests
```

## Testing
```bash
npm test
```

## Future Expandability
- **Payments**: `services/booking.ts`
- **Routing (driving distance)**: `adapters/routing-provider.ts`
- **Messaging**: `adapters/messaging-provider.ts`
- **Verification/reviews**: Prisma model stubs included.

## Notes
- No paid APIs are used in MVP v1.
- Driving distance is intentionally excluded; only straight-line distance is shown.
- Public contact fields are optional to protect privacy.
