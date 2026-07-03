"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export const AmbientOrbs = () => {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
            <div className="motion-orb motion-orb--forest absolute -left-[12%] top-[8%] size-[min(52vw,22rem)] rounded-full bg-vathala-forest/12 blur-3xl" />
      <div className="motion-orb motion-orb--sage absolute -right-[8%] top-[32%] size-[min(44vw,18rem)] rounded-full bg-vathala-sage/25 blur-3xl [animation-delay:-4s]" />
      <div className="motion-orb motion-orb--terra absolute bottom-[6%] left-[28%] size-[min(40vw,16rem)] rounded-full bg-vathala-terracotta/14 blur-3xl [animation-delay:-9s]" />
    </div>
  );
};

