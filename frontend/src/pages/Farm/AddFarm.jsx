import { useState } from "react"; import { useNavigate } from "react-router-dom"; import { addFarm } from "../../services/farm"; import DashboardLayout from "../../components/layout/DashboardLayout"; function AddFarm() { const navigate = useNavigate(); const [formData, setFormData] = useState({ farmName: "", farmType: "", areaSqMt: "", soilType: "", location: "", }); const [loading, setLoading] = useState(false); const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value, }); }; const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addFarm({
        ...formData,
        areaSqMt: Number(formData.areaSqMt),
      });

      alert("Farm added successfully!");

      navigate("/farm");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to add farm."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-sm border border-gray-100 rounded-3xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 ">Add Farm</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input type="text" name="farmName" placeholder="Farm Name" value={formData.farmName} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

        <input type="text" name="farmType" placeholder="Farm Type" value={formData.farmType} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

        <input type="number" name="areaSqMt" placeholder="Area (Sq. Mt.)" value={formData.areaSqMt} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

        <input type="text" name="soilType" placeholder="Soil Type" value={formData.soilType} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

        <button type="submit" disabled={loading} className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1" >
          {loading ? "Adding..." : "Add Farm"}
        </button>

      </form>
      </div>
    </DashboardLayout>
  );
}

export default AddFarm;