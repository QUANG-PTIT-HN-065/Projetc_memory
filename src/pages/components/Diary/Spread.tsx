import Lines from "./Lines";
import PageNum from "./PageNum";
import Corner from "./Corner";
import { useRef, useState } from "react";
import type { SpreadProps } from "../../../Interfaces/DiaryBook";
import { uploadImage } from "../../../utils/uploadImage";
/* ─── PAGE COMPONENT (one spread = left+right) ──────────── */
export default function Spread({ entry, pageNum, addMode, newEntry, setNewEntry, imgFile, setImgFile, onSave, onCancel,onDelete }: SpreadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const MOODS = ["🌻", "☀️", "🌼", "🍋", "🌞", "🌊", "🍉", "🦋", "🌈", "🎐", "🍦", "🌺"];
  const [uploading, setUploading] = useState(false);

  /* shared page paper style */
  const paperBase: React.CSSProperties = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* ── LEFT PAGE — photo ── */}
      <div
        style={{
          ...paperBase,
          background: "linear-gradient(160deg, #fffde7 0%, #fff9c4 50%, #fff59d 100%)",
          borderRight: "none",
        }}
      >
        {/* ruled lines */}
        <Lines color="rgba(255,214,0,0.25)" />
        {/* left worn edge */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 18, background: "linear-gradient(to right,rgba(0,0,0,0.07),transparent)", pointerEvents: "none" }} />

        {!addMode ? (
          <div style={{ padding: "1.4rem 1.4rem 1.8rem 1.8rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {/* polaroid photo */}
            <div
              style={{
                flex: 1,
                background: "#fff",
                padding: "8px 8px 36px",
                boxShadow: "0 4px 18px rgba(180,140,0,0.25), 0 1px 4px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={entry.image}
                alt={entry.caption}
                style={{ flex: 1, width: "100%", objectFit: "contain", display: "block", minHeight: 0 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80";
                }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "0.65rem", fontStyle: "italic", color: "#a0860a", letterSpacing: "0.06em" }}>— {entry.caption} —</span>
              </div>
            </div>
            {/* corner stamps */}
            {(["tl", "tr", "bl", "br"] as const).map((c) => (
              <Corner key={c} pos={c} />
            ))}
            {/* page num */}
            <PageNum n={pageNum * 2 - 1} />
          </div>
        ) : (
          /* ADD MODE left */
          <div style={{ padding: "1.4rem 1.4rem 1.8rem 1.8rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "#b8960a", fontStyle: "italic", letterSpacing: "0.06em" }}>📎 Ảnh đính kèm</p>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                flex: 1,
                border: "2px dashed rgba(255,200,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: imgFile ? "transparent" : "rgba(255,253,200,0.4)",
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              {imgFile ? (
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <img src={imgFile} style={{ width: "100%", height: "100%", objectFit: "contain", opacity: uploading ? 0.5 : 1, transition: "opacity 0.3s" }} alt="preview" />
                  {uploading && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <span style={{ fontSize: "1.4rem", animation: "float 1s ease-in-out infinite alternate" }}>☁️</span>
                      <span style={{ fontSize: "0.65rem", color: "#c8a00a", fontStyle: "italic" }}>Đang tải lên...</span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <span style={{ fontSize: "2rem", opacity: 0.4 }}>📷</span>
                  <span style={{ fontSize: "0.7rem", color: "#c8a00a", fontStyle: "italic", marginTop: "0.4rem" }}>Nhấn để chọn ảnh</span>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;

                // Preview ngay bằng base64
                const reader = new FileReader();
                reader.onload = (ev) => setImgFile(ev.target?.result as string);
                reader.readAsDataURL(f);

                // Upload lên Cloudinary
                try {
                  setUploading(true);
                  const url = await uploadImage(f);
                  setImgFile(url); // ghi đè bằng URL thật
                } catch {
                  setImgFile("");
                  alert("Upload ảnh thất bại, vui lòng thử lại.");
                } finally {
                  setUploading(false);
                }
              }}
            />
            <input
              value={newEntry.caption}
              onChange={(e) => setNewEntry({ ...newEntry, caption: e.target.value })}
              placeholder="Chú thích ảnh..."
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(200,160,0,0.4)",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "0.75rem",
                color: "#5a4000",
                padding: "0.2rem 0",
                fontStyle: "italic",
                textAlign: "center",
              }}
            />
          </div>
        )}
      </div>

      {/* ── SPINE SHADOW (center) ── */}
      <div style={{ width: 12, flexShrink: 0, position: "relative", zIndex: 5, background: "linear-gradient(to right,rgba(0,0,0,0.12),rgba(200,160,0,0.08),rgba(0,0,0,0.06))" }} />

      {/* ── RIGHT PAGE — text ── */}
      <div
        style={{
          ...paperBase,
          background: "linear-gradient(160deg,#fffde7 0%,#fffbcc 60%,#fff9c4 100%)",
        }}
      >
        <Lines color="rgba(255,214,0,0.22)" />
        {/* red margin */}
        <div style={{ position: "absolute", left: 38, top: 0, bottom: 0, width: 1, background: "rgba(255,160,80,0.3)", pointerEvents: "none" }} />
        {/* right worn edge */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 16, background: "linear-gradient(to left,rgba(0,0,0,0.06),transparent)", pointerEvents: "none" }} />
        {/* corner fold */}
        <div style={{ position: "absolute", top: 0, right: 0, borderLeft: "28px solid transparent", borderTop: "28px solid rgba(255,214,0,0.6)", zIndex: 3 }} />

        
        {!addMode ? (
          <div style={{ padding: "1.4rem 1.8rem 1.8rem 3rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.15rem" }}>
              <span style={{ fontSize: "1.1rem" }}>{entry.mood}</span>
              <span style={{ fontSize: "0.62rem", color: "#a0860a", fontStyle: "italic", letterSpacing: "0.04em" }}>{entry.date}</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(0.95rem,2.2vw,1.2rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#3a2800",
                margin: "0 0 0.65rem",
                borderBottom: "1.5px solid rgba(255,200,0,0.4)",
                paddingBottom: "0.4rem",
              }}
            >
              {entry.title}
            </h2>
            <div style={{ flex: 1, overflow: "hidden", lineHeight: 1.85, color: "#4a3400", fontSize: "clamp(0.75rem,1.7vw,0.87rem)" }}>
              {entry.content.split("\n\n").map((p: string, i: number) => (
                <p key={i} style={{ margin: "0 0 0.7rem", textIndent: "1.5em" }}>
                  {p}
                </p>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <div /> {/* spacer */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  onClick={onDelete}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    color: "rgba(180,120,0,0.35)",
                    fontStyle: "italic",
                    fontFamily: "inherit",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(200,60,0,0.55)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(180,120,0,0.35)")}
                >
                  ✕ xoá
                </button>
                <span style={{ fontStyle: "italic", color: "#d4a000", fontSize: "0.8rem" }}>✦</span>
              </div>
            </div>
            <PageNum n={pageNum * 2} />
          </div>
        ) : (
          /* ADD MODE right */
          <div
            style={{
              padding: "1.4rem 1.8rem 1.8rem 3rem",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
              position: "relative",
              zIndex: 1,
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setNewEntry({ ...newEntry, mood: m })}
                  style={{
                    background: newEntry.mood === m ? "rgba(255,214,0,0.35)" : "transparent",
                    border: newEntry.mood === m ? "1.5px solid #f0c000" : "1px solid transparent",
                    borderRadius: 4,
                    padding: "1px 5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "all 0.15s",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <input
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              placeholder="Tiêu đề trang..."
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1.5px solid rgba(200,160,0,0.5)",
                outline: "none",
                fontFamily: "inherit",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(0.88rem,2vw,1.05rem)",
                color: "#3a2800",
                padding: "0.2rem 0",
              }}
            />
            <textarea
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              placeholder="Hãy viết điều gì đó hôm nay..."
              rows={8}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "clamp(0.73rem,1.6vw,0.83rem)",
                color: "#4a3400",
                resize: "none",
                lineHeight: 1.85,
                flex: 1,
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <button
                onClick={onSave}
                disabled={uploading}
                style={{
                  background: uploading ? "rgba(240,192,0,0.45)" : "#f0c000",
                  color: "#3a2800",
                  border: "none",
                  padding: "0.4rem 1rem",
                  borderRadius: 4,
                  cursor: uploading ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                Lưu trang ✦
              </button>
              <button
                onClick={onCancel}
                style={{
                  background: "transparent",
                  color: "#a0860a",
                  border: "1px solid rgba(200,160,0,0.4)",
                  padding: "0.4rem 0.75rem",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                }}
              >
                Huỷ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
