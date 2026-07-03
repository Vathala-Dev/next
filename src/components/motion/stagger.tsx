"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
};

export const Stagger = ({
  children,
  className = "",
  staggerMs = 70,
}: StaggerProps) => {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView();
  const visible = reduced || inView;

  const style = {
    "--stagger-step": `${staggerMs}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`motion-stagger ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  index?: number;
};

export const StaggerItem = ({
  children,
  className = "",
  index = 0,
}: StaggerItemProps) => (
  <div
    className={`motion-stagger__item ${className}`.trim()}
    style={{ "--stagger-index": index } as CSSProperties}
  >
    {children}
  </div>
);
