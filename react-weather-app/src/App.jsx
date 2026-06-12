// App.js
import { useState, useEffect } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { fetchForecast, fetchAirQuality } from "./api";
import { getAQIGradient } from "./utils/aqiUtils";
import "./App.css";

const SUGGESTED_CITIES = [
  { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
  { name: 'Tezpur', lat: 26.6528, lon: 92.7926 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
];

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchWeatherData = (lat, lon, city) => {
    Promise.all([fetchForecast(lat, lon, city), fetchAirQuality(lat, lon)])
      .then(([weather, aqiValue]) => {
        setCurrentWeather(weather.current);
        setForecast(weather.forecast);
        setAqi(aqiValue);
      })
      .catch(console.log);
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon, searchData.label);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeatherData(coords.latitude, coords.longitude, "Your location"),
        () => setShowSuggestions(true)
      );
    } else {
      setShowSuggestions(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasData = Boolean(currentWeather);
  const isDay = currentWeather ? currentWeather.isDay : true;

  return (
    <div
      className={`App${isDay ? "" : " night"}`}
      style={{ background: getAQIGradient(aqi, isDay) }}
    >
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">☁</span>
          <span className="brand-name">AeroPurity</span>
        </div>
        {hasData ? (
          <p className="brand-tagline daynight">
            {isDay ? "☀️ Daytime" : "🌙 Nighttime"}
          </p>
        ) : (
          <p className="brand-tagline">Live AQI &amp; weather, city by city</p>
        )}
      </header>

      <main className="container">
        <Search onSearchChange={handleOnSearchChange} />

        {!hasData && (
          <section className="hero">
            <h1 className="hero-title">Breathe the data.</h1>
            <p className="hero-sub">
              Search any city worldwide for real-time air quality, temperature, and a
              multi-day forecast.
            </p>
            {showSuggestions && (
              <div className="suggestions">
                <p className="suggestions-label">Try a city</p>
                <div className="suggestions-row">
                  {SUGGESTED_CITIES.map((city) => (
                    <button
                      key={city.name}
                      className="suggestion-chip"
                      onClick={() => fetchWeatherData(city.lat, city.lon, `${city.name}, IN`)}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {hasData && (
          <div className="dashboard">
            <div className="dashboard-col">
              <CurrentWeather data={currentWeather} aqi={aqi} />
            </div>
            <div className="dashboard-col">
              {forecast && <Forecast days={forecast} />}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <span>Contact — <a href="mailto:shivamux.dev@gmail.com">shivamux.dev@gmail.com</a></span>
        <span>Made by <a href="https://shvm-k.github.io" target="_blank" rel="noreferrer">shvm</a></span>
      </footer>
    </div>
  );
}

export default App;
