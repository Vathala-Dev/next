import type { ComponentType } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppDownloadLinks } from "@/components/vathala/app-download-links";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/vathala/social-icons";
import { vathalaServices } from "@/lib/vathala-services";

type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/VaThala/61554658859007/",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vathalaapp/",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vathala/",
    Icon: LinkedInIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UClZKCz5raYBNjptmYHiWZQw",
    Icon: YouTubeIcon,
  },
];

const quickLinks = [
  { href: "/contact-us", label: "Contact Us" },
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blogs" },
] as const;

const contactItems: ReadonlyArray<{
  label: string;
  Icon: LucideIcon;
  href?: string;
}> = [
  {
    label: "+91 9150064364",
    Icon: Phone,
    href: "tel:+919150064364",
  },
  {
    label: "support@vathala.com",
    Icon: Mail,
    href: "mailto:support@vathala.com",
  },
  {
    label: "Chennai, India",
    Icon: MapPin,
  },
];

export const SiteFooter = () => {
  return (
    <footer className="vathala-green-band">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="font-heading text-2xl font-semibold text-white">
              VaThala
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              Compassionate, verified home healthcare for families across
              India. Care that comes home, with the warmth it deserves.
            </p>
            <div className="mt-5 flex gap-3" aria-label="Social media">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-10 items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={label}
                >
                  <Icon className="size-10" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/85">
              Get the app
            </p>
            <AppDownloadLinks
              layout="column"
              className="mt-3 w-full [&_a]:w-full sm:[&_a]:w-auto [&_a]:ring-white/20"
            />
          </div>

          <div>
            <p className="text-base font-semibold uppercase tracking-wider text-white/95">
              Quick links
            </p>
            <ul className="mt-4 space-y-2 text-base text-white/90">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-base font-semibold uppercase tracking-wider text-white/95">
              Our services
            </p>
            <ul className="mt-4 space-y-2 text-base text-white/90">
              {vathalaServices
                .filter((s, i) => i < 6 || s.slug === "blood-test")
                .map((s) => (
                  <li key={s.slug}>
                    <Link href={s.path} className="hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="text-base font-semibold uppercase tracking-wider text-white/95">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-base text-white/90">
              {contactItems.map(({ label, Icon, href }) => (
                <li key={label}>
                  <div className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-white"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {href ? (
                      <a href={href} className="hover:text-white">
                        {label}
                      </a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/80 sm:flex-row">
          <p>© {new Date().getFullYear()} VaThala. All rights reserved.</p>
          <p className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy policy
            </Link>
            <span aria-hidden>|</span>
            <Link href="/terms-conditions" className="hover:text-white">
              Terms &amp; conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
