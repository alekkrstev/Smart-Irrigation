import { useState } from "react";
import { historyApi } from "../../../api/api";

function IrrigateParcelModal({ parcel, onClose, onDone }) {
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Внесете валидна количина вода.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await historyApi.add(parcel.id, parseFloat(amount));
      await onDone();
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
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
          padding: "28px 32px",
          width: 380,
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
            marginBottom: 6,
          }}
        >
          💧 Наводни сега
        </div>

        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            marginBottom: 18,
          }}
        >
          Парцела: <strong>{parcel.name}</strong>
        </div>

        <label
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: ".4px",
            marginBottom: 6,
            display: "block",
          }}
        >
          Количина вода (литри)
        </label>

        <input
          type="number"
          min="1"
          step="100"
          placeholder="15000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 9,
            border: "1.5px solid var(--border)",
            background: "var(--cream)",
            fontSize: 14,
            outline: "none",
            marginBottom: 14,
          }}
        />

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
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Се зачувува…" : "Зачувај"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IrrigateParcelModal;
