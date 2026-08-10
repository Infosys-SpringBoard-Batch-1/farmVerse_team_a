import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCropById, updateCrop } from "../../services/crop";
import { useNotifications } from "../../hooks/useNotifications"; export default function EditCrop() { const { farmId, cropId } = useParams(); const navigate = useNavigate(); const { addNotification } = useNotifications(); const [form, setForm] = useState({ cropName: "", cropType: "", quantity: "", sowingDate: "", harvestDate: "", revenue: "", }); const [loading, setLoading] = useState(false); const [initialLoading, setInitialLoading] = useState(true); useEffect(() => { fetchCrop(); }, [cropId]); const fetchCrop = async () => { try { const data = await getCropById(cropId); setForm({ cropName: data.crop.cropName, cropType: data.crop.cropType, quantity: data.crop.quantity, sowingDate: data.crop.sowingDate, harvestDate: data.crop.harvestDate, revenue: data.crop.revenue || "", }); } catch (err) { alert("Failed to load crop details."); } finally { setInitialLoading(false); } }; const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value, }); }; const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateCrop(cropId, {
        farmId: Number(farmId),
        cropName: form.cropName,
        cropType: form.cropType,
        quantity: Number(form.quantity),
        sowingDate: form.sowingDate,
        harvestDate: form.harvestDate,
        revenue: Number(form.revenue),
      });

      addNotification(`Successfully updated ${form.cropName} details.`, 'success');
      alert("Crop updated successfully!");
      navigate(`/farm/${farmId}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update crop.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-xl">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto mt-6">
        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Edit Crop
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">Crop Name</label>
              <input type="text" name="cropName" value={form.cropName} onChange={handleChange} placeholder="Enter crop name" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">Crop Type</label>
              <input type="text" name="cropType" value={form.cropType} onChange={handleChange} placeholder="e.g. Kharif, Rabi, Organic" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">Quantity</label>
              <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Enter quantity" min="1" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 ">Sowing Date</label>
                <input type="date" name="sowingDate" value={form.sowingDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 ">Harvest Date</label>
                <input type="date" name="harvestDate" value={form.harvestDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ">Revenue (₹)</label>
              <input type="number" step="0.01" name="revenue" value={form.revenue} onChange={handleChange} placeholder="Enter total revenue in exact ₹ (e.g. 260000)" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0" >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={() => navigate(`/farm/${farmId}`)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-4 rounded-xl transition-all" >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
