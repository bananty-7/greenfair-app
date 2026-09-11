import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import colors from "../theme/colors";
import { InfoSection, InfoRow } from "../components/InfoSection";
import { getPlantById, checkWeather, addToGarden } from "../services/api";

export default function PlantDetailScreen({ route }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    getPlantById(plantId)
      .then(setPlant)
      .catch((e) => console.warn(e.message))
      .finally(() => setLoading(false));
  }, [plantId]);

  async function handleWeatherCheck() {
    setWeatherLoading(true);
    try {
      let coords = { latitude: 23.685, longitude: 90.3563 }; // Bangladesh fallback
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const loc = await Location.getCurrentPositionAsync({});
          coords = loc.coords;
        }
      } catch (e) {
        // location module not available (e.g. Expo Go without config) — use fallback
      }
      const result = await checkWeather(plantId, coords.latitude, coords.longitude);
      setWeather(result);
    } catch (e) {
      Alert.alert("Weather check failed", "Could not reach the backend weather service.");
    } finally {
      setWeatherLoading(false);
    }
  }

  async function handleSaveToGarden() {
    try {
      await addToGarden({ userId: "demo-user", plantId });
      Alert.alert("Saved!", `${plant.name.en} added to My Garden.`);
    } catch (e) {
      Alert.alert(
        "Couldn't save",
        "This feature needs MongoDB connected on the backend (see backend/.env MONGO_URI)."
      );
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={styles.centered}>
        <Text>Plant not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.name}>{plant.name.en}</Text>
      <Text style={styles.nameBn}>{plant.name.bn}</Text>
      <Text style={styles.scientific}>{plant.scientificName}</Text>
      <Text style={styles.description}>{plant.description}</Text>

      <View style={[styles.edibleBanner, plant.edibility.edible ? styles.edibleBg : styles.nonEdibleBg]}>
        <Text style={styles.edibleBannerText}>
          {plant.edibility.edible ? "✅ Edible" : "⚠️ Not for consumption"}
        </Text>
      </View>

      <InfoSection icon="water-outline" title="Watering">
        <InfoRow label="Frequency" value={plant.care.wateringFrequency} />
        <InfoRow label="Notes" value={plant.care.wateringNotes} />
      </InfoSection>

      <InfoSection icon="sunny-outline" title="Sunlight & Placement">
        <InfoRow label="Sunlight" value={plant.care.sunlightRequirement} />
        <InfoRow label="Placement" value={plant.care.placement} />
        <InfoRow label="Ideal Temp" value={plant.care.idealTemperature} />
        <InfoRow label="Ideal Weather" value={plant.care.idealWeather} />
        <InfoRow label="Humidity" value={plant.care.humidity} />
      </InfoSection>

      <InfoSection icon="leaf-outline" title="Soil & Fertilizer">
        <InfoRow label="Soil Type" value={plant.soilAndFertilizer.soilType} />
        <InfoRow label="Fertilizer" value={plant.soilAndFertilizer.fertilizer} />
      </InfoSection>

      <InfoSection icon="flower-outline" title="Flowering & Fruiting">
        <InfoRow label="Flowering Season" value={plant.lifecycle.floweringSeason} />
        <InfoRow label="Time to Flower" value={plant.lifecycle.floweringTimeAfterPlanting} />
        <InfoRow label="Flower Color" value={plant.lifecycle.flowerColor} />
        <InfoRow label="Fruiting Season" value={plant.lifecycle.fruitingSeason} />
        <InfoRow label="Taste" value={plant.lifecycle.fruitOrSeedTaste} />
        <InfoRow label="Lifespan" value={plant.lifecycle.lifespan} />
      </InfoSection>

      <InfoSection icon="cut-outline" title="Pruning">
        <InfoRow label="When" value={plant.pruning.pruningTime} />
        <InfoRow label="How" value={plant.pruning.pruningTips} />
      </InfoSection>

      <InfoSection icon="bug-outline" title="Pests & Disease Management">
        <InfoRow label="Common Pests" value={(plant.pestManagement.commonPests || []).join(", ")} />
        <InfoRow label="Common Diseases" value={(plant.pestManagement.commonDiseases || []).join(", ")} />
        <InfoRow label="Organic Remedy" value={plant.pestManagement.organicRemedy} />
        <InfoRow label="Chemical Option" value={plant.pestManagement.chemicalPesticide} />
        <InfoRow label="Prevention" value={plant.pestManagement.preventiveTips} />
      </InfoSection>

      <InfoSection icon="restaurant-outline" title="Edibility Details">
        <InfoRow label="Edible Parts" value={(plant.edibility.edibleParts || []).join(", ") || "None"} />
        <InfoRow label="Non-edible Parts" value={(plant.edibility.nonEdibleParts || []).join(", ") || "None"} />
        <InfoRow label="Notes" value={plant.edibility.notes} />
      </InfoSection>

      <InfoSection icon="cloud-outline" title="Current Weather Suitability">
        {weather ? (
          <>
            <InfoRow label="Current Temp" value={`${weather.currentTempC}°C, ${weather.weatherDescription}`} />
            <InfoRow label="Humidity" value={`${weather.humidity}%`} />
            <Text style={styles.weatherAdvice}>{weather.advice}</Text>
          </>
        ) : (
          <TouchableOpacity style={styles.weatherBtn} onPress={handleWeatherCheck}>
            {weatherLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={styles.weatherBtnText}>Check current weather suitability</Text>
            )}
          </TouchableOpacity>
        )}
      </InfoSection>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveToGarden}>
        <Text style={styles.saveButtonText}>+ Add to My Garden</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  name: { fontSize: 24, fontWeight: "800", color: colors.text },
  nameBn: { fontSize: 16, color: colors.textMuted, marginTop: 2 },
  scientific: { fontSize: 14, fontStyle: "italic", color: colors.primary, marginTop: 4 },
  description: { fontSize: 13, color: colors.text, marginTop: 10, marginBottom: 12, lineHeight: 19 },
  edibleBanner: { borderRadius: 10, padding: 10, marginBottom: 16, alignItems: "center" },
  edibleBg: { backgroundColor: "#E4F5EA" },
  nonEdibleBg: { backgroundColor: "#FDEDEB" },
  edibleBannerText: { fontWeight: "700", color: colors.text },
  weatherBtn: { paddingVertical: 8, alignItems: "flex-start" },
  weatherBtnText: { color: colors.primary, fontWeight: "700" },
  weatherAdvice: { fontSize: 13, color: colors.text, marginTop: 6, lineHeight: 19 },
  saveButton: {
    backgroundColor: colors.secondary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 30,
  },
  saveButtonText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
