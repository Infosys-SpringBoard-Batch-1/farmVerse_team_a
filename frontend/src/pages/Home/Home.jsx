import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaRobot,
  FaCloudSun,
  FaTint,
  FaChartLine,
  FaSeedling,
} from "react-icons/fa";

function Home() {

  const navigate = useNavigate();

  return (
    <>

      <Navbar />

      <main className="bg-slate-50">

        {/* Hero Section */}

        <section className="relative min-h-screen flex items-center">

          <img
            src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Farm"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative max-w-7xl mx-auto px-8">

            <span className="bg-green-600 text-white px-5 py-2 rounded-full">

              AI Powered Precision Agriculture

            </span>

            <h1 className="text-6xl lg:text-7xl font-bold text-white mt-8 leading-tight">

              Smart Farming

              <br />

              Made Intelligent

            </h1>

            <p className="text-xl text-gray-200 mt-8 max-w-2xl leading-9">

              FarmVerse helps farmers monitor crops, predict weather,
              manage irrigation and make better farming decisions
              using Artificial Intelligence.

            </p>

            <div className="flex gap-5 mt-10">

              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3"
              >

                Get Started

                <FaArrowRight />

              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >

                Learn More

              </button>

            </div>

          </div>

        </section>

        {/* Features */}

        <section
          id="features"
          className="max-w-7xl mx-auto py-24 px-8"
        >

          <div className="text-center">

            <h2 className="text-5xl font-bold">

              Our Features

            </h2>

            <p className="text-gray-500 mt-5 text-lg">

              Everything needed for smart farming.

            </p>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 mt-16">
                        {/* AI Recommendation */}

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">

              <FaRobot className="text-5xl text-green-600 mb-6" />

              <h3 className="text-2xl font-bold">

                AI Recommendation

              </h3>

              <p className="mt-4 text-gray-500 leading-8">

                Smart crop suggestions using Artificial Intelligence based on
                soil, weather and historical farm data.

              </p>

            </div>

            {/* Weather */}

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">

              <FaCloudSun className="text-5xl text-yellow-500 mb-6" />

              <h3 className="text-2xl font-bold">

                Weather Forecast

              </h3>

              <p className="mt-4 text-gray-500 leading-8">

                Real-time weather updates including rainfall,
                humidity, wind speed and temperature.

              </p>

            </div>

            {/* Irrigation */}

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">

              <FaTint className="text-5xl text-blue-500 mb-6" />

              <h3 className="text-2xl font-bold">

                Smart Irrigation

              </h3>

              <p className="mt-4 text-gray-500 leading-8">

                Optimize irrigation schedules using AI to save
                water and improve crop productivity.

              </p>

            </div>

            {/* Analytics */}

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">

              <FaChartLine className="text-5xl text-purple-600 mb-6" />

              <h3 className="text-2xl font-bold">

                Analytics

              </h3>

              <p className="mt-4 text-gray-500 leading-8">

                Interactive dashboards with crop reports,
                yield prediction and farm performance.

              </p>

            </div>

            {/* Sustainable */}

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">

              <FaSeedling className="text-5xl text-green-700 mb-6" />

              <h3 className="text-2xl font-bold">

                Sustainable Farming

              </h3>

              <p className="mt-4 text-gray-500 leading-8">

                Eco-friendly precision farming with better
                resource utilization and reduced wastage.

              </p>

            </div>

            {/* Future Ready */}

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">

              <FaArrowRight className="text-5xl text-red-500 mb-6" />

              <h3 className="text-2xl font-bold">

                Future Ready

              </h3>

              <p className="mt-4 text-gray-500 leading-8">

                Built for Artificial Intelligence,
                IoT devices and next-generation
                smart agriculture solutions.

              </p>

            </div>

          </div>

        </section>

        {/* Statistics */}

        <section className="bg-gradient-to-r from-green-700 to-green-500 py-24">

          <div className="max-w-7xl mx-auto px-8">

            <div className="text-center text-white">

              <h2 className="text-5xl font-bold">

                Trusted by Farmers

              </h2>

              <p className="mt-5 text-xl">

                Making agriculture smarter every single day.

              </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center text-white">

                <h1 className="text-6xl font-bold">

                  500+

                </h1>

                <p className="mt-4 text-xl">

                  Farmers

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center text-white">

                <h1 className="text-6xl font-bold">

                  2500+

                </h1>

                <p className="mt-4 text-xl">

                  Acres Managed

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center text-white">

                <h1 className="text-6xl font-bold">

                  98%

                </h1>

                <p className="mt-4 text-xl">

                  AI Accuracy

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center text-white">

                <h1 className="text-6xl font-bold">

                  24/7

                </h1>

                <p className="mt-4 text-xl">

                  Monitoring

                </p>

              </div>

            </div>

          </div>

        </section>
                {/* Why Choose Us */}

        <section className="max-w-7xl mx-auto py-24 px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}

            <div>

              <img
                src="https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Farmer"
                className="rounded-3xl shadow-2xl"
              />

            </div>

            {/* Content */}

            <div>

              <h2 className="text-5xl font-bold text-slate-800">

                Why Choose FarmVerse?

              </h2>

              <p className="text-gray-600 mt-8 text-lg leading-9">

                FarmVerse combines Artificial Intelligence,
                weather forecasting, smart irrigation,
                farm analytics and precision agriculture
                into one powerful platform helping farmers
                increase productivity while reducing cost.

              </p>

              <div className="space-y-5 mt-10">

                <div className="bg-green-50 p-5 rounded-xl hover:shadow-md transition">

                  ✅ AI-Based Crop Recommendation

                </div>

                <div className="bg-green-50 p-5 rounded-xl hover:shadow-md transition">

                  ✅ Real-Time Weather Updates

                </div>

                <div className="bg-green-50 p-5 rounded-xl hover:shadow-md transition">

                  ✅ Smart Irrigation Monitoring

                </div>

                <div className="bg-green-50 p-5 rounded-xl hover:shadow-md transition">

                  ✅ Interactive Analytics Dashboard

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Call To Action */}

        <section className="bg-slate-900 py-24">

          <div className="max-w-5xl mx-auto text-center px-8">

            <h2 className="text-5xl font-bold text-white">

              Ready to Transform Farming?

            </h2>

            <p className="text-gray-300 text-xl mt-6 leading-9">

              Join thousands of farmers using FarmVerse to
              increase crop productivity with AI-powered
              precision agriculture.

            </p>

            <div className="flex justify-center gap-6 mt-10">

              <button
                onClick={() => navigate("/register")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition"
              >

                Get Started

              </button>

              <button
                onClick={() => navigate("/login")}
                className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >

                Login

              </button>

            </div>

          </div>

        </section>

      </main>

    </>

  );

}

export default Home;