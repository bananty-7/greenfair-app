# GreenFair Mobile App (Frontend)

React Native (Expo) app for identifying plants, herbs, and spices via
camera/photo, and getting full daily care guidance.

## Setup

```bash
cd frontend
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app (Android/iOS), or press `a`/`i` in
the terminal to open an Android/iOS emulator.

## Connect to the Backend

Edit `src/services/api.js` and set `BASE_URL` to wherever your backend is
running:

- Android emulator → `http://10.0.2.2:5000/api`
- iOS simulator → `http://localhost:5000/api`
- Physical phone (same WiFi) → `http://<your-computer-LAN-IP>:5000/api`
- Deployed backend (Render/Railway/etc.) → `https://your-api-domain.com/api`

## App Structure

```
frontend/
├── App.js                     # Entry point
├── src/
│   ├── navigation/             # Bottom-tab + stack navigation
│   ├── screens/
│   │   ├── HomeScreen.js        # Browse plant library by category
│   │   ├── CameraScreen.js      # Take/upload photo to identify
│   │   ├── ScanResultScreen.js  # Shows AI identification result
│   │   ├── PlantDetailScreen.js # Full care guide (watering, sunlight,
│   │   │                          soil, flowering, fruiting, pruning,
│   │   │                          pests, edibility, weather check)
│   │   ├── DiagnoseScreen.js    # Symptom checklist -> diagnosis
│   │   └── MyGardenScreen.js    # User's saved plants
│   ├── components/              # PlantCard, InfoSection
│   ├── services/api.js          # Axios API client
│   └── theme/colors.js
```

## Features Implemented
- 📷 Camera/gallery-based plant, herb & spice identification
- 🌿 Full care guide per plant: watering frequency, sunlight, soil, ideal
  weather/temperature, placement
- 🌸 Lifecycle info: flowering season & color, fruiting time & taste,
  edible vs non-edible parts
- ✂️ Pruning schedule & technique
- 🐛 Pest & disease management (organic + chemical options)
- 🩺 Daily symptom-based health diagnosis
- ☁️ Live weather-suitability check using device location
- 🪴 "My Garden" — save and track your own plants
