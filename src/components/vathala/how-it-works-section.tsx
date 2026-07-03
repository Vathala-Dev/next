"use client";

import type { LucideIcon } from "lucide-react";
import { Calendar, Home, Phone, Users } from "lucide-react";
import { useCallbackModal } from "@/components/vathala/callback-modal-context";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionEyebrow } from "@/components/vathala/ui/section-eyebrow";

const BOOKING_PHONE_E164 = "+919150064364";

type StepCircleAction = "call" | "book" | "none";

type HowItWorksStep = {
  title: string;
  body: string;
  Icon: LucideIcon;
  circleAction: StepCircleAction;
  actionLabel?: string;
};

const steps: HowItWorksStep[] = [
  {
    title: "Contact us",
    body: "Schedule your home visit at a time that is convenient for you.",
    Icon: Phone,
    circleAction: "call",
    actionLabel: "Call to book",
  },
  {
    title: "Book appointment",
    body: "Receive quality healthcare services in the comfort of your home.",
    Icon: Calendar,
    circleAction: "book",
    actionLabel: "Book appointment",
  },
  {
    title: "Our professional arrives",
    body: "Our professional and experienced caregivers provide personalized care at your home.",
    Icon: Home,
    circleAction: "call",
    actionLabel: "Call to book",
  },
  {
    title: "Post care support",
    body: "We ensure continuous care and support for your health and well-being even after your service.",
    Icon: Users,
    circleAction: "call",
    actionLabel: "Call to book",
  },
];

const StepContent = ({
  step,
  stepNumber,
  onBookAppointment,
  layout = "mobile",
}: {
  step: HowItWorksStep;
  stepNumber: number;
  onBookAppointment: () => void;
  layout?: "mobile" | "grid";
}) => {
  const { title, body, Icon, circleAction, actionLabel } = step;
  const isGrid = layout === "grid";
  const circleClass =
    "relative z-10 flex size-16 items-center justify-center rounded-full bg-vathala-forest text-white shadow-md transition-colors sm:mx-auto";
  const interactiveClass = `${circleClass} cursor-pointer hover:bg-vathala-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest`;

  const circle =
    circleAction === "call" ? (
      <a
        href={`tel:${BOOKING_PHONE_E164}`}
        className={interactiveClass}
        aria-label={actionLabel}
      >
        <Icon className="size-7" strokeWidth={1.5} aria-hidden />
      </a>
    ) : circleAction === "book" ? (
      <button
        type="button"
        onClick={onBookAppointment}
        className={interactiveClass}
        aria-label={actionLabel}
      >
        <Icon className="size-7" strokeWidth={1.5} aria-hidden />
      </button>
    ) : (
      <div className={circleClass} aria-hidden>
        <Icon className="size-7" strokeWidth={1.5} />
      </div>
    );

  const headingClass =
    `mt-5 rounded-lg font-heading text-lg font-semibold text-vathala-forest underline-offset-4 transition-colors hover:text-vathala-forest/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest${isGrid ? " text-center" : ""}`;

  const bodyClass = isGrid
    ? "mt-2 w-full text-left text-base leading-relaxed text-vathala-muted"
    : "mt-2 max-w-xs text-center text-base leading-relaxed text-vathala-muted";

  return (
    <>
      {circle}
      {circleAction === "book" ? (
        <button
          type="button"
          onClick={onBookAppointment}
          className={headingClass}
        >
          {stepNumber}. {title}
        </button>
      ) : circleAction === "call" ? (
        <a href={`tel:${BOOKING_PHONE_E164}`} className={headingClass}>
          {stepNumber}. {title}
        </a>
      ) : (
        <h3
          className={`mt-5 font-heading text-lg font-semibold text-vathala-forest${isGrid ? " text-center" : ""}`}
        >
          {stepNumber}. {title}
        </h3>
      )}
      <p className={bodyClass}>{body}</p>
    </>
  );
};

export const HowItWorksSection = () => {
  const { openModal } = useCallbackModal();

  return (
    <section
      className="scroll-mt-28 border-t border-black/5 bg-vathala-cream py-14 sm:scroll-mt-32 sm:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-5 lg:px-6 xl:px-8">
        <Reveal className="text-center">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2
            id="how-it-works-heading"
            className="mt-3 font-heading text-2xl font-medium tracking-tight text-vathala-forest sm:text-4xl"
          >
            Simple steps to{" "}
            <span className="gold-shine-surface how-it-heading-shine">
              quality care
            </span>
          </h2>
        </Reveal>

        {/* Mobile: stacked steps */}
        <ol className="mx-auto mt-12 max-w-md lg:hidden">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`flex flex-col items-center text-center ${index < steps.length - 1 ? "pb-14" : ""}`}
            >
              <StepContent
                step={step}
                stepNumber={index + 1}
                onBookAppointment={openModal}
              />
            </li>
          ))}
        </ol>

        {/* Desktop: horizontal grid */}
        <Stagger className="relative mt-14 hidden sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-10 xl:gap-x-14">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-px border-t border-dashed border-vathala-sage/50 lg:block"
            aria-hidden
          />
          {steps.map((step, index) => (
            <StaggerItem
              key={step.title}
              index={index}
              className="flex flex-col items-center"
            >
              <StepContent
                step={step}
                stepNumber={index + 1}
                onBookAppointment={openModal}
                layout="grid"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
