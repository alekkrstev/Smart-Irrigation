import { useEffect, useRef } from "react";

function BentoFeatures() {
  const chartRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bars = [55, 80, 40, 90, 65, 75, 30];

  useEffect(() => {
    if (!chartRef.current) return;
    const timer = setTimeout(() => {
      bars.forEach((h, i) => {
        const bar = chartRef.current?.children[i]?.children[0];
        if (bar) bar.style.height = h + "%";
      });
    }, 1800);
    return () => clearTimeout(timer);
  }, [bars]);

  return (
    <section
      id="features"
      style={{
        padding: "100px 56px",
        background: "var(--earth)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg,transparent,var(--sage),transparent)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 48,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--sage)",
              marginBottom: 14,
            }}
          >
            Карактеристики
          </div>
          <div
            className="ai"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,3.8vw,50px)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "var(--cream)",
            }}
          >
            Сè што ти треба
            <br />
            за{" "}
            <em style={{ fontStyle: "italic", color: "var(--sage)" }}>
              паметно поле.
            </em>
          </div>
        </div>
        <div
          className="ai"
          style={{
            fontSize: 14,
            color: "rgba(200,223,196,.55)",
            maxWidth: 260,
            lineHeight: 1.6,
            textAlign: "right",
          }}
        >
          Дизајнирано специјално за македонски земјоделци.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridTemplateRows: "auto auto",
          gap: 14,
        }}
      >
        {/* BC-1 — wide */}
        <div
          className="bc ai"
          style={{
            gridColumn: "span 2",
            borderRadius: 22,
            padding: 30,
            background: "linear-gradient(150deg,#243824,#1a2e1a)",
            border: "1px solid rgba(122,181,110,.12)",
            transition: "transform .25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "rgba(74,140,63,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              marginBottom: 18,
            }}
          >
            💧
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: 8,
            }}
          >
            Прецизни препораки за наводнување
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(200,223,196,.6)",
            }}
          >
            AI ги анализира влажноста, температурата и прогнозата — и генерира
            препораки за секоја парцела индивидуално.
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 18,
              flexWrap: "wrap",
            }}
          >
            {[
              ["✓ Парцела А1 — Ок", "rgba(74,140,63,.15)", "var(--sage)"],
              ["⏰ Парцела В1 — Денес", "rgba(232,184,75,.15)", "var(--sun)"],
              ["🚨 Парцела Б3 — Итно", "rgba(196,120,74,.15)", "var(--clay)"],
            ].map(([t, bg, c]) => (
              <div
                key={t}
                style={{
                  padding: "8px 16px",
                  borderRadius: 50,
                  fontSize: 12,
                  fontWeight: 600,
                  background: bg,
                  color: c,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* BC-2 */}
        <div
          className="bc ai d1"
          style={{
            borderRadius: 22,
            padding: 30,
            background: "linear-gradient(135deg,var(--leaf),var(--forest))",
            transition: "transform .25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "rgba(255,255,255,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              marginBottom: 18,
            }}
          >
            🌤️
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: 8,
            }}
          >
            7-дневна прогноза
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(200,223,196,.6)",
            }}
          >
            Интегрирана временска прогноза која ги прилагодува препораките секој
            ден.
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 54,
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
              marginTop: 18,
            }}
          >
            7
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.6)",
              marginTop: 4,
            }}
          >
            дена однапред
          </div>
        </div>

        {/* BC-3 */}
        <div
          className="bc ai d2"
          style={{
            borderRadius: 22,
            padding: 30,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            transition: "transform .25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "rgba(74,140,63,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              marginBottom: 18,
            }}
          >
            📊
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: 8,
            }}
          >
            Историја & извештаи
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(200,223,196,.6)",
            }}
          >
            Следи ја потрошувачката на вода низ времето и мери ја ефикасноста.
          </div>
          <div
            ref={chartRef}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 5,
              height: 60,
              marginTop: 18,
            }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "rgba(74,140,63,.12)",
                  borderRadius: 4,
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div
                  className="bc-bar"
                  style={{
                    width: "100%",
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg,var(--sage),rgba(74,140,63,.3))",
                    height: 0,
                    transition: "height .8s cubic-bezier(.34,1.56,.64,1)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* BC-4 */}
        <div
          className="bc ai d3"
          style={{
            borderRadius: 22,
            padding: 30,
            background: "rgba(232,184,75,.08)",
            border: "1px solid rgba(232,184,75,.15)",
            transition: "transform .25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "rgba(232,184,75,.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              marginBottom: 18,
            }}
          >
            🤖
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: 8,
            }}
          >
            AI Советник
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(200,223,196,.6)",
            }}
          >
            Постави прашање, добиј паметен одговор — 24/7.
          </div>
        </div>

        {/* BC-5 — wide */}
        <div
          className="bc ai d4"
          style={{
            gridColumn: "span 2",
            borderRadius: 22,
            padding: 30,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            transition: "transform .25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "rgba(74,140,63,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              marginBottom: 18,
            }}
          >
            ⚡
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: 8,
            }}
          >
            Аларми во реално време
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(200,223,196,.6)",
            }}
          >
            Добивај известувања кога парцелата е критична — пред да биде
            предоцна. Поддршка за е-пошта и SMS.
          </div>
        </div>
      </div>
    </section>
  );
}
export default BentoFeatures;
