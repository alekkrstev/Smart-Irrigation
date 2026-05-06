function Footer() {
  const links = [
    { label: "Почетна", id: "hero" },
    { label: "Карактеристики", id: "features" },
    { label: "За нас", id: "about" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      window.dispatchEvent(new Event("hashchange"));
    }
  };

  return (
    <footer
      style={{
        background: "var(--earth)",
        borderTop: "1px solid rgba(122,181,110,.08)",
        padding: "40px 56px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 19,
          fontWeight: 800,
          color: "var(--cream)",
        }}
      >
        Smart<em style={{ fontStyle: "normal", color: "var(--sage)" }}>Agro</em>{" "}
        🌿
      </div>

      <div style={{ display: "flex", gap: 22, justifyContent: "center" }}>
        {links.map(({ label, id }) => (
          <div
            key={label}
            onClick={() => scrollTo(id)}
            style={{
              fontSize: 12.5,
              color: "rgba(200,223,196,.4)",
              cursor: "pointer",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(200,223,196,.4)")
            }
          >
            {label}
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "rgba(200,223,196,.25)",
          textAlign: "right",
        }}
      >
        © 2026 SmartAgro. Сите права задржани.
      </div>
    </footer>
  );
}

export default Footer;
