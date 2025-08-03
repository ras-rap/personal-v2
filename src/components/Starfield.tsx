import { useEffect, useRef } from "react";

export default function Starfield({
  density = 120,
  speed = 0.05,
}: {
  density?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const stars = useRef<{ x: number; y: number; z: number }[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const init = () => {
      stars.current = Array.from({ length: density }, () => ({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * w,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "white";
      for (const s of stars.current) {
        s.z -= speed * 10;
        if (s.z <= 1) s.z = w;
        const k = 128.0 / s.z;
        const px = s.x * k + w / 2;
        const py = s.y * k + h / 2;
        if (px < 0 || px >= w || py < 0 || py >= h) continue;
        const size = (1 - s.z / w) * 2 + 0.2;
        ctx.globalAlpha = 0.35;
        ctx.fillRect(px, py, size, size);
      }
      raf.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    init();
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 opacity-20 mix-blend-screen"
      aria-hidden
    />
  );
}