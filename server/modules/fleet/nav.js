module.exports = [
  { label: "Vehicles", path: "/vehicles", icon: "vehicle", roles: ["admin", "dispatcher", "driver"] },
  { label: "Drivers", path: "/drivers", icon: "drivers", roles: ["admin", "dispatcher"] },
  { label: "Trips", path: "/trips", icon: "trips", roles: ["admin", "dispatcher"] },
  { label: "Maintenance", path: "/maintenance", icon: "maintenance", roles: ["admin", "dispatcher"] },
  { label: "My Trips", path: "/my-trips", icon: "trips", roles: ["driver"] },
];
