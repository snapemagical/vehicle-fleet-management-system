import { useAuth } from "../auth/AuthContext.jsx";

// Generic placeholder - Phase 2 (fleet module) will add real
// vehicle/trip stats here.
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p style={{ color: "#667" }}>
        This dashboard will show vehicle/trip stats once the fleet module is
        wired up.
      </p>
    </div>
  );
}
