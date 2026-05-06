import ParcelRow from "./ParcelRow";

function HomeParcelsCard({ loading, parcels, setScreen, setSelected }) {
  return (
    <div className="card fade-in fade-in-3" style={{ padding: "20px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>
          🗺 Мои парцели
        </div>

        <button className="btn-ghost" onClick={() => setScreen("parcels")}>
          → Сите
        </button>
      </div>

      <div
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 4,
        }}
      >
        Состојба · Денес
      </div>

      {loading ? (
        <div
          style={{
            padding: 20,
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: 13,
          }}
        >
          Се вчитува…
        </div>
      ) : parcels.length === 0 ? (
        <div
          style={{
            padding: 20,
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: 13,
          }}
        >
          Нема парцели.{" "}
          <span
            style={{
              color: "var(--green-600)",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() => setScreen("parcels")}
          >
            Додај прва парцела →
          </span>
        </div>
      ) : (
        parcels.slice(0, 5).map((p) => (
          <ParcelRow
            key={p.id}
            p={p}
            onClick={() => {
              setSelected(p.id);
              setScreen("details");
            }}
          />
        ))
      )}
    </div>
  );
}

export default HomeParcelsCard;
