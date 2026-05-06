function Tag({ icon, label }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "var(--green-50)",
        border: "1px solid var(--border)",
        borderRadius: 99,
        padding: "3px 10px",
        fontSize: 12,
        color: "var(--green-800)",
        fontWeight: 600,
      }}
    >
      {icon} {label}
    </span>
  );
}
export default Tag;
