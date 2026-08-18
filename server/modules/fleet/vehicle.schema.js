module.exports = {
  name: "Vehicle",
  roles: {
    read: ["admin", "dispatcher", "driver"], // drivers can see the fleet read-only
    create: ["dispatcher"],
    update: ["dispatcher"],
    delete: ["dispatcher"],
  },
};
