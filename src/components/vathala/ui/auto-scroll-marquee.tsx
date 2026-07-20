"use client";

import {
  Children,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type AutoScrollMarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop (duplicated track). */
  durationSec?: number;
  ariaLabel: string;
  className?: string;
  itemClassName?: string;
};

export const AutoScrollMarquee = ({
  children,
  durationSec = 55,
  ariaLabel,
  className = "",
  itemClassName = "w-[min(88vw,22rem)] shrink-0 sm:w-[22rem]",
}: AutoScrollMarqueeProps) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const resumeTimeoutRef = useRef<number | undefined>(undefined);
  const [userScrolling, setUserScrolling] = useState(false);
  const [trackReady, setTrackReady] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const items = useMemo(() => {
    const list = Children.toArray(children);
    return [...list, ...list];
  }, [children]);

  const pauseAutoScroll = () => {
    window.clearTimeout(resumeTimeoutRef.current);
    setUserScrolling(true);
  };

  const resumeAutoScroll = (delayMs = 0) => {
    window.clearTimeout(resumeTimeoutRef.current);
    if (delayMs <= 0) {
      setUserScrolling(false);
      return;
    }
    resumeTimeoutRef.current = window.setTimeout(
      () => setUserScrolling(false),
      delayMs,
    );
  };

  useEffect(() => {
    return () => window.clearTimeout(resumeTimeoutRef.current);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const checkReady = () => {
      setTrackReady(viewport.scrollWidth > viewport.clientWidth + 1);
    };

    checkReady();

    const observer = new ResizeObserver(checkReady);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (prefersReducedMotion || userScrolling || !trackReady) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - lastTime;
      lastTime = now;

      const halfWidth = viewport.scrollWidth / 2;
      if (halfWidth > 0) {
        const pxPerMs = halfWidth / (durationSec * 1000);
        viewport.scrollLeft += pxPerMs * elapsed;

        if (viewport.scrollLeft >= halfWidth) {
          viewport.scrollLeft -= halfWidth;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [durationSec, prefersReducedMotion, userScrolling, trackReady]);

  return (
    <div
      ref={viewportRef}
      className={`testimonials-marquee relative overflow-x-auto overscroll-x-contain ${className}`}
      style={
        {
          "--marquee-duration": `${durationSec}s`,
        } as React.CSSProperties
      }
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onPointerEnter={pauseAutoScroll}
      onPointerLeave={() => resumeAutoScroll()}
      onWheel={(e) => {
        if (Math.abs(e.deltaX) > 2 || e.shiftKey) {
          pauseAutoScroll();
          resumeAutoScroll(2000);
        }
      }}
      onPointerDown={pauseAutoScroll}
      onPointerUp={() => resumeAutoScroll(1500)}
      onPointerCancel={() => resumeAutoScroll(1500)}
    >
      <div className="testimonials-marquee__track flex w-max gap-5 py-1">
        {items.map((child, index) => {
          const isClone = index >= items.length / 2;
          return (
            <div
              key={index}
              className={itemClassName}
              aria-roledescription="slide"
              {...(isClone ? { inert: true } : {})}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};
