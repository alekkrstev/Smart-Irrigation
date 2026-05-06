import SectionTitle from "./SectionTitle";

function RecommendationCard({ recommendation, onIrrigate }) {
  return (
    <div
      className="card fade-in fade-in-2"
      style={{
        padding: "20px 22px",
        background: recommendation ? "#fffbeb" : "white",
        borderLeft: `3px solid ${recommendation ? "#f59e0b" : "var(--border)"}`,
      }}
    >
      <SectionTitle icon="🤖" label="AI Препорака" />

      <div style={{ marginTop: 12 }}>
        {recommendation ? (
          <>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "var(--text-muted)",
                marginBottom: 14,
              }}
            >
              {recommendation.recommendation ||
                recommendation.explanation ||
                "Има активна препорака за оваа парцела."}
            </div>

            <button
              className="btn-primary"
              style={{ fontSize: 12 }}
              onClick={onIrrigate}
            >
              ✓ Прифати и наводни
            </button>
          </>
        ) : (
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Нема активна препорака за оваа парцела денес. ✅
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendationCard;
