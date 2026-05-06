function StatCard({ icon, num, label, sub, subColor, delay = 0 }) {
  return (
    <div
      className={`card fade-in fade-in-${delay}`}
      style={{
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: "var(--text)",
          lineHeight: 1,
        }}
      >
        {num}
      </div>
      <div
        style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: subColor || "var(--green-600)",
            fontWeight: 700,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
export default StatCard;
