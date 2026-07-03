"use client";

import Image, { type StaticImageData } from "next/image";

import approachIconCareManager from "@/assets/marketing/figma/approach-icon-care-manager.png";
import approachIconReplacement from "@/assets/marketing/figma/approach-icon-replacement.png";
import approachIconVerification from "@/assets/marketing/figma/approach-icon-verification.png";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { marketingImages } from "@/lib/marketing-images";

const features = [
  {
    title: "Three-stage verification",
    body: "Government ID, professional licence, and police clearance, re-verified yearly.",
    icon: approachIconVerification,
  },
  {
    title: "A care manager assigned to you",
    body: "One human, one number to coordinate, escalate, and check in.",
    icon: approachIconCareManager,
  },
  {
    title: "The replacement promise",
    body: "If a match isn't right, we find a new caregiver, at no extra cost.",
    icon: approachIconReplacement,
  },
] as const satisfies ReadonlyArray<{
  title: string;
  body: string;
  icon: StaticImageData;
}>;

const bodyParagraphs = [
  "Hiring care for someone you love shouldn't feel like rolling the dice. We hand-vet every professional ourselves, including backgrounds, credentials, and the harder-to-measure things, like patience.",
  "You meet the person before they meet your family. If something feels off, we replace them, no questions asked.",
] as const;

export const OurApproachSection = () => {
  return (
    <section
      id="why-us"
      className="approach-section scroll-mt-28 border-t border-black/5 bg-white py-16 sm:scroll-mt-32 sm:py-20"
      aria-labelledby="why-us-heading"
    >
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-20">
          <Reveal
            variant="slide-right"
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="approach-section__photo relative aspect-[4/5] w-full overflow-hidden motion-hover-lift">
              <Image
                src={marketingImages.whyChoose}
                alt="A caregiver standing behind an elderly man seated in a wheelchair."
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority={false}
              />
            </div>
          </Reveal>

          <Reveal variant="fade-up" className="lg:max-w-none lg:justify-self-stretch">
            <div className="approach-section-eyebrow-wrap">
              <span className="approach-section-eyebrow-line" aria-hidden />
              <p className="approach-section-eyebrow">Our approach</p>
            </div>
            <h2
              id="why-us-heading"
              className="approach-section__heading mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] tracking-tight"
            >
              The careful way to choose a caregiver.
            </h2>

            <div className="mt-5 space-y-4">
              {bodyParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="approach-section__lead text-base leading-relaxed sm:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Stagger className="mt-8 flex flex-col gap-10 sm:mt-10 sm:gap-12">
              {features.map(({ title, body, icon }, index) => (
                <StaggerItem key={title} index={index}>
                  <article className="approach-feature-card">
                    <div className="approach-feature-card__icon-wrap" aria-hidden>
                      <Image
                        src={icon}
                        alt=""
                        width={icon.width}
                        height={icon.height}
                        className="approach-feature-card__icon"
                      />
                    </div>
                    <div className="approach-feature-card__content">
                      <h3 className="approach-feature-card__title">{title}</h3>
                      <p className="approach-feature-card__body">{body}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
