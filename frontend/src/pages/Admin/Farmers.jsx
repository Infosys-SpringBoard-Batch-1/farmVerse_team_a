import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { FaUsers, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ fullName: "", username: "", email: "", password: "", role: "FARMER" });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const farmersRes = await api.get("/farmverse/admin/viewFarmers");
      setFarmers(farmersRes.data || []);
    } catch (err) {
      console.error("Failed to fetch farmers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (username) => {
    if (!window.confirm(`Are you sure you want to delete the user: ${username}?`)) return;
    try {
      await api.delete(`/farmverse/admin/deleteFarmer/${username}`);
      fetchData();
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Failed to delete user.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);
    try {
      const endpoint = addForm.role === "ADMIN" ? "/farmverse/admin/addAdmin" : "/farmverse/admin/addFarmer";
      const payload = { ...addForm };
      delete payload.role;

      const res = await api.post(endpoint, payload);
      if (res.data.status === "error") {
        setAddError(res.data.message);
        return;
      }
      setShowAddModal(false);
      setAddForm({ fullName: "", username: "", email: "", password: "", role: "FARMER" });
      fetchData();
    } catch (err) {
      console.error("Failed to add user", err);
      setAddError(err.response?.data?.message || "An error occurred.");
    } finally {
      setAddLoading(false);
    }
  };

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
              User Management
            </h1>
            <p className="mt-2 text-gray-500 text-lg">
              Manage all farmers and admins on the platform.
            </p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 font-semibold transition-all hover:-translate-y-1" >
            <FaPlus /> Add User
          </button>
        </div>

        {/* Farmers Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
          <div className="p-8 border-b border-emerald-50 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-transparent">
            <h2 className="text-2xl font-bold text-slate-800 ">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 ">
                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider">Farms Owned</th>
                  <th className="py-5 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 "> {farmers.map((farmer, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-8">
                      <div className="font-semibold text-slate-800 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <FaUsers />
                        </div>
                        {farmer.fullName}
                      </div>
                    </td>
                    <td className="py-5 px-8 text-gray-500 ">@{farmer.username}</td>
                    <td className="py-5 px-8">
                      <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-sm font-bold">
                        {farmer.farmCount} Farms
                      </span>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <button onClick={() => handleDelete(farmer.username)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete User" >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {farmers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-gray-500">
                      No users registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-emerald-50 bg-emerald-50/30">
              <h2 className="text-2xl font-bold text-slate-800 ">Add New User</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-emerald-600 transition-colors">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-5">
              {addError && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{addError}</div>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select value={addForm.role} onChange={(e) => setAddForm({...addForm, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" >
                  <option value="FARMER">Farmer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" required value={addForm.fullName} onChange={(e) => setAddForm({...addForm, fullName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input type="text" required value={addForm.username} onChange={(e) => setAddForm({...addForm, username: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="johndoe123" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" required value={addForm.email} onChange={(e) => setAddForm({...addForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" required minLength={6} value={addForm.password} onChange={(e) => setAddForm({...addForm, password: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="••••••••" />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors" >
                  Cancel
                </button>
                <button type="submit" disabled={addLoading} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50" >
                  {addLoading ? "Saving..." : `Add ${addForm.role === 'ADMIN' ? 'Admin' : 'Farmer'}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

export default Farmers;