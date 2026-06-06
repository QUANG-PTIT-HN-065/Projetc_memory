export default function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const [v, h] = pos === "tl" ? ["top", "left"] : pos === "tr" ? ["top", "right"] : pos === "bl" ? ["bottom", "left"] : ["bottom", "right"];
  return (
    <div
      style={{
        position: "absolute",
        [v]: "0.8rem",
        [h]: "0.8rem",
        width: 10,
        height: 10,
        borderTop: v === "top" ? "1.5px solid rgba(200,160,0,0.5)" : "none",
        borderBottom: v === "bottom" ? "1.5px solid rgba(200,160,0,0.5)" : "none",
        borderLeft: h === "left" ? "1.5px solid rgba(200,160,0,0.5)" : "none",
        borderRight: h === "right" ? "1.5px solid rgba(200,160,0,0.5)" : "none",
        pointerEvents: "none",
      }}
    />
  );
}