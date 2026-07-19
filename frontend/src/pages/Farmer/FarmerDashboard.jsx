import { FaSeedling, FaLeaf, FaCloudSun, FaPlus } from "react-icons/fa";
import DashboardLayout from "../../components/Layout/DashboardLayout";

function FarmerDashboard() {

  const username = localStorage.getItem("username") || "Farmer";

  return (
    <DashboardLayout>

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Farmer Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, {username}! Here's an overview of your farm.
        </p>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Farms */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                My Farms
              </p>

              <h2 className="text-4xl font-bold mt-3">
                0
              </h2>

            </div>

            <FaSeedling className="text-5xl text-green-600" />

          </div>

        </div>

        {/* Crops */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                My Crops
              </p>

              <h2 className="text-4xl font-bold mt-3">
                0
              </h2>

            </div>

            <FaLeaf className="text-5xl text-yellow-500" />

          </div>

        </div>

        {/* Weather */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Weather
              </p>

              <h2 className="text-3xl font-bold mt-3">
                28°C
              </h2>

            </div>

            <FaCloudSun className="text-5xl text-blue-500" />

          </div>

        </div>

        {/* Quick Action */}

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">

          <div>

            <p className="text-gray-500">
              Quick Action
            </p>

            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2">

              <FaPlus />

              Add Farm

            </button>

          </div>

        </div>

      </div>

      {/* Farm Overview */}

      <div className="bg-white rounded-2xl shadow-md mt-10 p-8">

        <h2 className="text-2xl font-bold mb-4">
          Farm Overview
        </h2>

        <p className="text-gray-600">
          Welcome to FarmVerse! As you start adding your farms, crops,
          and monitoring weather conditions, you'll see detailed analytics
          and recommendations here.
        </p>

      </div>

    </DashboardLayout>
  );
}

export default FarmerDashboard;