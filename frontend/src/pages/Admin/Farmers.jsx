import DashboardLayout from "../../components/Layout/DashboardLayout";

function Farms() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-green-700">
          Farms Management
        </h1>

        <p className="text-gray-500 mt-3">
          This page will allow the admin to manage all farms.
        </p>

      </div>
    </DashboardLayout>
  );
}

export default Farms;