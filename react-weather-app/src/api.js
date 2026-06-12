// Open-Meteo — fully keyless weather, geocoding, and air-quality APIs.

const FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

// WMO weather interpretation codes -> label + emoji.
// Day/night variants are applied for the "clear-ish" codes via isDay.
const WMO = {
  0:  { description: "Clear sky",        emoji: "☀️", night: "🌙" },
  1:  { description: "Mainly clear",     emoji: "🌤️", night: "🌙" },
  2:  { description: "Partly cloudy",    emoji: "⛅", night: "☁️" },
  3:  { description: "Overcast",         emoji: "☁️" },
  45: { description: "Fog",              emoji: "🌫️" },
  48: { description: "Rime fog",         emoji: "🌫️" },
  51: { description: "Light drizzle",    emoji: "🌦️", night: "🌧️" },
  53: { description: "Drizzle",          emoji: "🌦️", night: "🌧️" },
  55: { description: "Dense drizzle",    emoji: "🌧️" },
  56: { description: "Freezing drizzle", emoji: "🌧️" },
  57: { description: "Freezing drizzle", emoji: "🌧️" },
  61: { description: "Light rain",       emoji: "🌦️", night: "🌧️" },
  63: { description: "Rain",             emoji: "🌧️" },
  65: { description: "Heavy rain",       emoji: "🌧️" },
  66: { description: "Freezing rain",    emoji: "🌧️" },
  67: { description: "Freezing rain",    emoji: "🌧️" },
  71: { description: "Light snow",       emoji: "🌨️" },
  73: { description: "Snow",             emoji: "🌨️" },
  75: { description: "Heavy snow",       emoji: "❄️" },
  77: { description: "Snow grains",      emoji: "🌨️" },
  80: { description: "Rain showers",     emoji: "🌦️", night: "🌧️" },
  81: { description: "Rain showers",     emoji: "🌧️" },
  82: { description: "Violent showers",  emoji: "⛈️" },
  85: { description: "Snow showers",     emoji: "🌨️" },
  86: { description: "Snow showers",     emoji: "❄️" },
  95: { description: "Thunderstorm",     emoji: "⛈️" },
  96: { description: "Thunderstorm",     emoji: "⛈️" },
  99: { description: "Thunderstorm",     emoji: "⛈️" },
};

export function describeWeather(code, isDay = true) {
  const entry = WMO[code] || { description: "Unknown", emoji: "❓" };
  const emoji = !isDay && entry.night ? entry.night : entry.emoji;
  return { code, description: entry.description, emoji };
}

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Fetch current conditions + daily forecast, normalized for the UI.
export async function fetchForecast(lat, lon, city) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,is_day",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,uv_index_max,sunrise,sunset",
    timezone: "auto",
    forecast_days: "7",
  });

  const res = await fetch(`${FORECAST_API_URL}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch forecast");
  const data = await res.json();

  const c = data.current;
  const isDay = c.is_day === 1;
  const current = {
    city,
    temp: c.temperature_2m,
    feelsLike: c.apparent_temperature,
    humidity: c.relative_humidity_2m,
    windSpeed: c.wind_speed_10m,
    pressure: Math.round(c.surface_pressure),
    isDay,
    weather: describeWeather(c.weather_code, isDay),
  };

  const d = data.daily;
  const fmtTime = (iso) =>
    new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const forecast = d.time.map((iso, i) => ({
    day: WEEK_DAYS[new Date(iso).getDay()],
    tempMax: Math.round(d.temperature_2m_max[i]),
    tempMin: Math.round(d.temperature_2m_min[i]),
    weather: describeWeather(d.weather_code[i], true),
    details: {
      feelsLikeMax: Math.round(d.apparent_temperature_max[i]),
      feelsLikeMin: Math.round(d.apparent_temperature_min[i]),
      precipProb: d.precipitation_probability_max[i],
      precipSum: d.precipitation_sum[i],
      windMax: d.wind_speed_10m_max[i],
      uvMax: d.uv_index_max[i],
      sunrise: fmtTime(d.sunrise[i]),
      sunset: fmtTime(d.sunset[i]),
    },
  }));

  return { current, forecast };
}

// US AQI from Open-Meteo air-quality API.
export async function fetchAirQuality(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: "us_aqi",
    timezone: "auto",
  });
  const res = await fetch(`${AIR_QUALITY_API_URL}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch air quality");
  const data = await res.json();
  const aqi = data?.current?.us_aqi;
  return aqi == null ? null : Math.round(aqi);
}

// City search for the AsyncPaginate dropdown.
export async function searchCities(inputValue) {
  if (!inputValue || inputValue.trim().length < 2) return { options: [] };
  const params = new URLSearchParams({
    name: inputValue,
    count: "10",
    language: "en",
    format: "json",
  });
  const res = await fetch(`${GEOCODING_API_URL}?${params}`);
  const data = await res.json();
  const results = data.results || [];
  return {
    options: results.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: [city.name, city.admin1, city.country_code].filter(Boolean).join(", "),
    })),
  };
}
