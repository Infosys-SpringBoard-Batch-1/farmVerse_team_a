import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OAuthSuccess from "../pages/OAuthSuccess";
// Protected Route
import ProtectedRoute from "../components/common/ProtectedRoute";

// Authentication
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Farmers from "../pages/Admin/Farmers";
import Crops from "../pages/Admin/Crops";

// Farmer Pages
import FarmerDashboard from "../pages/Farmer/FarmerDashboard";
import Farm from "../pages/Farm/Farm";
import AddFarm from "../pages/Farm/AddFarm";
import Analytics from "../pages/Analytics/Analytics";

import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Settings from "../pages/Settings/Settings";
import AIRecommendation from "../pages/Recommendations/AIRecommendation";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import AddCrop from "../pages/Crop/AddCrop";
import ViewFarm from "../pages/Farm/ViewFarm";
import Weather from "../pages/Weather/Weather";
import EditFarm from "../pages/Farm/EditFarm";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Root */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/farm/:id" element={<ViewFarm />} />
        

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

          <Route
  path="/weather"
  element={
    <ProtectedRoute allowedRoles={["FARMER"]}>
      <Weather />
    </ProtectedRoute>
  }
/>

        <Route
    path="/farm/:id/crop/add"
    element={<AddCrop />}
/>

        <Route
          path="/admin/farmers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Farmers />
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/admin/crops"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Crops />
            </ProtectedRoute>
          }
        />

        {/* ================= FARMER ================= */}

        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farm"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Farm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farm/add"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <AddFarm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Weather />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendation"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <AIRecommendation />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Edit Profile */}
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
  path="/farm/edit/:id"
  element={
    <ProtectedRoute allowedRoles={["FARMER"]}>
      <EditFarm />
    </ProtectedRoute>
  }
/>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <h1 className="text-7xl font-bold text-red-600">
                  404
                </h1>

                <p className="mt-4 text-2xl">
                  Page Not Found
                </p>

                <p className="text-gray-500 mt-2">
                  The page you are looking for does not exist.
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