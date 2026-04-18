import { useState } from "react";
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
 
// ── design tokens ──────────────────────────────────────────────────────────
const C = {
  bg:        "#0C0C0C",
  bg2:       "#111111",
  surface:   "#141414",
  elevated:  "#1C1C1C",
  card:      "#181818",
  orange:    "#F15A22",
  orangeLo:  "rgba(241,90,34,0.10)",
  orangeMd:  "rgba(241,90,34,0.20)",
  text:      "#F0EDE8",
  muted:     "#666560",
  ghost:     "#2A2828",
  border:    "rgba(255,255,255,0.06)",
  borderHi:  "rgba(255,255,255,0.11)",
  red:       "#E53935",
  yellow:    "#F9A825",
  green:     "#43A047",
};
 
// ── types ──────────────────────────────────────────────────────────────────
type Severity = "ALTA" | "MEDIA" | "BAJA";
 
interface DiagResult {
  name:     string;
  detail:   string;
  price:    string;
  severity: Severity;
}
 
const QUICK_TAGS = ["No enciende", "Se calienta", "Frena mal", "Ruido extraño", "Pierde potencia"];
 
const MOCK_RESULTS: DiagResult[] = [
  {
    name:     "Sistema de frenos",
    detail:   "Posible desgaste en pastillas delanteras. Revisión inmediata recomendada.",
    price:    "Est. $1,200 – $2,500 MXN",
    severity: "ALTA",
  },
  {
    name:     "Sistema de enfriamiento",
    detail:   "Termostato o bomba de agua con posible falla.",
    price:    "Est. $800 – $2,000 MXN",
    severity: "MEDIA",
  },
];
 
// ── helpers ────────────────────────────────────────────────────────────────
function severityStyle(sev: Severity) {
  if (sev === "ALTA")  return { bg: "rgba(229,57,53,0.12)",  text: C.red,    bar: C.red };
  if (sev === "MEDIA") return { bg: "rgba(249,168,37,0.12)", text: C.yellow, bar: C.yellow };
  return                     { bg: "rgba(67,160,71,0.12)",   text: C.green,  bar: C.green };
}
 
// ── sub-components ─────────────────────────────────────────────────────────
function TopBar() {
  return (
    <View style={s.topBar}>
      {/* Menu */}
      <TouchableOpacity style={s.headerBtn}>
        <View style={[s.hLine, { width: 16 }]} />
        <View style={[s.hLine, { width: 10, marginTop: 4 }]} />
        <View style={[s.hLine, { width: 13, marginTop: 4 }]} />
      </TouchableOpacity>
 
      {/* Logo */}
      <View style={s.logoWrap}>
        <Text style={s.logoText}>
          MECANI<Text style={{ color: C.orange }}>Q</Text>
        </Text>
      </View>
 
      {/* Avatar */}
      <TouchableOpacity style={s.headerBtn}>
        <View style={s.avatar} />
      </TouchableOpacity>
    </View>
  );
}
 
function Label({ children }: { children: string }) {
  return (
    <View style={s.labelRow}>
      <View style={s.labelLine} />
      <Text style={s.label}>{children}</Text>
    </View>
  );
}
 
function ResultItem({ item, index }: { item: DiagResult; index: number }) {
  const sv = severityStyle(item.severity);
  return (
    <View style={[s.resultItem, index === 0 && { borderTopWidth: 0 }]}>
      {/* severity bar */}
      <View style={[s.severityBar, { backgroundColor: sv.bar }]} />
 
      <View style={s.resultContent}>
        <View style={s.resultHeader}>
          <Text style={s.resultName}>{item.name}</Text>
          <View style={[s.badge, { backgroundColor: sv.bg }]}>
            <Text style={[s.badgeText, { color: sv.text }]}>{item.severity}</Text>
          </View>
        </View>
        <Text style={s.resultDetail}>{item.detail}</Text>
        <View style={s.resultPriceRow}>
          <Text style={s.resultPriceLabel}>ESTIMADO  </Text>
          <Text style={s.resultPrice}>{item.price}</Text>
        </View>
      </View>
    </View>
  );
}
 
// ── main screen ────────────────────────────────────────────────────────────
export default function DiagnosticoScreen() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Se calienta", "Ruido extraño"]);
  const [symptoms, setSymptoms]         = useState("");
  const [year, setYear]                 = useState("");
  const [model, setModel]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [results, setResults]           = useState<DiagResult[] | null>(null);
 
  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }
 
  async function handleAnalyze() {
    if (loading) return;
    setLoading(true);
    setResults(null);
    await new Promise(r => setTimeout(r, 1800));
    setResults(MOCK_RESULTS);
    setLoading(false);
  }
 
  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <TopBar />
 
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── PAGE HEADER ── */}
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>
            Describe la falla{"\n"}de tu vehículo
          </Text>
          <View style={s.aiPill}>
            <Text style={s.aiPillDot}>✦</Text>
            <Text style={s.aiPillText}>Gemini AI</Text>
          </View>
        </View>
 
        {/* ── SYMPTOMS TEXTAREA ── */}
        <Label>SÍNTOMAS DETALLADOS</Label>
        <View style={s.textAreaWrap}>
          <TextInput
            value={symptoms}
            onChangeText={setSymptoms}
            placeholder="Ej. El motor tiembla al acelerar y se escucha un ruido metálico en la parte delantera derecha…"
            placeholderTextColor={C.muted}
            multiline
            style={s.textArea}
          />
          <TouchableOpacity style={s.micBtn} activeOpacity={0.8}>
            <Text style={{ color: "#fff", fontSize: 15 }}>🎙</Text>
          </TouchableOpacity>
        </View>
 
        {/* ── QUICK TAGS ── */}
        <Label>SELECCIÓN RÁPIDA</Label>
        <View style={s.tagsRow}>
          {QUICK_TAGS.map(tag => {
            const active = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                onPress={() => toggleTag(tag)}
                style={[s.tag, active && s.tagActive]}
                activeOpacity={0.75}
              >
                {active && <View style={s.tagDot} />}
                <Text style={[s.tagText, active && s.tagTextActive]}>{tag}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
 
        {/* ── VEHICLE INFO ── */}
        <View style={s.vehicleRow}>
          <View style={{ flex: 1 }}>
            <Label>AÑO</Label>
            <TextInput
              value={year}
              onChangeText={setYear}
              placeholder="2018"
              placeholderTextColor={C.muted}
              keyboardType="numeric"
              style={s.vehicleInput}
            />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 2 }}>
            <Label>MODELO</Label>
            <TextInput
              value={model}
              onChangeText={setModel}
              placeholder="Ej. Honda Civic"
              placeholderTextColor={C.muted}
              style={s.vehicleInput}
            />
          </View>
        </View>
 
        {/* ── CTA ── */}
        <TouchableOpacity
          onPress={handleAnalyze}
          style={[s.ctaBtn, loading && { opacity: 0.7 }]}
          activeOpacity={0.85}
        >
          <Text style={s.ctaBtnText}>
            {loading ? "ANALIZANDO..." : "✦  ANALIZAR CON GEMINI"}
          </Text>
        </TouchableOpacity>
 
        {/* ── RESULT CARD ── */}
        <View style={s.resultCard}>
 
          {/* card top stripe */}
          <View style={s.resultCardStripe} />
 
          <View style={s.resultCardHeader}>
            <Text style={s.resultCardLabel}>RESULTADO DEL DIAGNÓSTICO</Text>
            <View style={[
              s.statusPill,
              results
                ? { backgroundColor: "rgba(67,160,71,0.15)" }
                : { backgroundColor: C.elevated }
            ]}>
              <Text style={[
                s.statusText,
                results ? { color: C.green } : { color: C.muted }
              ]}>
                {results ? "COMPLETADO" : loading ? "EN PROCESO" : "EN ESPERA"}
              </Text>
            </View>
          </View>
 
          {!results && !loading && (
            <View style={s.emptyState}>
              <View style={s.emptyIcon}>
                <Text style={{ fontSize: 20, color: C.muted }}>◷</Text>
              </View>
              <Text style={s.emptyTitle}>Esperando telemetría</Text>
              <Text style={s.emptySub}>
                Ingresa los síntomas y detalles de tu vehículo para iniciar el análisis con IA.
              </Text>
            </View>
          )}
 
          {loading && (
            <View style={s.emptyState}>
              <View style={[s.emptyIcon, { backgroundColor: C.orangeLo, borderColor: C.orange }]}>
                <Text style={{ fontSize: 20, color: C.orange }}>◷</Text>
              </View>
              <Text style={s.emptyTitle}>Procesando modelo…</Text>
              <Text style={s.emptySub}>
                La IA está analizando los síntomas de tu vehículo.
              </Text>
            </View>
          )}
 
          {results && results.map((r, i) => (
            <ResultItem key={i} item={r} index={i} />
          ))}
 
        </View>
 
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
 
// ── styles ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
 
  // top bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 2,
    backgroundColor: C.elevated,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  hLine: {
    height: 1.5,
    backgroundColor: C.muted,
    borderRadius: 1,
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: C.orange,
    backgroundColor: C.orangeLo,
  },
  logoWrap: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "900",
    color: C.text,
    letterSpacing: 4,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
 
  // scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
 
  // page header
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 22,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: C.text,
    lineHeight: 32,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  aiPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: C.orangeLo,
    borderWidth: 1,
    borderColor: C.orange,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    marginTop: 4,
  },
  aiPillDot: { color: C.orange, fontSize: 9 },
  aiPillText: {
    color: C.orange,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },
 
  // label
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    marginTop: 4,
  },
  labelLine: {
    width: 3,
    height: 12,
    backgroundColor: C.orange,
    borderRadius: 1,
  },
  label: {
    fontSize: 9,
    fontWeight: "700",
    color: C.muted,
    letterSpacing: 1.8,
  },
 
  // textarea
  textAreaWrap: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.borderHi,
    borderRadius: 2,
    padding: 14,
    minHeight: 110,
    marginBottom: 20,
    position: "relative",
  },
  textArea: {
    color: C.text,
    fontSize: 14,
    lineHeight: 22,
    textAlignVertical: "top",
    minHeight: 75,
    paddingRight: 44,
  },
  micBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 2,
    backgroundColor: C.orange,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.orange,
    shadowOpacity: 0.40,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
 
  // tags
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: C.ghost,
    backgroundColor: C.elevated,
  },
  tagActive: {
    borderColor: C.orange,
    backgroundColor: C.orangeLo,
  },
  tagDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: C.orange,
  },
  tagText: {
    fontSize: 12,
    color: C.muted,
    fontWeight: "500",
  },
  tagTextActive: {
    color: C.orange,
    fontWeight: "600",
  },
 
  // vehicle inputs
  vehicleRow: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  vehicleInput: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.borderHi,
    borderRadius: 2,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: C.text,
    fontSize: 14,
  },
 
  // CTA button
  ctaBtn: {
    backgroundColor: C.orange,
    borderRadius: 2,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 0,
    shadowColor: C.orange,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  ctaBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2.5,
  },
 
  // result card
  resultCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 2,
    marginTop: 18,
    overflow: "hidden",
  },
 
  resultCardStripe: {
    height: 3,
    backgroundColor: C.orange,
    marginBottom: 0,
  },
 
  resultCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  resultCardLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: C.muted,
    letterSpacing: 1.8,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
 
  // empty / loading state
  emptyState: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.elevated,
    borderWidth: 1,
    borderColor: C.ghost,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: C.text,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  emptySub: {
    fontSize: 12,
    color: C.muted,
    textAlign: "center",
    lineHeight: 18,
  },
 
  // result items
  resultItem: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  severityBar: {
    width: 3,
  },
  resultContent: {
    flex: 1,
    padding: 16,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  resultName: {
    fontSize: 14,
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
  resultDetail: {
    fontSize: 12,
    color: C.muted,
    marginBottom: 8,
    lineHeight: 17,
  },
  resultPriceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultPriceLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: C.ghost,
    letterSpacing: 1.5,
  },
  resultPrice: {
    fontSize: 12,
    color: C.orange,
    fontWeight: "600",
  },
});