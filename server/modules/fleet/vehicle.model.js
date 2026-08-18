const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ["Car", "Van", "Truck", "Bus"], required: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ["available", "on-trip", "maintenance"], default: "available" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
