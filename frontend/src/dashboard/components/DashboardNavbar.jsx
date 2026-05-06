import smart_agro_icon from "../../assets/smart_agro_icon.png";
import { useAuth } from "../../context/AuthContext";

function Navbar({ screen, setScreen, onBackLanding }) {
  const { user } = useAuth();

  const displayName = user?.name || user?.email || "Корисник";
  const initial = displayName.charAt(0).toUpperCase();

  const navItems = [
    { key: "home", label: "Почетен", icon: "🏠" },
    { key: "parcels", label: "Мои парцели", icon: "🌿" },
    { key: "water", label: "Наводнување", icon: "💧" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: 0,
        padding: "0 24px",
        height: 76,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginRight: 40,
          height: "100%",
        }}
      >
        <img
          src={smart_agro_icon}
          alt="SmartAgro Logo"
          style={{
            height: 52,
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* Pills */}
      <div
        style={{
          display: "flex",
          gap: 2,
          background: "var(--green-50)",
          borderRadius: 99,
          padding: 3,
          border: "1px solid var(--border)",
        }}
      >
        {navItems.map((n) => (
          <button
            key={n.key}
            className={`nav-pill${screen === n.key ? " active" : ""}`}
            onClick={() => setScreen(n.key)}
          >
            <span style={{ fontSize: 13 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>

      {/* User */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          className="btn-ghost"
          onClick={onBackLanding}
          style={{ fontSize: 11, padding: "7px 12px" }}
        >
          ← Landing
        </button>

        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#4ade80,#15803d)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {initial}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>
          {displayName}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
