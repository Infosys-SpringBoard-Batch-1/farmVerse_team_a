import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FaPlus,
  FaMapMarkerAlt,
  FaSeedling,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function Farm() {
  return (
    <DashboardLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Farm Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your farms from one place.
          </p>

        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg">

          <FaPlus />

          Add Farm

        </button>

      </div>

      {/* Farm Summary */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Total Farms
          </h2>

          <h1 className="text-4xl font-bold mt-4 text-green-700">
            12
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Total Area
          </h2>

          <h1 className="text-4xl font-bold mt-4 text-blue-600">
            95 Acres
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Healthy Crops
          </h2>

          <h1 className="text-4xl font-bold mt-4 text-green-600">
            96%
          </h1>

        </div>

      </div>

      {/* Farm Cards */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Card 1 */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000"
            alt="Farm"
            className="h-60 w-full object-cover"
          />

          <div className="p-6">

            <div className="flex justify-between">

              <h2 className="text-2xl font-bold">
                Green Valley Farm
              </h2>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Active
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                Mysuru
              </p>

              <p className="flex items-center gap-2">
                <FaSeedling className="text-green-600" />
                Rice
              </p>

              <p>
                Area : 12 Acres
              </p>

              <p>
                Soil : Clay
              </p>

            </div>

            <div className="flex gap-4 mt-6">

              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2">

                <FaEdit />

                Edit

              </button>

              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2">

                <FaTrash />

                Delete

              </button>

            </div>

          </div>

        </div>

        {/* Card 2 */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">

          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1000"
            alt="Farm"
            className="h-60 w-full object-cover"
          />

          <div className="p-6">

            <div className="flex justify-between">

              <h2 className="text-2xl font-bold">
                Sunrise Farm
              </h2>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                Monitoring
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                Bengaluru
              </p>

              <p className="flex items-center gap-2">
                <FaSeedling className="text-green-600" />
                Wheat
              </p>

              <p>
                Area : 18 Acres
              </p>

              <p>
                Soil : Loamy
              </p>

            </div>

            <div className="flex gap-4 mt-6">

              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2">

                <FaEdit />

                Edit

              </button>

              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2">

                <FaTrash />

                Delete

              </button>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Farm;