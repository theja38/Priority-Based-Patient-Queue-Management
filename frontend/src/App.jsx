import { useState } from "react";
import Login from "./Login";
import DoctorDashboard from "./DoctorDashboard";
import StaffDashboard from "./StaffDashboard";
import PatientDisplay from "./PatientDisplay";

export default function App() {
  const [role, setRole] = useState(null);

  // ✅ Public patient display (no login)
  if (window.location.pathname === "/display") {
    return <PatientDisplay />;
  }

  // Login flow
  if (!role) {
    return <Login setRole={setRole} />;
  }

  if (role === "doctor") {
    return <DoctorDashboard />;
  }

  if (role === "staff") {
    return <StaffDashboard />;
  }

  return <div>Unauthorized</div>;
}
