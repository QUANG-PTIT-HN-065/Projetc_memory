import { useState, useRef, useEffect } from "react";
import type { DiaryEntry, NewDiaryEntry, Stage } from "../Interfaces/DiaryBook";
import Spread from "./components/Diary/Spread";
import FlipOverlay from "./components/Diary/FlipOverlay";
import NavBtn from "./components/Diary/NavBtn";
import ActionBtn from "./components/Diary/ActionBtn";
import DeleteConfirmPopup from "./components/Diary/DeleteConfirmPopup";
import { dataConnect } from "../firebase";
import { createDiaryEntry, updateDiaryEntry, deleteDiaryEntry, listDiaryEntries } from "../dataconnect-generated";
import { formatDateVN } from "../utils/dateHelper";

/* ─── SUNBURST BACKGROUND DOTS ─── */
const SUN_DOTS = Array.from({ length: 12 }, (_, i) => ({
  top: `${10 + Math.sin(i * 1.2) * 35}%`,
  left: `${5 + i * 8}%`,
  width: `${Math.random() * 6 + 4}px`,
  height: `${Math.random() * 6 + 4}px`,
  duration: `${3 + (i % 3)}s`,
  delay: `${i * 0.4}s`,
}));

/* ─── DATA ─────────────────────────────────────────────── */
const ENTRIES: DiaryEntry[] = [
  {
    id: "1",
    date: "Thứ Hai · 02 tháng 6, 2025",
    title: "Buổi sáng bình yên",
    mood: "🌻",
    content:
      "Hôm nay thức dậy sớm hơn thường lệ. Ánh nắng sớm mai chiếu qua cửa sổ, tạo nên những vệt vàng ấm áp trên sàn nhà.\n\nTôi ngồi uống trà và nhìn ra khu vườn nhỏ — những giọt sương còn đọng trên lá cỏ như những viên ngọc trong suốt. Cảm giác bình yên hiếm hoi mà tôi đã lâu không tìm thấy.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    caption: "Bình minh trên đỉnh núi",
  },
  {
    id: "2",
    date: "Thứ Ba · 03 tháng 6, 2025",
    title: "Cuộc gặp gỡ tình cờ",
    mood: "☀️",
    content:
      "Gặp lại Minh ở quán cà phê góc phố. Chúng tôi đã không gặp nhau suốt ba năm, vậy mà câu chuyện cứ thế chảy trôi như chưa từng có khoảng cách nào.\n\nAnh ấy kể về chuyến đi Đà Lạt vừa rồi — những con đường sương mù, hoa dã quỳ vàng rực và tiếng chuông gió leng keng trước hiên nhà cũ.",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80",
    caption: "Buổi sáng cà phê",
  },
  {
    id: "3",
    date: "Thứ Tư · 04 tháng 6, 2025",
    title: "Mưa và những suy nghĩ",
    mood: "🌼",
    content:
      "Mưa suốt cả ngày. Tôi ngồi nhà đọc lại những trang nhật ký cũ — những dòng chữ ngoắt ngoéo của một người trẻ hơn, lo lắng hơn và cũng hồn nhiên hơn tôi bây giờ nhiều.\n\nCó những điều tưởng như quan trọng lắm ngày đó, bây giờ chỉ còn là nụ cười nhẹ. Và ngược lại.",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&q=80",
    caption: "Mưa bên cửa sổ",
  },
  {
    id: "4",
    date: "Thứ Năm · 05 tháng 6, 2025",
    title: "Học làm bánh",
    mood: "🍋",
    content:
      "Lần đầu tiên tôi tự tay làm bánh flan. Mất hai tiếng đồng hồ, tràn caramel ra ngoài, nhưng khi lật ngược ra và nghe tiếng 'pop' nhỏ — tim tôi vui hơn bất kỳ thứ gì.\n\nBánh không hoàn hảo, hơi rỗ và màu caramel hơi đậm. Nhưng khi chia cho hàng xóm, bà Lan bảo: Ngon lắm con ơi.",
    image: "https://res.cloudinary.com/dx212mtbe/image/upload/v1780887626/qxmz94m3vuyfgqn5ibn8.jpg",
    caption: "Buổi chiều làm bánh",
  },
  {
    id: "5",
    date: "Thứ Sáu · 06 tháng 6, 2025",
    title: "Hoàng hôn công viên",
    mood: "🌞",
    content:
      "Đi dạo một mình lúc chiều tối. Công viên lúc này thưa người — chỉ có mấy ông bà già ngồi hóng mát, vài đứa trẻ còn nán lại trước khi về ăn cơm.\n\nTôi ngồi trên chiếc ghế đá quen thuộc, nhìn bầu trời chuyển từ cam sang tím. Không nghĩ gì. Đôi khi, không nghĩ gì cũng là một điều xa xỉ.",
    image: "https://marketplace.canva.com/MADFUnHu3qw/1/thumbnail_large/canva-sunset-MADFUnHu3qw.jpg",
    caption: "Hoàng hôn mùa hè",
  },
];
const emptyEntry: DiaryEntry = {
  id: "",
  date: "",
  title: "Chưa có trang nào",
  mood: "📖",
  content: "Hãy tạo trang nhật ký đầu tiên của bạn.",
  image: "",
  caption: "",
};

/* ─── MAIN APP ──────────────────────────────────────────── */
export default function DiaryBook() {
  const [stage, setStage] = useState<Stage>("closed");
  const [page, setPage] = useState(0);
  const [flipDir, setFlipDir] = useState<"forward" | "back" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [entries, setEntries] = useState<DiaryEntry[]>(ENTRIES);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({ title: "", content: "", mood: "🌻", caption: "" });
  const [imgFile, setImgFile] = useState<string>("");
  const [dbStatus, setDbStatus] = useState<string>("");
  const tRef = useRef<number[]>([]);
  const at = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    tRef.current.push(id);
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteEntry = async () => {
    const current = entries[page];
    if (current?.id) {
      try {
        await deleteDiaryEntry(dataConnect, { id: { id: current.id } });
        setDbStatus("Xóa ghi chú trên server thành công.");
      } catch (error) {
        console.error("Xóa remote thất bại:", error);
        setDbStatus("Xóa server thất bại, vẫn xoá local.");
      }
    }

    const updated = entries.filter((_, i) => i !== page);
    setEntries(updated);
    setPage(Math.min(page, updated.length - 1));
    setShowDeleteConfirm(false);
  };

  const mapDiaryItemToEntry = (item: {
    id: string;
    title: string;
    content: string;
    mood: string;
    image?: string | null;
    caption?: string | null;
    createdAt: string;
  }) => {
    return {
      id: item.id,
      date: formatDateVN(new Date(item.createdAt)),
      title: item.title || "Ghi chú mới",
      mood: item.mood || "🌼",
      content: item.content,
      image: item.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      caption: item.caption || "Từ DataConnect",
    } as DiaryEntry;
  };

  useEffect(() => {
    const currentTimeouts = [...tRef.current];

    const loadRemoteEntries = async () => {
      try {
        const result = await listDiaryEntries(dataConnect);
        const remote = result.data?.diaryEntries?.map(mapDiaryItemToEntry) ?? [];
        setEntries((current) => {
          const existingIds = new Set(current.filter((entry) => entry.id).map((entry) => entry.id));
          const newRemote = remote.filter((item) => item.id && !existingIds.has(item.id));
          return [...current, ...newRemote];
        });
        setDbStatus("Đã tải nhật ký từ DataConnect.");
      } catch (error) {
        console.error("Không tải được ghi chú DataConnect:", error);
        setDbStatus("Không kết nối được DataConnect.");
      }
    };

    loadRemoteEntries();

    return () => {
      currentTimeouts.forEach(clearTimeout);
    };
  }, []);

  const openBook = () => {
    if (stage !== "closed") return;
    setStage("opening");
    at(() => setStage("open"), 950);
  };
  const closeBook = () => {
    if (stage !== "open") return;
    setAddMode(false);
    setIsEditMode(false);
    setEditingIndex(null);
    setStage("closing");
    at(() => setStage("closed"), 950);
  };

  const flip = (dir: "forward" | "back") => {
    if (flipping || stage !== "open") return;
    if (dir === "forward" && page >= entries.length - 1) return;
    if (dir === "back" && page <= 0) return;
    setFlipping(true);
    setFlipDir(dir);
    at(() => {
      setPage((p) => (dir === "forward" ? p + 1 : p - 1));
      setFlipDir(null);
      at(() => setFlipping(false), 80);
    }, 750);
  };

  const saveEntry = async () => {
    if (!newEntry.title || !newEntry.content) return;
    if (imgFile.startsWith("data:image/")) {
      setDbStatus("Ảnh đang tải lên Cloudinary, đợi URL xong rồi lưu nhé.");
      return;
    }

    const now = new Date();
    const nowIso = now.toISOString();
    const dateStr = formatDateVN(now);
    const entryData = {
      date: dateStr,
      title: newEntry.title,
      mood: newEntry.mood,
      content: newEntry.content,
      image: imgFile || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      caption: newEntry.caption || "Kỷ niệm",
    };

    if (isEditMode && editingIndex !== null) {
      const existing = entries[editingIndex];
      const updated = entries.map((item, idx) => (idx === editingIndex ? { ...item, ...entryData } : item));
      setEntries(updated);
      setNewEntry({ title: "", content: "", mood: "🌻", caption: "" });
      setImgFile("");
      setAddMode(false);
      setIsEditMode(false);
      setEditingIndex(null);
      setPage(editingIndex);

      if (existing?.id) {
        try {
          await updateDiaryEntry(dataConnect, {
            id: { id: existing.id },
            title: entryData.title,
            content: entryData.content,
            mood: entryData.mood,
            image: entryData.image,
            caption: entryData.caption,
            updatedAt: nowIso,
          });
          setDbStatus("Cập nhật ghi chú trên server thành công.");
        } catch (error) {
          console.error("Cập nhật remote thất bại:", error);
          setDbStatus("Cập nhật server thất bại.");
        }
      }

      return;
    }

    const updated = [...entries, entryData];
    setEntries(updated);
    setNewEntry({ title: "", content: "", mood: "🌻", caption: "" });
    setImgFile("");
    setAddMode(false);
    setPage(updated.length - 1);

    try {
      const result = await createDiaryEntry(dataConnect, {
        title: entryData.title,
        content: entryData.content,
        mood: entryData.mood,
        image: entryData.image,
        caption: entryData.caption,
        createdAt: nowIso,
        updatedAt: nowIso,
      });
      const remoteId = result.data?.diaryEntry_insert?.id;
      if (remoteId) {
        setEntries((current) => {
          const copy = [...current];
          copy[copy.length - 1] = { ...copy[copy.length - 1], id: remoteId };
          return copy;
        });
        setDbStatus("Đã lưu ghi chú lên DataConnect.");
      }
    } catch (error) {
      console.error("Tạo remote thất bại:", error);
      setDbStatus("Không tạo được ghi chú trên server.");
    }
  };

  const cur = entries.length > 0 ? entries[Math.min(page, entries.length - 1)] : emptyEntry;

  const next = entries.length > 0 ? entries[Math.min(page + 1, entries.length - 1)] : emptyEntry;

  const prev = entries.length > 0 ? entries[Math.max(page - 1, 0)] : emptyEntry;

  /* ── open/close 3D transform ── */
  const bookOpen = stage === "open" || stage === "closing";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff7e6 0%, #fffbe6 40%, #e6f7ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
        position: "relative",
        overflow: "hidden",
        borderRadius: 32,
      }}
    >
      {/* Sunburst radial BG */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(255,236,0,0.35),transparent 70%)" }} />
      {/* Scattered sun dots */}
      {SUN_DOTS.map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: dot.top,
            left: dot.left,
            width: dot.width,
            height: dot.height,
            borderRadius: "50%",
            background: "rgba(255,214,0,0.4)",
            animation: `float ${dot.duration} ease-in-out ${dot.delay} infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "2rem", zIndex: 2 }}>
        <h1 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 400, fontStyle: "italic", color: "#b8860b", letterSpacing: "0.18em", margin: 0, textShadow: "0 2px 8px rgba(255,200,0,0.3)" }}>
          ✦ Nhật Ký Mùa Hè ✦
        </h1>
        {stage === "open" && (
          <>
            <p style={{ color: "#c8a020", fontSize: "0.72rem", marginTop: "0.3rem", letterSpacing: "0.1em" }}>
              Trang {page + 1} / {entries.length}
            </p>
            {dbStatus && <p style={{ color: "#987200", fontSize: "0.72rem", marginTop: "0.3rem", letterSpacing: "0.08em" }}>{dbStatus}</p>}
          </>
        )}
      </div>

      {/* ── PERSPECTIVE WRAPPER ── */}
      <div style={{ perspective: "1600px", zIndex: 2 }}>
        {/* ────────────── CLOSED BOOK ────────────── */}
        {!bookOpen && (
          <div
            onClick={stage === "closed" ? openBook : undefined}
            style={{
              width: "clamp(180px,30vw,280px)",
              height: "clamp(230px,42vw,380px)",
              cursor: stage === "closed" ? "pointer" : "default",
              position: "relative",
              transformOrigin: "bottom center",
              transform: stage === "opening" ? "rotateX(6deg) scaleY(1.04)" : "rotateX(0deg)",
              transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1)",
              animation: stage === "opening" ? "bookOpen 0.9s cubic-bezier(0.4,0,0.2,1) forwards" : "none",
            }}
          >
            {/* Cover */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg,#f9c000 0%,#f0a800 40%,#e89200 70%,#d4810a 100%)",
                borderRadius: "3px 10px 10px 3px",
                boxShadow: "6px 6px 32px rgba(180,120,0,0.5),inset -2px 0 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.8rem",
              }}
            >
              {/* embossed frame */}
              <div style={{ position: "absolute", inset: 10, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "2px 8px 8px 2px" }} />
              <div style={{ position: "absolute", inset: 16, border: "1px solid rgba(255,255,255,0.2)", borderRadius: "1px 6px 6px 1px" }} />
              <div style={{ fontSize: "2.5rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>🌻</div>
              <div style={{ color: "rgba(255,255,255,0.95)", textAlign: "center", lineHeight: 2 }}>
                <div style={{ fontSize: "clamp(0.75rem,2vw,0.95rem)", letterSpacing: "0.25em", textTransform: "uppercase", fontStyle: "italic", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>Nhật Ký</div>
                <div style={{ fontSize: "0.6rem", opacity: 0.7, letterSpacing: "0.2em" }}>Quang</div>
              </div>
              <div style={{ fontSize: "1.2rem", opacity: 0.5 }}>✦</div>
              {stage === "closed" && (
                <div style={{ position: "absolute", bottom: "1.2rem", color: "rgba(255,255,255,0.6)", fontSize: "0.62rem", letterSpacing: "0.15em", fontStyle: "italic" }}>nhấn để mở</div>
              )}
              {/* spine */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 16, background: "linear-gradient(to right,#c07800,#e89200,#d07000)", borderRadius: "3px 0 0 3px" }} />
              {/* page stack */}
              {[2, 4, 6, 8].map((n) => (
                <div
                  key={n}
                  style={{
                    position: "absolute",
                    right: -n,
                    top: n / 2,
                    width: 7,
                    bottom: -n / 2,
                    background: n === 2 ? "#fffde7" : n === 4 ? "#fff9c4" : "#fff59d",
                    borderRadius: "0 2px 2px 0",
                    zIndex: -n,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ────────────── OPEN BOOK ────────────── */}
        {bookOpen && (
          <div
            style={{
              width: "clamp(580px,82vw,920px)",
              height: "clamp(360px,52vw,560px)",
              position: "relative",
              transformOrigin: "bottom center",
              animation: stage === "open" ? "none" : stage === "closing" ? "bookClose 0.95s ease forwards" : "bookOpen 0.95s ease forwards",
              transformStyle: "preserve-3d",
            }}
          >
            {/* outer book shadow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "0 24px 80px rgba(180,140,0,0.35),0 4px 20px rgba(0,0,0,0.18),0 0 0 1.5px rgba(200,160,0,0.3)",
                borderRadius: "4px 14px 14px 4px",
                pointerEvents: "none",
                zIndex: 15,
              }}
            />
            {/* page stack right */}
            {[3, 2, 1].map((n) => (
              <div
                key={n}
                style={{
                  position: "absolute",
                  top: n,
                  right: -n * 2,
                  bottom: -n,
                  width: 8,
                  background: n === 1 ? "#fffde7" : n === 2 ? "#fff9c4" : "#fff59d",
                  borderRadius: "0 3px 3px 0",
                  zIndex: -n,
                }}
              />
            ))}

            {/* current spread */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "4px 14px 14px 4px", overflow: "hidden", zIndex: 1 }}>
              <Spread
                entry={cur}
                pageNum={page + 1}
                addMode={addMode}
                newEntry={newEntry}
                setNewEntry={setNewEntry}
                imgFile={imgFile}
                setImgFile={setImgFile}
                onSave={saveEntry}
                onCancel={() => {
                  setAddMode(false);
                  setIsEditMode(false);
                  setEditingIndex(null);
                }}
                onDelete={() => setShowDeleteConfirm(true)}
              />
            </div>

            {/* ── FLIP OVERLAY ── */}
            {flipDir && <FlipOverlay dir={flipDir} fromEntry={cur} toEntry={flipDir === "forward" ? next : prev} />}
          </div>
        )}
      </div>

      {/* ── NAV ── */}
      {stage === "open" && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.75rem", zIndex: 2 }}>
          <NavBtn onClick={() => flip("back")} disabled={page === 0 || flipping} label="◀" />

          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            {entries.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  if (flipping || i === page) return;
                  const d = i > page ? "forward" : "back";
                  setFlipping(true);
                  setFlipDir(d);
                  window.setTimeout(() => {
                    setPage(i);
                    setFlipDir(null);
                    window.setTimeout(() => setFlipping(false), 80);
                  }, 750);
                }}
                style={{ width: page === i ? 20 : 6, height: 6, borderRadius: 3, background: page === i ? "#e0a000" : "rgba(220,170,0,0.3)", cursor: "pointer", transition: "all 0.3s" }}
              />
            ))}
          </div>

          <NavBtn onClick={() => flip("forward")} disabled={page === entries.length - 1 || flipping} label="▶" />
        </div>
      )}

      {/* ── ACTIONS ── */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.2rem", zIndex: 2 }}>
        {stage === "open" && !addMode && <ActionBtn onClick={() => setAddMode(true)} label="✦ Thêm trang mới" primary />}
        {stage === "open" && !addMode && (
          <ActionBtn
            onClick={() => {
              setIsEditMode(true);
              setEditingIndex(page);
              setNewEntry({
                title: cur.title,
                content: cur.content,
                mood: cur.mood,
                caption: cur.caption,
              });
              setImgFile(cur.image);
              setAddMode(true);
            }}
            label="✎ Sửa trang hiện tại"
          />
        )}
        {stage === "open" && <ActionBtn onClick={closeBook} label="Đóng sách" />}
        {stage === "closed" && <ActionBtn onClick={openBook} label="✦ Mở sách" primary />}
      </div>

      <style>
        {`
        @keyframes bookOpen {
        0%   { transform: perspective(1600px) rotateX(22deg) scale(0.65); opacity:0.6; }
        60%  { transform: perspective(1600px) rotateX(-3deg) scale(1.02); opacity:1; }
         100% { transform: perspective(1600px) rotateX(0deg)  scale(1);    opacity:1; }
        }
        @keyframes bookClose {
           0%   { transform: perspective(1600px) rotateX(0deg)  scale(1);    opacity:1; }
           40%  { transform: perspective(1600px) rotateX(-4deg) scale(1.01); opacity:1; }
           100% { transform: perspective(1600px) rotateX(22deg) scale(0.65); opacity:0; }
         }
        @keyframes leafForward {
           0%   { transform: perspective(1200px) rotateY(0deg);    filter: brightness(1);    }
           25%  { transform: perspective(1200px) rotateY(-45deg);  filter: brightness(0.88); }
           50%  { transform: perspective(1200px) rotateY(-90deg);  filter: brightness(0.75); }
           75%  { transform: perspective(1200px) rotateY(-135deg); filter: brightness(0.88); }
           100% { transform: perspective(1200px) rotateY(-180deg); filter: brightness(1);    }
         }
        @keyframes leafBack {
           0%   { transform: perspective(1200px) rotateY(0deg);   filter: brightness(1);    }
           25%  { transform: perspective(1200px) rotateY(45deg);  filter: brightness(0.88); }
           50%  { transform: perspective(1200px) rotateY(90deg);  filter: brightness(0.75); }
           75%  { transform: perspective(1200px) rotateY(135deg); filter: brightness(0.88); }
           100% { transform: perspective(1200px) rotateY(180deg); filter: brightness(1);    }
         }
         @keyframes float {
           from { transform: translateY(0px);   opacity: 0.4; }
           to   { transform: translateY(-12px); opacity: 0.7; }
         }
         button:hover:not(:disabled) { filter: brightness(1.12); }
         input::placeholder, textarea::placeholder { color: rgba(255,218,52,0.4); font-style: italic; }
         * { box-sizing: border-box; }
        `}
      </style>

      {showDeleteConfirm && <DeleteConfirmPopup entry={cur} onConfirm={deleteEntry} onCancel={() => setShowDeleteConfirm(false)} />}
    </div>
  );
}
