import { useCallback, useRef } from "react";
import { useRiveControls } from "./useRiveControls";
import { useTimerMap } from "./useTimerMap";
import { Rive } from "@rive-app/react-canvas";

const RANDOM_SPEECHES = [
  "Hôm nay trời đẹp nhỉ~ ☀️",
  "Bạn có khỏe không? 😊",
  "Hmm... tôi đang nghĩ đến điều gì đó thú vị...",
  "Bạn có muốn hỏi gì không? 🌟",
  "Tôi luôn ở đây nhé! 💫",
  "À, tàu vừa chạy qua kìa! 🚃",
  "Mây hôm nay trôi đẹp quá~",
  "Chào bạn! Có gì vui không? 😄",
];

/**
 * Quản lý vòng lặp idle: breathe, blink, cloud, train, random speech.
 * Trả về startIdleLoop để gọi khi cần khởi động lại.
 */
export function useIdleLoop(
  rive: Rive | null,
  onRandomSpeech?: (text: string) => void,
) {
  const { play, stop } = useRiveControls(rive);
  const { set, clear } = useTimerMap();
  const stateRef = useRef<"idle" | "talking" | "happy" | "click">("idle");

  const startIdleLoop = useCallback(() => {
    if (!rive) return;
    stateRef.current = "idle";
    play("idle");
    play("breathe");

    // Blink ngẫu nhiên
    const scheduleBlink = () => {
      set("blink", () => {
        if (stateRef.current !== "idle") return;
        play("blink");
        set("blink_stop", () => { stop("blink"); scheduleBlink(); }, 400);
      }, 3000 + Math.random() * 5000);
    };

    // Mây bay qua
    const scheduleCloud = () => {
      set("cloud", () => {
        if (stateRef.current !== "idle") { scheduleCloud(); return; }
        play("cloud");
        set("cloud_stop", () => { stop("cloud"); scheduleCloud(); }, 3500);
      }, 8000 + Math.random() * 12000);
    };

    // Tàu chạy qua
    const scheduleTrain = () => {
      set("train", () => {
        if (stateRef.current !== "idle") { scheduleTrain(); return; }
        play("train");
        set("train_stop", () => { stop("train"); scheduleTrain(); }, 4000);
      }, 15000 + Math.random() * 20000);
    };

    // Random speech
    const scheduleSpeech = () => {
      set("speech", () => {
        if (stateRef.current === "idle" && onRandomSpeech) {
          onRandomSpeech(RANDOM_SPEECHES[Math.floor(Math.random() * RANDOM_SPEECHES.length)]);
        }
        scheduleSpeech();
      }, 20000 + Math.random() * 30000);
    };

    scheduleBlink();
    scheduleCloud();
    scheduleTrain();
    scheduleSpeech();
  }, [rive, play, stop, set, onRandomSpeech]);

  const pauseIdleTimers = useCallback(() => {
    ["blink", "blink_stop", "cloud", "cloud_stop", "train", "train_stop"].forEach(clear);
  }, [clear]);

  return { stateRef, startIdleLoop, pauseIdleTimers };
}
