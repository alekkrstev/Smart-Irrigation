function Pricing({ onRegister, onLogin }) {
  return (
    <section
      style={{
        padding: "120px 56px",
        background: "var(--earth)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle,rgba(74,140,63,.15),transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        className="ai"
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--sage)",
          marginBottom: 20,
        }}
      >
        Готов да почнеш?
      </div>
      <h2
        className="ai d1"
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(36px,5vw,68px)",
          fontWeight: 900,
          lineHeight: 1.06,
          letterSpacing: "-2px",
          color: "var(--cream)",
          marginBottom: 20,
        }}
      >
        Твоето поле заслужува
        <br />
        <em style={{ fontStyle: "italic", color: "var(--sage)" }}>
          паметна
        </em>{" "}
        грижа.
      </h2>
      <p
        className="ai d2"
        style={{
          fontSize: 17,
          color: "rgba(200,223,196,.6)",
          fontWeight: 300,
          maxWidth: 480,
          margin: "0 auto 44px",
          lineHeight: 1.7,
        }}
      >
        Регистрирај се бесплатно и добиј ја твојата прва AI препорака уште
        денес.
      </p>
      <div
        className="ai d3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onRegister}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(135deg,var(--sage),var(--leaf))",
            color: "white",
            padding: "17px 38px",
            borderRadius: 50,
            fontFamily: "'Outfit',sans-serif",
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all .25s",
            boxShadow: "0 8px 28px rgba(74,140,63,.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 14px 40px rgba(74,140,63,.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(74,140,63,.4)";
          }}
        >
          🌱 Регистрирај се бесплатно
        </button>
        <button
          onClick={onLogin}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            color: "var(--sage)",
            padding: "17px 30px",
            borderRadius: 50,
            fontFamily: "'Outfit',sans-serif",
            fontSize: 15,
            fontWeight: 600,
            border: "1.5px solid rgba(122,181,110,.3)",
            cursor: "pointer",
            transition: "all .25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--sage)";
            e.currentTarget.style.color = "var(--mist)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(122,181,110,.3)";
            e.currentTarget.style.color = "var(--sage)";
          }}
        >
          Веќе имаш сметка →
        </button>
      </div>
      <div
        className="ai d4"
        style={{ marginTop: 24, fontSize: 12, color: "rgba(200,223,196,.35)" }}
      >
        Нема кредитна картичка. Бесплатно засекогаш за до 3 парцели.
      </div>
    </section>
  );
}
export default Pricing;
