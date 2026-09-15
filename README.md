# 🌿 GreenFair — Plant, Herb & Spice Care App

GreenFair is a full-stack mobile application that identifies plants, herbs, and spices from a photo and gives complete daily-care guidance: watering schedule, sunlight needs, soil type, flowering & fruiting timeline, flower color, fruit taste, edibility, pruning schedule, pest/disease diagnosis & pesticide recommendation, and current weather suitability.

## 📁 Project Structure

```
greenfair-app/
├── backend/          # Node.js + Express REST API
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── services/       # Plant identification (Pl@ntNet) + weather (OpenWeatherMap)
│   ├── data/            # Seed plant & disease database
│   ├── models/          # MongoDB schemas (optional persistence)
│   └── README.md
├── frontend/         # React Native (Expo) mobile app
│   ├── App.js
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   └── services/
│   └── README.md
└── README.md          # you are here
```

## ✨ Features

| Feature | Details |
|---|---|
| 📷 AI Identification | Snap or upload a photo → identifies plant/herb/spice species (via Pl@ntNet API, with offline demo mode) |
| 💧 Watering guide | Exact frequency + notes per species |
| ☀️ Sunlight & placement | Hours of sun needed, best spot in home/garden |
| 🌱 Soil & fertilizer | Ideal soil type, pH, and feeding schedule |
| 🌸 Flowering info | Season, days-to-bloom, flower color |
| 🍎 Fruiting info | Season, days-to-fruit, fruit/seed taste |
| 🥗 Edibility | Which parts are edible vs toxic/non-edible |
| ✂️ Pruning | When and how to prune |
| 🐛 Pest & disease | Common pests/diseases + organic and chemical remedies |
| 🩺 Daily diagnosis | Symptom checklist → rule-based diagnosis engine |
| ☁️ Weather check | Live check if today's weather suits the plant, using device GPS |
| 🪴 My Garden | Save your own plants and track care history |

## 📥 Getting Started (Clone this repo)

```bash
git clone https://github.com/bananty-7/greenfair-app.git
cd greenfair-app
```

Then follow the Quick Start steps below.

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:5000`. Works immediately in **demo mode** — no API keys required to test the full flow. Add real keys later for production-grade AI identification and live weather (see `backend/README.md`).

### 2. Frontend

```bash
cd frontend
npm install
npx expo start
```

Open with the **Expo Go** app on your phone (scan QR code), or run an emulator. Update `frontend/src/services/api.js` → `BASE_URL` to point at your backend (see `frontend/README.md` for emulator vs physical device addresses).

## 🔑 Getting Free API Keys (optional, for production use)

- **Pl@ntNet** (plant identification): https://my.plantnet.org/ — free tier available
- **OpenWeatherMap** (weather suitability): https://openweathermap.org/api — free tier available
- **MongoDB Atlas** (free cloud database for "My Garden"): https://www.mongodb.com/cloud/atlas

`.env` files and `node_modules/` are already excluded via `.gitignore`. Never commit real API keys or database passwords — keep them only in your local `backend/.env`.

## 🛠️ Tech Stack

- **Frontend:** React Native, Expo, React Navigation, Axios
- **Backend:** Node.js, Express, Multer, Mongoose, Axios
- **External APIs:** Pl@ntNet (identification), OpenWeatherMap (weather)
- **Database:** MongoDB (optional; local JSON seed data works standalone)

## 🗺️ Roadmap Ideas
- Swap rule-based diagnosis for a trained CNN disease-classification model
- User authentication (JWT is scaffolded in `.env.example`)
- Push notification reminders for watering/pruning schedules
- Multi-language UI toggle (Bangla/English)
- Offline-first plant database caching

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details. You're free to use, modify, and distribute this code, as long as the original copyright notice is kept.

## 👤 Author
**bananty-7**
GitHub: [@bananty-7](https://github.com/bananty-7)

