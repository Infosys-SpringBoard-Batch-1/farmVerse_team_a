import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSeedling,
  FaLeaf,
  FaCloudSun,
  FaPlus,
} from "react-icons/fa";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import { getAllFarms } from "../../services/farm";

function FarmerDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "Farmer";

  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getAllFarms();
      console.log("GET ALL FARMS RESPONSE:", response);

      console.log("Farm API Response:", response);

      // Backend returns:
      // {
      //   status,
      //   code,
      //   message,
      //   data:[]
      // }

      setFarms(response.farms || []);
      console.table(response.farms);
    } catch (err) {
      console.error("Error loading farms:", err);
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  const totalArea = farms.reduce(
  (sum, farm) => sum + Number(farm.areaSqMt ?? 0),
  0
);

  const totalCrops = farms.reduce(
    (sum, farm) => sum + (farm.cropCount || 0),
    0
  );

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

              <h2 className="text-4xl font-bold mt-3 text-green-700">
                {loading ? "..." : farms.length}
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

              <h2 className="text-4xl font-bold mt-3 text-yellow-600">
                {loading ? "..." : totalCrops}
              </h2>
            </div>

            <FaLeaf className="text-5xl text-yellow-500" />
          </div>
        </div>

        {/* Total Area */}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Total Area
              </p>

              <h2 className="text-2xl font-bold mt-3 text-blue-600">
                {loading ? "..." : `${totalArea} sq.m`}
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

            <button
              onClick={() => navigate("/farm/add")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <FaPlus />
              Add Farm
            </button>

          </div>

        </div>

      </div>

      {/* Recent Farms */}

      <div className="bg-white rounded-2xl shadow-md mt-10 p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            My Farms
          </h2>

          <button
            onClick={() => navigate("/farm")}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            View All →
          </button>

        </div>

        {loading ? (

          <p>Loading farms...</p>

        ) : farms.length === 0 ? (

          <div className="text-center py-10">

            <p className="text-gray-500 text-lg">
              No farms added yet.
            </p>

            <button
              onClick={() => navigate("/farm/add")}
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Add Your First Farm
            </button>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {farms.slice(0, 6).map((farm) => (

             <div
  key={farm.farmId}
  className="border rounded-xl p-5 hover:shadow-lg transition"
>

                <h3 className="text-xl font-semibold">
                  {farm.farmName}
                </h3>

                <p className="text-gray-500 mt-2">
                  📍 {farm.location}
                </p>

                <p className="mt-1">
                  🌱 {farm.farmType}
                </p>

                <p className="mt-1">
                  🌾 {farm.cropCount} Crops
                </p>

                <p className="mt-1">
                  📐 {farm.areaSqMt} sq.m
                </p>

                <button
  onClick={() => navigate(`/farm/${farm.farmId}`)}
  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
>
  View Farm
</button>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default FarmerDashboard;