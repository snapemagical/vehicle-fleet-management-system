import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosClient";

// Custom trip form (not the generic EntityForm) because assigning a trip
// means picking an available vehicle and a driver, not filling in fields
// directly - the same reasoning that made BookingFormPage/OrderFormPage
// custom in the Hotel Booking and Restaurant reference projects.
export default function TripFormPage() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/fleet/vehicles").then((res) => {
      setVehicles(res.data.data.filter((v) => v.status === "available"));
    });
    api.get("/fleet/drivers").then((res) => {
      setDrivers(res.data.data);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/fleet/trips", { vehicleId, driverId, origin, destination, scheduledDate });
      navigate("/trips");
    } catch (err) {
      setError(err?.response?.data?.error?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 480 }}>
      <h2>New Trip</h2>

      <div className="form-group">
        <label>Vehicle *</label>
        <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} required>
          <option value="" disabled>Select an available vehicle...</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>{v.registrationNumber} — {v.type} (seats {v.capacity})</option>
          ))}
        </select>
        {vehicles.length === 0 && <p style={{ fontSize: 12, color: "#991b1b" }}>No vehicles currently available.</p>}
      </div>

      <div className="form-group">
        <label>Driver *</label>
        <select value={driverId} onChange={(e) => setDriverId(e.target.value)} required>
          <option value="" disabled>Select a driver...</option>
          {drivers.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Origin *</label>
        <input value={origin} onChange={(e) => setOrigin(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Destination *</label>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Scheduled Date *</label>
        <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} required />
      </div>

      {error && <p className="error-text">{error}</p>}
      <button className="btn" type="submit">Assign Trip</button>
    </form>
  );
}
