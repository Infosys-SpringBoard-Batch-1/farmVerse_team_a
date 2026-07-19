import { useEffect, useState } from "react";
import {
  FaUsers,
  FaSeedling,
  FaLeaf,
} from "react-icons/fa";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import { getAdminDashboard } from "../../services/dashboard";

function AdminDashboard() {

  const [dashboard, setDashboard] = useState({
    status: "",
    statusCode: "",
    message: "",
    totalFarmers: 0,
    totalFarms: 0,
    totalCrops: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);

    const response = await getAdminDashboard();

    if (response.status === "ok") {
      setDashboard(response.data);
    } else {
      alert(response.message);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl font-bold">
            Loading Dashboard...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Page Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor and manage the FarmVerse platform.
        </p>

      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Total Farmers */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Farmers
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {dashboard.totalFarmers}
              </h2>

            </div>

            <FaUsers className="text-5xl text-blue-600" />

          </div>

        </div>

        {/* Total Farms */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Farms
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {dashboard.totalFarms}
              </h2>

            </div>

            <FaSeedling className="text-5xl text-green-600" />

          </div>

        </div>

        {/* Total Crops */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Crops
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {dashboard.totalCrops}
              </h2>

            </div>

            <FaLeaf className="text-5xl text-yellow-500" />

          </div>

        </div>

      </div>

      {/* System Status */}

      <div className="bg-white rounded-2xl shadow-md mt-10 p-8">

        <h2 className="text-2xl font-bold mb-5">
          System Status
        </h2>

        <div className="space-y-3">

          <p>
            <strong>Status :</strong> {dashboard.status}
          </p>

          <p>
            <strong>Status Code :</strong> {dashboard.statusCode}
          </p>

          <p>
            <strong>Message :</strong> {dashboard.message}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;