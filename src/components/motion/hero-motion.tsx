"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

type HeroMotionProps = {
  copy: ReactNode;
  visual: ReactNode;
};

export const HeroMotion = ({ copy, visual }: HeroMotionProps) => (
  <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
    <Reveal className="order-2 max-w-xl lg:order-1" delayMs={80}>
      {copy}
    </Reveal>
    <Reveal
      className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
      variant="slide-right"
      delayMs={160}
    >
      {visual}
    </Reveal>
  </div>
);
