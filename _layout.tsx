import { Tabs } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";

// ── design tokens ──────────────────────────────────────────────────────────
const C = {
  bg:       "#0C0C0C",
  surface:  "#141414",
  orange:   "#F15A22",
  dim:      "#2A2A2A",
  text:     "#F0EDE8",
  muted:    "#4A4A4A",
};

// ── custom tab bar icon ────────────────────────────────────────────────────
function TabIcon({
  icon,
  label,
  focused,
}: {
  icon: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      {focused && <View style={styles.activeGlow} />}
      <Text style={[styles.icon, focused && styles.iconActive]}>{icon}</Text>
      <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: C.orange,
        tabBarInactiveTintColor: C.muted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Diagnóstico",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="◎" label="Diagnóstico" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historial",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="≡" label="Historial" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="◈" label="Perfil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: C.surface,
    borderTopWidth: 1,
    borderTopColor: "rgba(241,90,34,0.12)",
    height: Platform.OS === "ios" ? 88 : 68,
    paddingTop: 6,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    elevation: 0,
    shadowOpacity: 0,
  },

  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 12,
    position: "relative",
  },

  tabItemActive: {
    backgroundColor: "rgba(241,90,34,0.10)",
  },

  activeGlow: {
    position: "absolute",
    top: -1,
    left: "25%",
    right: "25%",
    height: 2,
    backgroundColor: C.orange,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },

  icon: {
    fontSize: 18,
    color: C.muted,
    marginBottom: 3,
  },

  iconActive: {
    color: C.orange,
  },

  label: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: C.muted,
  },

  labelActive: {
    color: C.orange,
  },
});