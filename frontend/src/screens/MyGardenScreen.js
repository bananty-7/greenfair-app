import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../theme/colors";
import PlantCard from "../components/PlantCard";
import { listGarden } from "../services/api";

const DEMO_USER_ID = "demo-user";

export default function MyGardenScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  async function load() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await listGarden(DEMO_USER_ID);
      setItems(data);
    } catch (e) {
      setErrorMsg(
        "My Garden needs MongoDB connected on the backend. Set MONGO_URI in backend/.env to enable this feature."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Garden</Text>
      <Text style={styles.subtitle}>Plants you're tracking and caring for.</Text>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
      ) : errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : items.length === 0 ? (
        <Text style={styles.emptyText}>
          No plants saved yet. Scan a plant and tap "Add to My Garden" from its detail page.
        </Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) =>
            item.species ? (
              <PlantCard
                plant={item.species}
                onPress={() => navigation.navigate("PlantDetail", { plantId: item.species.id })}
              />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: 16 },
  emptyText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginTop: 10 },
  errorText: { color: colors.warning, fontSize: 13, lineHeight: 20, marginTop: 10 },
});
