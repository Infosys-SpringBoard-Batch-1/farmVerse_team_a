import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FaRobot,
  FaLeaf,
  FaTemperatureHigh,
  FaTint,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

function AIRecommendation() {
  return (
    <DashboardLayout>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            AI Crop Recommendation
          </h1>

          <p className="text-gray-500 mt-2">
            Smart AI-powered recommendations for better farming decisions.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg">
          Generate Recommendation
        </button>
      </div>

      {/* Form */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-8">
          Enter Farm Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Farm Location"
            className="border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select className="border rounded-xl p-4">
            <option>Select Soil Type</option>
            <option>Loamy</option>
            <option>Clay</option>
            <option>Sandy</option>
            <option>Black Soil</option>
          </select>

          <input
            type="number"
            placeholder="Temperature (°C)"
            className="border rounded-xl p-4"
          />

          <input
            type="number"
            placeholder="Humidity (%)"
            className="border rounded-xl p-4"
          />

          <input
            type="number"
            placeholder="Rainfall (mm)"
            className="border rounded-xl p-4"
          />

          <input
            type="number"
            placeholder="Soil pH"
            className="border rounded-xl p-4"
          />

        </div>

      </div>

      {/* Recommendation Cards */}

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-green-50 rounded-2xl p-6 shadow">

          <FaLeaf
            size={40}
            className="text-green-600"
          />

          <p className="mt-5 text-gray-500">
            Recommended Crop
          </p>

          <h2 className="text-3xl font-bold text-green-700 mt-2">
            Rice
          </h2>

        </div>

        <div className="bg-blue-50 rounded-2xl p-6 shadow">

          <FaRobot
            size={40}
            className="text-blue-600"
          />

          <p className="mt-5 text-gray-500">
            AI Confidence
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-2">
            97%
          </h2>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-6 shadow">

          <FaTemperatureHigh
            size={40}
            className="text-red-500"
          />

          <p className="mt-5 text-gray-500">
            Expected Yield
          </p>

          <h2 className="text-3xl font-bold text-yellow-700 mt-2">
            High
          </h2>

        </div>

        <div className="bg-cyan-50 rounded-2xl p-6 shadow">

          <FaTint
            size={40}
            className="text-cyan-600"
          />

          <p className="mt-5 text-gray-500">
            Water Requirement
          </p>

          <h2 className="text-3xl font-bold text-cyan-700 mt-2">
            Medium
          </h2>

        </div>

      </div>

      {/* AI Explanation */}

      <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

        <div className="flex items-center gap-3 mb-8">

          <FaRobot
            size={40}
            className="text-green-600"
          />

          <div>

            <h2 className="text-3xl font-bold">
              AI Analysis
            </h2>

            <p className="text-gray-500">
              Why AI selected this crop
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex items-start gap-4 bg-green-50 rounded-xl p-5">

            <FaCheckCircle className="text-green-600 mt-1" />

            <p>
              Soil nutrients are ideal for cultivating Rice.
            </p>

          </div>

          <div className="flex items-start gap-4 bg-green-50 rounded-xl p-5">

            <FaCheckCircle className="text-green-600 mt-1" />

            <p>
              Current rainfall prediction supports healthy growth.
            </p>

          </div>

          <div className="flex items-start gap-4 bg-green-50 rounded-xl p-5">

            <FaCheckCircle className="text-green-600 mt-1" />

            <p>
              Temperature and humidity are within the recommended range.
            </p>

          </div>

          <div className="flex items-start gap-4 bg-green-50 rounded-xl p-5">

            <FaCheckCircle className="text-green-600 mt-1" />

            <p>
              AI predicts approximately 95–98% yield with proper irrigation.
            </p>

          </div>

        </div>

      </div>

      {/* Future Integration */}

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Farm Information
          </h2>

          <div className="space-y-4">

            <p>
              <FaMapMarkerAlt className="inline mr-2 text-red-500" />
              Bengaluru
            </p>

            <p>🌾 Soil : Loamy</p>

            <p>🌧 Rainfall : 120 mm</p>

            <p>🌡 Temperature : 29°C</p>

            <p>💧 Humidity : 74%</p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Future AI Features
          </h2>

          <ul className="space-y-3 text-gray-600">

            <li>✅ Fertilizer Recommendation</li>

            <li>✅ Disease Detection</li>

            <li>✅ Pest Prediction</li>

            <li>✅ Harvest Prediction</li>

            <li>✅ Profit Estimation</li>

          </ul>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AIRecommendation;