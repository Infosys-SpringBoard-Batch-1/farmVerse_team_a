import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Protected Route
import ProtectedRoute from "../components/Common/ProtectedRoute";

// Authentication
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Farmers from "../pages/Admin/Farmers";
import Farms from "../pages/Admin/Farms";
import Crops from "../pages/Admin/Crops";

// Farmer Pages
import FarmerDashboard from "../pages/Farmer/FarmerDashboard";
import Farm from "../pages/Farmer/Farm";
import Weather from "../pages/Farmer/Weather";
import Analytics from "../pages/Farmer/Analytics";
import AIRecommendation from "../pages/Farmer/AIRecommendation";
import Profile from "../pages/Farmer/Profile";
import Settings from "../pages/Farmer/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/farmers"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Farmers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/farms"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Farms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/crops"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Crops />
            </ProtectedRoute>
          }
        />

        {/* ================= FARMER ROUTES ================= */}

        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

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

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="text-center">
                <h1 className="text-7xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-2xl text-gray-700">
                  Page Not Found
                </p>
                <p className="mt-2 text-gray-500">
                  The page you're looking for doesn't exist.
                </p>
            </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;