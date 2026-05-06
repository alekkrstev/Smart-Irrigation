import { useEffect, useRef } from "react";

function SceneSVG() {
  return (
    <svg
      viewBox="0 0 400 270"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3815" />
          <stop offset="100%" stopColor="#2d5a27" />
        </linearGradient>
        <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a7a30" />
          <stop offset="100%" stopColor="#265222" />
        </linearGradient>
        <radialGradient id="sunr">
          <stop offset="0%" stopColor="#e8b84b" stopOpacity=".35" />
          <stop offset="100%" stopColor="#e8b84b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="270" fill="url(#sg)" />
      <circle cx="340" cy="55" r="90" fill="url(#sunr)" />
      <circle cx="340" cy="55" r="26" fill="#e8b84b" fillOpacity=".55" />
      <ellipse cx="200" cy="215" rx="270" ry="75" fill="#1e4219" />
      <ellipse cx="400" cy="235" rx="180" ry="60" fill="#193a15" />
      <ellipse cx="0" cy="240" rx="170" ry="55" fill="#193a15" />
      <rect y="195" width="400" height="75" fill="url(#gg)" />
      <g stroke="#4a8c3f" strokeWidth="1.2" strokeOpacity=".5" fill="none">
        {[210, 223, 236, 249].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} />
        ))}
      </g>
      <g fill="#4a8c3f" fillOpacity=".9">
        {[28, 70, 112, 154, 196, 238, 280, 322, 364].map((cx, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={199 + (i % 3) * 2}
            rx={i % 2 === 0 ? 11 : 13}
            ry={i % 2 === 0 ? 17 : 19}
          />
        ))}
      </g>
      <g fill="#336e29">
        {[49, 133, 217, 301].map((cx, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={i % 2 === 0 ? 191 : 188}
            rx={i % 2 === 0 ? 9 : 11}
            ry={i % 2 === 0 ? 21 : 23}
          />
        ))}
      </g>
      <line
        x1="0"
        y1="168"
        x2="400"
        y2="168"
        stroke="#4fc3f7"
        strokeWidth=".8"
        strokeOpacity=".4"
      />
      <g fill="#4fc3f7" fillOpacity=".55">
        {[28, 112, 196, 280, 364].map((cx) => (
          <ellipse key={cx} cx={cx} cy="168" r="2.2" />
        ))}
      </g>
      <g fill="#4fc3f7" fillOpacity=".4">
        {[
          [28, 178],
          [196, 180],
          [364, 177],
        ].map(([cx, cy]) => (
          <ellipse key={cx} cx={cx} cy={cy} rx="1.3" ry="3.5" />
        ))}
      </g>
      <g fill="white" fillOpacity=".1">
        <ellipse cx="70" cy="50" rx="48" ry="17" />
        <ellipse cx="100" cy="43" rx="34" ry="13" />
      </g>
      <g fill="white" fillOpacity=".07">
        <ellipse cx="260" cy="80" rx="58" ry="18" />
        <ellipse cx="295" cy="73" rx="40" ry="14" />
      </g>
      <rect
        x="12"
        y="12"
        width="128"
        height="26"
        rx="7"
        fill="rgba(0,0,0,.32)"
      />
      <text
        x="22"
        y="29"
        fontFamily="Outfit,sans-serif"
        fontSize="11"
        fill="rgba(200,223,196,.85)"
        fontWeight="500"
      >
        🌿 Прилепски регион
      </text>
    </svg>
  );
}
function FloatWidget({ cls, style: extraStyle, children }) {
  return (
    <div
      className={cls}
      style={{
        position: "absolute",
        background: "rgba(255,255,255,.94)",
        backdropFilter: "blur(18px)",
        borderRadius: 16,
        padding: "12px 16px",
        boxShadow: "0 14px 44px rgba(26,46,26,.17)",
        border: "1px solid rgba(255,255,255,.9)",
        zIndex: 6,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}
function Hero({ onRegister, onEnterApp }) {
  const wfRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (wfRef.current) wfRef.current.style.width = "72%";
    }, 2200);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        paddingTop: 70,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px 52px 90px 56px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />

        {/* Chip */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(74,140,63,.1)",
            border: "1px solid rgba(74,140,63,.22)",
            borderRadius: 50,
            padding: "6px 16px",
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--forest)",
            letterSpacing: ".8px",
            textTransform: "uppercase",
            width: "fit-content",
            marginBottom: 30,
            position: "relative",
            zIndex: 1,
            animation: "fadeUp .6s .25s ease both",
          }}
        >
          <span className="chip-dot" /> AI · Паметно Земјоделство
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(46px,5.8vw,82px)",
            fontWeight: 900,
            lineHeight: 1.03,
            letterSpacing: "-2.5px",
            color: "var(--earth)",
            marginBottom: 26,
            position: "relative",
            zIndex: 1,
            animation: "fadeUp .6s .4s ease both",
          }}
        >
          Наводнувај
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "var(--leaf)",
              display: "inline-block",
              position: "relative",
            }}
          >
            попаметно.
          </em>
          <br />
          Трошиш помалку.
        </h1>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.78,
            color: "#4a5e4a",
            maxWidth: 470,
            marginBottom: 42,
            fontWeight: 300,
            position: "relative",
            zIndex: 1,
            animation: "fadeUp .6s .55s ease both",
          }}
        >
          <strong style={{ color: "var(--forest)", fontWeight: 600 }}>
            SmartAgro
          </strong>{" "}
          ги анализира твоите парцели и временската прогноза во реално време — и
          ти кажува точно кога, колку и дали воопшто треба да наводнуваш.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            position: "relative",
            zIndex: 1,
            animation: "fadeUp .6s .7s ease both",
          }}
        >
          <button
            onClick={onRegister}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--forest)",
              color: "white",
              padding: "16px 34px",
              borderRadius: 50,
              fontFamily: "'Outfit',sans-serif",
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all .25s",
              boxShadow: "0 8px 28px rgba(45,90,39,.38)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.background = "var(--leaf)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.background = "var(--forest)";
            }}
          >
            Започни бесплатно
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "rgba(255,255,255,.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
              }}
            >
              →
            </div>
          </button>
          <button
            onClick={onEnterApp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              color: "var(--forest)",
              fontSize: 14,
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 4px",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--leaf)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--forest)";
            }}
          ></button>
        </div>

        {/* Proof */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginTop: 52,
            paddingTop: 36,
            borderTop: "1px solid rgba(74,140,63,.14)",
            position: "relative",
            zIndex: 1,
            animation: "fadeUp .6s .85s ease both",
          }}
        >
          <div style={{ display: "flex", marginRight: 14 }}>
            {[
              ["М", "linear-gradient(135deg,var(--sage),var(--leaf))"],
              ["С", "linear-gradient(135deg,#7ab56e,#4a8c3f)"],
              ["Т", "linear-gradient(135deg,#c8dfc4,#7ab56e)"],
              ["А", "linear-gradient(135deg,#4a8c3f,#2d5a27)"],
            ].map(([l, bg], i) => (
              <div
                key={i}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "2px solid var(--cream)",
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "white",
                  marginLeft: i === 0 ? 0 : -10,
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "#5a7a5a", lineHeight: 1.5 }}>
            <div
              style={{ color: "var(--sun)", fontSize: 13, letterSpacing: 1 }}
            >
              ★★★★★
            </div>
            <strong style={{ color: "var(--earth)", fontWeight: 600 }}>
              120+ земјоделци
            </strong>{" "}
            веќе го користат
          </div>
          <div
            style={{
              width: 1,
              height: 40,
              background: "rgba(74,140,63,.15)",
              margin: "0 28px",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26,
                fontWeight: 800,
                color: "var(--earth)",
                letterSpacing: -1,
              }}
            >
              12
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--leaf)",
                  fontSize: 18,
                }}
              >
                %
              </em>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#7a9a7a",
                textTransform: "uppercase",
                letterSpacing: ".5px",
                marginTop: 2,
              }}
            >
              Просечна заштеда на вода
            </div>
          </div>
          <div
            style={{
              width: 1,
              height: 40,
              background: "rgba(74,140,63,.15)",
              margin: "0 28px",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26,
                fontWeight: 800,
                color: "var(--earth)",
                letterSpacing: -1,
              }}
            >
              81
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--leaf)",
                  fontSize: 18,
                }}
              >
                %
              </em>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#7a9a7a",
                textTransform: "uppercase",
                letterSpacing: ".5px",
                marginTop: 2,
              }}
            >
              Препораки прифатени
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 48px 80px 24px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            content: "",
            position: "absolute",
            top: "-5%",
            right: "-10%",
            width: "105%",
            height: "108%",
            background:
              "linear-gradient(160deg,#d4ecd0 0%,#b8d9b4 45%,#c8dfc4 100%)",
            borderRadius: "40% 0 0 45%",
            zIndex: 0,
          }}
        />

        {/* Stripes */}
        {[28, 37, 46, 55, 64, 73].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${pct}%`,
              height: 1.5,
              background:
                "linear-gradient(90deg,transparent,rgba(45,90,39,.1),transparent)",
              zIndex: 1,
            }}
          />
        ))}

        {/* Visual stack */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: 400,
            animation: "fadeUp .8s .5s ease both",
          }}
        >
          {/* Widget 1 — weather */}
          <FloatWidget cls="fw-1" style={{ top: 22, left: -36 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#7a9a7a",
                textTransform: "uppercase",
                letterSpacing: ".8px",
                marginBottom: 3,
              }}
            >
              ☀️ Временска прогноза
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 19,
                fontWeight: 800,
                color: "var(--earth)",
              }}
            >
              24°C
            </div>
            <div style={{ fontSize: 11, color: "#7a9a7a", marginTop: 2 }}>
              Прилеп · Влажност 58%
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10.5,
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: 20,
                marginTop: 5,
                background: "rgba(232,184,75,.16)",
                color: "#9a6e10",
              }}
            >
              ⚠ Препорака за наводнување
            </div>
          </FloatWidget>

          {/* Scene card */}
          <div
            style={{
              width: "100%",
              height: 270,
              borderRadius: 24,
              background: "linear-gradient(150deg,#1e4219,#2d5a27)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 28px 64px rgba(26,46,26,.38)",
              marginBottom: 12,
            }}
          >
            <SceneSVG />
          </div>

          {/* Widget 2 */}
          <FloatWidget cls="fw-2" style={{ bottom: 110, right: -32 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#7a9a7a",
                textTransform: "uppercase",
                letterSpacing: ".8px",
                marginBottom: 3,
              }}
            >
              🤖 AI препорака
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#4a5e4a",
                maxWidth: 155,
                lineHeight: 1.55,
              }}
            >
              Наводни вечерта 18:00–19:30 за оптимален резултат
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10.5,
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: 20,
                marginTop: 6,
                background: "rgba(74,140,63,.12)",
                color: "var(--forest)",
              }}
            >
              ✓ Оптимален термин
            </div>
          </FloatWidget>

          {/* Bottom row */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div
              style={{
                borderRadius: 18,
                padding: 18,
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(145deg,var(--forest),var(--leaf))",
                color: "white",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>💧</div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 3,
                }}
              >
                Наводнувања
              </div>
              <div style={{ fontSize: 11, opacity: 0.7, lineHeight: 1.5 }}>
                3 парцели чекаат денес
              </div>
              <div
                style={{
                  height: 3,
                  borderRadius: 2,
                  background: "rgba(255,255,255,.2)",
                  marginTop: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  ref={wfRef}
                  className="wbar-fill"
                  style={{
                    height: "100%",
                    background: "rgba(255,255,255,.75)",
                    borderRadius: 2,
                    width: 0,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                borderRadius: 18,
                padding: 18,
                position: "relative",
                overflow: "hidden",
                background: "white",
                border: "1px solid var(--mist)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 30,
                  fontWeight: 900,
                  color: "var(--earth)",
                  marginBottom: 2,
                }}
              >
                6
              </div>
              <div style={{ fontSize: 11, color: "#7a9a7a" }}>
                Активни парцели
              </div>
              <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
                {[
                  ["#4a8c3f", 1],
                  ["#4a8c3f", 0.7],
                  ["#c4784a", 1],
                  ["#4a8c3f", 0.5],
                  ["#e8b84b", 1],
                  ["#4a8c3f", 0.4],
                ].map(([c, o], i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: c,
                      opacity: o,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Widget 3 */}
          <FloatWidget cls="fw-3" style={{ bottom: -18, left: 16 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#7a9a7a",
                textTransform: "uppercase",
                letterSpacing: ".8px",
                marginBottom: 3,
              }}
            >
              🚨 Итно · Парцела Б3
            </div>
            <div
              style={{ fontSize: 12.5, fontWeight: 600, color: "var(--earth)" }}
            >
              Пченица · Кривогаштани
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10.5,
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: 20,
                marginTop: 4,
                background: "rgba(196,120,74,.12)",
                color: "var(--clay)",
              }}
            >
              Наводни денес
            </div>
          </FloatWidget>
        </div>
      </div>
    </section>
  );
}
export default Hero;
