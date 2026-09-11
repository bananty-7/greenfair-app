import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import ScanResultScreen from "../screens/ScanResultScreen";
import PlantDetailScreen from "../screens/PlantDetailScreen";
import DiagnoseScreen from "../screens/DiagnoseScreen";
import MyGardenScreen from "../screens/MyGardenScreen";
import colors from "../theme/colors";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const IdentifyStack = createNativeStackNavigator();
const GardenStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: "#fff" }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: "GreenFair" }} />
      <HomeStack.Screen name="PlantDetail" component={PlantDetailScreen} options={{ title: "Plant Details" }} />
    </HomeStack.Navigator>
  );
}

function IdentifyStackScreen() {
  return (
    <IdentifyStack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: "#fff" }}>
      <IdentifyStack.Screen name="Identify" component={CameraScreen} options={{ title: "Identify" }} />
      <IdentifyStack.Screen name="ScanResult" component={ScanResultScreen} options={{ title: "Result" }} />
      <IdentifyStack.Screen name="PlantDetail" component={PlantDetailScreen} options={{ title: "Plant Details" }} />
    </IdentifyStack.Navigator>
  );
}

function GardenStackScreen() {
  return (
    <GardenStack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: "#fff" }}>
      <GardenStack.Screen name="MyGardenMain" component={MyGardenScreen} options={{ title: "My Garden" }} />
      <GardenStack.Screen name="PlantDetail" component={PlantDetailScreen} options={{ title: "Plant Details" }} />
    </GardenStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: "home",
              Identify: "camera",
              Diagnose: "medkit",
              Garden: "flower",
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Identify" component={IdentifyStackScreen} />
        <Tab.Screen name="Diagnose" component={DiagnoseScreen} options={{ headerShown: true, title: "Daily Diagnosis" }} />
        <Tab.Screen name="Garden" component={GardenStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
