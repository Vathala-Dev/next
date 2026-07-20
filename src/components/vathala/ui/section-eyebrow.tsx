import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export const SectionEyebrow = ({
  children,
  className = "",
}: SectionEyebrowProps) => (
  <p
    className={`text-sm font-semibold uppercase tracking-[0.15em] text-vathala-forest ${className}`.trim()}
  >
    {children}
  </p>
);
