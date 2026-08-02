import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getFarmById } from "../../services/farm";
import {
  FaArrowLeft,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaList
} from "react-icons/fa";
import { deleteCrop } from "../../services/crop";

export default function ViewFarm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarm();
  }, []);

  const loadFarm = async () => {
    try {
      const response = await getFarmById(id);

      console.log("VIEW FARM RESPONSE:", response);
      console.log("CROPS:", response.farm.crops);

      setFarm(response.farm);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCrop = async (cropId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this crop?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCrop(cropId);

    alert("Crop deleted successfully.");

    loadFarm(); // Refresh the crop list
  } catch (error) {
    console.error(error);
    alert("Failed to delete crop.");
  }
};

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-xl">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!farm) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-red-600 text-xl">
          Farm not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Back Button */}
      <button
        onClick={() => navigate("/farm")}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-6"
      >
        <FaArrowLeft />
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Farm Details */}
        <h1 className="text-4xl font-bold text-green-700">
          {farm.farmName}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-2 text-lg">
            <p>
              <strong>📍 Location:</strong> {farm.location}
            </p>

            <p>
              <strong>🌱 Farm Type:</strong> {farm.farmType}
            </p>

            <p>
              <strong>📐 Area:</strong> {farm.areaSqMt} sq.m
            </p>

            <p>
              <strong>🌍 Soil:</strong> {farm.soilType}
            </p>
          </div>
        </div>

        {/* Crop Header */}
        <div className="flex justify-between items-center mt-10">
  <h2 className="text-3xl font-semibold">
    Crops
  </h2>

  <div className="flex gap-3">
    <button
      onClick={() => navigate("/crops")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
    >
      <FaList />
      View All
    </button>

    <button
      onClick={() => navigate(`/farm/${farm.farmId}/crop/add`)}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
    >
      <FaPlus />
      Add Crop
    </button>
  </div>
</div>

        {/* Crop List */}
        {(farm.crops ?? []).length === 0 ? (
          <div className="mt-6 bg-gray-100 rounded-xl p-8 text-center text-gray-500">
            No crops added yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {(farm.crops ?? []).map((crop) => (
              <div
                key={crop.cropId}
                className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition"
              >
                {/* Automatic Crop Image */}
                <img
                  src={`https://loremflickr.com/600/400/farm,${encodeURIComponent(
                    crop.cropName
                  )}`}
                  alt={crop.cropName}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-bold text-green-700">
                    {crop.cropName}
                  </h3>

                  <p className="mt-3">
                    <strong>Type:</strong> {crop.cropType}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {crop.quantity}
                  </p>

                  <p>
                    <strong>Sowing:</strong> {crop.sowingDate}
                  </p>

                  <p>
                    <strong>Harvest:</strong> {crop.harvestDate}
                  </p>

                  <div className="flex justify-between mt-5 gap-2">

  <button
    onClick={() => navigate(`/crop/${crop.cropId}`)}
    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
  >
    <FaEye />
    View
  </button>

  <button
    onClick={() => navigate(`/crop/edit/${crop.cropId}`)}
    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
  >
    <FaEdit />
    Edit
  </button>

 <button
  onClick={() => handleDeleteCrop(crop.cropId)}
    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
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
      </div>
    </DashboardLayout>
  );
}