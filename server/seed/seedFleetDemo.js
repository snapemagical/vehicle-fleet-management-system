// Creates demo accounts + sample vehicles/drivers so you can log in and
// test right away. Run with: npm run seed  (from the server/ directory)
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Vehicle = require("../modules/fleet/vehicle.model");
const Driver = require("../modules/fleet/driver.model");

const DEMO_PASSWORD = "password123";

async function upsertUser(name, email, role) {
  const existing = await User.findOne({ email });
  if (existing) return existing;
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  return User.create({ name, email, passwordHash, role });
}

async function upsertVehicle(registrationNumber, type, capacity, status = "available") {
  const existing = await Vehicle.findOne({ registrationNumber });
  if (existing) return existing;
  return Vehicle.create({ registrationNumber, type, capacity, status });
}

async function upsertDriver(name, email, phone, licenseNumber) {
  const existing = await Driver.findOne({ email });
  if (existing) return existing;
  return Driver.create({ name, email, phone, licenseNumber });
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB - seeding demo data...");

  await upsertUser("Admin", "admin@demo.com", "admin");
  await upsertUser("Dispatcher", "dispatcher@demo.com", "dispatcher");
  await upsertUser("Demo Driver", "driver@demo.com", "driver");

  await upsertVehicle("FL-1001", "Car", 4);
  await upsertVehicle("FL-1002", "Van", 8);
  await upsertVehicle("FL-1003", "Truck", 2, "maintenance");
  await upsertVehicle("FL-1004", "Bus", 30);

  // Email matches the seeded "driver" login above, so a trip assigned to
  // this driver record will automatically show up under that user's
  // "My Trips" once created.
  await upsertDriver("Demo Driver", "driver@demo.com", "555-0100", "DL-90210");
  await upsertDriver("Alex Rivera", "alex.rivera@example.com", "555-0101", "DL-88213");

  console.log("Done. Demo accounts (password: password123):");
  console.log("  admin@demo.com");
  console.log("  dispatcher@demo.com");
  console.log("  driver@demo.com");

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
