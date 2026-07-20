import type { ReactNode } from "react";

type GoldPillFrameVariant = "glass" | "solid";

type GoldPillFrameProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Glass: hero over video. Solid: cream/white sections. */
  variant?: GoldPillFrameVariant;
};

/** Figma pill — frosted fill + gold border that fades at top/bottom center. */
export const GoldPillFrame = ({
  children,
  className = "",
  contentClassName = "",
  variant = "glass",
}: GoldPillFrameProps) => (
  <div
    className={`gold-pill-frame gold-pill-frame--${variant} ${className}`.trim()}
  >
    <div className={`gold-pill-frame__content ${contentClassName}`.trim()}>
      {children}
    </div>
  </div>
);
