import { Navigate } from "react-router-dom";

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

    if (requiredRole && user.role !== requiredRole) {
      // Wrong role, redirect to their dashboard
      const roleDashboards = {
        patient: "/patient/dashboard",
        medecin: "/medecin/dashboard",
        secretaire: "/secretaire/dashboard",
      };
      return <Navigate to={roleDashboards[user.role] || "/login"} replace />;
    }

    return children;
  } catch (e) {
    // Invalid JSON, redirect to login
    return <Navigate to="/login" replace />;
  }
}
