import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function ScanResultScreen({ route, navigation }) {
  const { result, imageUri } = route.params;
  const plant = result.localDatabaseEntry;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Image source={{ uri: imageUri }} style={styles.image} />

      {result.demoMode && (
        <View style={styles.demoBanner}>
          <Ionicons name="information-circle" size={16} color={colors.warning} />
          <Text style={styles.demoText}>
            Running in demo mode — add PLANTNET_API_KEY in backend/.env for live AI identification.
          </Text>
        </View>
      )}

      <View style={styles.confidenceRow}>
        <Text style={styles.confidenceLabel}>Match Confidence</Text>
        <Text style={styles.confidenceValue}>{result.confidence}%</Text>
      </View>

      <Text style={styles.scientificName}>{result.scientificName}</Text>
      <Text style={styles.commonNames}>{(result.commonNames || []).join(" • ")}</Text>

      {plant ? (
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate("PlantDetail", { plantId: plant.id })}
        >
          <Text style={styles.detailButtonText}>View Full Care Guide</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      ) : (
        <Text style={styles.noMatchText}>
          Species identified, but detailed care data isn't in our library yet.
        </Text>
      )}

      {result.alternativeMatches?.length > 0 && (
        <View style={styles.altSection}>
          <Text style={styles.altTitle}>Other possible matches:</Text>
          {result.alternativeMatches.map((alt, i) => (
            <Text key={i} style={styles.altItem}>
              • {alt.scientificName} ({alt.confidence}%)
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.rescanButton} onPress={() => navigation.goBack()}>
        <Text style={styles.rescanText}>Scan Another</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  image: { width: "100%", height: 240, borderRadius: 16, marginBottom: 16 },
  demoBanner: {
    flexDirection: "row",
    backgroundColor: "#FFF6E5",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },
  demoText: { fontSize: 11, color: "#7A5B00", flex: 1 },
  confidenceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  confidenceLabel: { fontSize: 13, color: colors.textMuted },
  confidenceValue: { fontSize: 13, fontWeight: "800", color: colors.primary },
  scientificName: { fontSize: 22, fontWeight: "800", color: colors.text, fontStyle: "italic" },
  commonNames: { fontSize: 14, color: colors.textMuted, marginTop: 4, marginBottom: 20 },
  detailButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  detailButtonText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  noMatchText: { color: colors.textMuted, fontSize: 13 },
  altSection: { marginTop: 20 },
  altTitle: { fontSize: 13, fontWeight: "700", color: colors.text, marginBottom: 6 },
  altItem: { fontSize: 13, color: colors.textMuted, marginBottom: 2, fontStyle: "italic" },
  rescanButton: { marginTop: 24, alignItems: "center", paddingVertical: 10 },
  rescanText: { color: colors.primary, fontWeight: "700" },
});
