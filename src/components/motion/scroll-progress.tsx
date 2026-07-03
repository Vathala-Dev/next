"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export const ScrollProgress = () => {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-vathala-sage via-vathala-terracotta to-vathala-forest motion-reduce:hidden"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden
    />
  );
};
