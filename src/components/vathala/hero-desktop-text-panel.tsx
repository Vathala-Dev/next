import type { ReactNode } from "react";
import { heroDesktopTextVariant } from "@/lib/hero-display";

type HeroDesktopTextPanelProps = {
  children: ReactNode;
};

/**
 * Optional wrapper for desktop hero copy. Styling lives in globals.css
 * (`.hero-text-panel--*`) so you can tune or switch variants in hero-display.ts.
 */
export const HeroDesktopTextPanel = ({ children }: HeroDesktopTextPanelProps) => {
  if (heroDesktopTextVariant === "none") {
    return <>{children}</>;
  }

  return (
    <div
      className={`hero-text-panel hero-text-panel--${heroDesktopTextVariant} mx-auto w-full text-center`}
    >
      {children}
    </div>
  );
};
