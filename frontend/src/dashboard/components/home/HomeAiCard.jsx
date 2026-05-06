function HomeAiCard({ loading, recommendation, setScreen, setSelected }) {
  return (
    <div className="card fade-in fade-in-4" style={{ padding: "20px 22px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>
          🤖 AI Препораки · Денес
        </div>

        <button className="btn-ghost" onClick={() => setScreen("water")}>
          → Сите
        </button>
      </div>

      <div
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 14,
        }}
      >
        Базирани на временски податоци
      </div>

      {recommendation ? (
        <div
          style={{
            background: "#fff5f5",
            border: "1px solid #fca5a5",
            borderLeft: "3px solid #ef4444",
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#ef4444",
              letterSpacing: ".5px",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            🚨 {recommendation.parcelName} — Итно наводнување
          </div>

          <div
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              color: "var(--text-muted)",
              marginBottom: 12,
            }}
          >
            {recommendation.text}
          </div>

          <button
            className="btn-primary"
            style={{ fontSize: 12 }}
            onClick={() => {
              setSelected(recommendation.parcelId);
              setScreen("details");
            }}
          >
            Прифати →
          </button>
        </div>
      ) : (
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            padding: "12px 0",
          }}
        >
          {loading ? "Се вчитува препораки…" : "Нема итни препораки денес. ✅"}
        </div>
      )}
    </div>
  );
}

export default HomeAiCard;
