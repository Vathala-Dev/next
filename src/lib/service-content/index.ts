import { bloodTestAtHome } from "./blood-test-at-home";
import { doctorVisitAtHome } from "./doctor-visit-at-home";
import { elderCare } from "./elder-care";
import { nursingCare } from "./nursing-care";
import { physioCare } from "./physio-care";
import type { ServicePageData } from "./types";
import { veterinaryDoctorHomeVisit } from "./veterinary-doctor-home-visit";
import { woundCareDressing } from "./wound-care-dressing";
import { yogaAtHome } from "./yoga-at-home";

export type { ServiceContentBlock, ServicePageData } from "./types";

const pages: ServicePageData[] = [
  doctorVisitAtHome,
  nursingCare,
  physioCare,
  elderCare,
  yogaAtHome,
  woundCareDressing,
  veterinaryDoctorHomeVisit,
  bloodTestAtHome,
];

const byPath = new Map<string, ServicePageData>(
  pages.map((p) => [p.path, p]),
);

export const allServicePaths = pages.map((p) => p.path);

export const getServicePage = (path: string): ServicePageData | undefined =>
  byPath.get(path);

export const allServicePages = pages;
