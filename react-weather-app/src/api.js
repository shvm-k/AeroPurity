export const geoApiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

  export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
  export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  export const AQI_API_URL = "https://api.waqi.info/feed/here";
  export const AQI_API_TOKEN = import.meta.env.VITE_AQI_API_TOKEN;

  export const fetchWeatherDataForVillage = async (zipcode) => {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?zip=${zipcode}&appid=${WEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  };
