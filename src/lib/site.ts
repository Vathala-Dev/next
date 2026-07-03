/** Canonical site origin - set in production via NEXT_PUBLIC_SITE_URL (no trailing slash). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vathala.com"
).replace(/\/$/, "");

export const siteName = "VaThala";

export const siteDescription =
  "Get trusted home healthcare services with VaThala. Book doctor visits, nursing, physiotherapy, elder care, wound care, veterinary care & more at home.";

export const siteTagline = "Trusted Home Healthcare & Nursing Services";
