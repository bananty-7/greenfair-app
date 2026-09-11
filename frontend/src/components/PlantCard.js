import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function PlantCard({ plant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconWrap}>
        <Ionicons name="leaf" size={26} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{plant.name?.en}</Text>
        <Text style={styles.nameBn}>{plant.name?.bn}</Text>
        <Text style={styles.scientific}>{plant.scientificName}</Text>
      </View>
      <View style={[styles.badge, plant.edibility?.edible ? styles.edible : styles.nonEdible]}>
        <Text style={styles.badgeText}>
          {plant.edibility?.edible ? "Edible" : "Non-edible"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E7F3EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: { fontSize: 16, fontWeight: "700", color: colors.text },
  nameBn: { fontSize: 13, color: colors.textMuted, marginTop: 1 },
  scientific: { fontSize: 12, fontStyle: "italic", color: colors.textMuted, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  edible: { backgroundColor: "#E4F5EA" },
  nonEdible: { backgroundColor: "#FBE9E7" },
  badgeText: { fontSize: 10, fontWeight: "700", color: colors.text },
});
