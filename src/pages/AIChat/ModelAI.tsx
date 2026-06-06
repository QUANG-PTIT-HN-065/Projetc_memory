import { useEffect, useCallback } from "react";
import { useRive } from "@rive-app/react-canvas";
import { useRiveControls } from "./useRiveControls";
import { useTimerMap } from "./useTimerMap";
import { useIdleLoop } from "./useIdleLoop";

const CLICK_SPEECHES = ["Ehh~ 😳", "Oya oya? 👀", "Kyaa! 💕", "H-Hôm nay vui nhỉ! ✨", "Uwaa~ 🌸"];

// type ModelState = "idle" | "talking" | "happy" | "click";

interface ModelAIProps {
  /** Đang nhận/hiển thị câu trả lời từ AI */
  isTalking: boolean;
  /** Đã trả lời xong, chuyển sang trạng thái vui */
  isHappy: boolean;
  onRandomSpeech?: (text: string) => void;
  onClickSpeech?: (text: string) => void;
}

export const ModelAI = ({ isTalking, isHappy, onRandomSpeech, onClickSpeech }: ModelAIProps) => {
  const { rive, RiveComponent } = useRive({
    src: "/hanako-nana.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  const { play, stop, stopAll } = useRiveControls(rive);
  const { set, clear, clearAll } = useTimerMap();
  const { stateRef, startIdleLoop, pauseIdleTimers } = useIdleLoop(rive, onRandomSpeech);

  // ── Init idle khi rive load xong ────────────────────────────────────────────
  useEffect(() => {
    if (!rive) return;
    startIdleLoop();
    return () => clearAll();
  }, [rive]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Talking: AI đang streaming câu trả lời ──────────────────────────────────
  useEffect(() => {
    if (!rive) return;
    if (isTalking) {
      stateRef.current = "talking";
      pauseIdleTimers();
      stopAll();
      stop("idle"); stop("breathe");

      play("smile");
    //   play("zoom");
      set("zoom_out", () => {
        stop("zoom");
        play("zoomout");
        set("zoomout_stop", () => stop("zoomout"), 700);
      }, 500);
    } else if (stateRef.current === "talking") {
      // Không trở về idle ngay — chờ isHappy xử lý
      stopAll();
    }
  }, [rive, isTalking]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Happy: AI vừa trả lời xong ──────────────────────────────────────────────
  // Giữ smile + thêm zoom nhẹ thêm một lúc rồi mới về idle
  useEffect(() => {
    if (!rive) return;
    if (!isHappy) return;

    stateRef.current = "happy";
    stopAll();
    stop("idle"); stop("breathe");

    // Smile + zoom nhẹ lần 2 để "vui vẻ"
    play("smile");
    play("zoom");
    set("happy_zoomout", () => {
      stop("zoom");
      play("zoomout");
      set("happy_zoomout_stop", () => stop("zoomout"), 700);
    }, 400);

    // Sau 2.5s mới trở về idle
    set("happy_end", () => {
      stop("smile");
      startIdleLoop();
    }, 2500);
  }, [rive, isHappy]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Nhìn theo chuột ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!rive) return;
    const onMouseMove = (e: MouseEvent) => {
      if (stateRef.current === "talking") return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (Math.abs(nx) > 0.3) { play(nx > 0 ? "x" : "-"); }
      else { stop("x"); stop("-"); }
      if (Math.abs(ny) > 0.3) { play(ny > 0 ? "y" : "+"); }
      else { stop("y"); stop("+"); }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [rive]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Click vào đúng nhân vật ─────────────────────────────────────────────────
  // dùng pointer-events trên canvas để chỉ bắt click vào vùng có pixel
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rive) return;
    if (stateRef.current === "talking") return;

    // Kiểm tra pixel tại vị trí click có trong vùng nhân vật không
    // bằng cách thử hit-test trên canvas element
    const canvas = (e.currentTarget as HTMLDivElement).querySelector("canvas");
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const pixel = ctx.getImageData(
          Math.round(x * (canvas.width / rect.width)),
          Math.round(y * (canvas.height / rect.height)),
          1, 1
        ).data;
        // Bỏ qua click vào vùng trong suốt (alpha < 10)
        if (pixel[3] < 10) return;
      }
    }

    stateRef.current = "click";
    clear("click_reset"); clear("click_zoomout");
    stopAll(); stop("idle"); stop("breathe");

    play("smile");

    const speech = CLICK_SPEECHES[Math.floor(Math.random() * CLICK_SPEECHES.length)];
    onClickSpeech?.(speech);

    set("click_reset", () => {
      stop("smile"); stop("zoom");
      set("click_end", () => startIdleLoop(), 600);
    }, 1500);
  }, [rive, play, stop, clear, set, stopAll, startIdleLoop, onClickSpeech, stateRef]);

  return (
    <div
      onClick={handleClick}
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
    >
      <RiveComponent style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
