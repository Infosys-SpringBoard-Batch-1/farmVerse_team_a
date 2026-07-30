import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FaPlus,
  FaMapMarkerAlt,
  FaSeedling,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import {
  getAllFarms,
  deleteFarm,
} from "../../services/farm";

const DEFAULT_FARM_IMAGE =
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000";

function Farm() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      setLoading(true);

      const response = await getAllFarms();




setFarms(response.farms || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load farms.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this farm?")) return;

    try {
      await deleteFarm(id);

      loadFarms();
    } catch (error) {
      console.error(error);
      alert("Unable to delete farm.");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Farm Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your farms.
          </p>
        </div>

        <button
          onClick={() => navigate("/farm/add")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"
        >
          <FaPlus />
          Add Farm
        </button>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Total Farms</p>

          <h1 className="text-4xl font-bold text-green-600 mt-3">
            {farms.length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Total Area</p>

          <h1 className="text-4xl font-bold text-blue-600 mt-3">
           {farms.reduce((sum, farm) => {
  
  return sum + parseFloat(farm.areaSqMt || 0);
}, 0)}{" "}
sq.m
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Total Crops</p>

          <h1 className="text-4xl font-bold text-green-700 mt-3">
            {farms.reduce(
              (sum, farm) => sum + farm.cropCount,
              0
            )}
          </h1>
        </div>

      </div>

      {loading ? (
        <div className="text-center py-20">
          Loading farms...
        </div>
      ) : farms.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">

          <h2 className="text-2xl font-semibold">
            No farms added yet
          </h2>

          <button
            onClick={() => navigate("/farm/add")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Add First Farm
          </button>

        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">

          {farms.map((farm) => (

            <div
              key={farm.farmId}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >

              <img
                src={DEFAULT_FARM_IMAGE}
                alt={farm.farmName}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {farm.farmName}
                </h2>

                <div className="space-y-3 mt-5">

                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    {farm.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaSeedling className="text-green-600" />
                    {farm.farmType}
                  </p>

                  <p>
  Area : {farm.areaSqMt} sq.m
</p>

                  <p>
                    Soil : {farm.soilType}
                  </p>

                  <p>
                    Crops : {farm.cropCount}
                  </p>

                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">

                  <button
                    onClick={() =>
                      navigate(`/farm/${farm.farmId}`)
                    }
                    className="bg-green-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                  >
                    <FaEye />
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/farm/edit/${farm.farmId}`)
                    }
                    className="bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(farm.farmId)
                    }
                    className="bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </DashboardLayout>
  );
}

export default Farm;