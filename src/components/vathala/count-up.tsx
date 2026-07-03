"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CountUpProps = {
  target: number;
  suffix?: string;
  start?: boolean;
  durationMs?: number;
  delayMs?: number;
  className?: string;
};

export const CountUp = ({
  target,
  suffix = "+",
  start = false,
  durationMs = 2200,
  delayMs = 0,
  className,
}: CountUpProps) => {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || reduced || startedRef.current) return;
    startedRef.current = true;

    let frame = 0;
    let timeout = 0;

    const run = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / durationMs, 1);
        const eased = 1 - (1 - t) ** 3;
        setValue(Math.round(eased * target));
        if (t < 1) frame = requestAnimationFrame(tick);
        else setValue(target);
      };
      frame = requestAnimationFrame(tick);
    };

    if (delayMs > 0) timeout = window.setTimeout(run, delayMs);
    else run();

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [start, target, durationMs, delayMs, reduced]);

  const display = reduced && start ? target : value;

  return (
    <span
      className={className}
      aria-label={`${target.toLocaleString("en-IN")}${suffix}`}
    >
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};
