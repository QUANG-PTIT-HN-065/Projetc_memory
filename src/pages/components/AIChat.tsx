// import { useState, useRef, useEffect, useCallback } from "react";
// import { useRive } from "@rive-app/react-canvas";
// import { callGeminiAI } from "../../APIs/CallGeminiAI";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// const RANDOM_SPEECHES = [
//   "Hôm nay trời đẹp nhỉ~ ☀️",
//   "Bạn có khỏe không? 😊",
//   "Hmm... tôi đang nghĩ đến điều gì đó thú vị...",
//   "Bạn có muốn hỏi gì không? 🌟",
//   "Tôi luôn ở đây nhé! 💫",
//   "À, tàu vừa chạy qua kìa! 🚃",
//   "Mây hôm nay trôi đẹp quá~",
//   "Chào bạn! Có gì vui không? 😄",
// ];

// const CLICK_SPEECHES = ["Ehh~ 😳", "Oya oya? 👀", "Kyaa! 💕", "H-Hôm nay vui nhỉ! ✨", "Uwaa~ 🌸"];

// // ─── ModelAI ──────────────────────────────────────────────────────────────────
// const ModelAI = ({ isTalking, onRandomSpeech, onClickSpeech }: { isTalking: boolean; onRandomSpeech?: (text: string) => void; onClickSpeech?: (text: string) => void }) => {
//   const { rive, RiveComponent } = useRive({
//     src: "/hanako-nana.riv",
//     stateMachines: "State Machine 1",
//     autoplay: true,
//   });

//   const currentStateRef = useRef<"idle" | "talking" | "click">("idle");
//   const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

//   const play = useCallback(
//     (name: string) => {
//       try {
//         rive?.play(name);
//       } catch {
//         /* ignore */
//       }
//     },
//     [rive],
//   );

//   const stop = useCallback(
//     (name: string) => {
//       try {
//         rive?.stop(name);
//       } catch {
//         /* ignore */
//       }
//     },
//     [rive],
//   );

//   const clearTimer = useCallback((key: string) => {
//     if (timers.current[key]) {
//       clearTimeout(timers.current[key]);
//       delete timers.current[key];
//     }
//   }, []);

//   const stopAllAnimations = useCallback(() => {
//     ["smile", "zoom", "zoomout", "cloud", "train", "blink", "blink 2", "x", "y", "+", "-"].forEach(stop);
//   }, [stop]);

//   const startIdleLoop = useCallback(() => {
//     if (!rive) return;
//     currentStateRef.current = "idle";

//     play("idle");
//     play("breathe");

//     const scheduleBlink = () => {
//       clearTimer("blink");
//       timers.current["blink"] = setTimeout(
//         () => {
//           if (currentStateRef.current !== "idle") return;
//           play("blink");
//           timers.current["blink_stop"] = setTimeout(() => {
//             stop("blink");
//             scheduleBlink();
//           }, 400);
//         },
//         3000 + Math.random() * 5000,
//       );
//     };

//     const scheduleCloud = () => {
//       clearTimer("cloud");
//       timers.current["cloud"] = setTimeout(
//         () => {
//           if (currentStateRef.current !== "idle") {
//             scheduleCloud();
//             return;
//           }
//           play("cloud");
//           timers.current["cloud_stop"] = setTimeout(() => {
//             stop("cloud");
//             scheduleCloud();
//           }, 3500);
//         },
//         8000 + Math.random() * 12000,
//       );
//     };

//     const scheduleTrain = () => {
//       clearTimer("train");
//       timers.current["train"] = setTimeout(
//         () => {
//           if (currentStateRef.current !== "idle") {
//             scheduleTrain();
//             return;
//           }
//           play("train");
//           timers.current["train_stop"] = setTimeout(() => {
//             stop("train");
//             scheduleTrain();
//           }, 4000);
//         },
//         15000 + Math.random() * 20000,
//       );
//     };

//     const scheduleSpeech = () => {
//       clearTimer("speech");
//       timers.current["speech"] = setTimeout(
//         () => {
//           if (currentStateRef.current === "idle" && onRandomSpeech) {
//             onRandomSpeech(RANDOM_SPEECHES[Math.floor(Math.random() * RANDOM_SPEECHES.length)]);
//           }
//           scheduleSpeech();
//         },
//         20000 + Math.random() * 30000,
//       );
//     };

//     scheduleBlink();
//     scheduleCloud();
//     scheduleTrain();
//     scheduleSpeech();
//   }, [rive, play, stop, clearTimer, onRandomSpeech]);

//   // Init idle
//   useEffect(() => {
//     if (!rive) return;
//     startIdleLoop();
//     return () => {
//       Object.values(timers.current).forEach(clearTimeout);
//       timers.current = {};
//     };
//   }, [rive, startIdleLoop]);

//   // isTalking → smile
//   useEffect(() => {
//     if (!rive) return;
//     if (isTalking) {
//       currentStateRef.current = "talking";
//       ["cloud", "train", "blink", "cloud_stop", "train_stop", "blink_stop"].forEach(clearTimer);
//       stopAllAnimations();
//       stop("idle");
//       stop("breathe");
//       play("smile");
//       play("zoom");
//       timers.current["zoom_out"] = setTimeout(() => {
//         stop("zoom");
//         play("zoomout");
//         timers.current["zoomout_stop"] = setTimeout(() => stop("zoomout"), 700);
//       }, 500);
//     } else {
//       if (currentStateRef.current === "talking") {
//         stopAllAnimations();
//         startIdleLoop();
//       }
//     }
//   }, [rive, isTalking, play, stop, clearTimer, stopAllAnimations, startIdleLoop]);

//   // Click → smile ngắn
//   const handleClick = useCallback(() => {
//     if (!rive) return;
//     // Không interrupt khi đang talking
//     if (currentStateRef.current === "talking") return;

//     currentStateRef.current = "click";
//     clearTimer("click_reset");
//     clearTimer("click_zoomout");

//     stopAllAnimations();
//     stop("idle");
//     stop("breathe");
//     play("smile");
//     // play("zoom");

//     const speech = CLICK_SPEECHES[Math.floor(Math.random() * CLICK_SPEECHES.length)];
//     onClickSpeech?.(speech);

//     timers.current["click_reset"] = setTimeout(() => {
//       stop("smile");
//     stop("zoom");
//       //   play("zoomout");
//       timers.current["click_zoomout"] = setTimeout(() => {
//         // stop("zoomout");
//         startIdleLoop();
//       }, 600);
//     }, 1500);
//   }, [rive, play, stop, clearTimer, stopAllAnimations, startIdleLoop, onClickSpeech]);

//   // Nhìn theo chuột
//   useEffect(() => {
//     if (!rive) return;
//     const onMouseMove = (e: MouseEvent) => {
//       if (currentStateRef.current === "talking") return;
//       const nx = (e.clientX / window.innerWidth) * 2 - 1;
//       const ny = (e.clientY / window.innerHeight) * 2 - 1;
//       if (Math.abs(nx) > 0.3) {
//         play(nx > 0 ? "x" : "-");
//       } else {
//         stop("x");
//         stop("-");
//       }
//       if (Math.abs(ny) > 0.3) {
//         play(ny > 0 ? "y" : "+");
//       } else {
//         stop("y");
//         stop("+");
//       }
//     };
//     window.addEventListener("mousemove", onMouseMove);
//     return () => window.removeEventListener("mousemove", onMouseMove);
//   }, [rive, play, stop]);

//   return (
//     <div onClick={handleClick} style={{ width: "100%", height: "100%", cursor: "pointer" }}>
//       <RiveComponent style={{ width: "100%", height: "100%" }} />
//     </div>
//   );
// };

// // ─── AIChat ───────────────────────────────────────────────────────────────────
// const AIChat = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isTalking, setIsTalking] = useState(false);
//   const [bubbleText, setBubbleText] = useState("");
//   const [showBubble, setShowBubble] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const talkingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const showBubbleMsg = useCallback((text: string, duration = 4000) => {
//     setBubbleText(text);
//     setShowBubble(true);
//     if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
//     if (duration < 99999) {
//       bubbleTimer.current = setTimeout(() => setShowBubble(false), duration);
//     }
//   }, []);

//   const handleSend = async () => {
//     const text = input.trim();
//     if (!text || isLoading) return;

//     const newMessages: Message[] = [...messages, { role: "user", content: text }];
//     setMessages(newMessages);
//     setInput("");
//     setIsLoading(true);
//     setIsTalking(false);
//     // Hiện bubble loading
//     setBubbleText("");
//     setShowBubble(true);
//     if (bubbleTimer.current) clearTimeout(bubbleTimer.current);

//     try {
//       setIsLoading(true);

//       const data = await callGeminiAI(newMessages).then((res: Response) => res.json());

//       const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Xin lỗi, tôi không hiểu.";

//       setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

//       setIsTalking(true);
//       const duration = Math.max(4000, reply.length * 60);
//       showBubbleMsg(reply.length > 100 ? reply.slice(0, 100) + "..." : reply, duration);

//       if (talkingTimer.current) clearTimeout(talkingTimer.current);
//       talkingTimer.current = setTimeout(() => setIsTalking(false), duration);
//     } catch (error) {
//       console.error("Gemini Error:", error);
//       showBubbleMsg("Có lỗi xảy ra, thử lại nhé! 😅");
//       setIsTalking(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes blinkDot {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 1; }
//         }
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes bubblePop {
//           from { opacity: 0; transform: translateX(-50%) scale(0.92); }
//           to   { opacity: 1; transform: translateX(-50%) scale(1); }
//         }
//         @keyframes chatSlideUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .ai-input:focus {
//           outline: none;
//           border-color: rgba(255,255,255,0.7) !important;
//           background: rgba(255,255,255,0.18) !important;
//         }
//         .ai-input::placeholder { color: rgba(255,255,255,0.5); }
//         .chat-scroll::-webkit-scrollbar { width: 4px; }
//         .chat-scroll::-webkit-scrollbar-track { background: transparent; }
//         .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
//       `}</style>

//       <div
//         style={{
//           position: "relative",
//           width: "90%",
//           margin: "10px auto",
//           borderRadius: 24,
//           overflow: "hidden",
//           aspectRatio: "9/10",
//           maxHeight: 680,
//           boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
//         }}
//       >
//         {/* Nhân vật */}
//         <div style={{ position: "absolute", inset: 0 }}>
//           <ModelAI isTalking={isTalking} onRandomSpeech={(text) => showBubbleMsg(text)} onClickSpeech={(text) => showBubbleMsg(text, 2500)} />
//         </div>

//         {/* Speech bubble */}
//         {showBubble && (
//           <div
//             style={{
//               position: "absolute",
//               top: 20,
//               left: "50%",
//               transform: "translateX(-50%)",
//               animation: "bubblePop 0.25s ease",
//               zIndex: 20,
//               maxWidth: "68%",
//               minWidth: 80,
//             }}
//           >
//             <div
//               style={{
//                 background: "rgba(255,255,255,0.96)",
//                 backdropFilter: "blur(8px)",
//                 borderRadius: 16,
//                 padding: "10px 16px",
//                 fontSize: 13,
//                 color: "#333",
//                 lineHeight: 1.6,
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
//                 textAlign: "center",
//                 whiteSpace: "pre-wrap",
//                 wordBreak: "break-word",
//               }}
//             >
//               {isLoading ? (
//                 <span style={{ letterSpacing: 6, fontSize: 16 }}>
//                   <span style={{ animation: "blinkDot 1s infinite 0s" }}>●</span>
//                   <span style={{ animation: "blinkDot 1s infinite 0.2s" }}>●</span>
//                   <span style={{ animation: "blinkDot 1s infinite 0.4s" }}>●</span>
//                 </span>
//               ) : (
//                 bubbleText
//               )}
//             </div>
//             <div
//               style={{
//                 margin: "0 auto",
//                 width: 0,
//                 height: 0,
//                 borderLeft: "7px solid transparent",
//                 borderRight: "7px solid transparent",
//                 borderTop: "8px solid rgba(255,255,255,0.96)",
//               }}
//             />
//           </div>
//         )}

//         {/* Gradient overlay */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: showChat ? "65%" : "40%",
//             background: "linear-gradient(to top, rgba(10,8,20,0.9) 0%, rgba(10,8,20,0.5) 55%, transparent 100%)",
//             zIndex: 5,
//             pointerEvents: "none",
//             transition: "height 0.3s ease",
//           }}
//         />

//         {/* Toggle chat */}
//         <button
//           onClick={() => setShowChat((v) => !v)}
//           style={{
//             position: "absolute",
//             bottom: showChat ? 220 : 70,
//             right: 16,
//             zIndex: 25,
//             background: "rgba(255,255,255,0.15)",
//             backdropFilter: "blur(8px)",
//             border: "1px solid rgba(255,255,255,0.25)",
//             borderRadius: 20,
//             padding: "4px 12px",
//             color: "#fff",
//             fontSize: 12,
//             cursor: "pointer",
//             transition: "bottom 0.3s ease",
//           }}
//         >
//           {showChat ? "✕ Thu gọn" : "💬 Lịch sử"}
//         </button>

//         {/* Chat history */}
//         {showChat && (
//           <div
//             className="chat-scroll"
//             style={{
//               position: "absolute",
//               bottom: 72,
//               left: 12,
//               right: 12,
//               maxHeight: 150,
//               overflowY: "auto",
//               zIndex: 10,
//               display: "flex",
//               flexDirection: "column",
//               gap: 6,
//               animation: "chatSlideUp 0.3s ease",
//               paddingBottom: 4,
//             }}
//           >
//             {messages.length === 0 && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "center" }}>Chưa có tin nhắn nào~</div>}
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 style={{
//                   display: "flex",
//                   justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
//                   animation: "fadeSlideIn 0.25s ease",
//                 }}
//               >
//                 <div
//                   style={{
//                     maxWidth: "80%",
//                     padding: "7px 12px",
//                     borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
//                     background: msg.role === "user" ? "rgba(108,99,255,0.85)" : "rgba(255,255,255,0.12)",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255,255,255,0.15)",
//                     color: "#fff",
//                     fontSize: 12,
//                     lineHeight: 1.5,
//                     whiteSpace: "pre-wrap",
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div style={{ display: "flex", justifyContent: "flex-start" }}>
//                 <div
//                   style={{
//                     padding: "7px 14px",
//                     borderRadius: "14px 14px 14px 4px",
//                     background: "rgba(255,255,255,0.12)",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255,255,255,0.15)",
//                     fontSize: 14,
//                     letterSpacing: 4,
//                     color: "#fff",
//                   }}
//                 >
//                   <span style={{ animation: "blinkDot 1s infinite 0s" }}>●</span>
//                   <span style={{ animation: "blinkDot 1s infinite 0.2s" }}>●</span>
//                   <span style={{ animation: "blinkDot 1s infinite 0.4s" }}>●</span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         )}

//         {/* Input */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 16,
//             left: 14,
//             right: 14,
//             zIndex: 20,
//             display: "flex",
//             gap: 8,
//           }}
//         >
//           <input
//             className="ai-input"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Nhắn gì đó..."
//             disabled={isLoading}
//             style={{
//               flex: 1,
//               padding: "11px 18px",
//               border: "1.5px solid rgba(255,255,255,0.25)",
//               borderRadius: 50,
//               background: "rgba(255,255,255,0.1)",
//               backdropFilter: "blur(10px)",
//               color: "#fff",
//               fontSize: 14,
//               transition: "all 0.2s",
//             }}
//           />
//           <button
//             onClick={handleSend}
//             disabled={isLoading || !input.trim()}
//             style={{
//               width: 44,
//               height: 44,
//               border: "none",
//               borderRadius: "50%",
//               background: isTalking ? "#ff6b9d" : "#6c63ff",
//               color: "#fff",
//               cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
//               fontSize: 16,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "all 0.2s",
//               opacity: isLoading || !input.trim() ? 0.45 : 1,
//               flexShrink: 0,
//             }}
//           >
//             {isLoading ? "⏳" : "✦"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AIChat;
