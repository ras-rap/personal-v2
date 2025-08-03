// hooks/useScrollTilt.ts
import { useEffect, useRef } from "react";

export default function useScrollTilt(maxTilt = 4) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const center = rect.top + rect.height / 2;
        const norm = (center - vh / 2) / (vh / 2); // -1..1
        const tilt = Math.max(-1, Math.min(1, norm)) * maxTilt;
        el.style.transform = `perspective(1000px) rotateX(${tilt}deg)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [maxTilt]);

  return ref;
}