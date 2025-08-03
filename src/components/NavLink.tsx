import { useEffect, useState } from "react";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setActive(entries[0].isIntersecting),
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [href]);

  return (
    <a
      href={href}
      className={`relative transition-colors ${
        active ? "text-main" : "hover:text-main"
      }`}
    >
      {children}
      <span
        className={`pointer-events-none absolute left-0 -bottom-1 h-0.5 bg-main transition-all ${
          active ? "w-full" : "w-0"
        }`}
      />
    </a>
  );
}