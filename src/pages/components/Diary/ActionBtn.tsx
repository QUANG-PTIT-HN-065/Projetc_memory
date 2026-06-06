export default function ActionBtn({ onClick, label, primary }: { onClick: () => void; label: string; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: primary ? "rgba(255,214,0,0.18)" : "transparent",
        border: `1.5px solid rgba(220,170,0,${primary ? "0.55" : "0.3"})`,
        color: primary ? "#c8a000" : "#b09020",
        padding: "0.45rem 1.3rem",
        borderRadius: 20,
        cursor: "pointer",
        fontFamily: "inherit",
        fontStyle: "italic",
        fontSize: "0.83rem",
        letterSpacing: "0.04em",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}