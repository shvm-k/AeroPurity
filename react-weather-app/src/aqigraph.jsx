// AQIGraph.js
import React from "react";
import Chart from "chart.js/auto";

const AQIGraph = ({ predictedAQIData }) => {
  React.useEffect(() => {
    if (predictedAQIData) {
      const ctx = document.getElementById("aqiChart");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: predictedAQIData.map((data, index) => `Day ${index + 1}`),
          datasets: [
            {
              label: "Predicted AQI",
              data: predictedAQIData.map(data => data.aqi),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [predictedAQIData]);

  return <canvas id="aqiChart" />;
};

export default AQIGraph;
