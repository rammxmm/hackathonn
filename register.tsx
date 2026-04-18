import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
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
  bg:       "#0C0C0C",
  surface:  "#141414",
  elevated: "#1C1C1C",
  orange:   "#F15A22",
  orangeLo: "rgba(241,90,34,0.10)",
  text:     "#F0EDE8",
  muted:    "#666560",
  ghost:    "#333230",
  border:   "rgba(255,255,255,0.06)",
  red:      "#E53935",
};
 
// ── reusable field ─────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, secure }: any) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
 
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={s.fieldLabel}>{label}</Text>
 
      <View style={[s.inputWrap, focused && s.inputWrapFocused]}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={C.muted}
          secureTextEntry={secure && !show}
          style={s.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="none"
        />
 
        {secure && (
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Text style={{ color: C.muted, fontSize: 15 }}>
              {show ? "○" : "●"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
 
// ── step indicator ─────────────────────────────────────────────────────────
function StepDot({ num, active }: { num: number; active: boolean }) {
  return (
    <View style={[s.step, active && s.stepActive]}>
      <Text style={[s.stepText, active && s.stepTextActive]}>{num}</Text>
    </View>
  );
}
 
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  function handleRegister() {
    if (!name || !email || !password) {
      setError("Completa todos los campos");
      return;
    }
 
    setError("");
    setLoading(true);
 
    setTimeout(() => {
      setLoading(false);
      router.replace("/login");
    }, 1500);
  }
 
  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
 
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
 
        {/* ── HEADER ── */}
        <View style={s.header}>
          <Text style={s.wordmark}>
            MECANI<Text style={{ color: C.orange }}>Q</Text>
          </Text>
          <Text style={s.headerSub}>NUEVA CUENTA</Text>
        </View>
 
        {/* ── STEP INDICATOR ── */}
        <View style={s.stepsRow}>
          <StepDot num={1} active={true} />
          <View style={s.stepConnector} />
          <StepDot num={2} active={false} />
          <View style={s.stepConnector} />
          <StepDot num={3} active={false} />
        </View>
 
        {/* ── FORM ── */}
        <View style={s.card}>
 
          {/* left accent bar */}
          <View style={s.accentBar} />
 
          <Text style={s.cardTitle}>Crear cuenta</Text>
          <Text style={s.cardSub}>Regístrate para comenzar tu diagnóstico</Text>
 
          <View style={s.divider} />
 
          <Field
            label="NOMBRE COMPLETO"
            value={name}
            onChange={setName}
            placeholder="Tu nombre"
          />
 
          <Field
            label="CORREO ELECTRÓNICO"
            value={email}
            onChange={setEmail}
            placeholder="correo@ejemplo.com"
          />
 
          <Field
            label="CONTRASEÑA"
            value={password}
            onChange={setPassword}
            placeholder="Mínimo 6 caracteres"
            secure
          />
 
          {/* password hint */}
          <View style={s.hintRow}>
            {["Mayúscula", "Número", "+6 chars"].map((h, i) => (
              <View key={i} style={s.hintChip}>
                <Text style={s.hintText}>{h}</Text>
              </View>
            ))}
          </View>
 
          {!!error && (
            <View style={s.errorBox}>
              <Text style={s.errorDot}>◆</Text>
              <Text style={s.errorText}>{error}</Text>
            </View>
          )}
 
          {/* CTA */}
          <TouchableOpacity
            onPress={handleRegister}
            style={[s.btn, loading && { opacity: 0.65 }]}
            activeOpacity={0.8}
          >
            <Text style={s.btnLabel}>
              {loading ? "CREANDO CUENTA..." : "CREAR CUENTA"}
            </Text>
            {!loading && <Text style={s.btnArrow}>→</Text>}
          </TouchableOpacity>
 
          {/* Back to login */}
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backArrow}>←</Text>
            <Text style={s.backText}>
              ¿Ya tienes cuenta?{" "}
              <Text style={{ color: C.orange }}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
 
        </View>
 
        <Text style={s.footerLabel}>◦ Registro seguro y encriptado ◦</Text>
 
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
// ── styles ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 64 : 44,
    paddingBottom: 40,
  },
 
  header: {
    marginBottom: 28,
  },
  wordmark: {
    fontSize: 20,
    fontWeight: "900",
    color: C.text,
    letterSpacing: 5,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  headerSub: {
    fontSize: 9,
    color: C.muted,
    letterSpacing: 3,
    marginTop: 4,
    fontWeight: "600",
  },
 
  // step indicator
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  step: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.ghost,
    backgroundColor: C.elevated,
    justifyContent: "center",
    alignItems: "center",
  },
  stepActive: {
    backgroundColor: C.orange,
    borderColor: C.orange,
  },
  stepText: {
    fontSize: 11,
    fontWeight: "700",
    color: C.muted,
  },
  stepTextActive: {
    color: "#fff",
  },
  stepConnector: {
    flex: 1,
    height: 1,
    backgroundColor: C.ghost,
    marginHorizontal: 6,
  },
 
  // card
  card: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 2,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
    position: "relative",
    overflow: "hidden",
  },
 
  accentBar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 3,
    backgroundColor: C.orange,
  },
 
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: C.text,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  cardSub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 3,
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: 20,
  },
 
  // fields
  fieldLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: C.muted,
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.elevated,
    borderWidth: 1,
    borderColor: C.ghost,
    borderRadius: 2,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  inputWrapFocused: {
    borderColor: C.orange,
    backgroundColor: C.orangeLo,
  },
  input: {
    flex: 1,
    color: C.text,
    fontSize: 14,
  },
 
  // password hints
  hintRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
    marginTop: -4,
  },
  hintChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: C.elevated,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: C.ghost,
  },
  hintText: {
    fontSize: 9,
    color: C.muted,
    letterSpacing: 0.5,
  },
 
  // error
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(229,57,53,0.10)",
    borderWidth: 1,
    borderColor: "rgba(229,57,53,0.30)",
    borderRadius: 2,
    padding: 10,
    marginBottom: 4,
  },
  errorDot: { fontSize: 8, color: C.red },
  errorText: { color: C.red, fontSize: 12, fontWeight: "600" },
 
  // button
  btn: {
    backgroundColor: C.orange,
    borderRadius: 2,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    shadowColor: C.orange,
    shadowOpacity: 0.30,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  btnLabel: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },
  btnArrow: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
  },
 
  backBtn: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  backArrow: {
    color: C.muted,
    fontSize: 14,
  },
  backText: {
    color: C.muted,
    fontSize: 13,
  },
 
  footerLabel: {
    textAlign: "center",
    color: C.ghost,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 28,
  },
});
 