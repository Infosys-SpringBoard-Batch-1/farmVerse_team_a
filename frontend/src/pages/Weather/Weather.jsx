import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  FaCloudSun,
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCloudRain,
  FaSun,
  FaMapMarkerAlt,
  FaEye,
  FaSmog,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Weather() {

  const forecast = [

    {
      day: "Mon",
      temp: "28°C",
      icon: <FaSun className="text-yellow-500 text-3xl" />,
    },

    {
      day: "Tue",
      temp: "29°C",
      icon: <FaCloudSun className="text-yellow-500 text-3xl" />,
    },

    {
      day: "Wed",
      temp: "27°C",
      icon: <FaCloudRain className="text-blue-500 text-3xl" />,
    },

    {
      day: "Thu",
      temp: "30°C",
      icon: <FaSun className="text-yellow-500 text-3xl" />,
    },

    {
      day: "Fri",
      temp: "31°C",
      icon: <FaSun className="text-yellow-500 text-3xl" />,
    },

    {
      day: "Sat",
      temp: "29°C",
      icon: <FaCloudSun className="text-yellow-500 text-3xl" />,
    },

    {
      day: "Sun",
      temp: "26°C",
      icon: <FaCloudRain className="text-blue-500 text-3xl" />,
    },

  ];

  const chartData = {

    labels: [
      "6AM",
      "9AM",
      "12PM",
      "3PM",
      "6PM",
      "9PM",
    ],

    datasets: [

      {

        label: "Temperature",

        data: [
          22,
          25,
          30,
          31,
          29,
          26,
        ],

        borderColor: "#16A34A",

        backgroundColor: "#16A34A",

        tension: 0.4,

      },

    ],

  };

  const chartOptions = {

    responsive: true,

    plugins: {

      legend: {

        display: false,

      },

    },

  };
    return (
    <DashboardLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Weather Dashboard

          </h1>

          <p className="text-gray-500 mt-2">

            Real-time weather insights for precision farming.

          </p>

        </div>

        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-lg">

          <FaMapMarkerAlt className="text-red-500" />

          <span className="font-medium">

            Bengaluru, Karnataka

          </span>

        </div>

      </div>

      {/* Hero Card */}

      <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 rounded-3xl shadow-xl text-white p-10">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-lg opacity-90">

              Current Weather

            </p>

            <h1 className="text-7xl font-bold mt-3">

              29°C

            </h1>

            <p className="text-2xl mt-3">

              Sunny

            </p>

            <p className="mt-3 opacity-90">

              Perfect weather for farming activities.

            </p>

          </div>

          <FaCloudSun className="text-[130px] text-yellow-300" />

        </div>

      </div>

      {/* Weather Statistics */}

      <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <FaTemperatureHigh className="text-red-500 text-5xl mx-auto mb-4" />

          <h3 className="font-semibold">

            Temperature

          </h3>

          <p className="text-3xl font-bold mt-2">

            29°C

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <FaTint className="text-blue-500 text-5xl mx-auto mb-4" />

          <h3 className="font-semibold">

            Humidity

          </h3>

          <p className="text-3xl font-bold mt-2">

            74%

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <FaWind className="text-gray-600 text-5xl mx-auto mb-4" />

          <h3 className="font-semibold">

            Wind

          </h3>

          <p className="text-3xl font-bold mt-2">

            12 km/h

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <FaCloudRain className="text-blue-600 text-5xl mx-auto mb-4" />

          <h3 className="font-semibold">

            Rain Chance

          </h3>

          <p className="text-3xl font-bold mt-2">

            15%

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <FaEye className="text-green-600 text-5xl mx-auto mb-4" />

          <h3 className="font-semibold">

            Visibility

          </h3>

          <p className="text-3xl font-bold mt-2">

            10 km

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <FaSmog className="text-purple-600 text-5xl mx-auto mb-4" />

          <h3 className="font-semibold">

            Air Quality

          </h3>

          <p className="text-3xl font-bold mt-2">

            Good

          </p>

        </div>

      </div>

      {/* Temperature Trend */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold">

            Temperature Trend

          </h2>

          <select className="border rounded-lg px-4 py-2">

            <option>Today</option>
            <option>Yesterday</option>

          </select>

        </div>

        <Line
          data={chartData}
          options={chartOptions}
        />

      </div>
            {/* 7-Day Forecast */}

      <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-8">

          7-Day Forecast

        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">

          {forecast.map((item, index) => (

            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-5 text-center hover:bg-green-50 transition"
            >

              <h3 className="font-semibold">

                {item.day}

              </h3>

              <div className="flex justify-center my-4">

                {item.icon}

              </div>

              <p className="font-bold text-xl">

                {item.temp}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Weather Alerts & Farming Advice */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Weather Alerts */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            🚨 Weather Alerts

          </h2>

          <div className="space-y-4">

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">

              <h3 className="font-semibold text-yellow-700">

                Moderate Heat

              </h3>

              <p className="text-gray-600 mt-1">

                Temperature may reach 31°C this afternoon.

              </p>

            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">

              <h3 className="font-semibold text-blue-700">

                Low Rain Probability

              </h3>

              <p className="text-gray-600 mt-1">

                No significant rainfall expected today.

              </p>

            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">

              <h3 className="font-semibold text-green-700">

                Ideal Farming Conditions

              </h3>

              <p className="text-gray-600 mt-1">

                Weather is favorable for field operations.

              </p>

            </div>

          </div>

        </div>

        {/* Smart Farming Recommendation */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            🌱 Smart Farming Recommendations

          </h2>

          <div className="space-y-4">

            <div className="bg-green-50 p-4 rounded-xl">

              ✅ Excellent weather for irrigation today.

            </div>

            <div className="bg-green-50 p-4 rounded-xl">

              ✅ Good conditions for sowing crops.

            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">

              ⚠ Monitor humidity to prevent fungal diseases.

            </div>

            <div className="bg-blue-50 p-4 rounded-xl">

              🌧 No heavy rainfall expected in the next 24 hours.

            </div>

            <div className="bg-purple-50 p-4 rounded-xl">

              🤖 AI suggests watering tomato crops during evening hours.

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Highlights */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-green-600 text-white rounded-2xl p-6">

          <h3 className="text-lg font-semibold">

            Best Time for Irrigation

          </h3>

          <p className="text-3xl font-bold mt-4">

            5:30 PM

          </p>

        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6">

          <h3 className="text-lg font-semibold">

            UV Index

          </h3>

          <p className="text-3xl font-bold mt-4">

            Moderate (6)

          </p>

        </div>

        <div className="bg-orange-500 text-white rounded-2xl p-6">

          <h3 className="text-lg font-semibold">

            Pressure

          </h3>

          <p className="text-3xl font-bold mt-4">

            1012 hPa

          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Weather;