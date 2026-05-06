import { useEffect, useState } from "react";
import {
  parcelApi,
  historyApi,
  recommendationApi,
  scheduleApi,
} from "../../api/api";

import SectionTitle from "../components/details/SectionTitle";
import BarChart from "../components/details/BarChart";
import AlarmScheduleCard from "../components/details/AlarmScheduleCard";

import DetailsHeaderCard from "../components/details/DetailsHeaderCard";
import ParcelInfoCard from "../components/details/ParcelInfoCard";
import RecommendationCard from "../components/details/RecommendationCard";
import HistoryCard from "../components/details/HistoryCard";
import IrrigateModal from "../components/details/IrrigateModal";
import ScheduleModal from "../components/details/ScheduleModal";

function parcelMeta(p) {
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

  return {
    ...p,
    color: colorMap[cropLower] || "green",
    icon: iconMap[cropLower] || "🌱",
    area: `${p.size} ха`,
    crop: p.cropType,
    location: p.location,
    soilType: p.soilType,
    irrigationSystem: p.irrigationSystem,
  };
}

function DetailsScreen({ parcelId, setScreen }) {
  const [parcel, setParcel] = useState(null);
  const [history, setHistory] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(parcelId));
  const [showIrrigate, setShowIrrigate] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const loadData = async () => {
    if (!parcelId) return;

    try {
      const [p, h, r, schedules] = await Promise.all([
        parcelApi.getById(parcelId),
        historyApi.getByParcel(parcelId),
        recommendationApi.getDaily(parcelId).catch(() => null),
        scheduleApi.getByParcel(parcelId).catch(() => []),
      ]);

      const firstSchedule = Array.isArray(schedules) ? schedules[0] : schedules;
      const rec = Array.isArray(r) ? r[0] : r;

      setParcel(parcelMeta(p));
      setHistory(Array.isArray(h) ? h : []);
      setRecommendation(rec || null);
      setSchedule(firstSchedule || null);
    } catch (e) {
      console.error(e);
    }
  };

  async function exportHistoryCsv() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/irrigation-history/parcel/${parcelId}/export`,
      );

      if (!response.ok) {
        throw new Error("CSV export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "irrigation-history.csv";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Неуспешно извезување на CSV.");
    }
  }

  useEffect(() => {
    if (!parcelId) return;

    let cancelled = false;

    async function fetchDetails() {
      setLoading(true);

      try {
        const [p, h, r, schedules] = await Promise.all([
          parcelApi.getById(parcelId),
          historyApi.getByParcel(parcelId),
          recommendationApi.getDaily(parcelId).catch(() => null),
          scheduleApi.getByParcel(parcelId).catch(() => []),
        ]);

        if (cancelled) return;

        const firstSchedule = Array.isArray(schedules)
          ? schedules[0]
          : schedules;

        const rec = Array.isArray(r) ? r[0] : r;

        setParcel(parcelMeta(p));
        setHistory(Array.isArray(h) ? h : []);
        setRecommendation(rec || null);
        setSchedule(firstSchedule || null);
      } catch (e) {
        console.error(e);

        if (!cancelled) {
          setParcel(null);
          setHistory([]);
          setRecommendation(null);
          setSchedule(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [parcelId]);

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "var(--text-muted)",
        }}
      >
        Се вчитува…
      </div>
    );
  }

  if (!parcel) {
    return <div style={{ padding: 40 }}>Парцелата не е пронајдена.</div>;
  }

  const priority = parcel.priority || "MEDIUM";

  const priorityLabel = {
    LOW: "Низок",
    MEDIUM: "Среден",
    HIGH: "Висок",
  }[priority];

  const priorityBadge = {
    LOW: "🟢",
    MEDIUM: "🟡",
    HIGH: "🔴",
  }[priority];

  const borderColor = {
    LOW: "var(--green-500)",
    MEDIUM: "#f59e0b",
    HIGH: "#ef4444",
  }[priority];

  const fmtDate = (date) =>
    date ? new Date(date).toLocaleDateString("mk-MK") : "—";

  const fmtTime = (time) => time || "—";

  return (
    <div style={{ padding: "22px 28px", width: "100%" }}>
      {showIrrigate && (
        <IrrigateModal
          parcelId={parcelId}
          onClose={() => setShowIrrigate(false)}
          onDone={loadData}
        />
      )}

      {showSchedule && (
        <ScheduleModal
          parcelId={parcelId}
          parcelName={parcel.name}
          onClose={() => setShowSchedule(false)}
          onChanged={loadData}
          onDeleted={() => setSchedule(null)}
        />
      )}

      <button
        className="btn-ghost fade-in"
        onClick={() => setScreen("parcels")}
        style={{ marginBottom: 18, fontSize: 12 }}
      >
        ← Назад кон парцели
      </button>

      <DetailsHeaderCard
        parcel={parcel}
        borderColor={borderColor}
        priorityBadge={priorityBadge}
        priorityLabel={priorityLabel}
        onIrrigate={() => setShowIrrigate(true)}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ParcelInfoCard
            parcel={parcel}
            priorityBadge={priorityBadge}
            priorityLabel={priorityLabel}
            fmtDate={fmtDate}
          />

          <AlarmScheduleCard
            schedule={schedule}
            onOpenSchedule={() => setShowSchedule(true)}
          />

          <RecommendationCard
            recommendation={recommendation}
            onIrrigate={() => setShowIrrigate(true)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            className="card fade-in fade-in-2"
            style={{ padding: "20px 22px" }}
          >
            <SectionTitle icon="📊" label="Наводнување — последни 7 дена" />

            <div
              style={{
                display: "flex",
                gap: 14,
                margin: "10px 0",
                fontSize: 11,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: "var(--green-600)",
                  }}
                />

                <span style={{ color: "var(--text-muted)" }}>
                  Реализирано (л)
                </span>
              </div>
            </div>

            <BarChart history={history} />
          </div>

          <HistoryCard
            history={history}
            fmtDate={fmtDate}
            fmtTime={fmtTime}
            onExport={exportHistoryCsv}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsScreen;
