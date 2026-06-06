type ChatMessage = {
  role: "Clara" | "user" | "system";
  content: string;
};

// 1. Lấy API Key từ biến môi trường (hoặc dán trực tiếp chuỗi key vào đây nếu test local)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "API_KEY_CỦA_BẠN";


const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

export async function callGeminiAI(newMessages: ChatMessage[]) {
  // Lọc bỏ các tin nhắn system (nếu có) và chuẩn hóa cấu trúc cho Gemini
  const geminiMessages = newMessages
    .filter((m) => m.role !== "system") // Loại bỏ system role khỏi contents
    .map((m) => ({
      role: m.role === "Clara" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: geminiMessages,
      systemInstruction: {
        parts: [{ text: "Tên của bạn là Clara ở việt nam. Bạn là trợ lý của tôi thân thiện, dễ thương ,nhiệt tình vui tính .và siêu cute. Trả lời ngắn gọn. dễ thương. ngọt ngào, tự nhiên bằng tiếng Việt." }],
      },
      generationConfig: {
        maxOutputTokens: 1000,
      },
    }),
  });

  return response;
}


