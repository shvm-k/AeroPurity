## AEROPURITY
AeroPurity provides interactive visualizations of air quality index (AQI) data and weather forecasts. Users can search any Indian city for real-time AQI, temperature, humidity, wind data, and a multi-day forecast.

### Built with Vite + React
This project was built with Vite + React.

### Getting Started
The app lives in `react-weather-app/`. From that directory:

```bash
npm install
npm run dev      # Runs the dev server at http://localhost:3000
npm run build    # Builds the production bundle into dist/
npm run preview  # Previews the production build locally
```

The page hot-reloads as you make changes.

### Data sources
AeroPurity runs entirely on the free, **keyless** [Open-Meteo](https://open-meteo.com/) APIs — no API keys or `.env` configuration required:

- **Weather + 7-day forecast** — Open-Meteo Forecast API
- **Air quality (US AQI)** — Open-Meteo Air-Quality API
- **City search** — Open-Meteo Geocoding API

WMO weather codes are mapped to emoji icons in `src/api.js`.

### Deployment
Hosted on Netlify: https://aeropurity.netlify.app

Build settings (also handled by `netlify.toml`):
- Base directory: `react-weather-app`
- Build command: `npm run build`
- Publish directory: `react-weather-app/dist`
