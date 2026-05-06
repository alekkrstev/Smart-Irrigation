function HowItWorks() {
  const steps = [
    {
      n: 1,
      icon: "🌱",
      title: "Внеси ги парцелите",
      body: "Додај ги твоите парцели со локација, површина и тип на култура.",
      dark: false,
    },
    {
      n: 2,
      icon: "🤖",
      title: "AI ја прави анализата",
      body: "SmartAgro ги анализира временските услови, типот на почвата и фазата на раст — секој ден, автоматски.",
      dark: true,
    },
    {
      n: 3,
      icon: "💧",
      title: "Добиваш препорака",
      body: "Секое утро добиваш прецизна препорака — кога и колку да наводнуваш, за секоја парцела посебно.",
      dark: false,
    },
  ];

  return (
    <section
      style={{
        padding: "100px 56px",
        background: "white",
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
            "linear-gradient(90deg,transparent,var(--mist),transparent)",
        }}
      />
      <div
        className="ai"
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--leaf)",
          marginBottom: 14,
        }}
      >
        Како функционира
      </div>
      <div
        className="ai d1"
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(30px,4vw,52px)",
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: "-1.5px",
          color: "var(--earth)",
          marginBottom: 60,
        }}
      >
        Три чекори до
        <br />
        <em style={{ fontStyle: "italic", color: "var(--leaf)" }}>
          паметно поле.
        </em>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
        }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            className={`step-card ai d${i + 1}`}
            style={{
              borderRadius: 22,
              padding: "36px 30px",
              position: "relative",
              overflow: "hidden",
              transition: "transform .25s,box-shadow .25s",
              background: s.dark
                ? "linear-gradient(145deg,var(--forest),var(--earth))"
                : "var(--cream)",
              border: s.dark ? "none" : "1.5px solid var(--mist)",
              color: s.dark ? "white" : "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 20px 50px rgba(26,46,26,.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1,
                opacity: s.dark ? 0.15 : 0.08,
                position: "absolute",
                top: 16,
                right: 20,
                letterSpacing: "-3px",
                color: s.dark ? "white" : "inherit",
              }}
            >
              {s.n}
            </div>
            <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 10,
                color: s.dark ? "var(--mist)" : "inherit",
              }}
            >
              {s.title}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: s.dark ? "rgba(200,223,196,.7)" : "#5a7a5a",
              }}
            >
              {s.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default HowItWorks;
