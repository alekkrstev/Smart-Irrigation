import { useEffect, useState } from "react";
import { parcelApi, recommendationApi } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

import { parcelMeta } from "../components/shared/parcelMeta";
import HomeStats from "../components/home/HomeStats";
import HomeParcelsCard from "../components/home/HomeParcelsCard";
import HomeAiCard from "../components/home/HomeAiCard";
import WeatherCard from "../components/home/WeatherCard";

function HomeScreen({ setScreen, setSelected }) {
  const { user } = useAuth();

  const [dashboardWeather, setDashboardWeather] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString("mk-MK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;

    async function loadHomeData() {
      setLoading(true);

      try {
        const data = await parcelApi.getByUser(user.id);

        if (cancelled) return;

        const enriched = data.map(parcelMeta);
        setParcels(enriched);

        const urgent = enriched.find((p) => p.status === "urgent");

        if (urgent) {
          const r = await recommendationApi.getDaily(urgent.id);

          if (cancelled) return;

          setRecommendation({
            text: r.recommendation,
            parcelId: urgent.id,
            parcelName: urgent.name,
          });
        } else {
          setRecommendation(null);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setParcels([]);
          setRecommendation(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const urgentCount = parcels.filter((p) => p.status === "urgent").length;

  const totalArea = parcels
    .reduce((sum, p) => sum + (p.size || 0), 0)
    .toFixed(1);

  return (
    <div style={{ padding: "28px 28px", width: "100%" }}>
      <div
        className="fade-in"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "var(--text)" }}>
            Здраво, {user?.name?.split(" ")[0] || "Земјоделец"} 👋
          </h1>

          <div
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              marginTop: 4,
            }}
          >
            {today}
          </div>
        </div>
      </div>

      <HomeStats
        loading={loading}
        parcels={parcels}
        urgentCount={urgentCount}
        totalArea={totalArea}
        recommendation={recommendation}
        dashboardWeather={dashboardWeather}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <HomeParcelsCard
          loading={loading}
          parcels={parcels}
          setScreen={setScreen}
          setSelected={setSelected}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <HomeAiCard
            loading={loading}
            recommendation={recommendation}
            setScreen={setScreen}
            setSelected={setSelected}
          />

          <WeatherCard
            defaultCity="Skopje"
            onWeatherChange={setDashboardWeather}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
