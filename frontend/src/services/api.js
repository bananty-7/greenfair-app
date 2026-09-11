import axios from "axios";
import { Platform } from "react-native";

/**
 * IMPORTANT: Update this to your backend's reachable address.
 * - Android emulator: http://10.0.2.2:5000
 * - iOS simulator:   http://localhost:5000
 * - Physical device: http://<your-computer-LAN-IP>:5000
 * - Deployed backend: https://your-deployed-api.com
 */
const BASE_URL = "http://192.168.0.102:5000/api"; // 👈 change this to your computer's IP

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export async function identifyPlant(imageUri) {
  const formData = new FormData();
  const filename = imageUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename || "");
  const type = match ? `image/${match[1]}` : "image/jpeg";

  formData.append("image", { uri: imageUri, name: filename || "photo.jpg", type });

  const res = await api.post("/plants/identify", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function getAllPlants(params = {}) {
  const res = await api.get("/plants", { params });
  return res.data.data;
}

export async function getPlantById(id) {
  const res = await api.get(`/plants/${id}`);
  return res.data.data;
}

export async function diagnoseSymptoms(symptoms) {
  const res = await api.post("/plants/diagnose", { symptoms });
  return res.data.data;
}

export async function checkWeather(plantId, lat, lon) {
  const res = await api.get(`/plants/${plantId}/weather-check`, { params: { lat, lon } });
  return res.data.data;
}

export async function addToGarden(payload) {
  const res = await api.post("/garden", payload);
  return res.data.data;
}

export async function listGarden(userId) {
  const res = await api.get(`/garden/${userId}`);
  return res.data.data;
}

export default api;
