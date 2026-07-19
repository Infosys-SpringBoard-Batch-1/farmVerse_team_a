import { FaUsers, FaSeedling, FaLeaf, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth";

function AdminDashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}

      <aside className="w-64 bg-green-700 text-white flex flex-col">

        <div className="text-3xl font-bold p-6 border-b border-green-600">
          🌿 FarmVerse
        </div>

        <nav className="flex-1 mt-6">

          <button className="w-full text-left px-6 py-4 hover:bg-green-600">
            Dashboard
          </button>

          <button className="w-full text-left px-6 py-4 hover:bg-green-600">
            Farmers
          </button>

          <button className="w-full text-left px-6 py-4 hover:bg-green-600">
            Farms
          </button>

          <button className="w-full text-left px-6 py-4 hover:bg-green-600">
            Crops
          </button>

        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-6 hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </aside>

      {/* Main */}

      <main className="flex-1 p-10">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back, {username}
            </p>

          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <FaUsers className="text-5xl text-blue-600" />

            <h2 className="text-xl font-semibold mt-4">
              Total Farmers
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <FaSeedling className="text-5xl text-green-600" />

            <h2 className="text-xl font-semibold mt-4">
              Total Farms
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <FaLeaf className="text-5xl text-yellow-500" />

            <h2 className="text-xl font-semibold mt-4">
              Total Crops
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <p className="text-gray-500">
            No recent activity available.
          </p>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;