# Vehicle Fleet Management System
### (Instructor reference — Phase 2: fleet module complete)

A working MERN application built on a reusable **core** (auth, RBAC, generic
CRUD engine, notifications, audit log) plus a **fleet** domain module
(Vehicles, Drivers, Trips, Maintenance Records). Follows the same platform
pattern as the Library, Hotel Booking, and Restaurant reference projects.

## Prerequisites
- Node.js 18+
- MongoDB running locally (or an Atlas connection string)

## 1. Server setup
```
cd server
npm install
cp .env.example .env      # then edit .env with your Mongo URI + JWT secret
npm run seed                # creates demo admin/dispatcher/driver accounts + sample vehicles/drivers
npm run dev                 # starts the API on http://localhost:5000
```

## 2. Client setup
```
cd client
npm install
npm run dev                 # starts the React app on http://localhost:5173
```

## 3. Log in
Open http://localhost:5173 and sign in with one of the seeded demo accounts:

| Role | Email | Password |
|---|---|---|
| Admin | admin@demo.com | password123 |
| Dispatcher | dispatcher@demo.com | password123 |
| Driver | driver@demo.com | password123 |

## What to try
- Log in as **dispatcher**: add/edit Vehicles and Drivers, assign a Trip
  (pick an available vehicle + a driver, set origin/destination/date — the
  vehicle is marked `on-trip` immediately), then open the trip again to
  move it `scheduled` → `in-progress` → `completed`. Completing or
  cancelling a trip frees the vehicle back up to `available`. Log a
  Maintenance Record against a vehicle.
- Log in as **driver** (the seeded `driver@demo.com` account's email
  matches the "Demo Driver" driver record, so trips assigned to that
  driver record show up automatically): browse Vehicles read-only, and
  once dispatcher assigns you a trip, go to **My Trips** and advance it
  yourself with "Start Trip" / "Complete Trip".
- Log in as **admin**: everything above, plus the Audit Log, plus the only
  role that can delete a trip outright.

## Project layout
```
server/
  core/            - auth, RBAC, generic CRUD engine, audit log, notifications (module-agnostic)
  config/          - project.config.js: app name, roles, enabled modules
  models/          - User model
  modules/
    index.js       - module registry (mounts fleet's routes + nav)
    fleet/          - Vehicle/Driver/MaintenanceRecord (generic CRUD) + Trip (custom: assignment, availability check, driver login link, vehicle status sync)
  seed/             - demo accounts + sample vehicles/drivers
client/
  src/core/         - auth context/pages, generic CRUD-driven EntityList/EntityForm, layout
  src/components/   - shadcn/ui primitives + the app's Sidebar
  src/modules/
    fleet/ui/         - Vehicle/Driver/Maintenance list+form pages (generic), Trip pages (custom)
```

## Design notes worth walking through with students
- **Vehicles, Drivers, Maintenance Records** are plain CRUD — their entire
  UI is just a schema object (`vehicle.schema.js` etc.) fed into the shared
  `EntityList` / `EntityForm` components. No new UI code was written for
  them.
- **Trips** are *not* plain CRUD: assigning one needs to validate the
  vehicle is actually available, and it opportunistically links the trip
  to the driver's own login (by matching the driver record's email to a
  `driver`-role user account) so that driver can later see it under "My
  Trips" — a good example of denormalizing data for a self-service view
  without requiring every driver to have a login.
- **RBAC has a nuance here beyond the other two projects**: a driver can
  update a trip's status, but *only their own* trip — that check
  (`trip.driverUserId === req.user.userId`) happens inside the route
  handler itself, not in the generic `requireRole` middleware, because it
  depends on the specific record, not just the role. Worth contrasting
  with how `requireRole` alone was enough for the simpler entities.
- Everything under `server/core/` and `client/src/core/` is byte-for-byte
  reusable for a fifth project — only `modules/` and `App.jsx`'s route
  list change.

## Turning this into a different project
Same recipe as `docs/adding-a-module.md` in the Library reference project:
add a new module folder, one entry in `server/modules/index.js`, one set of
imports/routes in `client/src/App.jsx`, update `project.config.js`. Nothing
under `core/` needs to change.
