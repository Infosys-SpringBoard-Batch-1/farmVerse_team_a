import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { addCrop } from "../../services/crop";

export default function AddCrop() {
  const { id } = useParams(); // Farm ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cropName: "",
    cropType: "",
    quantity: "",
    sowingDate: "",
    harvestDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addCrop({
        farmId: Number(id),
        cropName: form.cropName,
        cropType: form.cropType,
        quantity: Number(form.quantity),
        sowingDate: form.sowingDate,
        harvestDate: form.harvestDate,
      });

      alert("Crop added successfully!");

      navigate(`/farm/${id}`);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to add crop."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-green-700 mb-8">
            Add Crop
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Crop Name
              </label>

              <input
                type="text"
                name="cropName"
                value={form.cropName}
                onChange={handleChange}
                placeholder="Enter crop name"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Crop Type
              </label>

              <input
                type="text"
                name="cropType"
                value={form.cropType}
                onChange={handleChange}
                placeholder="e.g. Kharif, Rabi, Organic"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="1"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Sowing Date
              </label>

              <input
                type="date"
                name="sowingDate"
                value={form.sowingDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Harvest Date
              </label>

              <input
                type="date"
                name="harvestDate"
                value={form.harvestDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Save Crop"}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/farm/${id}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      </div>
    </DashboardLayout>
  );
}