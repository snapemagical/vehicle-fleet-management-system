import { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ vehiclesFree: null, activeTrips: null, maintenanceDue: null });

  useEffect(() => {
    async function loadCounts() {
      try {
        const vehiclesRes = await api.get("/fleet/vehicles");
        const vehicles = vehiclesRes.data.data;
        const vehiclesFree = vehicles.filter((v) => v.status === "available").length;

        let activeTrips = null;
        let maintenanceDue = null;

        if (user.role === "driver") {
          const mineRes = await api.get("/fleet/trips/mine");
          activeTrips = mineRes.data.data.filter((t) => t.status === "scheduled" || t.status === "in-progress").length;
        } else {
          const tripsRes = await api.get("/fleet/trips");
          activeTrips = tripsRes.data.data.filter((t) => t.status === "scheduled" || t.status === "in-progress").length;

          const maintRes = await api.get("/fleet/maintenance");
          maintenanceDue = maintRes.data.data.filter((m) => m.status === "scheduled").length;
        }

        setCounts({ vehiclesFree, activeTrips, maintenanceDue });
      } catch {
        // endpoint not accessible for this role - fine, just skip
      }
    }
    loadCounts();
  }, [user]);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <div className="card-grid">
        <div className="card"><h3>Vehicles Free</h3><p>{counts.vehiclesFree ?? "-"}</p></div>
        <div className="card"><h3>{user.role === "driver" ? "My Active Trips" : "Active Trips"}</h3><p>{counts.activeTrips ?? "-"}</p></div>
        {user.role !== "driver" && (
          <div className="card"><h3>Maintenance Due</h3><p>{counts.maintenanceDue ?? "-"}</p></div>
        )}
      </div>
    </div>
  );
}
