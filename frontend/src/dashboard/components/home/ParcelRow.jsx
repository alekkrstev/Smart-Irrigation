function ParcelRow({ p, onClick }) {
  const badgeMap = {
    urgent: ["badge-red", "⚠ Итно"],
    today: ["badge-yellow", "⏰ Денес"],
    ok: ["badge-green", "✓ Ок"],
  };
  const [cls, lbl] = badgeMap[p.status] || ["badge-blue", "?"];
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "13px 0",
        borderBottom: "1px solid var(--border)",
        cursor: "pointer",
        transition: "background .15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
    >
      <div
        style={{
          width: 3,
          height: 44,
          borderRadius: 2,
          background:
            p.color === "yellow"
              ? "#f59e0b"
              : p.color === "red"
                ? "#ef4444"
                : p.color === "orange"
                  ? "#f97316"
                  : "var(--green-500)",
          flexShrink: 0,
        }}
      />
      <div style={{ fontSize: 22, width: 28, textAlign: "center" }}>
        {p.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>
          {p.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
          {p.crop} · {p.location}
        </div>
      </div>
      <div
        style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}
      >
        {p.area}
      </div>
      <span
        className={cls}
        style={{
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 99,
        }}
      >
        {lbl}
      </span>
      <span style={{ fontSize: 18, color: "var(--text-light)" }}>›</span>
    </div>
  );
}
export default ParcelRow;
