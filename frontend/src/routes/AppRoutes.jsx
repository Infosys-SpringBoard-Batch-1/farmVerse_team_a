import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Farm from "../pages/Farm/Farm";
import Weather from "../pages/Weather/Weather";
import Analytics from "../pages/Analytics/Analytics";
import AIRecommendation from "../pages/Recommendations/AIRecommendation";
import Irrigation from "../pages/Irrigation/Irrigation";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/farm" element={<Farm />} />

        <Route path="/weather" element={<Weather />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route
          path="/recommendation"
          element={<AIRecommendation />}
        />

        <Route
          path="/irrigation"
          element={<Irrigation />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;