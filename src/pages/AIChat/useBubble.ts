import { useState, useRef, useCallback } from "react";

/**
 * Quản lý speech bubble: text, hiển thị, auto-hide.
 */
export function useBubble() {
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((text: string, duration = 4000) => {
    setBubbleText(text);
    setShowBubble(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (duration < 99999) {
      timerRef.current = setTimeout(() => setShowBubble(false), duration);
    }
  }, []);

  /** Cập nhật text mà không reset timer (dùng cho streaming) */
  const updateText = useCallback((text: string) => {
    setBubbleText(text);
  }, []);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowBubble(false);
  }, []);

  return { bubbleText, showBubble, show, updateText, hide };
}
