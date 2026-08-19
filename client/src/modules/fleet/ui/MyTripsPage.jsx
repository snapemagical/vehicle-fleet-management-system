import { useEffect, useState } from "react";
import api from "../../../api/axiosClient";

const NEXT_STATUS = {
  scheduled: "in-progress",
  "in-progress": "completed",
};
const NEXT_LABEL = {
  scheduled: "Start Trip",
  "in-progress": "Complete Trip",
};

export default function MyTripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await api.get("/fleet/trips/mine");
    setTrips(res.data.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function advance(id, nextStatus) {
    await api.put(`/fleet/trips/${id}`, { status: nextStatus });
    load();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Trips</h2>
      <table>
        <thead>
          <tr><th>Vehicle</th><th>Route</th><th>Scheduled</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {trips.map((t) => (
            <tr key={t._id}>
              <td>{t.vehicleReg}</td>
              <td>{t.origin} → {t.destination}</td>
              <td>{new Date(t.scheduledDate).toLocaleDateString()}</td>
              <td><span className={`badge ${t.status === "cancelled" ? "overdue" : "active"}`}>{t.status}</span></td>
              <td>
                {NEXT_STATUS[t.status] && (
                  <a href="#" onClick={(e) => { e.preventDefault(); advance(t._id, NEXT_STATUS[t.status]); }}>
                    {NEXT_LABEL[t.status]}
                  </a>
                )}
              </td>
            </tr>
          ))}
          {trips.length === 0 && <tr><td colSpan={5}>No trips assigned yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
