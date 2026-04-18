import { router } from "expo-router";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
 
// ── design tokens ──────────────────────────────────────────────────────────
const C = {
  bg:       "#0C0C0C",
  surface:  "#141414",
  elevated: "#1C1C1C",
  orange:   "#F15A22",
  orangeLo: "rgba(241,90,34,0.10)",
  text:     "#F0EDE8",
  muted:    "#666560",
  ghost:    "#2A2828",
  border:   "rgba(255,255,255,0.06)",
  borderHi: "rgba(255,255,255,0.11)",
};
 
// ── stat block ─────────────────────────────────────────────────────────────
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}
 
// ── menu row ───────────────────────────────────────────────────────────────
function MenuRow({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[s.menuRow, danger && s.menuRowDanger]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[s.menuIcon, danger && s.menuIconDanger]}>
        <Text style={{ fontSize: 14, color: danger ? C.orange : C.muted }}>{icon}</Text>
      </View>
      <Text style={[s.menuLabel, danger && s.menuLabelDanger]}>{label}</Text>
      {!danger && <Text style={s.menuChevron}>›</Text>}
    </TouchableOpacity>
  );
}
 
// ── section header ─────────────────────────────────────────────────────────
function SectionHeader({ label }: { label: string }) {
  return (
    <View style={s.sectionHeader}>
      <View style={s.sectionLine} />
      <Text style={s.sectionLabel}>{label}</Text>
    </View>
  );
}
 
// ── main screen ────────────────────────────────────────────────────────────
export default function Profile() {
  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
 
        {/* ── HERO / AVATAR SECTION ── */}
        <View style={s.hero}>
          {/* Decorative grid lines */}
          <View style={s.heroDecorH} />
          <View style={s.heroDecorV} />
 
          {/* Avatar */}
          <View style={s.avatarRing}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>JR</Text>
            </View>
          </View>
 
          <Text style={s.userName}>Jesús Ramblas</Text>
          <Text style={s.userEmail}>jesus@email.com</Text>
 
          {/* Plan badge */}
          <View style={s.planBadge}>
            <Text style={s.planDot}>✦</Text>
            <Text style={s.planText}>PLAN PRO</Text>
          </View>
        </View>
 
        {/* ── STATS ── */}
        <View style={s.statsRow}>
          <Stat label="Diagnósticos" value="12" />
          <View style={s.statDivider} />
          <Stat label="Vehículos" value="1" />
          <View style={s.statDivider} />
          <Stat label="Este mes" value="3" />
        </View>
 
        <View style={s.content}>
 
          {/* ── VEHICLE CARD ── */}
          <SectionHeader label="VEHÍCULO PRINCIPAL" />
          <View style={s.vehicleCard}>
            <View style={s.vehicleAccent} />
            <View style={s.vehicleInfo}>
              <Text style={s.vehicleName}>Nissan Sentra 2018</Text>
              <View style={s.vehicleChips}>
                {["Motor 2.0L", "Automático"].map(chip => (
                  <View key={chip} style={s.chip}>
                    <Text style={s.chipText}>{chip}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={s.vehicleObd}>
              <View style={s.obdDot} />
              <Text style={s.obdText}>OBD</Text>
            </View>
          </View>
 
          {/* ── ACCOUNT ACTIONS ── */}
          <SectionHeader label="CUENTA" />
          <View style={s.menuCard}>
            <MenuRow icon="◈" label="Editar perfil" />
            <View style={s.menuSep} />
            <MenuRow icon="⊞" label="Mis vehículos" />
            <View style={s.menuSep} />
            <MenuRow icon="◎" label="Historial completo" />
          </View>
 
          {/* ── SETTINGS ── */}
          <SectionHeader label="CONFIGURACIÓN" />
          <View style={s.menuCard}>
            <MenuRow icon="◻" label="Notificaciones" />
            <View style={s.menuSep} />
            <MenuRow icon="◇" label="Privacidad" />
            <View style={s.menuSep} />
            <MenuRow icon="○" label="Idioma y región" />
          </View>
 
          {/* ── LOGOUT ── */}
          <SectionHeader label="SESIÓN" />
          <View style={s.menuCard}>
            <MenuRow
              icon="→"
              label="Cerrar sesión"
              onPress={() => router.replace("/login")}
              danger
            />
          </View>
 
          {/* version */}
          <Text style={s.version}>MecaniQ v1.0.0  ◦  Powered by Gemini AI</Text>
 
        </View>
      </ScrollView>
    </View>
  );
}
 
// ── styles ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
 
  // hero
  hero: {
    backgroundColor: C.surface,
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 64 : 44,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    position: "relative",
    overflow: "hidden",
  },
 
  heroDecorH: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: C.border,
  },
  heroDecorV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 1,
    backgroundColor: C.border,
  },
 
  avatarRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: C.orange,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    backgroundColor: C.orangeLo,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
 
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: C.text,
    letterSpacing: 0.3,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  userEmail: {
    fontSize: 12,
    color: C.muted,
    marginTop: 3,
    letterSpacing: 0.3,
  },
 
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: C.orangeLo,
    borderWidth: 1,
    borderColor: C.orange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
    marginTop: 10,
  },
  planDot: { color: C.orange, fontSize: 8 },
  planText: {
    color: C.orange,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },
 
  // stats
  statsRow: {
    flexDirection: "row",
    backgroundColor: C.elevated,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: C.text,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  statLabel: {
    fontSize: 9,
    color: C.muted,
    letterSpacing: 1,
    marginTop: 3,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    backgroundColor: C.border,
    marginVertical: 12,
  },
 
  // content area
  content: {
    padding: 20,
  },
 
  // section headers
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionLine: {
    width: 3,
    height: 12,
    backgroundColor: C.orange,
    borderRadius: 1,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: C.muted,
    letterSpacing: 1.8,
  },
 
  // vehicle card
  vehicleCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.borderHi,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  vehicleAccent: {
    width: 3,
    alignSelf: "stretch",
    backgroundColor: C.orange,
  },
  vehicleInfo: {
    flex: 1,
    padding: 16,
  },
  vehicleName: {
    fontSize: 15,
    fontWeight: "700",
    color: C.text,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  vehicleChips: {
    flexDirection: "row",
    gap: 6,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    backgroundColor: C.elevated,
    borderWidth: 1,
    borderColor: C.ghost,
  },
  chipText: {
    fontSize: 10,
    color: C.muted,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  vehicleObd: {
    paddingRight: 16,
    alignItems: "center",
    gap: 4,
  },
  obdDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#43A047",
    shadowColor: "#43A047",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  obdText: {
    fontSize: 8,
    color: "#43A047",
    fontWeight: "700",
    letterSpacing: 1,
  },
 
  // menu card
  menuCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  menuSep: {
    height: 1,
    backgroundColor: C.border,
    marginHorizontal: 16,
  },
 
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuRowDanger: {
    // No extra bg; rely on text/icon color
  },
  menuIcon: {
    width: 30,
    height: 30,
    borderRadius: 2,
    backgroundColor: C.elevated,
    borderWidth: 1,
    borderColor: C.ghost,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconDanger: {
    backgroundColor: C.orangeLo,
    borderColor: C.orange,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    color: C.text,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  menuLabelDanger: {
    color: C.orange,
    fontWeight: "600",
  },
  menuChevron: {
    color: C.ghost,
    fontSize: 20,
  },
 
  // version
  version: {
    textAlign: "center",
    fontSize: 10,
    color: C.ghost,
    letterSpacing: 1.2,
    marginTop: 28,
    marginBottom: 8,
  },
});
 