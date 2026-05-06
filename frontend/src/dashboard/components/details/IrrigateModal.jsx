import { useState } from "react";
import { historyApi } from "../../../api/api";

function IrrigateModal({ parcelId, onClose, onDone }) {
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Внесете валидна количина вода.");
      return;
    }

    setSaving(true);

    try {
      await historyApi.add(parcelId, parseFloat(amount));
      await onDone();
      onClose();
    } catch (e) {
      alert(e.message);
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
        background: "rgba(26,46,26,.4)",
        backdropFilter: "blur(6px)",
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 18,
          padding: "28px 32px",
          width: 360,
          boxShadow: "0 16px 50px rgba(0,0,0,.2)",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 16,
            color: "var(--text)",
            marginBottom: 16,
          }}
        >
          💧 Евидентирај наводнување
        </div>

        <label
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--text-muted)",
            display: "block",
            marginBottom: 6,
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
            fontSize: 14,
            outline: "none",
            marginBottom: 16,
          }}
        />

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

export default IrrigateModal;
