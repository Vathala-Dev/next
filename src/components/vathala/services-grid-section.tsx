"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getServiceImage } from "@/lib/marketing-images";
import { getServiceImageAlt } from "@/lib/service-image-alt";
import { vathalaServices } from "@/lib/vathala-services";

const ServiceCard = ({
  service,
  className = "",
}: {
  service: (typeof vathalaServices)[number];
  className?: string;
}) => {
  const image = getServiceImage(service.slug);

  return (
    <article id={service.slug} className={`h-full ${className}`}>
      <Link
        href={service.path}
        className="services-card motion-hover-lift group flex h-full cursor-pointer flex-col overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
        aria-label={`${service.title}: ${service.description}. Read more`}
      >
        <div className="relative aspect-[4/3] w-full bg-vathala-band">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 88vw, 22vw"
            />
          ) : null}
        </div>
        <div className="flex flex-col p-5 sm:p-6">
          <h3 className="services-card__title">{service.title}</h3>
          <div className="mt-2.5 flex items-end gap-2">
            <p className="services-card__description min-w-0 flex-1">
              {service.description}
            </p>
            <ArrowUpRight
              className="size-4 shrink-0 text-vathala-muted transition-colors group-hover:text-vathala-forest group-hover:translate-x-px group-hover:-translate-y-px"
              aria-hidden
            />
          </div>
        </div>
      </Link>
    </article>
  );
};

export const ServicesGridSection = () => {
  return (
    <section
      id="services"
      className="services-section scroll-mt-28 border-t border-black/5 py-14 sm:scroll-mt-32 sm:py-20"
      aria-labelledby="services-heading"
    >
      <div className="relative mx-auto w-full max-w-[90rem] px-4 sm:px-5 lg:px-6 xl:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 xl:gap-24">
          <div>
            <div className="services-section-eyebrow-wrap">
              <span className="services-section-eyebrow-line" aria-hidden />
              <p className="services-section-eyebrow">Eight ways we care</p>
            </div>
            <h2
              id="services-heading"
              className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-vathala-text"
            >
              Every kind of care, under one roof.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-vathala-muted lg:justify-self-end lg:text-right">
            From a routine fever to long-term care for an ageing parent: book a
            service, and a vetted caregiver is on the way.
          </p>
        </Reveal>

        <Stagger
          className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-9 xl:gap-11"
          staggerMs={55}
        >
          {vathalaServices.map((service, index) => (
            <StaggerItem key={service.slug} index={index}>
              <ServiceCard service={service} className="scroll-mt-32" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
