import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  // Get authentication details from localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role doesn't match
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // User is authorized
  return children;
}

export default ProtectedRoute;