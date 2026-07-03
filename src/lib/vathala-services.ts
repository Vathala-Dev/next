import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bandage,
  Heart,
  PawPrint,
  PersonStanding,
  Stethoscope,
  TestTubes,
  UserRound,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  /** Canonical service URL (matches vathala.com paths). */
  path: string;
  title: string;
  description: string;
  price: string;
  Icon: LucideIcon;
};

export const vathalaServices: ServiceItem[] = [
  {
    slug: "home-doctor",
    path: "/doctor-visit-at-home",
    title: "Home Doctor",
    description:
      "General physicians and specialists, at your door within an hour.",
    price: "From ₹699",
    Icon: Stethoscope,
  },
  {
    slug: "nursing-services",
    path: "/nursing-care",
    title: "Nursing Services",
    description:
      "Trained nurses for recovery, chronic care and round-the-clock support.",
    price: "From ₹1,200/day",
    Icon: UserRound,
  },
  {
    slug: "physiotherapy",
    path: "/physio-care",
    title: "Physiotherapy",
    description:
      "Post-op, ortho and neurological rehab at home, on schedule.",
    price: "From ₹599/visit",
    Icon: Activity,
  },
  {
    slug: "elder-care-services",
    path: "/elder-care",
    title: "Elder Care",
    description:
      "Companionship and daily-living help from gentle, trained caregivers.",
    price: "From ₹850/day",
    Icon: Heart,
  },
  {
    slug: "yoga-classes",
    path: "/yoga-at-home",
    title: "Yoga Classes",
    description:
      "Certified instructors guiding safe practice through every trimester.",
    price: "From ₹499/session",
    Icon: PersonStanding,
  },
  {
    slug: "wound-care",
    path: "/wound-care-dressing",
    title: "Wound Care",
    description:
      "Assistance for dressing and wound support with trained caregivers at home.",
    price: "From ₹999/visit",
    Icon: Bandage,
  },
  {
    slug: "veterinary-doctor",
    path: "/veterinary-doctor-home-visit",
    title: "Veterinary Doctor",
    description:
      "Vets at home for vaccinations, check-ups and senior-pet care.",
    price: "From ₹599",
    Icon: PawPrint,
  },
  {
    slug: "blood-test",
    path: "/blood-test-at-home",
    title: "Blood Test",
    description:
      "Blood collection and testing at home with a trained professional.",
    price: "From ₹499",
    Icon: TestTubes,
  },
];

export const OTHER_SERVICES_SLUG = "other-services";

export const getServiceSlugByPath = (path: string): string | undefined =>
  vathalaServices.find((s) => s.path === path)?.slug;

export type NavServiceLink = Pick<ServiceItem, "slug" | "path" | "title">;

/** Services nav dropdown (desktop + mobile) — includes contact link for other needs */
export const navServicesMenuLinks: NavServiceLink[] = [
  ...vathalaServices.map(({ slug, path, title }) => ({ slug, path, title })),
  {
    slug: OTHER_SERVICES_SLUG,
    path: "/contact-us",
    title: "Other Services",
  },
];
