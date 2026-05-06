import SectionTitle from "./SectionTitle";

function HistoryCard({ history, fmtDate, fmtTime, onExport }) {
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

      {history.length === 0 ? (
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            textAlign: "center",
            padding: 16,
          }}
        >
          Нема евидентирани наводнувања.
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
              {history
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
                      {Number(row.waterAmount).toLocaleString()} л
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

export default HistoryCard;
