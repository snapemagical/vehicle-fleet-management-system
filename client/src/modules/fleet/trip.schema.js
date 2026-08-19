// Trips aren't rendered with the generic EntityForm (see TripFormPage /
// TripEditPage) because assigning one needs a vehicle + driver picker, and
// editing one is really just a status change. This schema still powers the
// generic EntityList table (column labels + role checks).
export default {
  name: "Trip",
  roles: {
    create: ["dispatcher"],
    update: ["dispatcher"],
    delete: [], // admin only, via the automatic admin bypass
  },
  listFields: ["driverName", "vehicleReg", "origin", "destination", "status"],
  fields: {
    driverName: { label: "Driver" },
    vehicleReg: { label: "Vehicle" },
    origin: { label: "Origin" },
    destination: { label: "Destination" },
    status: { label: "Status" },
  },
};
