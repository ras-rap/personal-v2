import type { MouseEvent } from "react";

export default function addRipple(e: MouseEvent<HTMLElement>) {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const span = document.createElement("span");
  span.className = "r";
  span.style.left = `${e.clientX - rect.left}px`;
  span.style.top = `${e.clientY - rect.top}px`;
  target.appendChild(span);
  span.addEventListener("animationend", () => span.remove());
}