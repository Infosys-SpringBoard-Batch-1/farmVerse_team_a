import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaSeedling,
  FaLeaf,
  FaCloudSun,
  FaChartBar,
  FaRobot,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { logout } from "../../services/auth";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const adminMenu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      name: "Farmers",
      icon: <FaUsers />,
      path: "/admin/farmers",
    },
    {
      name: "Farms",
      icon: <FaSeedling />,
      path: "/admin/farms",
    },
    {
      name: "Crops",
      icon: <FaLeaf />,
      path: "/admin/crops",
    },
  ];

  const farmerMenu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/farmer/dashboard",
    },
    {
      name: "My Farms",
      icon: <FaSeedling />,
      path: "/farm",
    },
    {
      name: "Add Farm",
      icon: <FaSeedling />,
      path: "/farm/add",
    },
    {
      name: "Weather",
      icon: <FaCloudSun />,
      path: "/weather",
    },
    {
      name: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics",
    },
    {
      name: "AI Recommendation",
      icon: <FaRobot />,
      path: "/recommendation",
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  const menu = role === "ADMIN" ? adminMenu : farmerMenu;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-green-700 text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-green-600">
        <h1 className="text-3xl font-bold">🌿 FarmVerse</h1>
        <p className="text-sm mt-2 text-green-100">
          Smart Agriculture Platform
        </p>
      </div>

      {/* User */}
      <div className="px-6 py-4 border-b border-green-600">
        <p className="text-sm text-green-200">Welcome</p>
        <h3 className="font-semibold text-lg">
          {user?.username || "Guest"}
        </h3>
        <p className="text-xs text-green-100">{role}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                isActive
                  ? "bg-white text-green-700 font-semibold"
                  : "hover:bg-green-600"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 px-6 py-5 bg-green-800 hover:bg-red-600 transition-all duration-200"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;