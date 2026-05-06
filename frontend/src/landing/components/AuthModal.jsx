import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function AuthModal({ mode, onClose, onSwitch, onSuccess }) {
  const { login, register, loading, error } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState(null);

  if (!mode) return null;
  const isLogin = mode === "login";

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setLocalError(null);
    if (!form.email || !form.password) {
      setLocalError("Ве молиме внесете е-пошта и лозинка.");
      return;
    }
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        const name = `${form.firstName}`.trim() || form.email;
        await register(name, form.email, form.password);
      }
      onSuccess();
    } catch (e) {
      setLocalError(e.message);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#f5f0e8",
    border: "1.5px solid rgba(74,140,63,.2)",
    borderRadius: 11,
    padding: "11px 14px",
    fontFamily: "Nunito,sans-serif",
    fontSize: 14,
    outline: "none",
    color: "#1a2e1a",
  };
  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    color: "#4a5e4a",
    textTransform: "uppercase",
    letterSpacing: ".5px",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,46,26,.5)",
        backdropFilter: "blur(10px)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 28,
          padding: "44px 48px",
          width: 420,
          boxShadow: "0 32px 80px rgba(26,46,26,.25)",
          animation: "modalIn .35s cubic-bezier(.34,1.56,.64,1) both",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            background: "none",
            border: "none",
            fontSize: 20,
            color: "#7a9a7a",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg,#4a8c3f,#2d5a27)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
            }}
          >
            🌿
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 20,
              fontWeight: 800,
              color: "#1a2e1a",
            }}
          >
            SmartAgro
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 24,
            fontWeight: 800,
            color: "#1a2e1a",
            marginBottom: 5,
          }}
        >
          {isLogin ? "Добредојде назад" : "Создај сметка"}
        </div>
        <div style={{ fontSize: 14, color: "#7a9a7a", marginBottom: 24 }}>
          {isLogin
            ? "Внеси ги твоите информации"
            : "Бесплатно · Нема кредитна картичка"}
        </div>

        {!isLogin && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <label style={labelStyle}>Име и Презиме</label>
              <input
                style={inputStyle}
                placeholder="Марко Петров"
                value={form.firstName}
                onChange={set("firstName")}
              />
            </div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Е-пошта</label>
          <input
            style={inputStyle}
            type="email"
            placeholder="marko@agroflow.mk"
            value={form.email}
            onChange={set("email")}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Лозинка</label>
          <input
            style={inputStyle}
            type="password"
            placeholder={isLogin ? "••••••••" : "Мин. 8 карактери"}
            value={form.password}
            onChange={set("password")}
          />
        </div>

        {(localError || error) && (
          <div
            style={{
              background: "#fff0f0",
              border: "1px solid #fca5a5",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              color: "#c0392b",
              marginBottom: 14,
            }}
          >
            {localError || error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            background: loading
              ? "#9ca3af"
              : "linear-gradient(135deg,#4a8c3f,#2d5a27)",
            color: "white",
            border: "none",
            borderRadius: 11,
            padding: 13,
            fontFamily: "Nunito,sans-serif",
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading
            ? "..."
            : isLogin
              ? "Логирај се →"
              : "🌱 Регистрирај се бесплатно"}
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 13,
            color: "#7a9a7a",
          }}
        >
          {isLogin ? "Немаш сметка? " : "Веќе имаш сметка? "}
          <span
            onClick={onSwitch}
            style={{ color: "#4a8c3f", fontWeight: 600, cursor: "pointer" }}
          >
            {isLogin ? "Регистрирај се бесплатно" : "Логирај се"}
          </span>
        </div>
      </div>
    </div>
  );
}
export default AuthModal;
