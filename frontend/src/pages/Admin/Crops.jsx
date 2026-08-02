import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { getAllCrops } from "../../services/crop";
import { getCropImage } from "../../services/cropImages";
function Crops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cropImages, setCropImages] = useState({});

  useEffect(() => {
    loadCrops();
  }, []);

const loadCrops = async () => {
  try {
    const data = await getAllCrops();
    setCrops(data);

    const images = {};

    await Promise.all(
      data.map(async (crop) => {
        images[crop.id] = await getCropImage(crop.cropName);
      })
    );

    setCropImages(images);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Crops Management
        </h1>

        {loading ? (
          <p>Loading crops...</p>
        ) : crops.length === 0 ? (
          <p className="text-gray-500">No crops available.</p>
        ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
  src={cropImages[crop.id]}
  alt={crop.cropName}
  className="w-full h-56 object-cover rounded-t-xl"
/>

                <div className="p-5">
                  <h2 className="text-xl font-bold">
                    {crop.cropName}
                  </h2>

                  <p className="text-gray-600">
                    Type: {crop.cropType}
                  </p>

                  <p className="text-gray-600">
                    Quantity: {crop.quantity}
                  </p>

                  <p className="text-gray-600">
                    Farm: {crop.farmName}
                  </p>

                  <p className="text-gray-600">
                    Sowing: {crop.sowingDate}
                  </p>

                  <p className="text-gray-600">
                    Harvest: {crop.harvestDate}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                      View
                    </button>

                    <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                      Edit
                    </button>

                    <button className="bg-red-600 text-white px-4 py-2 rounded">
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

export default Crops;