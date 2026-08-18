# Vehicle Fleet Management System
### (Instructor reference — core platform, Phase 1)

A working MERN application built on a reusable **core** (auth, RBAC, generic
CRUD engine, notifications, audit log). Follows the same platform pattern as
the Library, Hotel Booking, and Restaurant reference projects — a domain
module (`fleet`: vehicles, drivers, trips, maintenance records) plugs into
this core without touching anything under `core/`.

> **Status:** Phase 1 (this commit) ships the core platform only — auth,
> RBAC, the generic CRUD engine, audit log, notifications, and a working
> (empty) dashboard shell. The `fleet` domain module (Vehicles, Drivers,
> Trips, Maintenance Records) lands in Phase 2.

## Prerequisites
- Node.js 18+
- MongoDB running locally (or an Atlas connection string)

## 1. Server setup
```
cd server
npm install
cp .env.example .env      # then edit .env with your Mongo URI + JWT secret
npm run dev                 # starts the API on http://localhost:5000
```
There's no seed data yet — register your first user via:
```
POST http://localhost:5000/api/auth/register
{ "name": "Admin", "email": "admin@demo.com", "password": "password123", "role": "admin" }
```
Valid roles right now: `admin`, `dispatcher`, `driver` (see `server/config/project.config.js`).

## 2. Client setup
```
cd client
npm install
npm run dev                 # starts the React app on http://localhost:5173
```

## 3. Log in
Open http://localhost:5173 and sign in with the account you registered above.
You'll land on an empty dashboard with a working sidebar, profile page, and
(if admin) an audit log — no fleet data yet, since the `fleet` module isn't
built in this commit.

## Project layout
```
server/
  core/           - auth, RBAC, generic CRUD engine, audit log, notifications (untouched by modules)
  config/         - project.config.js: app name, roles, enabled modules
  models/         - User model
  modules/        - module registry (empty until fleet lands)
client/
  src/core/       - auth context/pages, generic CRUD-driven EntityList/EntityForm, layout
  src/components/ - shadcn/ui primitives + the app's Sidebar
```

## What's next (Phase 2)
Add the `fleet` module:
- `server/modules/fleet/` — Vehicle, Driver, Trip, MaintenanceRecord schemas + routes, wired into `server/modules/index.js`
  - Vehicles, Drivers, Maintenance Records: plain CRUD via the generic engine
  - Trips: custom routes (like Bookings/Orders in the other reference projects) — assigning a vehicle + driver, validating vehicle availability, and status changes (e.g. "completed"/"cancelled") freeing the vehicle back up
- `client/src/modules/fleet/ui/` — list/form pages for each entity, reusing `EntityList`/`EntityForm`, plus a custom trip-assignment page
- A seed script with demo vehicles, drivers, and admin/dispatcher/driver accounts

This mirrors exactly how `docs/adding-a-module.md` in the Library reference
project describes adding a new module — nothing under `core/` needs to change.
