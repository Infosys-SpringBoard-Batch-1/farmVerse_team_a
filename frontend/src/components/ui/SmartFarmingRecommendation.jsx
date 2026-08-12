import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "b2cf1d2569d8676de02b88f8e7b98ec2";

export default function SmartFarmingRecommendation() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Raichur");

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      setLoading(true);
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(current.data);
    } catch (err) {
      console.error("Unable to fetch weather.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🌾</span>
        <h2 className="text-2xl font-bold text-emerald-800">
          Smart Farming Recommendation
        </h2>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        />
        <button
          onClick={() => fetchWeather(city)}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : "Get Recommendation"}
        </button>
      </div>

      {weather && (
        <div className="bg-emerald-50/50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
          <ul className="space-y-3 text-emerald-900/80 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span>
                {weather.main.humidity > 80 
                  ? "High humidity. Monitor crops for fungal diseases." 
                  : "Humidity is suitable for healthy crop growth."}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span>
                {weather.wind.speed > 8 
                  ? "Avoid pesticide spraying due to strong winds." 
                  : "Wind conditions are favorable for spraying."}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span>
                {weather.weather[0].main === "Rain" 
                  ? "Rain expected. Postpone irrigation today." 
                  : "No significant rain expected. Irrigation can continue if required."}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
