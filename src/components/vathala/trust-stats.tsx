"use client";

import { CountUp } from "@/components/vathala/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionEyebrow } from "@/components/vathala/ui/section-eyebrow";
import { useInView } from "@/hooks/use-in-view";

const stats = [
  { target: 6000, label: "Service users" },
  { target: 10000, label: "Service providers" },
  { target: 500, label: "Bookings completed" },
] as const;

export const TrustStats = () => {
  const { ref, inView } = useInView({ threshold: 0.25 });

  return (
    <section
      id="caregivers"
      className="scroll-mt-28 border-y border-black/5 bg-vathala-band py-14 sm:scroll-mt-32 sm:py-16"
      aria-labelledby="platform-stats-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <SectionEyebrow>Our impact</SectionEyebrow>
          <h2
            id="platform-stats-heading"
            className="mt-3 font-heading text-2xl font-medium tracking-tight text-vathala-forest sm:text-3xl"
          >
            Trusted by families and professionals across India
          </h2>
        </Reveal>

        <div ref={ref}>
          <Stagger className="mt-10 w-full divide-y divide-vathala-sage/35 sm:mt-12 sm:grid sm:grid-cols-3 sm:divide-y-0 sm:gap-8">
            {stats.map((item, index) => (
              <StaggerItem key={item.label} index={index}>
                <article
                  className={`text-center sm:py-0 ${
                    index === 0
                      ? "max-sm:pb-8 max-sm:pt-0"
                      : index === 1
                        ? "max-sm:py-8"
                        : "max-sm:pb-0 max-sm:pt-8"
                  }`}
                >
                  <p className="font-heading text-4xl font-semibold tracking-tight text-vathala-forest sm:text-5xl lg:text-6xl">
                    <CountUp
                      target={item.target}
                      start={inView}
                      delayMs={index * 120}
                    />
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-vathala-forest sm:text-lg">
                    {item.label}
                  </h3>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};
