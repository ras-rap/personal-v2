import useReveal from "@/hooks/useReveal";

type Props = React.PropsWithChildren<{
  className?: string;
  delayMs?: number;
}>;

export default function Reveal({ className, delayMs = 0, children }: Props) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`${className ?? ""} transition-all duration-700 ease-out will-change-transform`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}