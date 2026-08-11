import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "b2cf1d2569d8676de02b88f8e7b98ec2";

export default function SmartFarmingRecommendation({ defaultCity = "Bengaluru", hideInput = false }) {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      setLoading(true);
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(current.data);
    } catch (err) {
      console.error("Unable to fetch weather for recommendation:", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [defaultCity]);

  // If hideInput is true and defaultCity changes, we should update the city state
  useEffect(() => {
    if (hideInput) {
      setCity(defaultCity);
    }
  }, [defaultCity, hideInput]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌾</span>
          <h2 className="text-2xl font-bold text-emerald-800">
            Smart Farming Recommendation
          </h2>
        </div>
      </div>

      {!hideInput && (
        <div className="flex gap-3 mb-6">
          <input
            className="border border-gray-200 rounded-xl p-3 flex-1 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter Location"
          />
          <button
            onClick={() => fetchWeather(city)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-xl font-semibold shadow-md shadow-emerald-500/30 transition-all hover:-translate-y-1"
          >
            Get Recommendation
          </button>
        </div>
      )}

      <div className="flex-1 bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-2xl p-6">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading recommendations...</p>
        ) : weather ? (
          <ul className="list-disc ml-4 space-y-3 text-emerald-900/80 text-lg">
            {weather.main.humidity > 80 ? (
              <li>High humidity. Monitor crops for fungal diseases.</li>
            ) : (
              <li>Humidity is suitable for healthy crop growth.</li>
            )}
            {weather.wind.speed > 8 ? (
              <li>Avoid pesticide spraying due to strong winds.</li>
            ) : (
              <li>Wind conditions are favorable for spraying.</li>
            )}
            {weather.weather[0].main === "Rain" ? (
              <li>Rain expected. Postpone irrigation today.</li>
            ) : (
              <li>No significant rain expected. Irrigation can continue if required.</li>
            )}
          </ul>
        ) : (
          <p className="text-red-500">Could not load recommendations for this location.</p>
        )}
      </div>
    </div>
  );
}
