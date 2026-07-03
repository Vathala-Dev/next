"use client";

import Image from "next/image";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  heroBackgroundVideoSrc,
  heroPosterSrc,
} from "@/lib/marketing-images";

type HeroBackgroundVideoProps = {
  alt: string;
  className?: string;
  mediaClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export const HeroBackgroundVideo = ({
  alt,
  className = "absolute inset-0",
  mediaClassName = "object-cover object-center",
  priority = false,
  sizes = "100vw",
}: HeroBackgroundVideoProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  const showVideo = !prefersReducedMotion && !videoFailed;

  if (!showVideo) {
    return (
      <Image
        src={heroPosterSrc}
        alt={alt}
        fill
        priority={priority}
        className={mediaClassName}
        sizes={sizes}
      />
    );
  }

  return (
    <video
      className={`${className} size-full ${mediaClassName}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      onError={() => setVideoFailed(true)}
    >
      <source src={heroBackgroundVideoSrc} type="video/mp4" />
    </video>
  );
};
