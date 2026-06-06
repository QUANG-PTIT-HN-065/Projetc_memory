import type{ DiaryEntry } from "..//../../Interfaces/DiaryBook";

interface DeleteConfirmPopupProps {
  entry: DiaryEntry;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmPopup({ entry, onConfirm, onCancel }: DeleteConfirmPopupProps) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(80,60,0,0.18)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, #fffde7 0%, #fff9c4 100%)",
          border: "1px solid rgba(220,170,0,0.35)",
          borderRadius: 16, padding: "2rem 2.2rem 1.6rem",
          width: 300, textAlign: "center", position: "relative",
          fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
        }}
      >
        <div style={{ fontSize: "0.7rem", color: "rgba(200,160,0,0.4)", letterSpacing: "0.3em", marginBottom: "0.8rem" }}>✦ ✦ ✦</div>
        <div style={{ fontSize: "2.4rem", marginBottom: "0.6rem" }}>🍂</div>
        <p style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#3a2800", margin: "0 0 0.4rem" }}>Xoá trang nhật ký?</p>
        <p style={{ fontSize: "0.78rem", color: "#a0860a", fontStyle: "italic", margin: "0 0 1.4rem", lineHeight: 1.5 }}>
          Trang này sẽ biến mất mãi mãi,<br />như lá rụng cuối thu...
        </p>

        {/* Preview entry */}
        <div style={{
          background: "rgba(255,214,0,0.12)", border: "1px solid rgba(220,170,0,0.3)",
          borderRadius: 8, padding: "0.5rem 0.9rem", marginBottom: "1.4rem",
          display: "flex", alignItems: "center", gap: "0.5rem", textAlign: "left",
        }}>
          <span style={{ fontSize: "1.1rem" }}>{entry.mood}</span>
          <div>
            <div style={{ fontSize: "0.82rem", fontStyle: "italic", color: "#5a3a00", fontWeight: 500 }}>{entry.title}</div>
            <div style={{ fontSize: "0.65rem", color: "#a0860a", fontStyle: "italic" }}>{entry.date}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button onClick={onCancel} style={{
            flex: 1, background: "transparent", border: "1px solid rgba(200,160,0,0.4)",
            color: "#a0860a", padding: "0.5rem", borderRadius: 20, cursor: "pointer",
            fontFamily: "inherit", fontStyle: "italic", fontSize: "0.82rem",
          }}>Giữ lại ✦</button>
          <button onClick={onConfirm} style={{
            flex: 1, background: "rgba(200,60,0,0.08)", border: "1px solid rgba(200,80,0,0.3)",
            color: "#a03000", padding: "0.5rem", borderRadius: 20, cursor: "pointer",
            fontFamily: "inherit", fontStyle: "italic", fontSize: "0.82rem",
          }}>Xoá đi 🍂</button>
        </div>

        <div style={{ marginTop: "1rem", fontSize: "0.65rem", color: "rgba(200,160,0,0.35)", letterSpacing: "0.2em", fontStyle: "italic" }}>
          — nhật ký mùa hè —
        </div>
      </div>
    </div>
  );
}