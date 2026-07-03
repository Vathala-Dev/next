"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import {
  GoldButton,
  GoldButtonOutline,
} from "@/components/vathala/ui/gold-button";
import { GoldPillFrame } from "@/components/vathala/ui/gold-pill-frame";
import { SectionEyebrow } from "@/components/vathala/ui/section-eyebrow";
import { introAboutSrc } from "@/lib/marketing-images";

export const IntroAboutSection = () => {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-black/5 bg-vathala-cream py-14 sm:scroll-mt-32 sm:py-20"
      aria-labelledby="intro-about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal variant="fade-up" className="max-w-xl">
            <SectionEyebrow className="sm:text-left">
              <span className="sm:hidden">A new chapter in home care</span>
              <span className="hidden sm:inline">A new perspective on home care</span>
            </SectionEyebrow>
            <h2
              id="intro-about-heading"
              className="mt-4 font-heading text-[1.75rem] font-medium leading-tight tracking-tight text-vathala-forest sm:text-4xl"
            >
              <span className="text-vathala-text sm:text-vathala-forest">
                Care that comes home,
              </span>{" "}
              with the warmth it deserves.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-vathala-muted sm:mt-6 sm:text-lg">
              <span className="sm:hidden">
                Doctors, nurses, and caregivers we choose, trusted by families.
                Compassionate, qualified, and at your door when you need them.
              </span>
              <span className="hidden sm:inline">
                Hiring care for someone you love shouldn&apos;t feel like rolling
                the dice. We hand-vet every professional ourselves, including
                backgrounds, credentials, and the harder-to-measure things, like
                patience.
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <GoldButton href="#book" className="w-full sm:w-auto">
                <span className="sm:hidden">Book a visit</span>
                <span className="hidden sm:inline">About us</span>
              </GoldButton>
              <GoldButtonOutline href="#services" className="w-full sm:w-auto">
                <span className="sm:hidden">Browse services</span>
                <span className="hidden sm:inline">Our services</span>
              </GoldButtonOutline>
            </div>
          </Reveal>

          <Reveal
            variant="slide-right"
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-vathala-band shadow-lg ring-1 ring-black/5 motion-hover-lift">
              <Image
                src={introAboutSrc}
                alt="A caregiver in blue scrubs smiling while supporting an elderly woman at home."
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div
                className="absolute bottom-5 left-5"
                aria-label="10+ years of trust in home healthcare services"
              >
                <GoldPillFrame
                  className="section-pill-badge inline-flex w-auto px-4 py-3"
                  variant="glass"
                >
                  <div>
                    <p className="font-heading text-2xl font-semibold text-vathala-terracotta-strong">
                      10+
                    </p>
                    <p className="text-sm font-medium text-vathala-muted">
                      Years of trust in home healthcare
                    </p>
                  </div>
                </GoldPillFrame>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
