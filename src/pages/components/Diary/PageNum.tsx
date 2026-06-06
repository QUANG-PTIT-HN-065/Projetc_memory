export default function PageNum({ n }: { n: number }) {
  return <div style={{ position: "absolute", bottom: "0.5rem", left: "50%", transform: "translateX(-50%)", fontSize: "0.6rem", color: "#c8a00a", fontStyle: "italic" }}>— {n} —</div>;
}
