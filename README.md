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

### Environment variables
Create a `.env` file in `react-weather-app/` (see `.env.example`):

```
VITE_WEATHER_API_KEY=your_openweathermap_key
VITE_AQI_API_TOKEN=your_waqi_token
VITE_RAPIDAPI_KEY=your_geodb_rapidapi_key
```

`.env` is gitignored. On Netlify, add these same `VITE_*` keys under Site configuration → Environment variables.

### Deployment
Hosted on Netlify: https://aeropurity.netlify.app

Build settings (also handled by `netlify.toml`):
- Base directory: `react-weather-app`
- Build command: `npm run build`
- Publish directory: `react-weather-app/dist`
