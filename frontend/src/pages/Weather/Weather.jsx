import { useEffect, useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiCloud,
} from "react-icons/wi";


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function Weather() {
  const [city, setCity] = useState("Bengaluru");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);

      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      const next = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      setWeather(current.data);

      const daily = next.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(daily);
    } catch (err) {
      alert("Unable to fetch weather.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🌦 Weather Dashboard
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          className="border rounded-lg p-3 w-80"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search City"
        />

        <button
          onClick={() => fetchWeather(city)}
          className="bg-green-600 text-white px-6 rounded-lg hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {loading && (
        <h2 className="text-lg font-semibold">Loading...</h2>
      )}

      {weather && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-8">

            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-4xl font-bold">
                  {weather.main.temp}°C
                </h2>

                <p className="text-xl capitalize">
                  {weather.weather[0].description}
                </p>

                <p className="text-gray-500">
                  📍 {weather.name}
                </p>
              </div>

              <WiDaySunny className="text-yellow-500 text-8xl" />

            </div>

            <div className="grid grid-cols-4 gap-6 mt-8">

              <div className="bg-gray-50 rounded-lg p-5 text-center">
                <WiHumidity className="text-5xl mx-auto text-blue-600" />
                <h3 className="font-semibold mt-2">Humidity</h3>
                <p>{weather.main.humidity}%</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 text-center">
                <WiStrongWind className="text-5xl mx-auto text-green-600" />
                <h3 className="font-semibold mt-2">Wind</h3>
                <p>{weather.wind.speed} m/s</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 text-center">
                <WiCloud className="text-5xl mx-auto text-gray-500" />
                <h3 className="font-semibold mt-2">Clouds</h3>
                <p>{weather.clouds.all}%</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 text-center">
                <h3 className="font-semibold">Pressure</h3>
                <p className="text-3xl mt-3">
                  {weather.main.pressure}
                </p>
                <p>hPa</p>
              </div>

            </div>

          </div>

          <h2 className="text-2xl font-bold mt-10 mb-5">
            5-Day Forecast
          </h2>

          <div className="grid grid-cols-5 gap-5">

            {forecast.map((day) => (
              <div
                key={day.dt}
                className="bg-white rounded-xl shadow-md p-5 text-center"
              >
                <h3 className="font-bold">
                  {new Date(day.dt_txt).toLocaleDateString("en-IN", {
                    weekday: "short",
                  })}
                </h3>

                <WiDaySunny className="text-yellow-500 text-6xl mx-auto" />

                <p className="text-2xl font-bold mt-3">
                  {Math.round(day.main.temp)}°
                </p>

                <p className="capitalize text-gray-500">
                  {day.weather[0].description}
                </p>
              </div>
            ))}

          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mt-10">

            <h2 className="text-2xl font-bold text-green-700">
              🌾 Smart Farming Recommendation
            </h2>

            <ul className="list-disc ml-6 mt-4 space-y-2">

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

          </div>
        </>
      )}
    </div>
  );
}