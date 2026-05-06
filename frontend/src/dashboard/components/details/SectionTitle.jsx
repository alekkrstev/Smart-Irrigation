function SectionTitle({ icon, label }) {
  return (
    <div
      style={{
        fontSize: 14,
        fontWeight: 800,
        color: "var(--text)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {icon} {label}
    </div>
  );
}
export default SectionTitle;
