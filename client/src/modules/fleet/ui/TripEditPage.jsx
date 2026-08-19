import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axiosClient";

const STATUS_OPTIONS = ["scheduled", "in-progress", "completed", "cancelled"];

// Editing a trip really means moving it through scheduled -> in-progress
// -> completed (or cancelling it) - the vehicle's status is kept in sync
// server-side, so this page just shows the details and a status dropdown.
export default function TripEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/fleet/trips/${id}`).then((res) => {
      setTrip(res.data.data);
      setStatus(res.data.data.status);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/fleet/trips/${id}`, { status });
      navigate("/trips");
    } catch (err) {
      setError(err?.response?.data?.error?.message || "Something went wrong");
    }
  }

  if (!trip) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 480 }}>
      <h2>Trip — {trip.driverName}</h2>
      <p style={{ fontSize: 14, color: "#667" }}>
        {trip.vehicleReg} · {trip.origin} → {trip.destination} ·{" "}
        {new Date(trip.scheduledDate).toLocaleDateString()}
      </p>

      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {error && <p className="error-text">{error}</p>}
      <button className="btn" type="submit">Save</button>
    </form>
  );
}
