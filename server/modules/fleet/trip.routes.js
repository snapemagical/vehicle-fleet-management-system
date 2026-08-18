// Trips aren't plain CRUD: creating one has to look up the vehicle and
// driver, validate the vehicle's available, and try to link the trip to a
// driver's own login (if they have one) so they can see it under "My
// Trips". A status change has a side-effect on the vehicle. Same shape as
// booking.routes.js / order.routes.js in the other reference projects.
const router = require("express").Router();
const requireAuth = require("../../core/auth/auth.middleware");
const requireRole = require("../../core/rbac/requireRole");
const { logAction } = require("../../core/audit/auditLogger");
const Vehicle = require("./vehicle.model");
const Driver = require("./driver.model");
const Trip = require("./trip.model");
const User = require("../../models/User");

// GET /api/fleet/trips - dispatcher / admin see everything
router.get("/", requireAuth, requireRole(["dispatcher"]), async (req, res) => {
  const trips = await Trip.find().sort({ createdAt: -1 });
  res.json({ data: trips });
});

// GET /api/fleet/trips/mine - a logged-in driver's own assigned trips
router.get("/mine", requireAuth, requireRole(["driver"]), async (req, res) => {
  const trips = await Trip.find({ driverUserId: req.user.userId }).sort({ createdAt: -1 });
  res.json({ data: trips });
});

// GET /api/fleet/trips/:id
router.get("/:id", requireAuth, requireRole(["dispatcher"]), async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });
  res.json({ data: trip });
});

// POST /api/fleet/trips - dispatcher assigns a vehicle + driver
router.post("/", requireAuth, requireRole(["dispatcher"]), async (req, res) => {
  try {
    const { vehicleId, driverId, origin, destination, scheduledDate } = req.body;

    if (!vehicleId || !driverId || !origin || !destination || !scheduledDate) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "vehicleId, driverId, origin, destination, scheduledDate are required" } });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Vehicle not found" } });
    if (vehicle.status !== "available") {
      return res.status(409).json({ error: { code: "CONFLICT", message: `Vehicle ${vehicle.registrationNumber} is not available` } });
    }

    const driver = await Driver.findById(driverId);
    if (!driver) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Driver not found" } });

    // Link to the driver's own login, if they have one, so they can see
    // this trip under "My Trips" and update its status themself.
    const driverUser = await User.findOne({ email: driver.email, role: "driver" });

    const trip = await Trip.create({
      vehicleId: vehicle._id,
      vehicleReg: vehicle.registrationNumber,
      driverId: driver._id,
      driverName: driver.name,
      driverUserId: driverUser?._id || null,
      origin,
      destination,
      scheduledDate,
      status: "scheduled",
    });

    await Vehicle.findByIdAndUpdate(vehicle._id, { status: "on-trip" });

    await logAction(req.user, "CREATE", "Trip", trip._id);
    res.status(201).json({ data: trip });
  } catch (err) {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: err.message } });
  }
});

// PUT /api/fleet/trips/:id - status changes. Dispatchers can update any
// trip; a driver can only update their own assigned trip, and only its
// status (not reassign the vehicle/driver/route).
router.put("/:id", requireAuth, requireRole(["dispatcher", "driver"]), async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });

    if (req.user.role === "driver" && String(trip.driverUserId) !== String(req.user.userId)) {
      return res.status(403).json({ error: { code: "FORBIDDEN", message: "This isn't your trip" } });
    }

    const { status } = req.body;
    if (status) trip.status = status;
    await trip.save();

    if (status === "completed" || status === "cancelled") {
      await Vehicle.findByIdAndUpdate(trip.vehicleId, { status: "available" });
    }

    await logAction(req.user, "UPDATE", "Trip", trip._id);
    res.json({ data: trip });
  } catch (err) {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: err.message } });
  }
});

// DELETE /api/fleet/trips/:id - admin only in practice (requireRole([]) + admin bypass)
router.delete("/:id", requireAuth, requireRole([]), async (req, res) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);
  if (!trip) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });
  await logAction(req.user, "DELETE", "Trip", req.params.id);
  res.json({ data: { id: req.params.id } });
});

module.exports = router;
