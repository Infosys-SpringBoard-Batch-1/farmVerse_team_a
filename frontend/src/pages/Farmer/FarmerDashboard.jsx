import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSeedling, FaLeaf, FaCloudSun, FaPlus, } from "react-icons/fa";
import { MapPin, Sprout, Wheat, Ruler } from "lucide-react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { getAllFarms } from "../../services/farm";

function FarmerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "Farmer";
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await getAllFarms();
      console.log("GET ALL FARMS RESPONSE:", response);
      console.log("Farm API Response:", response);
      // Backend returns:
      // {
      //   status,
      //   code,
      //   message,
      //   data:[]
      // }
      setFarms(response.farms || []);
      console.table(response.farms);
    } catch (err) {
      console.error("Error loading farms:", err);
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  const totalArea = farms.reduce( (sum, farm) => sum + Number(farm.areaSqMt ?? 0), 0 );
  const totalCrops = farms.reduce( (sum, farm) => sum + (farm.cropCount || 0),
    0
  );

  return (
    <DashboardLayout>
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 ">
          Farmer Dashboard
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Welcome back, {username}! Here's an overview of your farm.
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Farms */}
        <div className="bg-white h-40 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">My Farms</p>
              <h2 className="text-4xl font-extrabold mt-1 text-slate-800 ">
                {loading ? "..." : farms.length}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <FaSeedling className="text-3xl text-emerald-600 " />
            </div>
          </div>
        </div>

        {/* Crops */}
        <div className="bg-white h-40 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">My Crops</p>
              <h2 className="text-4xl font-extrabold mt-1 text-slate-800 ">
                {loading ? "..." : totalCrops}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <FaLeaf className="text-3xl text-amber-500 " />
            </div>
          </div>
        </div>

        {/* Total Area */}
        <div className="bg-white h-40 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Area</p>
              <h2 className="text-2xl font-extrabold mt-1 text-slate-800 ">
                {loading ? "..." : `${totalArea} sq.m`}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <FaCloudSun className="text-3xl text-cyan-600 " />
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="bg-white h-40 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300 group">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Action</p>
            <button onClick={() => navigate("/farm/add")} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]" >
              <FaPlus />
              Add Farm
            </button>
          </div>
        </div>
      </div>

      {/* Recent Farms */}

      <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 mt-10 p-8">

        <div className="flex justify-between items-center mb-8 border-b border-emerald-50 pb-4 bg-gradient-to-r from-emerald-50/50 to-transparent">
          <h2 className="text-2xl font-bold text-slate-800 ">
            My Farms
          </h2>
          <button onClick={() => navigate("/farm")} className="text-emerald-600 hover:text-emerald-700 font-semibold" >
            View All →
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 ">Loading farms...</p>
        ) : farms.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg mb-5">
              No farms added yet.
            </p>
            <button onClick={() => navigate("/farm/add")} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1" >
              Add Your First Farm
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> {farms.slice(0, 6).map((farm) => (
             <div key={farm.farmId} className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 hover:shadow-xl shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 group" >
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {farm.farmName}
                </h3>
                <div className="mt-4 space-y-2 text-sm text-gray-600 font-medium">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> {farm.location}</p>
                  <p className="flex items-center gap-2"><Sprout className="w-4 h-4 text-emerald-600" /> {farm.farmType}</p>
                  <p className="flex items-center gap-2"><Wheat className="w-4 h-4 text-emerald-600" /> {farm.cropCount} Crops</p>
                  <p className="flex items-center gap-2"><Ruler className="w-4 h-4 text-emerald-600" /> {farm.areaSqMt} sq.m</p>
                </div>
                <button onClick={() => navigate(`/farm/${farm.farmId}`)} className="mt-6 w-full bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 font-bold px-4 py-3 rounded-xl transition-colors shadow-sm" >
                  View Farm
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </DashboardLayout>
  );
}

export default FarmerDashboard;