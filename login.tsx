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
  orangeMd: "rgba(241,90,34,0.25)",
  text:     "#F0EDE8",
  muted:    "#666560",
  ghost:    "#333230",
  border:   "rgba(255,255,255,0.06)",
  borderHi: "rgba(255,255,255,0.12)",
  red:      "#E53935",
};
 
// ── reusable field ─────────────────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  placeholder,
  secure,
}: any) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
 
  return (
    <View style={s.fieldGroup}>
      <Text style={s.fieldLabel}>{label}</Text>
 
      <View style={[s.inputWrap, focused && s.inputWrapFocused]}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={C.muted}
          secureTextEntry={secure && !show}
          autoCapitalize="none"
          style={s.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
 
        {secure && (
          <TouchableOpacity onPress={() => setShow(!show)} style={s.eyeBtn}>
            <Text style={{ color: C.muted, fontSize: 15 }}>
              {show ? "○" : "●"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
 
// ── decorative corner lines ────────────────────────────────────────────────
function CornerAccent() {
  return (
    <>
      <View style={[s.cornerLine, s.cornerTL]} />
      <View style={[s.cornerLine, s.cornerTR]} />
      <View style={[s.cornerLine, s.cornerBL]} />
      <View style={[s.cornerLine, s.cornerBR]} />
    </>
  );
}
 
// ── main screen ────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  async function handleLogin() {
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }
 
    setError("");
    setLoading(true);
 
    setTimeout(() => {
      setLoading(false);
      router.replace("/");
    }, 1500);
  }
 
  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
 
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
 
        {/* ── LOGOTYPE ── */}
        <View style={s.logoSection}>
          {/* Emblem */}
          <View style={s.emblem}>
            <CornerAccent />
            <Text style={s.emblemText}>M</Text>
          </View>
 
          <Text style={s.wordmark}>
            MECANI<Text style={{ color: C.orange }}>Q</Text>
          </Text>
 
          <View style={s.taglineRow}>
            <View style={s.taglineLine} />
            <Text style={s.tagline}>DIAGNÓSTICO INTELIGENTE</Text>
            <View style={s.taglineLine} />
          </View>
        </View>
 
        {/* ── FORM CARD ── */}
        <View style={s.card}>
 
          {/* Header stripe */}
          <View style={s.cardStripe} />
 
          <Text style={s.cardTitle}>Acceso</Text>
          <Text style={s.cardSub}>Inicia sesión en tu cuenta</Text>
 
          <View style={s.divider} />
 
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
            placeholder="••••••••"
            secure
          />
 
          {!!error && (
            <View style={s.errorBox}>
              <Text style={s.errorDot}>◆</Text>
              <Text style={s.errorText}>{error}</Text>
            </View>
          )}
 
          {/* CTA */}
          <TouchableOpacity
            onPress={handleLogin}
            style={[s.btn, loading && s.btnLoading]}
            activeOpacity={0.8}
          >
            <Text style={s.btnLabel}>
              {loading ? "VERIFICANDO..." : "INICIAR SESIÓN"}
            </Text>
            {!loading && <Text style={s.btnArrow}>→</Text>}
          </TouchableOpacity>
 
          {/* Register link */}
          <TouchableOpacity
            onPress={() => router.push("/register")}
            style={s.registerBtn}
          >
            <Text style={s.registerText}>
              ¿No tienes cuenta?{" "}
              <Text style={{ color: C.orange }}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
 
        </View>
 
        {/* ── Footer label ── */}
        <Text style={s.footerLabel}>◦ IA automotriz avanzada ◦</Text>
 
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
    paddingTop: Platform.OS === "ios" ? 72 : 48,
    paddingBottom: 40,
    justifyContent: "center",
  },
 
  // logo section
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
 
  emblem: {
    width: 64,
    height: 64,
    backgroundColor: C.orangeLo,
    borderWidth: 1,
    borderColor: C.orange,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emblemText: {
    fontSize: 28,
    fontWeight: "900",
    color: C.orange,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
 
  // corner accents
  cornerLine: {
    position: "absolute",
    backgroundColor: C.orange,
  },
  cornerTL: { top: -4, left: -4, width: 10, height: 2 },
  cornerTR: { top: -4, right: -4, width: 10, height: 2 },
  cornerBL: { bottom: -4, left: -4, width: 10, height: 2 },
  cornerBR: { bottom: -4, right: -4, width: 10, height: 2 },
 
  wordmark: {
    fontSize: 22,
    fontWeight: "900",
    color: C.text,
    letterSpacing: 6,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 10,
  },
 
  taglineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  taglineLine: {
    width: 24,
    height: 1,
    backgroundColor: C.muted,
  },
  tagline: {
    fontSize: 9,
    color: C.muted,
    letterSpacing: 2.5,
    fontWeight: "600",
  },
 
  // card
  card: {
    backgroundColor: C.surface,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
 
  cardStripe: {
    height: 3,
    backgroundColor: C.orange,
    marginBottom: 24,
    marginHorizontal: -24,
  },
 
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: C.text,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
 
  cardSub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 3,
    marginBottom: 0,
    letterSpacing: 0.3,
  },
 
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 20,
  },
 
  // fields
  fieldGroup: {
    marginBottom: 16,
  },
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
    letterSpacing: 0.2,
  },
  eyeBtn: {
    paddingLeft: 10,
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
  errorDot: {
    fontSize: 8,
    color: C.red,
  },
  errorText: {
    color: C.red,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
 
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
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  btnLoading: {
    opacity: 0.65,
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
 
  registerBtn: {
    marginTop: 18,
    alignItems: "center",
  },
  registerText: {
    color: C.muted,
    fontSize: 13,
    letterSpacing: 0.2,
  },
 
  footerLabel: {
    textAlign: "center",
    color: C.ghost,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 28,
  },
});
 