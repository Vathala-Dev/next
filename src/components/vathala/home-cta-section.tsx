"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { marketingImages } from "@/lib/marketing-images";

const PHONE_DISPLAY = "+91 9150064364";
const PHONE_E164 = "+919150064364";

const ctaBanner = marketingImages.ctaBanner;

const primaryCtaClass =
  "inline-flex min-h-[55px] items-center justify-center gap-2 rounded-2xl bg-vathala-forest px-8 text-base font-semibold text-white shadow-md transition-colors hover:bg-vathala-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest";

export const HomeCtaSection = () => {
  return (
    <section
      className="home-cta-section scroll-mt-28 border-t border-black/5 bg-vathala-cream sm:scroll-mt-32 sm:bg-transparent"
      aria-labelledby="home-cta-heading"
    >
      <div className="relative w-full">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:absolute sm:inset-0 sm:z-10 sm:flex sm:items-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Reveal className="max-w-lg">
            <h2
              id="home-cta-heading"
              className="font-heading text-[clamp(1.5rem,5vw,2.25rem)] font-medium leading-tight tracking-tight text-vathala-forest"
            >
              Need care at home?
              <br />
              We&apos;re just a call away!
            </h2>
            <p className="mt-4 text-base text-vathala-muted sm:text-lg">
              Speak with a care manager today and get matched with verified
              professionals for your family.
            </p>
            <a
              href={`tel:${PHONE_E164}`}
              className={`${primaryCtaClass} mt-8 w-full sm:w-auto`}
              aria-label={`Call now ${PHONE_DISPLAY}`}
            >
              <span className="sm:hidden">Call now</span>
              <span className="hidden sm:inline">
                Call now · {PHONE_DISPLAY}
              </span>
              <ArrowRight className="size-5 shrink-0" aria-hidden />
            </a>
          </Reveal>
        </div>

        <Image
          src={ctaBanner}
          alt="A caregiver holding an elderly patient's hand at home."
          width={ctaBanner.width}
          height={ctaBanner.height}
          className="h-auto w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1536px) 100vw, 1536px"
        />
      </div>
    </section>
  );
};
