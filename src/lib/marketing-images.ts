import heroHomeCare from "@/assets/marketing/figma/hero-home-care.png";
import introAbout from "@/assets/marketing/figma/intro-about.png";
import whyChoose from "@/assets/marketing/figma/why-choose.jpg";
import ctaBanner from "@/assets/marketing/figma/cta-banner.jpg";
import serviceHomeDoctor from "@/assets/marketing/figma/service-home-doctor.jpg";
import serviceNursing from "@/assets/marketing/figma/service-nursing.jpg";
import servicePhysio from "@/assets/marketing/figma/service-physio.jpg";
import serviceElderCare from "@/assets/marketing/figma/service-elder-care.jpg";
import serviceYoga from "@/assets/marketing/figma/service-yoga.jpg";
import serviceWoundCare from "@/assets/marketing/figma/service-wound-care.jpg";
import serviceVeterinary from "@/assets/marketing/figma/service-veterinary.jpg";
import serviceBloodTest from "@/assets/marketing/figma/service-blood-test.jpg";
import type { StaticImageData } from "next/image";
import { publicAssetPath } from "@/lib/base-path";

/** Hero background video (served from /public/videos). */
export const heroBackgroundVideoSrc = publicAssetPath(
  "/videos/hero-background.mp4",
);

/** Optimized JPEGs in /public for LCP and below-the-fold imagery. */
export const heroPosterSrc = publicAssetPath("/hero/hero-poster.jpg");
export const introAboutSrc = publicAssetPath("/images/intro-about.jpg");

/** Images from VaThala (1).fig (exported May 2026). */
export const marketingImages = {
  hero: heroHomeCare,
  introAbout,
  whyChoose,
  ctaBanner,
} as const;

const serviceImageBySlug: Record<string, StaticImageData> = {
  "home-doctor": serviceHomeDoctor,
  "nursing-services": serviceNursing,
  physiotherapy: servicePhysio,
  "elder-care-services": serviceElderCare,
  "yoga-classes": serviceYoga,
  "wound-care": serviceWoundCare,
  "veterinary-doctor": serviceVeterinary,
  "blood-test": serviceBloodTest,
};

export const getServiceImage = (slug: string): StaticImageData | undefined =>
  serviceImageBySlug[slug];
