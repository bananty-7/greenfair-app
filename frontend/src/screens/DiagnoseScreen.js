import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../theme/colors";
import { diagnoseSymptoms } from "../services/api";

const SYMPTOMS = [
  "Yellow leaves",
  "Brown spots",
  "White powder",
  "Wilting",
  "Holes in leaves",
  "Sticky leaves",
  "Curling leaves",
  "No flowers",
  "Dropping flowers",
  "Mushy stem",
];

export default function DiagnoseScreen() {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function toggle(symptom) {
    setSelected((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  }

  async function handleDiagnose() {
    if (selected.length === 0) return;
    setLoading(true);
    try {
      const data = await diagnoseSymptoms(selected.map((s) => s.toLowerCase()));
      setResult(data);
    } catch (e) {
      console.warn(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Daily Health Check</Text>
      <Text style={styles.subtitle}>Select what you notice on your plant today:</Text>

      <View style={styles.chipsWrap}>
        {SYMPTOMS.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, selected.includes(s) && styles.chipActive]}
            onPress={() => toggle(s)}
          >
            <Text style={[styles.chipText, selected.includes(s) && styles.chipTextActive]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.diagnoseBtn, selected.length === 0 && styles.disabledBtn]}
        disabled={selected.length === 0 || loading}
        onPress={handleDiagnose}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.diagnoseBtnText}>Diagnose</Text>}
      </TouchableOpacity>

      {result && (
        <View style={styles.resultsWrap}>
          {result.matches.length === 0 ? (
            <Text style={styles.noMatch}>No specific match found for these symptoms.</Text>
          ) : (
            result.matches.map((match, i) => (
              <View key={i} style={styles.matchCard}>
                {match.possibleCauses.map((cause, j) => (
                  <View key={j} style={styles.causeRow}>
                    <View style={styles.causeHeader}>
                      <Text style={styles.causeName}>{cause.cause}</Text>
                      <View style={[styles.likelihoodBadge, likelihoodStyle(cause.likelihood)]}>
                        <Text style={styles.likelihoodText}>{cause.likelihood}</Text>
                      </View>
                    </View>
                    <Text style={styles.remedy}>💡 {cause.remedy}</Text>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

function likelihoodStyle(level) {
  if (level === "high") return { backgroundColor: "#FBE2E0" };
  if (level === "medium") return { backgroundColor: "#FDF2D9" };
  return { backgroundColor: "#E4F5EA" };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 6, marginBottom: 16 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  chip: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  diagnoseBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  disabledBtn: { opacity: 0.5 },
  diagnoseBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  resultsWrap: { marginTop: 20 },
  noMatch: { color: colors.textMuted, fontSize: 13 },
  matchCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  causeRow: { marginBottom: 12 },
  causeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  causeName: { fontWeight: "700", color: colors.text, fontSize: 14, flex: 1 },
  likelihoodBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 8 },
  likelihoodText: { fontSize: 10, fontWeight: "700", textTransform: "uppercase" },
  remedy: { fontSize: 13, color: colors.textMuted, marginTop: 4, lineHeight: 18 },
});
