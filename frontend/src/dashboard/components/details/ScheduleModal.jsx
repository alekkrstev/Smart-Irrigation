import { useEffect, useState } from "react";
import { scheduleApi } from "../../../api/api";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 9,
  border: "1.5px solid var(--border)",
  background: "var(--cream)",
  fontSize: 14,
  outline: "none",
  marginBottom: 8,
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 800,
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: ".4px",
  marginBottom: 6,
  display: "block",
};

function ScheduleModal({
  parcelId,
  parcelName,
  onClose,
  onChanged,
  onDeleted,
}) {
  const [schedule, setSchedule] = useState(null);
  const [intervalDays, setIntervalDays] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(() => Boolean(parcelId));
  const [saving, setSaving] = useState(false);

  const applySchedule = (data) => {
    const firstSchedule = Array.isArray(data) ? data[0] : data;

    if (firstSchedule) {
      setSchedule(firstSchedule);
      setIntervalDays(firstSchedule.intervalDays || "");
      setWaterAmount(firstSchedule.waterAmount || "");
      setActive(Boolean(firstSchedule.active));
    } else {
      setSchedule(null);
      setIntervalDays("");
      setWaterAmount("");
      setActive(true);
    }
  };

  const loadSchedule = async () => {
    try {
      const data = await scheduleApi.getByParcel(parcelId);
      applySchedule(data);
    } catch (err) {
      console.error(err);
      applySchedule(null);
    }
  };

  useEffect(() => {
    if (!parcelId) return;

    let cancelled = false;

    async function fetchSchedule() {
      try {
        const data = await scheduleApi.getByParcel(parcelId);

        if (cancelled) return;

        applySchedule(data);
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          applySchedule(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchSchedule();

    return () => {
      cancelled = true;
    };
  }, [parcelId]);

  const handleSave = async () => {
    if (!intervalDays || !waterAmount) {
      alert("Внесете интервал и количина вода.");
      return;
    }

    const payload = {
      intervalDays: Number(intervalDays),
      waterAmount: Number(waterAmount),
      active,
    };

    setSaving(true);

    try {
      if (schedule?.id) {
        await scheduleApi.update(schedule.id, payload);
      } else {
        await scheduleApi.create(parcelId, payload);
      }

      await loadSchedule();
      await onChanged?.();
    } catch (err) {
      alert("Грешка при зачувување: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExecute = async () => {
    if (!schedule?.id) {
      alert("Прво креирај распоред.");
      return;
    }

    try {
      await scheduleApi.execute(schedule.id);
      alert("Наводнувањето е извршено.");
      await onChanged?.();
    } catch (err) {
      alert("Грешка при извршување: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!schedule?.id) {
      alert("Нема распоред за бришење.");
      return;
    }

    const confirmed = window.confirm("Да го избришеме распоредот?");

    if (!confirmed) return;

    try {
      await scheduleApi.delete(schedule.id);

      applySchedule(null);

      onDeleted?.();
      onClose();
    } catch (err) {
      console.error("Schedule delete failed:", err);
      alert("Грешка при бришење: " + err.message);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,46,26,.45)",
        backdropFilter: "blur(8px)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          width: 440,
          padding: "28px 32px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,.2)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 20,
            color: "#7a9a7a",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div style={{ fontWeight: 900, fontSize: 20, color: "var(--text)" }}>
          🔔 Распоред за наводнување
        </div>

        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            marginTop: 4,
            marginBottom: 18,
          }}
        >
          Парцела: <strong>{parcelName}</strong>
        </div>

        {loading ? (
          <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
            Се вчитува…
          </div>
        ) : (
          <>
            <label style={labelStyle}>Интервал</label>

            <input
              type="number"
              min="1"
              value={intervalDays}
              onChange={(e) => setIntervalDays(e.target.value)}
              placeholder="На пример: 3"
              style={inputStyle}
            />

            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                marginBottom: 12,
              }}
            >
              Наводнување на секои {intervalDays || "?"} дена
            </div>

            <label style={labelStyle}>Количина вода</label>

            <input
              type="number"
              min="1"
              value={waterAmount}
              onChange={(e) => setWaterAmount(e.target.value)}
              placeholder="На пример: 120"
              style={inputStyle}
            />

            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                marginBottom: 12,
              }}
            >
              Количина во литри
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "var(--text)",
                marginBottom: 18,
              }}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Активен распоред
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <button
                className="btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Се зачувува…"
                  : schedule
                    ? "Зачувај промени"
                    : "Креирај"}
              </button>

              <button className="btn-ghost" onClick={handleExecute}>
                💧 Изврши сега
              </button>

              {schedule && (
                <button
                  className="btn-ghost"
                  onClick={handleDelete}
                  style={{
                    gridColumn: "1 / -1",
                    color: "#ef4444",
                    borderColor: "#fca5a5",
                  }}
                >
                  🗑 Избриши распоред
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ScheduleModal;
