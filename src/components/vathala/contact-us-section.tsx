import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ContactUsForm } from "@/components/vathala/contact-us-form";
import {
  contactDetails,
  contactReachUs,
  contactReplyNote,
} from "@/lib/contact-content";
import { socialLinks } from "./site-footer";

type ContactIcon =
  | (typeof contactDetails)[number]["Icon"]
  | (typeof contactReachUs)[number]["Icon"];

const iconMap = {
  map: MapPin,
  phone: Phone,
  mail: Mail,
} satisfies Record<ContactIcon, LucideIcon>;

export const ContactUsSection = () => (
  <section className="mx-auto max-w-6xl px-3 py-10 pb-32 sm:px-6 sm:py-16 sm:pb-16 lg:px-8">
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-8">
        {contactDetails.map(({ label, Icon, lines }) => {
          const IconComponent = iconMap[Icon];

          return (
            <article key={label}>
              <div className="flex items-center gap-2 text-vathala-forest">
                <IconComponent className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                <h2 className="text-base font-semibold">{label}:</h2>
              </div>
              <div className="mt-3 space-y-1 text-base leading-relaxed text-vathala-muted">
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          );
        })}

        <div>
          <p className="text-base leading-relaxed text-vathala-muted">
            {contactReplyNote}
          </p>
          <div className="mt-4 space-y-6">
            {contactReachUs.map(({ label, Icon, value, href }) => {
              const IconComponent = iconMap[Icon];

              return (
                <article key={label}>
                  <div className="flex items-center gap-2 text-vathala-forest">
                    <IconComponent
                      className="size-5 shrink-0"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <h2 className="text-base font-semibold">{label}:</h2>
                  </div>
                  <p className="mt-3 text-base leading-relaxed">
                    <a
                      href={href}
                      className="font-semibold text-vathala-forest underline-offset-4 hover:underline"
                    >
                      {value}
                    </a>
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      {socialLinks.length > 0 && (
        <div className="lg:hidden">
          <p className="text-base font-semibold uppercase tracking-wider text-vathala-forest/95">
            Social Links
          </p>
          <div className="mt-4 flex gap-3" aria-label="Social media">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
                aria-label={label}
              >
                <Icon className="size-10" />
              </a>
            ))}
          </div>
        </div>
      )}

      <ContactUsForm />
    </div>
  </section>
);
