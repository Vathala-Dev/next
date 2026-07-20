"use client";

import { ArrowRight } from "lucide-react";
import { AppDownloadLinks } from "@/components/vathala/app-download-links";
import { useCallbackModal } from "@/components/vathala/callback-modal-context";
import { HeroBackgroundVideo } from "@/components/vathala/hero-background-video";
import { HeroDesktopTextPanel } from "@/components/vathala/hero-desktop-text-panel";
import { getHeroDesktopCopyStyles } from "@/lib/hero-display";
import { Reveal } from "@/components/motion/reveal";

const heroImageAlt =
  "A doctor examining an elderly patient at home while another healthcare professional arrives in the background.";

const heroDesktopCopy = getHeroDesktopCopyStyles();

const bookAppointmentButtonClass =
  "inline-flex min-h-[55px] items-center justify-center gap-2 rounded-2xl bg-vathala-forest px-8 text-base font-semibold text-white shadow-md transition-colors hover:bg-vathala-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest";

const heroLeadLines = [
  "Home Doctor, Nurses, Physotherapists",
  "Veterinary, Wound Care, Elder Care",
  "and Other Health Care Services",
] as const;

const heroLeadCtaClass =
  "hero-lead-cta hero-lead font-body text-base font-semibold block w-full cursor-pointer border-0 bg-transparent p-0 text-center transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vathala-forest";

type HeroLeadCtaProps = {
  className?: string;
  id?: string;
  onBook: () => void;
};

const HeroLeadCta = ({ className = "", id, onBook }: HeroLeadCtaProps) => (
  <button
    type="button"
    id={id}
    onClick={onBook}
    className={`${heroLeadCtaClass} ${className}`.trim()}
    aria-label={`Book appointment: ${heroLeadLines.join(", ")}`}
  >
    {heroLeadLines.map((line) => (
      <span key={line} className="hero-lead__line">
        {line}
      </span>
    ))}
  </button>
);

export const HeroSection = () => {
  const { openModal } = useCallbackModal();

  return (
    <section
      id="book"
      className="relative scroll-mt-0 overflow-hidden bg-vathala-cream sm:bg-transparent"
      aria-labelledby="hero-heading"
    >
      {/* Mobile — Figma VaThala Copy: video header + cream card */}
      <div className="sm:hidden">
        <div className="relative h-[min(58vw,18.5rem)] min-h-[260px] w-full overflow-hidden">
          <HeroBackgroundVideo
            alt={heroImageAlt}
            priority
            mediaClassName="object-cover object-[center_22%] brightness-[1.04] contrast-[1.02]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#1E4D3F]/40 via-transparent to-vathala-cream/80"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative -mt-12 rounded-t-[2rem] bg-vathala-cream px-4 pb-8 pt-9 shadow-[0_-16px_48px_rgba(30,77,63,0.1)] ring-1 ring-black/5">
          <Reveal eager>
            <h1
              id="hero-heading"
              className="text-center font-heading text-[2rem] font-medium leading-[1.15] tracking-tight"
            >
              <span className="text-vathala-text">Healthcare at your</span>{" "}
              <span className="text-vathala-forest">Doorstep</span>
            </h1>
            <HeroLeadCta
              className="mx-auto mt-6 max-w-md"
              onBook={openModal}
            />
            <div className="mt-6 flex flex-col items-stretch gap-5">
              <button
                type="button"
                onClick={() => openModal()}
                className={`${bookAppointmentButtonClass} mx-auto w-full min-w-0 max-w-sm`}
              >
                Book Appointment
                <ArrowRight className="size-5 shrink-0" aria-hidden />
              </button>
              <div className="text-center">
                <p className="text-base font-medium text-vathala-text">
                  Download the VaThala app
                </p>
                <AppDownloadLinks
                  layout="column"
                  className="mt-3 w-full [&_a]:w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Desktop / tablet — full-bleed hero with video background */}
      <div className="relative hidden min-h-[min(92vh,52rem)] sm:block">
        <HeroBackgroundVideo
          alt={heroImageAlt}
          priority
          mediaClassName="object-cover object-center brightness-[1.04] contrast-[1.02]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent"
          aria-hidden
        />

        <div className="relative flex min-h-[min(92vh,52rem)] flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-32 text-center lg:px-8">
            <Reveal eager className="w-full max-w-3xl shrink-0">
              <HeroDesktopTextPanel>
                <h2
                  id="hero-heading-desktop"
                  aria-hidden
                  className={`font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.12] tracking-tight ${heroDesktopCopy.heading}`}
                >
                  Healthcare at your Doorstep
                </h2>
                <HeroLeadCta
                  id="aeo-lead"
                  className={`mx-auto mt-7 max-w-2xl ${heroDesktopCopy.lead}`}
                  onBook={openModal}
                />
                <div className="mt-8 flex flex-col items-center gap-6">
                  <button
                    type="button"
                    onClick={() => openModal()}
                    className={`${bookAppointmentButtonClass} min-w-[294px]`}
                  >
                    Book Appointment
                    <ArrowRight className="size-5 shrink-0" aria-hidden />
                  </button>
                  <div className="mx-auto w-full max-w-md">
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.15em] ${heroDesktopCopy.appLabel}`}
                    >
                      Download our mobile app
                    </p>
                    <AppDownloadLinks
                      layout="column"
                      className="mt-3 justify-center sm:flex-row sm:[&_a]:w-auto"
                    />
                  </div>
                </div>
              </HeroDesktopTextPanel>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
