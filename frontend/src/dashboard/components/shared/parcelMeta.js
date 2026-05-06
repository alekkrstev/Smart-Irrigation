export function parcelMeta(p) {
  const cropLower = (p.cropType || "").toLowerCase();

  const colorMap = {
    домати: "red",
    морков: "orange",
    пченица: "yellow",
    лозје: "purple",
    пченка: "blue",
    јаболка: "green",
  };

  const iconMap = {
    домати: "🍅",
    морков: "🥕",
    пченица: "🌾",
    лозје: "🍇",
    пченка: "🌽",
    јаболка: "🍎",
  };

  const priority = p.priority || "MEDIUM";
  const color = colorMap[cropLower] || "green";
  const icon = iconMap[cropLower] || "🌱";

  const last = p.lastIrrigation ? new Date(p.lastIrrigation) : null;
  const daysSince = last ? Math.floor((Date.now() - last) / 86400000) : 99;
  const status = daysSince >= 3 ? "urgent" : daysSince >= 2 ? "today" : "ok";

  return {
    ...p,
    priority,
    color,
    icon,
    status,
    area: `${p.size} ха`,
    crop: p.cropType,
    location: p.location,
    soilType: p.soilType,
    irrigationSystem: p.irrigationSystem,
  };
}
