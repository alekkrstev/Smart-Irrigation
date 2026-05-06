import { useState } from "react";
import SectionTitle from "./SectionTitle";

function HistoryCard({ history, fmtDate, fmtTime, onExport }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [filtered, setFiltered] = useState(null);

  const handleFilter = () => {
    if (!from || !to) return;

    const filteredData = history.filter((row) => {
      if (!row.irrigationDate) return false;

      const rowDate = row.irrigationDate.slice(0, 10);

      return rowDate >= from && rowDate <= to;
    });

    setFiltered(filteredData);
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
    setFiltered(null);
  };

  const displayHistory = filtered ?? history;

  return (
    <div className="card fade-in fade-in-3" style={{ padding: "20px 22px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          gap: 12,
        }}
      >
        <SectionTitle icon="🗒" label="Историја на наводнување" />

        <button
          onClick={onExport}
          style={{
            background: "#16834a",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "7px 12px",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 10px rgba(22, 131, 74, 0.18)",
          }}
        >
          📥 Извези CSV
        </button>
      </div>

      {/* Филтер по датум */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
          flexWrap: "wrap",
          padding: "12px 14px",
          background: "var(--green-50)",
          borderRadius: "var(--r)",
          border: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--text-muted)",
          }}
        >
          📅 Од:
        </span>

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={dateInputStyle}
        />

        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--text-muted)",
          }}
        >
          До:
        </span>

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={dateInputStyle}
        />

        <button
          className="btn-primary"
          onClick={handleFilter}
          disabled={!from || !to}
          style={{ fontSize: 11, padding: "6px 14px" }}
        >
          Пребарај
        </button>

        {filtered && (
          <button
            className="btn-ghost"
            onClick={handleClear}
            style={{ fontSize: 11, padding: "6px 10px" }}
          >
            ✕ Исчисти
          </button>
        )}
      </div>

      {filtered && (
        <div
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          Прикажани {filtered.length} записи · {from} → {to}
        </div>
      )}

      {displayHistory.length === 0 ? (
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            textAlign: "center",
            padding: 16,
          }}
        >
          {filtered
            ? "Нема записи за избраниот период."
            : "Нема евидентирани наводнувања."}
        </div>
      ) : (
        <div
          style={{
            maxHeight: 360,
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: 6,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1.5px solid var(--border)" }}>
                {["Датум", "Час", "Количина (л)", "Статус"].map((header) => (
                  <th
                    key={header}
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "var(--text-muted)",
                      textAlign: "left",
                      padding: "0 0 8px",
                      textTransform: "uppercase",
                      letterSpacing: ".4px",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {displayHistory
                .slice()
                .reverse()
                .map((row) => (
                  <tr
                    key={row.id}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td
                      style={{
                        padding: "10px 0",
                        fontSize: 13,
                        color: "var(--text)",
                        fontWeight: 600,
                      }}
                    >
                      {fmtDate(row.irrigationDate)}
                    </td>

                    <td
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                      }}
                    >
                      {fmtTime(row.irrigationTime)}
                    </td>

                    <td
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                      }}
                    >
                      {Number(row.waterAmount || 0).toLocaleString()} л
                    </td>

                    <td>
                      <span style={{ fontSize: 14 }}>✅</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const dateInputStyle = {
  padding: "5px 9px",
  borderRadius: 7,
  border: "1px solid var(--border)",
  fontSize: 12,
  color: "var(--text)",
  fontFamily: "Outfit, sans-serif",
  outline: "none",
};

export default HistoryCard;
