"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-right";
  /** Above-the-fold: show immediately (no opacity-0 wait). */
  eager?: boolean;
};

export const Reveal = ({
  children,
  className = "",
  delayMs = 0,
  variant = "fade-up",
  eager = false,
}: RevealProps) => {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView({ enabled: !eager && !reduced });
  const visible = reduced || eager || inView;

  const style: CSSProperties | undefined =
    reduced || eager
      ? undefined
      : ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties);

  const classes = eager
    ? className.trim()
    : `motion-reveal motion-reveal--${variant} ${visible ? "is-visible" : ""} ${className}`.trim();

  return (
    <div ref={eager ? undefined : ref} className={classes} style={style}>
      {children}
    </div>
  );
};
