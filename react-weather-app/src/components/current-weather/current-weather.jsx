import React from "react";
import "./current-weather.css";
import { getAQIInfo } from "../../utils/aqiUtils";

const CurrentWeather = ({ data, aqi }) => {
  const { label: aqiLabel, color: aqiColor } = getAQIInfo(aqi);

  return (
    <div className="weather-container">
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-description">{data.weather.description}</p>
          </div>
          <span className="weather-icon" role="img" aria-label={data.weather.description}>
            {data.weather.emoji}
          </span>
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">{Math.round(data.feelsLike)}°C</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.windSpeed} km/h</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>

      <div className="aqi-container">
        <p className="aqi-label">Live Air Quality Index (AQI)</p>
        <div className="aqi-value" style={{ color: aqiColor }}>
          {aqi ?? "—"}
        </div>
        <p className="aqi-category" style={{ color: aqiColor }}>{aqiLabel}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
