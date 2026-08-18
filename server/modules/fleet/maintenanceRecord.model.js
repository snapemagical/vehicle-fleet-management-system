const mongoose = require("mongoose");

const maintenanceRecordSchema = new mongoose.Schema(
  {
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    vehicleReg: { type: String, required: true }, // denormalized for easy display
    description: { type: String, required: true, trim: true },
    cost: { type: Number, required: true },
    serviceDate: { type: Date, required: true },
    status: { type: String, enum: ["scheduled", "completed"], default: "scheduled" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRecord", maintenanceRecordSchema);
