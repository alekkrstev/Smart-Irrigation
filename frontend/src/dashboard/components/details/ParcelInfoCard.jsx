import SectionTitle from "./SectionTitle";

function ParcelInfoCard({ parcel, priorityBadge, priorityLabel }) {
  const infoItems = [
    ["Локација", "📍", parcel.location],
    ["Површина", "📐", parcel.area],
    ["Тип почва", "🪨", parcel.soilType || "—"],
    ["Систем", "🔧", parcel.irrigationSystem || "—"],
    ["Култура", parcel.icon, parcel.crop],
    ["Приоритет", priorityBadge, priorityLabel],
  ];

  return (
    <div className="card fade-in fade-in-1" style={{ padding: "20px 22px" }}>
      <SectionTitle icon="ℹ️" label="Информации" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 14,
        }}
      >
        {infoItems.map(([label, icon, value]) => (
          <div
            key={label}
            style={{
              background: "var(--green-50)",
              borderRadius: "var(--r)",
              padding: "10px 12px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "var(--text-muted)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".4px",
                marginBottom: 4,
              }}
            >
              {icon} {label}
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {value || "—"}
            </div>
          </div>
        ))}
      </div>

      {parcel.notes && (
        <div
          style={{
            marginTop: 14,
            background: "#f8fff6",
            border: "1.5px solid var(--border)",
            borderRadius: "var(--r)",
            padding: "12px 14px",
            boxShadow: "0 4px 12px rgba(22, 131, 74, 0.06)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: ".4px",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            📝 Белешки
          </div>

          <div
            style={{
              fontSize: 13,
              color: "var(--text)",
              lineHeight: 1.6,
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            {parcel.notes}
          </div>
        </div>
      )}
    </div>
  );
}

export default ParcelInfoCard;
