"use client";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const highlights = [
  {
    headline: "100%",
    subhead: "Verified Professionals",
  },
  {
    headline: "No",
    subhead: "Hidden fees",
  },
  {
    headline: "No Bots",
    subhead: "A real person on call",
  },
  {
    headline: "5k+",
    subhead: "services completed and counting",
  },
] as const;

export const HeroTrustHighlights = () => (
  <section
    className="trust-highlights-bar py-10 sm:py-12"
    aria-label="Why families trust VaThala"
  >
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Stagger className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight, index) => (
          <StaggerItem
            key={highlight.headline}
            index={index}
            className="trust-highlights-bar__column"
          >
            <Reveal variant="fade-up" delayMs={index * 80}>
              <article>
                <p className="trust-highlights-bar__headline">{highlight.headline}</p>
                <p className="trust-highlights-bar__subhead">{highlight.subhead}</p>
              </article>
            </Reveal>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
