"use client";

import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { AutoScrollMarquee } from "@/components/vathala/ui/auto-scroll-marquee";
import { SectionEyebrow } from "@/components/vathala/ui/section-eyebrow";
import { testimonials, type Testimonial } from "@/lib/testimonials";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

const TestimonialCard = ({ name, location, quote }: Testimonial) => (
  <article className="flex h-full min-h-[18rem] flex-col rounded-2xl bg-white p-6 shadow-[0_10px_40px_-20px_rgba(30,77,63,0.15)] ring-1 ring-black/5">
    <Quote
      className="size-8 text-[#99680d]"
      strokeWidth={1.5}
      aria-hidden
    />
    <p className="mt-4 flex-1 text-base leading-relaxed text-vathala-muted">
      &ldquo;{quote}&rdquo;
    </p>
    <footer className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
      <div
        className="flex size-10 items-center justify-center rounded-full bg-vathala-sage/35 text-sm font-semibold text-[#99680d]"
        aria-hidden
      >
        {initials(name)}
      </div>
      <div>
        <p className="font-heading text-sm font-semibold text-vathala-forest">
          {name}
        </p>
        <p className="text-sm text-vathala-muted">{location}</p>
      </div>
    </footer>
  </article>
);

export const StoriesQuoteSection = () => {
  return (
    <section
      id="stories"
      className="scroll-mt-28 border-t border-black/5 bg-vathala-band py-14 sm:scroll-mt-32 sm:py-20"
      aria-labelledby="stories-quote-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <SectionEyebrow>Testimonials</SectionEyebrow>
          <h2
            id="stories-quote-heading"
            className="mt-3 font-heading text-2xl font-medium leading-tight tracking-tight text-vathala-forest sm:text-4xl"
          >
            What our patients say
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 sm:mt-12">
        <AutoScrollMarquee
          ariaLabel="Patient testimonials"
          durationSec={60}
          className="px-4 sm:px-6"
          itemClassName="w-[min(92vw,24rem)] shrink-0"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </AutoScrollMarquee>
      </div>
    </section>
  );
};
