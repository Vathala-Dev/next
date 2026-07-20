"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ServiceBookNowButton } from "@/components/vathala/service-book-now-button";
import { getServiceSlugByPath } from "@/lib/vathala-services";
import {
  CallbackModalProvider,
} from "@/components/vathala/callback-modal-context";
import { useCallbackModal } from "@/components/vathala/callback-modal-context";
import { FloatingBottomCtas } from "@/components/vathala/floating-bottom-ctas";
import { MainNavigation } from "@/components/vathala/main-navigation";
import { SiteFooter } from "@/components/vathala/site-footer";
import { ServicePageJsonLd } from "@/components/seo/service-page-json-ld";
import { Reveal } from "@/components/motion/reveal";
import { publicAssetPath } from "@/lib/base-path";
import { marketingImages } from "@/lib/marketing-images";
import { getServiceImage } from "@/lib/marketing-images";
import { fetchFaqs, getServiceCategory, type FaqItem } from "@/lib/faq-client";
import type {
  ServiceContentBlock,
  ServicePageData,
} from "@/lib/service-content";
import { getServicePage } from "@/lib/service-content";

/* ------------------------------------------------------------------ */
/*  Legacy block renderer (kept for backward compat with old pages)   */
/* ------------------------------------------------------------------ */
const renderBlocks = (blocks: ServiceContentBlock[]) =>
  blocks.map((block, index) => {
    const key = `${block.kind}-${index}`;
    switch (block.kind) {
      case "p":
        return (
          <p
            key={key}
            className="text-base leading-relaxed text-vathala-muted sm:text-lg"
          >
            {block.text}
          </p>
        );
      case "h3":
        return (
          <h3
            key={key}
            className="font-heading text-xl font-semibold text-vathala-forest sm:text-2xl"
          >
            {block.text}
          </h3>
        );
      case "h4":
        return (
          <h4
            key={key}
            className="text-sm font-bold uppercase tracking-wide text-vathala-forest sm:text-base"
          >
            {block.text}
          </h4>
        );
      case "ul":
        return (
          <ul
            key={key}
            className="list-inside list-disc space-y-2 text-vathala-muted marker:text-vathala-sage-deep"
          >
            {block.items.map((item) => (
              <li key={item} className="ps-1 leading-relaxed sm:ps-0">
                {item}
              </li>
            ))}
          </ul>
        );
      case "ol":
        return (
          <ol
            key={key}
            className="list-inside list-decimal space-y-2 text-vathala-muted marker:font-semibold marker:text-vathala-forest"
          >
            {block.items.map((item) => (
              <li key={item} className="ps-1 leading-relaxed sm:ps-0">
                {item}
              </li>
            ))}
          </ol>
        );
      case "note":
        return (
          <p
            key={key}
            className="rounded-xl border border-vathala-forest/20 bg-vathala-forest/5 px-4 py-3 text-sm text-vathala-text"
          >
            <strong className="text-vathala-forest">Note:</strong> {block.text}
          </p>
        );
      default:
        return null;
    }
  });

/* ------------------------------------------------------------------ */
/*  Entry point                                                       */
/* ------------------------------------------------------------------ */
type ServiceDetailPageProps = {
  path: string;
};

export const ServiceDetailPage = ({ path }: ServiceDetailPageProps) => {
  const data = getServicePage(path);
  if (!data) notFound();

  const hasNewLayout =
    data.subServices ||
    data.whyChooseBenefits ||
    data.howItWorksSteps;

  return (
    <CallbackModalProvider>
      <ServicePageJsonLd data={data} />
      <MainNavigation lightHeader />
      <main className={hasNewLayout ? "pb-0" : "pb-40 sm:pb-36"}>
        {hasNewLayout ? (
          <NewServiceLayout data={data} />
        ) : (
          <LegacyServiceLayout data={data} />
        )}
      </main>
      <FloatingBottomCtas />
      <SiteFooter />
    </CallbackModalProvider>
  );
};

/* ================================================================== */
/*  NEW LAYOUT (Figma design)                                         */
/* ================================================================== */
const NewServiceLayout = ({ data }: { data: ServicePageData }) => {
  const serviceSlug = getServiceSlugByPath(data.path);
  const [faqs, setFaqs] = useState<FaqItem[]>(data.faqs);

  useEffect(() => {
    const category = getServiceCategory(data.path);
    if (!category) return;
    fetchFaqs(category)
      .then((apiFaqs) => {
        if (apiFaqs.length > 0) setFaqs(apiFaqs);
      })
      .catch(() => {});
  }, [data.path]);

  return (
    <>
      {/* ── Hero: two-tone background behind the card ── */}
      <div>
        {/* Top — hero banner with title overlay */}
        <section className="relative overflow-hidden pt-14 sm:pt-16">
          {/* Banner image or fallback color */}
          {data.heroBannerPath ? (
            <div className="relative">
              <Image
                src={publicAssetPath(data.heroBannerPath)}
                alt=""
                width={1600}
                height={500}
                className="h-auto max-h-[220px] w-full object-cover sm:max-h-[300px] md:max-h-[380px] lg:max-h-[450px]"
                sizes="100vw"
                priority
              />
              {/* Title overlay centered on image */}
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                  <h1 className={`font-heading text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl lg:text-5xl ${data.heroTitleColor === "#1E4D3F" ? "text-white" : "text-vathala-forest"}`}>
                    {data.heroTitle}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-vathala-band/60 pb-8 pt-10 sm:pb-10 sm:pt-14 md:pb-14 md:pt-18">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h1 className="font-heading text-2xl font-medium tracking-tight text-vathala-forest sm:text-3xl md:text-4xl lg:text-5xl">
                  {data.heroTitle}
                </h1>
              </div>
            </div>
          )}
        </section>

        {/* Bottom color — extends a few pixels past the card's bottom edge */}
        <div className="bg-vathala-cream pb-8 sm:pb-10">
          {/* Card pulled up into the top color via negative margin */}
          <div className="relative z-10 mx-auto max-w-6xl px-3 sm:-top-10 sm:-mb-10 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] sm:p-10">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-12">
                {/* Left column */}
                <div className="space-y-4">
                  <h2 className="font-heading text-lg font-semibold text-vathala-forest sm:text-xl">
                    {data.leadHeading}
                  </h2>
                  {data.leadParagraphs.map((text, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-vathala-muted sm:text-base"
                    >
                      {text}
                    </p>
                  ))}
                </div>
                {/* Right column */}
                {data.secondaryHeading && (
                  <div className="space-y-4">
                    <h2 className="font-heading text-lg font-semibold text-vathala-forest sm:text-xl">
                      {data.secondaryHeading}
                    </h2>
                    {data.secondaryParagraphs?.map((text, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-vathala-muted sm:text-base"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ── Why Choose ── */}
      {data.whyChooseBenefits && data.whyChooseBenefits.length > 0 && (
        <WhyChooseSection
          heading={data.whyChooseHeading ?? "Why choose VaThala?"}
          benefits={data.whyChooseBenefits}
          imageSlug={data.whyChooseImageSlug}
          serviceSlug={serviceSlug}
        />
      )}

      {/* ── How It Works ── */}
      {data.howItWorksSteps && data.howItWorksSteps.length > 0 && (
        <HowItWorksSection
          steps={data.howItWorksSteps}
          note={data.howItWorksNote}
          imagePath={data.howItWorksImagePath}
        />
      )}

      {/* ── Emergency Note ── */}
      <section className="bg-white py-4 sm:py-6">
        <div className="mx-auto max-w-4xl px-3 text-center sm:px-6 lg:px-8">
          <p className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-vathala-muted sm:rounded-full sm:px-6">
            <span className="font-semibold text-vathala-text">Note:</span> For
            emergency or life-threatening conditions, visit the nearest hospital
            directly.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs.length > 0 && <ServiceFaqSection faqs={faqs} />}

      {/* ── CTA Banner ── */}
      <CtaBannerSection serviceSlug={serviceSlug} />
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Why Choose section                                                */
/* ------------------------------------------------------------------ */
const WhyChooseSection = ({
  heading,
  benefits,
  imageSlug,
  serviceSlug,
}: {
  heading: string;
  benefits: string[];
  imageSlug?: string;
  serviceSlug?: string;
}) => {
  const serviceImage = imageSlug
    ? (getServiceImage(`${imageSlug}-services`) ?? getServiceImage(imageSlug))
    : undefined;

  return (
    <section className="bg-vathala-cream py-10 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-12 lg:gap-16">
          {/* Image + Book Now */}
          <Reveal>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
              {serviceImage ? (
                <Image
                  src={serviceImage}
                  alt={heading}
                  width={600}
                  height={450}
                  className="aspect-[4/3] h-auto w-full rounded-xl object-cover sm:aspect-auto sm:rounded-2xl"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-vathala-sage/20 sm:rounded-2xl">
                  <span className="text-sm text-vathala-muted">Image</span>
                </div>
              )}
            </div>
            {serviceSlug && (
              <div className="mt-5">
                <HeroBookNowButton serviceSlug={serviceSlug} />
              </div>
            )}
          </Reveal>

          {/* Content */}
          <Reveal>
            <h2 className="font-heading text-xl font-semibold text-vathala-forest sm:text-2xl md:text-3xl">
              {heading}
            </h2>
            <ul className="mt-4 space-y-3 sm:mt-6">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm leading-relaxed text-vathala-muted sm:text-base"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-vathala-forest" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  How It Works section                                              */
/* ------------------------------------------------------------------ */
const HowItWorksSection = ({
  steps,
  note,
  imagePath,
}: {
  steps: string[];
  note?: string;
  imagePath?: string;
}) => {
  return (
    <section className="bg-white py-10 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12 lg:gap-16">
          {/* Left — text steps */}
          <Reveal>
            <h2 className="font-heading text-xl font-semibold text-vathala-forest sm:text-2xl md:text-3xl">
              How it works: simple, fast, and seamless
            </h2>
            <ol className="mt-6 space-y-3">
              {steps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm leading-relaxed text-vathala-muted sm:text-base"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-vathala-forest text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            {note && (
              <p className="mt-6 text-sm leading-relaxed text-vathala-muted sm:text-base">
                {note}
              </p>
            )}
          </Reveal>

          {/* Right — illustration */}
          <Reveal className="flex items-center justify-center">
            {imagePath ? (
              <Image
                src={publicAssetPath(imagePath)}
                alt="How it works — step by step illustration"
                width={800}
                height={600}
                className="h-auto w-full max-w-sm rounded-xl object-contain sm:max-w-xl sm:rounded-2xl lg:max-w-2xl"
                sizes="(max-width: 640px) 90vw, 50vw"
              />
            ) : (
              <div className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-vathala-cream sm:rounded-2xl">
                <span className="text-sm text-vathala-muted">
                  How it works illustration
                </span>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  FAQ section                                                       */
/* ------------------------------------------------------------------ */
const ServiceFaqSection = ({
  faqs,
}: {
  faqs: FaqItem[];
}) => {
  return (
    <section
      className="bg-white py-10 sm:py-14 md:py-20"
      aria-labelledby="service-faq-heading"
    >
      <div className="mx-auto max-w-3xl px-3 sm:px-6 lg:px-8">
        <h2
          id="service-faq-heading"
          className="text-center font-heading text-xl font-semibold text-vathala-forest sm:text-2xl md:text-3xl"
        >
          Questions &amp; answers
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-black/10 bg-white shadow-sm open:ring-1 open:ring-vathala-forest/15"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left text-sm font-semibold text-vathala-forest marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="shrink-0 text-vathala-muted transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  ▼
                </span>
              </summary>
              <div className="border-t border-black/5 px-5 pb-4 pt-2 text-sm leading-relaxed text-vathala-muted sm:text-base">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  CTA Banner section                                                */
/* ------------------------------------------------------------------ */
const CtaBannerSection = ({
  serviceSlug,
}: {
  serviceSlug?: string;
}) => {
  const ctaBanner = marketingImages.ctaBanner;

  return (
    <section className="relative overflow-hidden">
      <Image
        src={ctaBanner}
        alt="Healthcare professionals providing care at home"
        width={ctaBanner.width}
        height={ctaBanner.height}
        className="h-auto min-h-[240px] w-full object-cover sm:min-h-[280px] md:min-h-[340px]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent sm:from-black/50 sm:via-black/30" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold leading-relaxed text-white sm:text-2xl sm:leading-relaxed md:text-3xl lg:text-4xl lg:leading-relaxed">
            Need Care at Home?
            <br />
            <span className="text-white">
              We&apos;re Just a Call Away!
            </span>
          </h2>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-white/90 sm:mt-5 sm:text-sm md:text-base">
            Book an appointment now and experience healthcare at your doorstep.
          </p>
          {serviceSlug && (
            <div className="mt-4 sm:mt-6">
              <CtaViewMoreButton serviceSlug={serviceSlug} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const HeroBookNowButton = ({ serviceSlug }: { serviceSlug?: string }) => {
  const { openModal } = useCallbackModal();
  if (!serviceSlug) return null;
  return (
    <button
      type="button"
      onClick={() => openModal({ serviceSlug })}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-vathala-forest px-8 text-sm font-semibold text-white shadow-md transition-colors hover:bg-vathala-forest/90"
    >
      Book Now
      <ArrowRight className="size-4 shrink-0 animate-nudge-right" aria-hidden />
    </button>
  );
};

const CtaViewMoreButton = ({ serviceSlug }: { serviceSlug: string }) => {
  const { openModal } = useCallbackModal();
  return (
    <button
      type="button"
      onClick={() => openModal({ serviceSlug })}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-vathala-forest px-8 text-sm font-semibold text-white shadow-md transition-colors hover:bg-vathala-forest/90"
    >
      Book Now
      <ArrowRight className="size-4 shrink-0 animate-nudge-right" aria-hidden />
    </button>
  );
};

/* ================================================================== */
/*  LEGACY LAYOUT (unchanged — for services not yet migrated)         */
/* ================================================================== */
const LegacyServiceLayout = ({ data }: { data: ServicePageData }) => {
  const serviceSlug = getServiceSlugByPath(data.path);
  const [faqs, setFaqs] = useState<FaqItem[]>(data.faqs);

  useEffect(() => {
    const category = getServiceCategory(data.path);
    if (!category) return;
    fetchFaqs(category)
      .then((apiFaqs) => {
        if (apiFaqs.length > 0) setFaqs(apiFaqs);
      })
      .catch(() => {});
  }, [data.path]);

  return (
    <>
      <article className="border-b border-black/5 bg-vathala-cream pb-8 pt-24 sm:pb-10 sm:pt-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-vathala-muted" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="font-medium text-vathala-forest underline-offset-4 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-vathala-text" aria-current="page">
                {data.heroTitle}
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 font-heading text-[clamp(2rem,4.5vw,3rem)] font-medium leading-tight tracking-tight text-vathala-forest">
            {data.heroTitle}
          </h1>
          <p className="mt-4 font-heading text-lg font-medium text-vathala-sage-deep sm:text-xl">
            {data.leadHeading}
          </p>
          <div className="mt-6 space-y-4">
            {data.leadParagraphs.map((text, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-vathala-muted sm:text-lg"
              >
                {text}
              </p>
            ))}
          </div>

          {serviceSlug ? (
            <div className="mt-10">
              <ServiceBookNowButton serviceSlug={serviceSlug} />
            </div>
          ) : null}
        </div>
      </article>

      <div className="bg-vathala-cream">
        <div className="mx-auto max-w-3xl space-y-14 px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
          {data.sections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="space-y-4">
              {section.heading ? (
                <h2 className="font-heading text-2xl font-medium text-vathala-forest sm:text-3xl">
                  {section.heading}
                </h2>
              ) : null}
              <div className="space-y-4">{renderBlocks(section.blocks)}</div>
            </section>
          ))}
        </div>
      </div>

      {faqs.length > 0 && (
        <section
          className="border-t border-black/5 bg-vathala-cream py-14 sm:py-16"
          aria-labelledby="service-faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2
              id="service-faq-heading"
              className="font-heading text-2xl font-medium text-vathala-forest sm:text-3xl"
            >
              Questions &amp; answers
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-black/10 bg-white/70 shadow-sm backdrop-blur-sm open:ring-1 open:ring-vathala-forest/15"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold text-vathala-forest marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      className="shrink-0 text-vathala-muted transition-transform group-open:rotate-180"
                      aria-hidden
                    >
                      ▼
                    </span>
                  </summary>
                  <div className="border-t border-black/5 px-4 pb-4 pt-1 text-sm leading-relaxed text-vathala-muted sm:text-base">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
