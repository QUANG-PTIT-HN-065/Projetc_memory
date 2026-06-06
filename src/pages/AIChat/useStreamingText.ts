import { useState, useRef, useCallback } from "react";

/**
 * Hook xử lý streaming text từ Gemini API.
 *
 * Thay vì đợi toàn bộ response, dùng ReadableStream để
 * in từng chunk ngay khi nhận được — giống ChatGPT streaming.
 *
 * callGeminiAI phải trả về Response với body là SSE stream.
 * Nếu API không hỗ trợ stream, dùng chế độ fallback simulate.
 */
export function useStreamingText() {
  const [streamingText, setStreamingText] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  /** Simulate stream bằng cách print từng ký tự với delay nhỏ.
   *  Dùng khi Gemini trả về full text một lần. */
  const simulateStream = useCallback(
    (fullText: string, onChunk?: (partial: string) => void): Promise<void> => {
      return new Promise((resolve) => {
        // abort controller cũ
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        let i = 0;
        setStreamingText("");

        // Print theo từng "word-chunk" (~3-6 ký tự) với jitter
        // để trông tự nhiên hơn là từng ký tự riêng lẻ
        const printNext = () => {
          if (controller.signal.aborted) { resolve(); return; }
          if (i >= fullText.length) { resolve(); return; }

          const chunkSize = Math.floor(Math.random() * 4) + 2; // 2–5 chars
          const chunk = fullText.slice(i, i + chunkSize);
          i += chunkSize;

          setStreamingText(fullText.slice(0, i));
          onChunk?.(fullText.slice(0, i));

          // Delay ngắn hơn ở giữa chữ, dừng chút ở dấu câu
          const lastChar = chunk[chunk.length - 1];
          const delay = [".", "!", "?", "\n"].includes(lastChar)
            ? 120 + Math.random() * 80
            : 18 + Math.random() * 20;

          setTimeout(printNext, delay);
        };

        printNext();
      });
    },
    [],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStreamingText("");
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { streamingText, simulateStream, reset, abort };
}
