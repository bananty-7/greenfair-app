# GreenFair Backend API

Node.js + Express REST API powering the GreenFair mobile app: plant/herb/spice
identification, care guidance, disease diagnosis, and weather suitability.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your API keys (optional — app runs in demo mode without them)
npm run dev
```

Server runs at `http://localhost:5000` by default.

## Environment Variables

| Variable | Required? | Purpose |
|---|---|---|
| `PORT` | No (default 5000) | Server port |
| `MONGO_URI` | No | Enables persistent "My Garden" feature |
| `PLANTNET_API_KEY` | No (demo mode fallback) | Real plant identification via [Pl@ntNet](https://my.plantnet.org/) |
| `WEATHER_API_KEY` | No (demo mode fallback) | Real weather data via [OpenWeatherMap](https://openweathermap.org/api) |

**Without any keys**, the API still works fully using deterministic demo
responses — perfect for local development, demos, and grading before you
plug in real credentials.

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/plants/identify` | Upload an image (`multipart/form-data`, field `image`) → returns identified species + full care data |
| GET | `/api/plants` | List all plants. Query: `?category=herb` `?search=tulsi` |
| GET | `/api/plants/:id` | Full detail for one plant (watering, sunlight, soil, flowering, fruiting, pruning, pests, edibility) |
| POST | `/api/plants/diagnose` | Body `{ "symptoms": ["yellow leaves"] }` → likely cause + remedy |
| GET | `/api/plants/:id/weather-check?lat=&lon=` | Checks if current local weather suits the plant |
| POST | `/api/garden` | Save a plant to "My Garden" (requires MongoDB) |
| GET | `/api/garden/:userId` | List a user's saved plants |
| PATCH | `/api/garden/:id` | Update watering/pruning log |
| DELETE | `/api/garden/:id` | Remove a saved plant |

## Example: Identify a plant

```bash
curl -X POST http://localhost:5000/api/plants/identify \
  -F "image=@/path/to/leaf.jpg"
```

## Tech Stack
- Express 4
- Multer (image upload)
- Axios (external API calls)
- Mongoose (optional MongoDB persistence)
- Helmet + express-rate-limit (basic security hardening)
