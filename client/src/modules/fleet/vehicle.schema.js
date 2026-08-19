export default {
  name: "Vehicle",
  roles: {
    create: ["dispatcher"],
    update: ["dispatcher"],
    delete: ["dispatcher"],
  },
  listFields: ["registrationNumber", "type", "capacity", "status"],
  fields: {
    registrationNumber: { label: "Registration Number", required: true },
    type: { label: "Type", enum: ["Car", "Van", "Truck", "Bus"], required: true },
    capacity: { label: "Capacity", type: "Number", required: true },
    status: { label: "Status", enum: ["available", "on-trip", "maintenance"], default: "available", required: true },
  },
};
