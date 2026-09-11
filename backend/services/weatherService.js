const axios = require("axios");

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetch current weather for a lat/lon and evaluate whether it currently
 * suits the given plant's ideal temperature range.
 */
async function checkWeatherSuitability(lat, lon, plant) {
  const isDemoMode = !WEATHER_API_KEY || WEATHER_API_KEY === "your_openweathermap_api_key_here";

  let currentTempC;
  let weatherDescription;
  let humidity;

  if (isDemoMode) {
    // Deterministic demo values so the endpoint is testable without a key
    currentTempC = 28;
    weatherDescription = "clear sky (demo data)";
    humidity = 65;
  } else {
    const response = await axios.get(WEATHER_URL, {
      params: { lat, lon, appid: WEATHER_API_KEY, units: "metric" },
      timeout: 10000,
    });
    currentTempC = response.data.main.temp;
    weatherDescription = response.data.weather[0].description;
    humidity = response.data.main.humidity;
  }

  const range = parseTemperatureRange(plant?.care?.idealTemperature);
  let suitability = "unknown";
  let advice = "No ideal temperature range on file for this plant.";

  if (range) {
    if (currentTempC < range.min) {
      suitability = "too_cold";
      advice = `Current temperature (${currentTempC}°C) is below the ideal range (${range.min}-${range.max}°C). Consider moving the plant indoors or providing frost protection.`;
    } else if (currentTempC > range.max) {
      suitability = "too_hot";
      advice = `Current temperature (${currentTempC}°C) is above the ideal range (${range.min}-${range.max}°C). Provide shade and increase watering frequency.`;
    } else {
      suitability = "ideal";
      advice = `Current temperature (${currentTempC}°C) is within the ideal range (${range.min}-${range.max}°C) for this plant.`;
    }
  }

  return {
    currentTempC,
    weatherDescription,
    humidity,
    suitability,
    advice,
    demoMode: isDemoMode,
  };
}

function parseTemperatureRange(str) {
  if (!str) return null;
  const matches = str.match(/(-?\d+)°?C/g);
  if (!matches || matches.length < 2) return null;
  const nums = matches.map((m) => parseInt(m));
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

module.exports = { checkWeatherSuitability };
