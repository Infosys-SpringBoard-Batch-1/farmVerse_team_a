import { useNavigate } from "react-router-dom";
import {
  Sprout,
  CloudSun,
  Brain,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-3">
          <Sprout className="text-green-600 w-8 h-8" />
          <h1 className="text-3xl font-bold text-green-700">
            FarmVerse
          </h1>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-10 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            🌱 Smart Agriculture Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight">

            Revolutionizing

            <span className="text-green-600">
              {" "}Modern Farming
            </span>

          </h1>

          <p className="mt-8 text-xl text-gray-600 leading-9">

            FarmVerse helps farmers manage crops, monitor farms,
            receive AI recommendations, weather insights,
            and analytics — all from one intelligent dashboard.

          </p>

          <div className="mt-10 flex gap-5">

            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 text-lg shadow-lg"
            >
              Get Started

              <ArrowRight size={22} />
            </button>

            <button
              className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-xl hover:bg-green-50"
            >
              Learn More
            </button>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200"
            alt="Farm"
            className="rounded-3xl shadow-2xl"
          />

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto py-24 px-10">

        <h2 className="text-5xl font-bold text-center">
          Everything You Need
        </h2>

        <p className="text-center mt-4 text-gray-500 text-lg">
          Powerful tools designed for smart farming.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          <FeatureCard
            icon={<Sprout size={38} />}
            title="Crop Management"
            text="Track every crop with complete lifecycle management."
          />

          <FeatureCard
            icon={<CloudSun size={38} />}
            title="Weather"
            text="Live weather forecasts with farming insights."
          />

          <FeatureCard
            icon={<Brain size={38} />}
            title="AI Recommendation"
            text="Smart crop suggestions powered by AI."
          />

          <FeatureCard
            icon={<BarChart3 size={38} />}
            title="Analytics"
            text="Visualize production and monitor farm performance."
          />

        </div>

      </section>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300">

      <div className="text-green-600">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600 leading-7">
        {text}
      </p>

    </div>
  );
}