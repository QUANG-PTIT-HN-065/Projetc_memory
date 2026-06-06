import { useCallback, useRef } from "react";

/**
 * Quản lý các setTimeout theo key.
 * Tự cancel timer cũ nếu set cùng key, tránh leak.
 */
export function useTimerMap() {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const set = useCallback((key: string, fn: () => void, delay: number) => {
    if (timers.current[key]) clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(fn, delay);
  }, []);

  const clear = useCallback((key: string) => {
    if (timers.current[key]) {
      clearTimeout(timers.current[key]);
      delete timers.current[key];
    }
  }, []);

  const clearAll = useCallback(() => {
    Object.values(timers.current).forEach(clearTimeout);
    timers.current = {};
  }, []);

  return { set, clear, clearAll };
}
