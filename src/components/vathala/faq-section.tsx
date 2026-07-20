"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { faqItems as hardcodedFaqs } from "@/lib/faq-content";
import { fetchHomeFaqs, type FaqItem } from "@/lib/faq-client";

export const FaqSection = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([...hardcodedFaqs]);

  useEffect(() => {
    fetchHomeFaqs()
      .then((apiFaqs) => {
        if (apiFaqs.length > 0) setFaqs(apiFaqs);
      })
      .catch(() => {});
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      className="scroll-mt-28 border-t border-black/5 bg-vathala-cream py-14 sm:scroll-mt-32 sm:py-16"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2
            id="faq-heading"
            className="font-heading text-3xl font-medium tracking-tight text-vathala-forest sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-vathala-muted sm:text-lg">
            Clear answers about home visits, verification, cities, and how to
            book.
          </p>
        </Reveal>

        <Stagger className="mt-10 space-y-3" staggerMs={50}>
          {faqs.map((item, index) => (
            <StaggerItem key={item.question} index={index}>
              <details className="group rounded-2xl border border-black/10 bg-white/70 shadow-sm backdrop-blur-sm open:ring-1 open:ring-vathala-forest/25 motion-hover-lift">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-semibold text-vathala-forest marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    className="shrink-0 text-vathala-muted transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    ▼
                  </span>
                </summary>
                <div className="border-t border-black/5 px-4 pb-4 pt-1 text-base leading-relaxed text-vathala-muted">
                  {item.answer}
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
