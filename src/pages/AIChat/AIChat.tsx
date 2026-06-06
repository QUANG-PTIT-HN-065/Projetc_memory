import { useState, useRef, useEffect } from "react";
import { callGeminiAI } from "../../APIs/CallGeminiAI";
import { ModelAI } from "./ModelAI";
import { useBubble } from "./useBubble";
import { useStreamingText } from "./useStreamingText";

interface Message {
  role: "user" | "Clara";
  content: string;
}

// ─── AIChat ───────────────────────────────────────────────────────────────────
const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Trạng thái nhân vật
  const [isTalking, setIsTalking] = useState(false); // đang streaming
  const [isHappy, setIsHappy] = useState(false); // vừa xong → vui

  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const talkingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStreamingRef = useRef(false); // track xem có đang stream không

  // Bubble & streaming
  const bubble = useBubble();
  const { simulateStream, reset: resetStream } = useStreamingText();

  const currentBubbleMaxLen = 120;

  const scrollChatToBottom = () => {
    const chatEl = chatContainerRef.current;
    if (!chatEl) return;
    chatEl.scrollTo({ top: chatEl.scrollHeight, behavior: "smooth" });
  };

  // Chỉ scroll khi có tin nhắn mới (user gửi / AI reply xuất hiện),
  // KHÔNG scroll trong lúc đang stream từng chunk
  useEffect(() => {
    if (isStreamingRef.current || !showChat) return;
    scrollChatToBottom();
  }, [messages, showChat]);

  // ── Gửi tin nhắn ─────────────────────────────────────────────────────────
  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsTalking(false);
    setIsHappy(false);
    resetStream();

    // Bubble loading
    bubble.show("", 99999);

    try {
      const data = await callGeminiAI(newMessages).then((res: Response) => res.json());
      const reply: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Xin lỗi, tôi không hiểu~ 😅";

      // Thêm message với content rỗng trước, sẽ update dần qua streaming
      setMessages((prev) => [...prev, { role: "Clara", content: "" }]);
      setIsLoading(false);
      setIsTalking(true); // nhân vật bắt đầu nói (smile + zoom)

      // Bắt đầu stream → khóa auto-scroll
      isStreamingRef.current = true;

      // Streaming: in từng chunk, đồng thời update bubble & message cuối
      await simulateStream(reply, (partial) => {
        // Update message cuối trong list
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "Clara", content: partial };
          return next;
        });
        // Update bubble (truncate nếu quá dài)
        bubble.updateText(partial.length > currentBubbleMaxLen ? partial.slice(0, currentBubbleMaxLen) + "..." : partial);
      });

      // Stream xong → mở lại scroll và cuộn xuống cuối 1 lần
      isStreamingRef.current = false;
      scrollChatToBottom();

      // Chuyển sang trạng thái vui
      setIsTalking(false);
      setIsHappy(true);

      // Giữ bubble thêm 2.5s rồi ẩn (khớp với happy duration trong ModelAI)
      if (talkingTimer.current) clearTimeout(talkingTimer.current);
      talkingTimer.current = setTimeout(() => {
        bubble.hide();
        setIsHappy(false);
      }, 2500);
    } catch (error) {
      console.error("Gemini Error:", error);
      isStreamingRef.current = false;
      bubble.show("Có lỗi xảy ra, thử lại nhé! 😅");
      setIsLoading(false);
      setIsTalking(false);
      setIsHappy(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes blinkDot {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bubblePop {
          from { opacity: 0; transform: translateX(-50%) scale(0.92); }
          to   { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ai-input {
          outline: none;
          border: 1.5px solid rgba(255,255,255,0.25) !important;
        }
        .ai-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.7) !important;
          background: rgba(255,255,255,0.18) !important;
        }
        .ai-input::placeholder { color: rgba(255,255,255,0.5); }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "90%",
          margin: "10px auto",
          borderRadius: 24,
          overflow: "hidden",
          aspectRatio: "9/10",
          maxHeight: 680,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* ── Nhân vật ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          <ModelAI isTalking={isTalking} isHappy={isHappy} onRandomSpeech={(text) => bubble.show(text)} onClickSpeech={(text) => bubble.show(text, 2500)} />
        </div>

        {/* ── Speech bubble ── */}
        {bubble.showBubble && (
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              animation: "bubblePop 0.25s ease",
              zIndex: 20,
              maxWidth: "68%",
              minWidth: 80,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(8px)",
                borderRadius: 16,
                padding: "10px 16px",
                fontSize: 13,
                color: "#333",
                lineHeight: 1.6,
                boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
                textAlign: "center",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                minHeight: 36,
              }}
            >
              {isLoading ? (
                <span style={{ letterSpacing: 6, fontSize: 16 }}>
                  <span style={{ animation: "blinkDot 1s infinite 0s" }}>●</span>
                  <span style={{ animation: "blinkDot 1s infinite 0.2s" }}>●</span>
                  <span style={{ animation: "blinkDot 1s infinite 0.4s" }}>●</span>
                </span>
              ) : (
                <>
                  {bubble.bubbleText}
                  {/* Con trỏ nhấp nháy khi đang stream */}
                  {isTalking && <span style={{ animation: "blinkDot 0.7s infinite", marginLeft: 2 }}>▎</span>}
                </>
              )}
            </div>
            <div
              style={{
                margin: "0 auto",
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "8px solid rgba(255,255,255,0.96)",
              }}
            />
          </div>
        )}

        {/* ── Gradient overlay ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: showChat ? "65%" : "40%",
            background: "linear-gradient(to top, rgba(10,8,20,0.9) 0%, rgba(10,8,20,0.5) 55%, transparent 100%)",
            zIndex: 5,
            pointerEvents: "none",
            transition: "height 0.3s ease",
          }}
        />

        {/* ── Toggle chat ── */}
        <button
          onClick={() => setShowChat((v) => !v)}
          style={{
            position: "absolute",
            bottom: showChat ? 220 : 70,
            right: 16,
            zIndex: 25,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 20,
            padding: "4px 12px",
            color: "#fff",
            fontSize: 12,
            cursor: "pointer",
            transition: "bottom 0.3s ease",
          }}
        >
          {showChat ? "✕ Thu gọn" : "💬 Lịch sử"}
        </button>

        {/* ── Chat history ── */}
        {showChat && (
          <div
            ref={chatContainerRef}
            className="chat-scroll"
            style={{
              position: "absolute",
              bottom: 72,
              left: 12,
              right: 12,
              maxHeight: 150,
              overflowY: "auto",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              animation: "chatSlideUp 0.3s ease",
              paddingBottom: 4,
            }}
          >
            {messages.length === 0 && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "center" }}>Chưa có tin nhắn nào~</div>}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  animation: "fadeSlideIn 0.25s ease",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "7px 12px",
                    borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: msg.role === "user" ? "rgba(108,99,255,0.85)" : "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 12,
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.content}
                  {/* Con trỏ nhấp nháy ở message cuối khi đang stream */}
                  {isTalking && i === messages.length - 1 && msg.role === "Clara" && <span style={{ animation: "blinkDot 0.7s infinite", marginLeft: 2, opacity: 0.7 }}>▎</span>}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "7px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: 14,
                    letterSpacing: 4,
                    color: "#fff",
                  }}
                >
                  <span style={{ animation: "blinkDot 1s infinite 0s" }}>●</span>
                  <span style={{ animation: "blinkDot 1s infinite 0.2s" }}>●</span>
                  <span style={{ animation: "blinkDot 1s infinite 0.4s" }}>●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* ── Input ── */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 14,
            right: 14,
            zIndex: 20,
            display: "flex",
            gap: 8,
          }}
        >
          <input
            className="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhắn gì đó..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: "11px 18px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 50,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: 14,
              transition: "all 0.2s",
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              width: 44,
              height: 44,
              border: "none",
              borderRadius: "50%",
              background: isHappy ? "#ff9de2" : isTalking ? "#ff6b9d" : "#6c63ff",
              color: "#fff",
              cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
              opacity: isLoading || !input.trim() ? 0.45 : 1,
              flexShrink: 0,
            }}
          >
            {isLoading ? "⏳" : isHappy ? "✨" : "✦"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChat;
