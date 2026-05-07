import { useEffect, useState } from "react";
import smart_agro_icon from "../../assets/smart_agro_icon.png";

function LandingNav({ user, onLogin, onRegister, onEnterApp, onLogout }) {
  const links = [
    { label: "Почетна", id: "hero" },
    { label: "Карактеристики", id: "features" },
    { label: "За нас", id: "about" },
  ];

  const getActiveFromHash = () => {
    const hash = window.location.hash.replace("#", "");

    const found = links.find((link) => link.id === hash);

    return found ? found.label : "Почетна";
  };

  const [active, setActive] = useState(getActiveFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setActive(getActiveFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollTo = (id, label) => {
    const el = document.getElementById(id);

    if (el) {
      setActive(label);
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      window.dispatchEvent(new Event("hashchange"));
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 56px",
        height: 76,
        background: "rgba(245,240,232,0.88)",
        backdropFilter: "blur(22px)",
        borderBottom: "1px solid rgba(74,140,63,0.1)",
        animation: "slideDown .7s ease both",
      }}
    >
      <button
        type="button"
        onClick={() => scrollTo("hero", "Почетна")}
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img
          src={smart_agro_icon}
          alt="SmartAgro Logo"
          style={{
            height: 54,
            width: "auto",
            maxWidth: 180,
            objectFit: "contain",
            display: "block",
          }}
        />
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,.55)",
          border: "1px solid rgba(74,140,63,.13)",
          borderRadius: 50,
          padding: 4,
        }}
      >
        {links.map(({ label, id }) => {
          const isActive = active === label;

          return (
            <div
              key={label}
              onClick={() => scrollTo(id, label)}
              style={{
                padding: "7px 28px",
                borderRadius: 50,
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "white" : "var(--forest)",
                background: isActive ? "var(--forest)" : "transparent",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(74,140,63,.1)";
                  e.currentTarget.style.color = "var(--earth)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--forest)";
                }
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user && (
          <>
            <button
              onClick={onEnterApp}
              style={{
                padding: "9px 24px",
                borderRadius: 50,
                fontSize: 13.5,
                fontWeight: 600,
                color: "white",
                background: "var(--forest)",
                border: "none",
                cursor: "pointer",
                transition: "all .22s",
                boxShadow: "0 4px 16px rgba(45,90,39,.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--leaf)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--forest)";
                e.currentTarget.style.transform = "";
              }}
            >
              Кон апликација →
            </button>

            <button
              onClick={onLogout}
              style={{
                padding: "8px 20px",
                borderRadius: 50,
                fontSize: 13.5,
                fontWeight: 600,
                color: "var(--forest)",
                background: "none",
                border: "1.5px solid rgba(74,140,63,.25)",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              Одјави се
            </button>
          </>
        )}
        {!user && (
          <>
        <button
          onClick={onLogin}
          style={{
            padding: "8px 20px",
            borderRadius: 50,
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--forest)",
            background: "none",
            border: "1.5px solid rgba(74,140,63,.25)",
            cursor: "pointer",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--leaf)";
            e.currentTarget.style.color = "var(--leaf)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(74,140,63,.25)";
            e.currentTarget.style.color = "var(--forest)";
          }}
        >
          Логирај се
        </button>

        <button
          onClick={onRegister}
          style={{
            padding: "9px 24px",
            borderRadius: 50,
            fontSize: 13.5,
            fontWeight: 600,
            color: "white",
            background: "var(--forest)",
            border: "none",
            cursor: "pointer",
            transition: "all .22s",
            boxShadow: "0 4px 16px rgba(45,90,39,.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--leaf)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--forest)";
            e.currentTarget.style.transform = "";
          }}
        >
          Започни бесплатно →
        </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default LandingNav;
