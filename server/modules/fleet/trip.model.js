const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    vehicleReg: { type: String, required: true }, // denormalized for easy display

    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    driverName: { type: String, required: true }, // denormalized for easy display
    // Set automatically if the driver record's email matches a logged-in
    // "driver" role user account - lets that driver see the trip under
    // "My Trips" and update its status themself.
    driverUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    scheduledDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
