export default function Lines({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 30px,${color} 30px,${color} 31px)`,
        backgroundPosition: "0 54px",
      }}
    />
  );
}