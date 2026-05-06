function Testimonials() {
  const cards = [
    {
      quote:
        '"Ја намалив потрошувачката на вода за 15% во првиот месец. Препораките се навистина прецизни."',
      name: "Марко Петров",
      loc: "Земјоделец · Прилеп · 14 ха",
      av: "М",
      avBg: "linear-gradient(135deg,#4a8c3f,#2d5a27)",
    },
    {
      quote:
        '"Конечно апликација за нас. Едноставна, паметна и на македонски."',
      name: "Сашо Јовановски",
      loc: "Земјоделец · Кавадарци · 22 ха",
      av: "С",
      avBg: "linear-gradient(135deg,#7ab56e,#4a8c3f)",
      featured: true,
    },
    {
      quote:
        '"AI препораките ми заштедија многу труд. Сега наводнувам само кога навистина треба."',
      name: "Теодора Николовска",
      loc: "Земјоделец · Битола · 8 ха",
      av: "Т",
      avBg: "linear-gradient(135deg,#c8dfc4,#7ab56e)",
    },
  ];

  return (
    <section
      id="about"
      style={{
        padding: "100px 56px",
        background: "var(--cream2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
        Земјоделци кажуваат
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
        }}
      >
        Реални резултати,
        <br />
        <em style={{ fontStyle: "italic", color: "var(--leaf)" }}>
          реални луѓе.
        </em>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 18,
          marginTop: 56,
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            className={`testi-card ai d${i + 1}`}
            style={{
              background: c.featured ? "var(--forest)" : "white",
              borderRadius: 20,
              padding: 30,
              border: c.featured ? "none" : "1px solid rgba(74,140,63,.1)",
              transition: "transform .25s,box-shadow .25s",
              transform: c.featured ? "translateY(-8px)" : "",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = c.featured
                ? "translateY(-13px)"
                : "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = c.featured
                ? "translateY(-8px)"
                : "")
            }
          >
            <div
              style={{
                color: "var(--sun)",
                fontSize: 14,
                letterSpacing: 2,
                marginBottom: 14,
              }}
            >
              ★★★★★
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: c.featured ? "rgba(200,223,196,.85)" : "#4a5e4a",
                marginBottom: 20,
                fontStyle: "italic",
                fontFamily: "'Playfair Display',serif",
                fontWeight: 700,
              }}
            >
              {c.quote}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: c.avBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {c.av}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: c.featured ? "var(--mist)" : "var(--earth)",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: c.featured ? "rgba(200,223,196,.5)" : "#7a9a7a",
                    marginTop: 2,
                  }}
                >
                  {c.loc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Testimonials;
