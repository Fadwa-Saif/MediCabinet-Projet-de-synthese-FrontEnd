import { Navigate } from "react-router-dom";

function normalizeRole(role) {
  if (role === "doctor") return "medecin";
  if (role === "secretary") return "secretaire";
  return role;
}

export function ProtectedRoute({ children, requiredRole }) {
  // Get user from localStorage
  const userJSON = localStorage.getItem("medicabinet_user");
  const token = localStorage.getItem("token");

  if (!userJSON || !token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userJSON);
    const userRole = normalizeRole(user.role);
    const expectedRole = normalizeRole(requiredRole);

    if (expectedRole && userRole !== expectedRole) {
      // Wrong role, redirect to their dashboard
      const roleDashboards = {
        patient: "/patient/dashboard",
        medecin: "/doctor/dashboard",
        secretaire: "/secretary/dashboard",
      };
      return <Navigate to={roleDashboards[userRole] || "/login"} replace />;
    }

    return children;
  } catch (e) {
    // Invalid JSON, redirect to login
    return <Navigate to="/login" replace />;
  }
}
