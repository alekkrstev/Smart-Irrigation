const BASE_URL = "/api/weather";

export async function getCurrentWeather(city) {
  const response = await fetch(`${BASE_URL}?city=${encodeURIComponent(city)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch current weather");
  }

  return response.json();
}

export async function getWeatherForecast(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?city=${encodeURIComponent(city)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast");
  }

  return response.json();
}
