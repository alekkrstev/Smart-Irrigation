function EmptyParcelsState({ onAdd }) {
  return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>

      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        Нема парцели сè уште
      </div>

      <div
        style={{
          fontSize: 14,
          color: "var(--text-muted)",
          marginBottom: 20,
        }}
      >
        Додај ја твојата прва парцела и почни со паметно наводнување.
      </div>

      <button className="btn-primary" onClick={onAdd}>
        + Додај прва парцела
      </button>
    </div>
  );
}

export default EmptyParcelsState;
