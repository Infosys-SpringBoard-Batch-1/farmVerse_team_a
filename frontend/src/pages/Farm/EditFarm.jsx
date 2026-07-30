import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getFarmById, updateFarm } from "../../services/farm";

function EditFarm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    farmName: "",
    farmType: "",
    areaSqMt: "",
    soilType: "",
    location: "",
  });

  useEffect(() => {
    loadFarm();
  }, []);

  const loadFarm = async () => {
    try {
      const response = await getFarmById(id);

      const farm = response.farm;

      setFormData({
        farmName: farm.farmName,
        farmType: farm.farmType,
        areaSqMt: farm.areaSqMt,
        soilType: farm.soilType,
        location: farm.location,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load farm.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateFarm(id, {
        ...formData,
        areaSqMt: Number(formData.areaSqMt),
      });

      alert("Farm updated successfully!");

      navigate("/farm");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to update farm."
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Farm
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="farmName"
            value={formData.farmName}
            onChange={handleChange}
            placeholder="Farm Name"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="farmType"
            value={formData.farmType}
            onChange={handleChange}
            placeholder="Farm Type"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="areaSqMt"
            value={formData.areaSqMt}
            onChange={handleChange}
            placeholder="Area"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            placeholder="Soil Type"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
          >
            Update Farm
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default EditFarm;