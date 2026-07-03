import type { Metadata } from "next";
import { getServicePage } from "@/lib/service-content";
import { siteName, siteUrl } from "@/lib/site";

export const buildServiceMetadata = (path: string): Metadata => {
  const p = getServicePage(path);
  if (!p) {
    return { title: `Not found | ${siteName}` };
  }
  const shortTitle = p.metaTitle.includes("|")
    ? p.metaTitle.split("|")[0].trim()
    : p.heroTitle;

  return {
    title: shortTitle,
    description: p.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `${siteUrl}${path}`,
      siteName,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
};
