function ParcelCard({ p, onClick, onIrrigate, onEdit, onDelete }) {
  const borderColor = {
    yellow: "#f59e0b",
    red: "#ef4444",
    orange: "#f97316",
    purple: "#8b5cf6",
    blue: "#3b82f6",
    green: "var(--green-500)",
  }[p.color];

  const badgeMap = {
    urgent: ["badge-red", "⚠ Итно"],
    today: ["badge-yellow", "⏰ Денес"],
    ok: ["badge-green", "✓ Ок"],
  };

  const priorityLabel = {
    LOW: "Низок",
    MEDIUM: "Среден",
    HIGH: "Висок",
  }[p.priority || "MEDIUM"];

  const priorityBadge = {
    LOW: "🟢",
    MEDIUM: "🟡",
    HIGH: "🔴",
  }[p.priority || "MEDIUM"];

  const [cls, lbl] = badgeMap[p.status] || ["badge-blue", "?"];

  return (
    <div
      className="card"
      style={{
        padding: "18px 18px 16px",
        borderTop: `3px solid ${borderColor}`,
        cursor: "pointer",
        transition: "all .2s",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>
          {p.name}
        </div>

        <span
          className={cls}
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 9px",
            borderRadius: 99,
          }}
        >
          {lbl}
        </span>
      </div>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}
      >
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          {p.icon} {p.crop || p.cropType}
        </span>

        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          📍 {p.location}
        </span>

        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          📐 {p.area}
        </span>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          {priorityBadge} Приоритет: {priorityLabel}
        </span>
      </div>

      <div
        style={{ fontSize: 11, color: "var(--text-light)", marginBottom: 14 }}
      >
        Последно:{" "}
        {p.lastIrrigation
          ? new Date(p.lastIrrigation).toLocaleDateString("mk-MK")
          : "—"}
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {onIrrigate && (
          <button
            className="btn-ghost"
            onClick={(e) => {
              e.stopPropagation();
              onIrrigate();
            }}
            style={{
              fontSize: 11,
              padding: "6px 12px",
              color: "var(--green-700)",
              borderColor: "var(--green-300)",
            }}
          >
            💧 Наводни
          </button>
        )}

        {onEdit && (
          <button
            className="btn-ghost"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            style={{
              fontSize: 11,
              padding: "6px 10px",
              color: "var(--green-700)",
              borderColor: "var(--green-300)",
            }}
          >
            ✏️
          </button>
        )}

        {onDelete && (
          <button
            className="btn-ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              fontSize: 11,
              padding: "6px 10px",
              color: "#ef4444",
              borderColor: "#fca5a5",
            }}
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
}

export default ParcelCard;
