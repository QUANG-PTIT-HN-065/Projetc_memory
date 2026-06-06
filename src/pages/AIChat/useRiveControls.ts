import { useCallback } from "react";
import { Rive } from "@rive-app/react-canvas";

/**
 * Wrapper play/stop cho Rive, bắt lỗi âm thầm.
 */
export function useRiveControls(rive: Rive | null) {
  const play = useCallback(
    (name: string) => { try { rive?.play(name); } catch { /* ignore */ } },
    [rive],
  );

  const stop = useCallback(
    (name: string) => { try { rive?.stop(name); } catch { /* ignore */ } },
    [rive],
  );

  const stopAll = useCallback(() => {
    (["smile", "zoom", "zoomout", "cloud", "train",
      "blink", "blink 2", "x", "y", "+", "-"] as const
    ).forEach((n) => { try { rive?.stop(n); } catch { /* ignore */ } });
  }, [rive]);

  return { play, stop, stopAll };
}
