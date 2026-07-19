import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import FarmerDashboard from "../pages/Farmer/FarmerDashboard";

import Farm from "../pages/Farm/Farm";
import Weather from "../pages/Weather/Weather";
import Analytics from "../pages/Analytics/Analytics";
import AIRecommendation from "../pages/Recommendations/AIRecommendation";
import Irrigation from "../pages/Irrigation/Irrigation";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Farmer Routes */}

        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared Protected Routes */}

        <Route
          path="/farm"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <Farm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <Weather />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendation"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <AIRecommendation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/irrigation"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <Irrigation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Default */}

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;