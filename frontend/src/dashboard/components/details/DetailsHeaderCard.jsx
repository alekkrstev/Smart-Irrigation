import Tag from "./Tag";

function DetailsHeaderCard({
  parcel,
  borderColor,
  priorityBadge,
  priorityLabel,
  onIrrigate,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="card fade-in"
      style={{
        padding: "20px 24px",
        borderLeft: `4px solid ${borderColor}`,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "var(--text)",
              marginBottom: 4,
            }}
          >
            {parcel.name}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Tag icon={parcel.icon} label={parcel.crop} />
            <Tag icon="📍" label={parcel.location} />
            <Tag icon="📐" label={parcel.area} />
            <Tag icon={priorityBadge} label={`Приоритет: ${priorityLabel}`} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className="btn-primary"
            style={{ fontSize: 12 }}
            onClick={onIrrigate}
          >
            💧 Наводни сега
          </button>

          <button
            className="btn-ghost"
            style={{
              fontSize: 12,
              color: "var(--green-700)",
              borderColor: "var(--green-300)",
            }}
            onClick={onEdit}
          >
            ✏️ Измени
          </button>

          <button
            className="btn-ghost"
            style={{
              fontSize: 12,
              color: "#ef4444",
              borderColor: "#fca5a5",
            }}
            onClick={onDelete}
          >
            🗑 Избриши
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsHeaderCard;
