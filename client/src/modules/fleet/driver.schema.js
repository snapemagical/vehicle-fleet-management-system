export default {
  name: "Driver",
  roles: {
    create: ["dispatcher"],
    update: ["dispatcher"],
    delete: ["dispatcher"],
  },
  listFields: ["name", "email", "phone", "licenseNumber"],
  fields: {
    name: { label: "Full Name", required: true },
    email: { label: "Email", required: true },
    phone: { label: "Phone", required: true },
    licenseNumber: { label: "License Number", required: true },
  },
};
