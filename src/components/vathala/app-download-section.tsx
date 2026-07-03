"use client";

import { AppDownloadLinks } from "@/components/vathala/app-download-links";
import { Reveal } from "@/components/motion/reveal";
import { vathalaApp } from "@/lib/app-links";

export const AppDownloadSection = () => {
  return (
    <section
      id="app"
      className="vathala-green-band scroll-mt-28 border-t border-black/5 py-14 sm:scroll-mt-32 sm:py-16"
      aria-labelledby="app-download-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <Reveal variant="fade-up" className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/90">
              Book care from your phone
            </p>
            <h2
              id="app-download-heading"
              className="mt-3 font-heading text-3xl font-medium leading-tight tracking-tight sm:text-4xl"
            >
              Download the {vathalaApp.name} app
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              Book doctor visits, nursing, physiotherapy, elder care, and more at
              home. Verified professionals, flexible slots, and support when you
              need it.
            </p>
          </Reveal>
          <Reveal variant="scale-in" delayMs={120} className="w-full max-w-md lg:max-w-none">
            <AppDownloadLinks
              layout="column"
              className="w-full [&_a]:w-full sm:[&_a]:w-auto lg:flex-row lg:justify-end"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
