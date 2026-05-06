import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  location: "",
  size: "",
  soilType: "",
  irrigationSystem: "",
  cropType: "",
  lastIrrigation: "",
  notes: "",
  priority: "MEDIUM",
};

function AddParcelModal({ parcel, onClose, onSave }) {
  const [form, setForm] = useState(() => {
    if (!parcel) return EMPTY_FORM;

    return {
      name: parcel.name || "",
      location: parcel.location || "",
      size: parcel.size || "",
      soilType: parcel.soilType || "",
      irrigationSystem: parcel.irrigationSystem || "",
      cropType: parcel.cropType || "",
      lastIrrigation: parcel.lastIrrigation || "",
      notes: parcel.notes || "",
      priority: parcel.priority || "MEDIUM",
    };
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (
      !form.name ||
      !form.location ||
      !form.size ||
      !form.soilType ||
      !form.irrigationSystem ||
      !form.cropType ||
      !form.priority
    ) {
      setError("Ве молиме пополнете ги задолжителните полиња.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await onSave({
        ...form,
        size: parseFloat(form.size),
        lastIrrigation: form.lastIrrigation || null,
        priority: form.priority || "MEDIUM",
      });

      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 9,
    border: "1.5px solid var(--border)",
    background: "var(--cream)",
    fontFamily: "Nunito,sans-serif",
    fontSize: 13,
    color: "var(--text)",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: ".4px",
    marginBottom: 5,
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
        background: "rgba(26,46,26,.45)",
        backdropFilter: "blur(8px)",
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: "32px 36px",
          width: 520,
          boxShadow: "0 20px 60px rgba(0,0,0,.2)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 18,
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
            fontWeight: 800,
            fontSize: 18,
            color: "var(--text)",
            marginBottom: 20,
          }}
        >
          {parcel ? "✏️ Измени парцела" : "🌿 Додај нова парцела"}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div>
            <label style={labelStyle}>Назив *</label>
            <input
              style={inputStyle}
              placeholder="Парцела A1"
              value={form.name}
              onChange={set("name")}
            />
          </div>

          <div>
            <label style={labelStyle}>Локација *</label>
            <input
              style={inputStyle}
              placeholder="Битола"
              value={form.location}
              onChange={set("location")}
            />
          </div>

          <div>
            <label style={labelStyle}>Површина (ха) *</label>
            <input
              style={inputStyle}
              type="number"
              min="0.1"
              step="0.1"
              placeholder="2.5"
              value={form.size}
              onChange={set("size")}
            />
          </div>

          <div>
            <label style={labelStyle}>Тип почва *</label>
            <input
              style={inputStyle}
              placeholder="Иловица"
              value={form.soilType}
              onChange={set("soilType")}
            />
          </div>

          <div>
            <label style={labelStyle}>Систем *</label>
            <input
              style={inputStyle}
              placeholder="Капково"
              value={form.irrigationSystem}
              onChange={set("irrigationSystem")}
            />
          </div>

          <div>
            <label style={labelStyle}>Култура *</label>
            <input
              style={inputStyle}
              placeholder="Пченица"
              value={form.cropType}
              onChange={set("cropType")}
            />
          </div>

          <div>
            <label style={labelStyle}>Последно наводнување</label>
            <input
              style={inputStyle}
              type="date"
              value={form.lastIrrigation}
              onChange={set("lastIrrigation")}
            />
          </div>

          <div>
            <label style={labelStyle}>Приоритет</label>
            <select
              style={inputStyle}
              value={form.priority}
              onChange={set("priority")}
            >
              <option value="LOW">Низок</option>
              <option value="MEDIUM">Среден</option>
              <option value="HIGH">Висок</option>
            </select>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Белешки</label>
            <textarea
              style={{
                ...inputStyle,
                minHeight: 90,
                resize: "vertical",
                lineHeight: 1.5,
              }}
              placeholder="Необврзно"
              value={form.notes}
              onChange={set("notes")}
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#fff0f0",
              border: "1px solid #fca5a5",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              color: "#c0392b",
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn-ghost" onClick={onClose}>
            Откажи
          </button>

          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Се зачувува…"
              : parcel
                ? "Зачувај промени"
                : "Зачувај парцела"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddParcelModal;
