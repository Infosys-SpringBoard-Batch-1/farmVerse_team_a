import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Crop Yield",
        data: [62, 70, 78, 85, 90, 96],
        borderColor: "#16A34A",
        backgroundColor: "#16A34A",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Rice", "Wheat", "Corn", "Cotton", "Tomato"],
    datasets: [
      {
        label: "Production",
        data: [95, 80, 72, 64, 90],
        backgroundColor: [
          "#22C55E",
          "#3B82F6",
          "#FACC15",
          "#F97316",
          "#EF4444",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Rice", "Wheat", "Corn", "Vegetables"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          "#16A34A",
          "#3B82F6",
          "#FACC15",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor farm productivity and business insights.
          </p>

        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg">
          Export Report
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            Total Production
          </h2>

          <h1 className="text-4xl font-bold mt-4 text-green-700">
            520 Tons
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            Revenue
          </h2>

          <h1 className="text-4xl font-bold mt-4 text-blue-600">
            ₹18.5L
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            Water Saved
          </h2>

          <h1 className="text-4xl font-bold mt-4 text-cyan-600">
            24%
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            AI Accuracy
          </h2>

          <h1 className="text-4xl font-bold mt-4 text-purple-600">
            96%
          </h1>

        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Crop Yield Trend
          </h2>

          <Line data={lineData} />

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Crop Production
          </h2>

          <Bar data={barData} />

        </div>

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-3 gap-8 mt-10">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Crop Distribution
          </h2>

          <Pie data={pieData} />

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">

          <h2 className="text-2xl font-bold mb-6">
            Monthly Report
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Month</th>

                <th className="text-left">Production</th>

                <th className="text-left">Revenue</th>

                <th className="text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-4">January</td>

                <td>80 Tons</td>

                <td>₹2.6L</td>

                <td className="text-green-600 font-semibold">
                  Excellent
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-4">February</td>

                <td>85 Tons</td>

                <td>₹2.9L</td>

                <td className="text-green-600 font-semibold">
                  Excellent
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-4">March</td>

                <td>90 Tons</td>

                <td>₹3.2L</td>

                <td className="text-blue-600 font-semibold">
                  Good
                </td>

              </tr>

              <tr>

                <td className="py-4">April</td>

                <td>95 Tons</td>

                <td>₹3.7L</td>

                <td className="text-green-600 font-semibold">
                  Excellent
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Analytics;