import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFarm } from "../../services/farm";

function AddFarm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    farmName: "",
    farmType: "",
    areaSqMt: "",
    soilType: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">Add Farm</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="farmName"
          placeholder="Farm Name"
          value={formData.farmName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="farmType"
          placeholder="Farm Type"
          value={formData.farmType}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="areaSqMt"
          placeholder="Area (Sq. Mt.)"
          value={formData.areaSqMt}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="soilType"
          placeholder="Soil Type"
          value={formData.soilType}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          {loading ? "Adding..." : "Add Farm"}
        </button>

      </form>
    </div>
  );
}

export default AddFarm;