import React from "react";
import "./current-weather.css";
import { getAQIInfo } from "../../utils/aqiUtils";

const CurrentWeather = ({ data, aqi }) => {
  const isBhopalIndia = data.city === "Bhopal, IN"; // Check if the searched location is Bhopal, IN
  const { label: aqiLabel, color: aqiColor } = getAQIInfo(aqi);

  return (
    <div className="weather-container">
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>

      {isBhopalIndia && (
        <div className="graph-container">
          <img src="api-graph.jpeg" alt="Historical and predicted AQI graph" />
          <p>Historical &amp; predicted AQI (from ML model)</p>
        </div>
      )}


      <div className="aqi-container">
        <p className="aqi-label">Live Air Quality Index (AQI)</p>
        <div className="aqi-value" style={{ color: aqiColor }}>{aqi}</div>
        <p className="aqi-category" style={{ color: aqiColor }}>{aqiLabel}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
