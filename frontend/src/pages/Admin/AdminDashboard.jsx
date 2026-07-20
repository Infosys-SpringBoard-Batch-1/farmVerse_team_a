import DashboardLayout from "../../components/layout/DashboardLayout";

function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-4xl font-bold text-green-700">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          Welcome to the FarmVerse Admin Panel.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-500">Total Farmers</h2>
            <p className="text-3xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-500">Total Farms</h2>
            <p className="text-3xl font-bold mt-2">85</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-500">Total Crops</h2>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;