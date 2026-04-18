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
  red:      "#E53935",
  yellow:   "#F9A825",
  green:    "#43A047",
};
 
// ── mock data ──────────────────────────────────────────────────────────────
const data = [
  {
    id: 1,
    title: "Ruido en frenos",
    date: "Hace 2 horas",
    price: "$1,200 – $2,500 MXN",
    severity: "ALTA" as const,
    tags: ["Frena mal", "Ruido extraño"],
    vehicle: "Nissan Sentra 2018",
  },
  {
    id: 2,
    title: "Sobrecalentamiento",
    date: "Ayer",
    price: "$3,000 – $6,000 MXN",
    severity: "MEDIA" as const,
    tags: ["Se calienta"],
    vehicle: "Nissan Sentra 2018",
  },
];
 
type Severity = "ALTA" | "MEDIA" | "BAJA";
 
function severityStyle(sev: Severity) {
  if (sev === "ALTA")  return { bg: "rgba(229,57,53,0.12)",  text: C.red,    bar: C.red };
  if (sev === "MEDIA") return { bg: "rgba(249,168,37,0.12)", text: C.yellow, bar: C.yellow };
  return                     { bg: "rgba(67,160,71,0.12)",   text: C.green,  bar: C.green };
}
 
// ── history card ───────────────────────────────────────────────────────────
function HistoryCard({ item }: { item: typeof data[0] }) {
  const sv = severityStyle(item.severity);
 
  return (
    <TouchableOpacity style={s.card} activeOpacity={0.75}>
 
      {/* left severity bar */}
      <View style={[s.cardBar, { backgroundColor: sv.bar }]} />
 
      <View style={s.cardBody}>
        {/* top row */}
        <View style={s.cardTop}>
          <Text style={s.cardTitle}>{item.title}</Text>
          <View style={[s.badge, { backgroundColor: sv.bg }]}>
            <Text style={[s.badgeText, { color: sv.text }]}>{item.severity}</Text>
          </View>
        </View>
 
        {/* vehicle */}
        <View style={s.vehicleRow}>
          <Text style={s.vehicleIcon}>◈</Text>
          <Text style={s.vehicleText}>{item.vehicle}</Text>
        </View>
 
        {/* tags */}
        <View style={s.tagsRow}>
          {item.tags.map(t => (
            <View key={t} style={s.tag}>
              <Text style={s.tagText}>{t}</Text>
            </View>
          ))}
        </View>
 
        {/* bottom row */}
        <View style={s.cardBottom}>
          <View style={s.priceBox}>
            <Text style={s.priceLabel}>ESTIMADO</Text>
            <Text style={s.priceValue}>{item.price}</Text>
          </View>
 
          <Text style={s.dateText}>{item.date}</Text>
        </View>
      </View>
 
      {/* chevron */}
      <Text style={s.chevron}>›</Text>
 
    </TouchableOpacity>
  );
}
 
// ── main screen ────────────────────────────────────────────────────────────
export default function History() {
  return (
    <View style={s.root}>
 
      {/* ── PAGE HEADER ── */}
      <View style={s.pageHeader}>
        <View>
          <Text style={s.pageTitle}>Historial</Text>
          <Text style={s.pageSub}>Tus diagnósticos recientes</Text>
        </View>
 
        {/* count badge */}
        <View style={s.countBadge}>
          <Text style={s.countText}>{data.length}</Text>
        </View>
      </View>
 
      {/* ── FILTER ROW ── */}
      <View style={s.filterRow}>
        {["Todos", "Alta", "Media", "Baja"].map((f, i) => (
          <TouchableOpacity
            key={f}
            style={[s.filterChip, i === 0 && s.filterChipActive]}
          >
            <Text style={[s.filterText, i === 0 && s.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
 
      {/* ── DIVIDER ── */}
      <View style={s.divider} />
 
      {/* ── CARDS ── */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={s.cardList}>
          {data.map(item => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </View>
 
        {/* empty state placeholder */}
        {data.length === 0 && (
          <View style={s.emptyState}>
            <Text style={s.emptyIcon}>◎</Text>
            <Text style={s.emptyTitle}>Sin diagnósticos</Text>
            <Text style={s.emptySub}>Tus análisis aparecerán aquí</Text>
          </View>
        )}
 
        <View style={{ height: 32 }} />
      </ScrollView>
 
    </View>
  );
}
 
// ── styles ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
    paddingTop: Platform.OS === "ios" ? 56 : 20,
  },
 
  // page header
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: C.text,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 0.2,
  },
  pageSub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 3,
    letterSpacing: 0.2,
  },
  countBadge: {
    width: 36,
    height: 36,
    borderRadius: 2,
    backgroundColor: C.orangeLo,
    borderWidth: 1,
    borderColor: C.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    color: C.orange,
    fontSize: 16,
    fontWeight: "800",
  },
 
  // filter row
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 22,
    gap: 8,
    marginBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: C.ghost,
    backgroundColor: C.elevated,
  },
  filterChipActive: {
    backgroundColor: C.orangeLo,
    borderColor: C.orange,
  },
  filterText: {
    fontSize: 11,
    color: C.muted,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  filterTextActive: {
    color: C.orange,
  },
 
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginHorizontal: 0,
    marginBottom: 16,
  },
 
  // cards list
  cardList: {
    paddingHorizontal: 22,
    gap: 12,
  },
 
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 2,
    overflow: "hidden",
  },
 
  cardBar: {
    width: 3,
  },
 
  cardBody: {
    flex: 1,
    padding: 16,
  },
 
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
 
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: C.text,
    letterSpacing: 0.2,
  },
 
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
 
  // vehicle info
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  vehicleIcon: {
    color: C.muted,
    fontSize: 10,
  },
  vehicleText: {
    fontSize: 11,
    color: C.muted,
    letterSpacing: 0.3,
  },
 
  // symptom tags
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    backgroundColor: C.elevated,
    borderWidth: 1,
    borderColor: C.ghost,
  },
  tagText: {
    fontSize: 10,
    color: C.muted,
    fontWeight: "500",
  },
 
  // bottom row
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
 
  priceBox: {
    gap: 2,
  },
  priceLabel: {
    fontSize: 8,
    color: C.ghost,
    letterSpacing: 1.5,
    fontWeight: "700",
  },
  priceValue: {
    fontSize: 13,
    color: C.orange,
    fontWeight: "700",
  },
 
  dateText: {
    fontSize: 10,
    color: C.muted,
    letterSpacing: 0.3,
  },
 
  chevron: {
    color: C.ghost,
    fontSize: 22,
    paddingRight: 12,
    alignSelf: "center",
  },
 
  // empty state
  emptyState: {
    alignItems: "center",
    paddingVertical: 56,
  },
  emptyIcon: {
    fontSize: 32,
    color: C.ghost,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: C.muted,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 12,
    color: C.ghost,
  },
});
 