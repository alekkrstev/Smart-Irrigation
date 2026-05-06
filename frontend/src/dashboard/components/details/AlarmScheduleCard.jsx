import SectionTitle from "./SectionTitle";

function AlarmScheduleCard({ schedule, onOpenSchedule }) {
  return (
    <div
      className="card fade-in fade-in-2"
      style={{
        padding: "20px 22px",
        borderLeft: `3px solid ${
          schedule?.active ? "var(--green-500)" : "#f59e0b"
        }`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <SectionTitle icon="🔔" label="Аларм за наводнување" />

        <button
          className="btn-ghost"
          style={{ fontSize: 12 }}
          onClick={onOpenSchedule}
        >
          {schedule ? "Измени" : "Креирај"}
        </button>
      </div>

      {schedule ? (
        <div
          style={{
            background: "var(--green-50)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <AlarmInfo
              label="Интервал"
              value={`На секои ${schedule.intervalDays} дена`}
            />

            <AlarmInfo label="Вода" value={`${schedule.waterAmount} л`} />

            <AlarmInfo
              label="Статус"
              value={schedule.active ? "Активен ✅" : "Неактивен ⏸"}
              color={schedule.active ? "var(--green-600)" : "#f59e0b"}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            background: "var(--green-50)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            padding: "14px 16px",
          }}
        >
          Нема креиран аларм за оваа парцела.
        </div>
      )}
    </div>
  );
}

function AlarmInfo({ label, value, color = "var(--text)" }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: ".4px",
          marginBottom: 4,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default AlarmScheduleCard;
