import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export function InfoSection({ icon, title, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Ionicons name={icon} size={18} color={colors.primary} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

export function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 15, fontWeight: "700", color: colors.text, marginLeft: 8 },
  body: { paddingLeft: 2 },
  row: { flexDirection: "row", marginBottom: 6, flexWrap: "wrap" },
  label: { fontSize: 13, color: colors.textMuted, width: 130 },
  value: { fontSize: 13, color: colors.text, flex: 1, fontWeight: "500" },
});
