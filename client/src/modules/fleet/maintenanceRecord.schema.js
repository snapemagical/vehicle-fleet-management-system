export default {
  name: "Maintenance Record",
  roles: {
    create: ["dispatcher"],
    update: ["dispatcher"],
    delete: ["dispatcher"],
  },
  listFields: ["vehicleReg", "description", "cost", "status"],
  fields: {
    vehicleId: { label: "Vehicle ID", required: true },
    vehicleReg: { label: "Vehicle Registration", required: true },
    description: { label: "Description", required: true },
    cost: { label: "Cost", type: "Number", required: true },
    serviceDate: { label: "Service Date (YYYY-MM-DD)", required: true },
    status: { label: "Status", enum: ["scheduled", "completed"], default: "scheduled", required: true },
  },
};
