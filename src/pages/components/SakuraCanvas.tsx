import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
};

export default function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const petals: Petal[] = [];
    const PETAL_COUNT = 80;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createPetal = (): Petal => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 2 + 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
    });

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(p.size / 20, p.size / 20);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -20, 10, 0, 20);
      ctx.bezierCurveTo(20, 10, 10, -10, 0, 0);

      const gradient = ctx.createLinearGradient(0, 0, 0, 20);
      gradient.addColorStop(0, "#ffd1dc");
      gradient.addColorStop(1, "#ff9eb5");

      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(0.5, "#1e1b4b");
      gradient.addColorStop(1, "#4c1d95");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const init = () => {
      petals.length = 0;
      for (let i = 0; i < PETAL_COUNT; i++) {
        petals.push(createPetal());
      }
    };

    const animate = () => {
      drawBackground();

      for (const p of petals) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 50) {
          p.y = -50;
          p.x = Math.random() * width;
        }

        if (p.x > width + 50) p.x = -50;
        if (p.x < -50) p.x = width + 50;

        drawPetal(p);
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}