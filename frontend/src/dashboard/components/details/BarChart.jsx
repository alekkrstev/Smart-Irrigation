import { useEffect, useState } from "react";

/**
 * BarChart - shows last 7 days of irrigation from real history data.
 * Falls back to empty bars if no history is provided.
 */
function BarChart({ history = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Build last-7-days labels and match history entries
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const labels = ["Пон", "Вто", "Сре", "Чет", "Пет", "Саб", "Нед"];
  const dayLabels = days.map(
    (d) => labels[d.getDay() === 0 ? 6 : d.getDay() - 1],
  );

  const maxAmount = Math.max(...history.map((h) => h.waterAmount || 0), 1);

  const bars = days.map((d, i) => {
    const dateStr = d.toISOString().split("T")[0];
    const entry = history.find((h) => h.irrigationDate === dateStr);
    const val = entry ? entry.waterAmount : 0;
    return {
      label: dayLabels[i],
      val,
      pct: Math.round((val / maxAmount) * 90),
    };
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: 110,
        paddingTop: 10,
      }}
    >
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              height: 90,
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: "4px 4px 0 0",
                background: b.val > 0 ? "var(--green-600)" : "var(--green-100)",
                height: mounted ? `${b.pct || 6}px` : "6px",
                transition: "height .8s cubic-bezier(.34,1.56,.64,1)",
                minHeight: 6,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              fontWeight: 600,
            }}
          >
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}
export default BarChart;
