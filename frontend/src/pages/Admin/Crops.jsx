import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { FaLeaf, FaTractor, FaCalendarAlt } from "react-icons/fa";

function Crops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCrops = async () => {
    try {
      setLoading(true);

      const res = await api.get("/farmverse/admin/viewCrops");
      setCrops(res.data || []);
    } catch (err) {
      console.error("Failed to fetch crops", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
              Crops Management
            </h1>

            <p className="mt-2 text-gray-500 text-lg">
              View and oversee all registered crops across the platform.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">

          <div className="p-8 border-b border-emerald-50 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-transparent">
            <h2 className="text-2xl font-bold text-slate-800">
              All Crops
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Crop Details
                  </th>

                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Yield & Revenue
                  </th>

                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Farm & Owner
                  </th>

                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {crops.map((crop, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors"
                  >

                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                          <FaLeaf />
                        </div>

                        <div>
                          <div className="font-semibold text-slate-800">
                            {crop.cropName}
                          </div>

                          <div className="text-sm text-gray-500">
                            {crop.cropType}
                          </div>
                        </div>

                      </div>
                    </td>

                    <td className="py-5 px-8">
                      <div className="flex flex-col gap-1">

                        <span className="text-sm text-emerald-600 font-medium">
                          Quantity: {crop.quantity}
                        </span>

                        <span className="text-sm text-gray-500">
                          Rev: ${crop.revenue || 0}
                        </span>

                      </div>
                    </td>

                    <td className="py-5 px-8">
                      <div className="flex flex-col gap-1">

                        <span className="flex items-center gap-2 text-sm text-gray-700">
                          <FaTractor className="text-gray-400" />
                          {crop.farmName}
                        </span>

                        <span className="text-sm text-gray-500">
                          @{crop.farmerUsername}
                        </span>

                      </div>
                    </td>

                    <td className="py-5 px-8 text-gray-500 text-sm">
                      <div className="flex flex-col gap-1">

                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          S: {new Date(crop.sowingDate).toLocaleDateString()}
                        </span>

                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          H: {new Date(crop.harvestDate).toLocaleDateString()}
                        </span>

                      </div>
                    </td>

                  </tr>
                ))}

                {crops.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-10 text-center text-gray-500"
                    >
                      No crops registered yet.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Crops;