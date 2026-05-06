import StatCard from "./StatCard";

function HomeStats({
  loading,
  parcels,
  urgentCount,
  totalArea,
  recommendation,
  dashboardWeather,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 14,
        marginBottom: 24,
      }}
    >
      <StatCard
        delay={1}
        icon="🌿"
        num={loading ? "…" : parcels.length}
        label="активни парцели"
        sub={`Вкупно ${totalArea} ха`}
      />

      <StatCard
        delay={2}
        icon="💧"
        num={loading ? "…" : urgentCount}
        label="потребни наводнувања"
        sub={urgentCount > 0 ? "Денес е приоритет" : "Сè е во ред"}
        subColor={urgentCount > 0 ? "#ef4444" : "var(--green-600)"}
      />

      <StatCard
        delay={3}
        icon="🌡️"
        num={
          dashboardWeather
            ? `${Math.round(dashboardWeather.temperature)}°C`
            : "—"
        }
        label="температурата денес"
        sub={
          dashboardWeather ? dashboardWeather.city : "Нема временски податоци"
        }
        subColor={dashboardWeather ? "var(--green-600)" : "var(--text-muted)"}
      />

      <StatCard
        delay={4}
        icon="🤖"
        num={recommendation ? "1" : "0"}
        label="итна препорака"
        sub={recommendation ? recommendation.parcelName : "Нема препораки"}
        subColor={recommendation ? "#ef4444" : "var(--green-600)"}
      />
    </div>
  );
}

export default HomeStats;
