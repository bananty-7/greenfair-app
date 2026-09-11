import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import PlantCard from "../components/PlantCard";
import { getAllPlants } from "../services/api";

const CATEGORIES = [
  { key: "herb", label: "Herbs", icon: "flower-outline" },
  { key: "spice", label: "Spices", icon: "nutrition-outline" },
  { key: "tree", label: "Trees", icon: "leaf-outline" },
  { key: "vegetable-plant", label: "Vegetables", icon: "restaurant-outline" },
  { key: "flowering-plant", label: "Flowers", icon: "flower" },
  { key: "indoor-plant", label: "Indoor", icon: "home-outline" },
];

export default function HomeScreen({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    load();
  }, [activeCategory]);

  async function load() {
    setLoading(true);
    try {
      const data = await getAllPlants(activeCategory ? { category: activeCategory } : {});
      setPlants(data);
    } catch (e) {
      console.warn("Failed to load plants — is the backend running?", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.greeting}>🌿 GreenFair</Text>
      <Text style={styles.subtitle}>Your AI plant, herb & spice parent</Text>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Identify")}
      >
        <Ionicons name="camera" size={22} color="#fff" />
        <Text style={styles.scanButtonText}>Scan a Plant / Herb / Spice</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Browse by Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        <TouchableOpacity
          style={[styles.categoryChip, !activeCategory && styles.categoryChipActive]}
          onPress={() => setActiveCategory(null)}
        >
          <Text style={[styles.categoryText, !activeCategory && styles.categoryTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c.key}
            style={[styles.categoryChip, activeCategory === c.key && styles.categoryChipActive]}
            onPress={() => setActiveCategory(c.key)}
          >
            <Ionicons
              name={c.icon}
              size={14}
              color={activeCategory === c.key ? "#fff" : colors.primary}
            />
            <Text
              style={[
                styles.categoryText,
                activeCategory === c.key && styles.categoryTextActive,
              ]}
            >
              {" "}
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Plant Library</Text>
      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
      ) : plants.length === 0 ? (
        <Text style={styles.emptyText}>
          Couldn't reach the backend. Make sure the API server is running and
          BASE_URL in src/services/api.js points to it.
        </Text>
      ) : (
        plants.map((p) => (
          <PlantCard
            key={p.id}
            plant={p}
            onPress={() => navigation.navigate("PlantDetail", { plantId: p.id })}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  greeting: { fontSize: 26, fontWeight: "800", color: colors.primary },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 18 },
  scanButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scanButtonText: { color: "#fff", fontWeight: "700", fontSize: 15, marginLeft: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: 10 },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: colors.primary },
  categoryText: { color: colors.primary, fontWeight: "600", fontSize: 13 },
  categoryTextActive: { color: "#fff" },
  emptyText: { color: colors.textMuted, fontSize: 13, marginTop: 10, lineHeight: 20 },
});
