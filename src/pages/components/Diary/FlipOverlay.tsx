import Lines from "./Lines";
import type { FlipOverlayProps } from "../../../Interfaces/DiaryBook";

/* ─── FLIP PAGE OVERLAY ─────────────────────────────────── */
export default function FlipOverlay({ dir, fromEntry, toEntry }: FlipOverlayProps) {
  // We simulate a single "leaf" that peels from right→left (forward) or left→right (back)
  // Front face = current page right half  |  Back face = next page left half (revealed)
  const origin = dir === "forward" ? "left center" : "right center";
  const anim = dir === "forward"
  ? "leafForward 0.7s ease-in-out forwards"
  : "leafBack 0.7s ease-in-out forwards";
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", display: "flex" }}>
      {/* The peeling leaf — covers right half going forward, left half going back */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: dir === "forward" ? "50%" : 0,
          width: "50%",
          transformOrigin: origin,
          animation: anim,
          transformStyle: "preserve-3d",
          borderRadius: dir === "forward" ? "0 12px 12px 0" : "4px 0 0 4px",
          overflow: "hidden",
        }}
      >
        {/* FRONT of leaf (what was visible before flip) */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: "linear-gradient(160deg,#fffde7,#fff9c4)", overflow: "hidden" }}>
          <Lines color="rgba(255,214,0,0.22)" />
          {dir === "forward" ? (
            // Front = current right-page text
            <div style={{ padding: "1.4rem 1.8rem 1.8rem 3rem", height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.15rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{fromEntry.mood}</span>
                <span style={{ fontSize: "0.62rem", color: "#a0860a", fontStyle: "italic" }}>{fromEntry.date}</span>
              </div>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#3a2800",
                  margin: "0 0 0.6rem",
                  borderBottom: "1.5px solid rgba(255,200,0,0.4)",
                  paddingBottom: "0.35rem",
                  fontFamily: "Palatino,Georgia,serif",
                }}
              >
                {fromEntry.title}
              </h2>
              <div style={{ lineHeight: 1.8, color: "#4a3400", fontSize: "0.82rem", fontFamily: "Palatino,Georgia,serif" }}>
                {fromEntry.content
                  .split("\n\n")
                  .slice(0, 2)
                  .map((p: string, i: number) => (
                    <p key={i} style={{ margin: "0 0 0.6rem", textIndent: "1.5em" }}>
                      {p}
                    </p>
                  ))}
              </div>
            </div>
          ) : (
            // Forward=back: front of leaf = current left-page photo
            <div style={{ padding: "1.4rem 1.4rem 1.8rem 1.8rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div
                style={{
                  flex: 1,
                  background: "#fff",
                  padding: "8px 8px 32px",
                  boxShadow: "0 4px 16px rgba(180,140,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img src={fromEntry.image} alt="" style={{ flex: 1, width: "100%", objectFit: "cover", minHeight: 0 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.62rem", fontStyle: "italic", color: "#a0860a" }}>— {fromEntry.caption} —</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BACK of leaf (revealed content) */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(160deg,#fff9c4,#fff59d)", overflow: "hidden" }}>
          <Lines color="rgba(255,214,0,0.28)" />
          {/* subtle shadow on back */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,0.05),transparent)", pointerEvents: "none" }} />
          {dir === "forward" ? (
            // Back = next page left photo
            <div style={{ padding: "1.4rem 1.4rem 1.8rem 1.8rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div
                style={{
                  flex: 1,
                  background: "#fff",
                  padding: "8px 8px 32px",
                  boxShadow: "0 4px 16px rgba(180,140,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img src={toEntry.image} alt="" style={{ flex: 1, width: "100%", objectFit: "cover", minHeight: 0 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.62rem", fontStyle: "italic", color: "#a0860a" }}>— {toEntry.caption} —</span>
                </div>
              </div>
            </div>
          ) : (
            // Back (going back) = prev right-page text
            <div style={{ padding: "1.4rem 1.8rem 1.8rem 3rem", height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.15rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{toEntry.mood}</span>
                <span style={{ fontSize: "0.62rem", color: "#a0860a", fontStyle: "italic" }}>{toEntry.date}</span>
              </div>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#3a2800",
                  margin: "0 0 0.6rem",
                  borderBottom: "1.5px solid rgba(255,200,0,0.4)",
                  paddingBottom: "0.35rem",
                  fontFamily: "Palatino,Georgia,serif",
                }}
              >
                {toEntry.title}
              </h2>
            </div>
          )}
        </div>

        {/* peel shadow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: dir === "forward" ? "linear-gradient(to left,rgba(0,0,0,0.0),rgba(0,0,0,0.08))" : "linear-gradient(to right,rgba(0,0,0,0.0),rgba(0,0,0,0.08))",
          }}
        />
      </div>
    </div>
  );
}