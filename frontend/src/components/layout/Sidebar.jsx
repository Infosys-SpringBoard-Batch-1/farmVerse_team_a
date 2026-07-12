import {
  FaSeedling,
  FaChartPie,
  FaTractor,
  FaCloudSun,
  FaChartLine,
  FaRobot,
  FaTint,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      title: "Farm Management",
      path: "/farm",
      icon: <FaTractor />,
    },
    {
      title: "Weather",
      path: "/weather",
      icon: <FaCloudSun />,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: <FaChartLine />,
    },
    {
      title: "AI Recommendation",
      path: "/recommendation",
      icon: <FaRobot />,
    },
    {
      title: "Irrigation",
      path: "/irrigation",
      icon: <FaTint />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="h-24 flex items-center justify-center border-b border-slate-700">

        <div className="flex items-center gap-3">

          <div className="bg-green-600 p-3 rounded-xl">

            <FaSeedling size={28} />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              FarmVerse
            </h1>

            <p className="text-sm text-slate-400">
              Precision Agriculture
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 mt-8 px-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all duration-300 ${
                isActive
                  ? "bg-green-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>

          </NavLink>
        ))}

      </nav>

      {/* Logout */}

      <div className="p-5 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;