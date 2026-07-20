"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
};

export const useInView = ({
  once = true,
  rootMargin = "-8% 0px",
  threshold = 0.12,
  enabled = true,
}: UseInViewOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold, enabled]);

  return { ref, inView };
};
