import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../theme/colors";
import { identifyPlant } from "../services/api";

export default function CameraScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Camera access is required to scan plants.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7, allowsEditing: true });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function pickFromLibrary() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Photo library access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, allowsEditing: true });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function handleIdentify() {
    if (!imageUri) return;
    setLoading(true);
    try {
      const result = await identifyPlant(imageUri);
      navigation.navigate("ScanResult", { result, imageUri });
    } catch (e) {
      Alert.alert(
        "Identification failed",
        "Could not reach the backend. Make sure the server is running and reachable, then try again."
      );
      console.warn(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan a Plant, Herb or Spice</Text>
      <Text style={styles.subtitle}>
        Take a clear photo of a leaf, flower, or the whole plant for best results.
      </Text>

      <View style={styles.previewBox}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <Ionicons name="image-outline" size={64} color={colors.textMuted} />
        )}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={takePhoto}>
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.actionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.secondaryBtn]} onPress={pickFromLibrary}>
          <Ionicons name="images" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Gallery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.identifyBtn, !imageUri && styles.disabledBtn]}
        disabled={!imageUri || loading}
        onPress={handleIdentify}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.identifyText}>Identify Plant</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 20, fontWeight: "800", color: colors.text, marginTop: 10 },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 6, marginBottom: 20 },
  previewBox: {
    height: 280,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  preview: { width: "100%", height: "100%" },
  actionsRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryBtn: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  actionText: { color: "#fff", fontWeight: "700" },
  identifyBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledBtn: { opacity: 0.5 },
  identifyText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
