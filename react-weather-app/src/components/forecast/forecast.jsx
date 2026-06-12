import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const Forecast = ({ days }) => {
  return (
    <>
      <label className="title">7-Day Forecast</label>
      <Accordion allowZeroExpanded>
        {days.map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <span className="icon-small" role="img" aria-label={item.weather.description}>
                    {item.weather.emoji}
                  </span>
                  <label className="day">{idx === 0 ? "Today" : item.day}</label>
                  <label className="description">{item.weather.description}</label>
                  <span className="separator">·</span>
                  <label className="min-max">{item.tempMax}°C / {item.tempMin}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.details.feelsLikeMax}°C / {item.details.feelsLikeMin}°C</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Rain chance:</label>
                  <label>{item.details.precipProb ?? 0}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Precipitation:</label>
                  <label>{item.details.precipSum ?? 0} mm</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Max wind:</label>
                  <label>{item.details.windMax} km/h</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>UV index:</label>
                  <label>{item.details.uvMax}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sunrise:</label>
                  <label>{item.details.sunrise}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sunset:</label>
                  <label>{item.details.sunset}</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
