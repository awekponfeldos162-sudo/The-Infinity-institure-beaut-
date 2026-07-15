import { useEffect, useRef, useState } from "react";

/**
 * Signature visuelle du site : un trait infini, fin et doré, qui se dessine
 * doucement lorsqu'il entre dans le champ de vision. Fait écho au symbole
 * du logo sans jamais se répéter à l'identique — un fil conducteur discret
 * entre les sections plutôt qu'une décoration.
 */
export default function InfinityDivider({ className = "" }) {
  const pathRef = useRef(null);
  const wrapperRef = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`flex justify-center py-2 ${className}`}>
      <svg
        viewBox="0 0 160 40"
        className="h-6 w-40"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M14 20C14 10 26 10 38 20C48 28 58 30 68 20C74 14 86 14 92 20C98 26 110 26 116 20C122 12 134 10 146 20"
          stroke="var(--color-gold)"
          strokeWidth="1.3"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: "stroke-dashoffset 1.4s ease-out",
          }}
        />
      </svg>
    </div>
  );
}
