export default function NavBtn({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "rgba(255,214,0,0.12)",
        border: "1.5px solid rgba(220,170,0,0.35)",
        color: disabled ? "rgba(180,140,0,0.3)" : "#c8a000",
        width: 44,
        height: 44,
        borderRadius: "50%",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}
