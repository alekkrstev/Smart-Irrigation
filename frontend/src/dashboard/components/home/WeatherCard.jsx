import { useEffect, useState } from "react";
import { getCurrentWeather, getWeatherForecast } from "../../../api/weatherApi";

const WEATHER_CITY_KEY = "smartAgroWeatherCity";

function WeatherCard({ defaultCity = "Skopje", onWeatherChange }) {
  const getInitialCity = () => {
    return localStorage.getItem(WEATHER_CITY_KEY) || defaultCity;
  };

  const [cityInput, setCityInput] = useState(getInitialCity);
  const [selectedCity, setSelectedCity] = useState(getInitialCity);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherIcon = (description) => {
    if (!description) return "🌤️";

    const desc = description.toLowerCase();

    if (desc.includes("clear")) return "☀️";
    if (desc.includes("cloud")) return "☁️";
    if (desc.includes("rain")) return "🌧️";
    if (desc.includes("storm") || desc.includes("thunder")) return "⛈️";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("mist") || desc.includes("fog")) return "🌫️";

    return "🌤️";
  };

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError("");

        localStorage.setItem(WEATHER_CITY_KEY, selectedCity);

        const current = await getCurrentWeather(selectedCity);
        const forecastData = await getWeatherForecast(selectedCity);

        setCurrentWeather(current);
        setForecast(forecastData);

        if (onWeatherChange) {
          onWeatherChange(current);
        }
      } catch (err) {
        console.error(err);
        setError("Не може да се вчита временската прогноза.");
        setCurrentWeather(null);
        setForecast([]);

        if (onWeatherChange) {
          onWeatherChange(null);
        }
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [selectedCity, onWeatherChange]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedCity = cityInput.trim();

    if (!cleanedCity) return;

    setSelectedCity(cleanedCity);
  };

  return (
    <div className="card fade-in fade-in-5" style={{ padding: "18px 22px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 14,
            color: "var(--text)",
          }}
        >
          🌞 Временска прогноза
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Внеси град..."
            style={{
              width: 150,
              padding: "8px 10px",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              outline: "none",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--text)",
              background: "#fff",
            }}
          />

          <button
            type="submit"
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "8px 12px",
              background: "var(--green-600)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Прикажи
          </button>
        </form>
      </div>

      {loading && (
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Се вчитува временската прогноза...
        </div>
      )}

      {error && !loading && (
        <div style={{ fontSize: 13, color: "#ef4444", fontWeight: 700 }}>
          {error}
        </div>
      )}

      {!loading && !error && currentWeather && (
        <>
          <div
            style={{
              marginBottom: 14,
              padding: "12px 14px",
              borderRadius: "var(--r)",
              background: "var(--green-50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Моментално време — {currentWeather.city}
              </div>

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "var(--text)",
                }}
              >
                {getWeatherIcon(currentWeather.description)}{" "}
                {Math.round(currentWeather.temperature)}°C
              </div>
            </div>

            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                fontWeight: 700,
                textAlign: "right",
              }}
            >
              <div>💧 {currentWeather.humidity}% влажност</div>
              <div>🌬️ {currentWeather.windSpeed} m/s ветер</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {forecast.map((day, index) => (
              <div
                key={`${day.day}-${index}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px 6px",
                  borderRadius: "var(--r)",
                  background:
                    index === 0 ? "var(--green-600)" : "var(--green-50)",
                  color: index === 0 ? "#fff" : "var(--text-muted)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    marginBottom: 4,
                  }}
                >
                  {index === 0 ? "Денес" : day.day}
                </div>

                <div style={{ fontSize: 15 }}>
                  {getWeatherIcon(day.description)}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    marginTop: 4,
                  }}
                >
                  {Math.round(day.temperature)}°
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherCard;
