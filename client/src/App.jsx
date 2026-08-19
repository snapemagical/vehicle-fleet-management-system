import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./api/axiosClient";
import DashboardShell from "./core/layout/DashboardShell.jsx";
import ProtectedRoute from "./core/auth/ProtectedRoute.jsx";
import LoginPage from "./core/auth/LoginPage.jsx";
import Dashboard from "./core/pages/Dashboard.jsx";
import Profile from "./core/pages/Profile.jsx";
import AuditLogPage from "./core/pages/AuditLogPage.jsx";
import NotFound from "./core/pages/NotFound.jsx";

import VehicleListPage from "./modules/fleet/ui/VehicleListPage.jsx";
import VehicleFormPage from "./modules/fleet/ui/VehicleFormPage.jsx";
import DriverListPage from "./modules/fleet/ui/DriverListPage.jsx";
import DriverFormPage from "./modules/fleet/ui/DriverFormPage.jsx";
import MaintenanceListPage from "./modules/fleet/ui/MaintenanceListPage.jsx";
import MaintenanceFormPage from "./modules/fleet/ui/MaintenanceFormPage.jsx";
import TripListPage from "./modules/fleet/ui/TripListPage.jsx";
import TripFormPage from "./modules/fleet/ui/TripFormPage.jsx";
import TripEditPage from "./modules/fleet/ui/TripEditPage.jsx";
import MyTripsPage from "./modules/fleet/ui/MyTripsPage.jsx";

export default function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.get("/config").then((res) => setConfig(res.data.data));
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardShell config={config}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/audit-log"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AuditLogPage />
                    </ProtectedRoute>
                  }
                />

                {/* fleet module routes */}
                <Route path="/vehicles" element={<VehicleListPage />} />
                <Route
                  path="/vehicles/new"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <VehicleFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vehicles/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <VehicleFormPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/drivers"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <DriverListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/drivers/new"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <DriverFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/drivers/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <DriverFormPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/maintenance"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <MaintenanceListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/maintenance/new"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <MaintenanceFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/maintenance/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <MaintenanceFormPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/trips"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <TripListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/trips/new"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <TripFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/trips/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={["dispatcher"]}>
                      <TripEditPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-trips"
                  element={
                    <ProtectedRoute allowedRoles={["driver"]}>
                      <MyTripsPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardShell>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
