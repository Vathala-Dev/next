export type ServiceContentBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "h4"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "note"; text: string };

export type ServiceContentSection = {
  heading?: string;
  blocks: ServiceContentBlock[];
};

export type ServiceFaq = { question: string; answer: string };

/** Sub-service shown in the "Our Services Include" carousel. */
export type SubService = {
  label: string;
  /** Path to icon image in /public (use publicAssetPath at render time). */
  iconPath: string;
};

/** Benefit bullet for "Why Choose" section. */
export type WhyChooseBenefit = string;

/** Step for the "How It Works" section. */
export type HowItWorksStep = string;

export type ServicePageData = {
  path: string;
  sourceUrl: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroEyebrow?: string;
  /** Path to hero banner image in /public (use publicAssetPath at render time). */
  heroBannerPath?: string;
  /** Override hero title text color (default: vathala-forest). */
  heroTitleColor?: string;
  leadHeading: string;
  leadParagraphs: string[];
  /** Second column heading + paragraphs for the intro card. */
  secondaryHeading?: string;
  secondaryParagraphs?: string[];
  /** Sub-services carousel items. */
  subServices?: SubService[];
  subServicesIntro?: string;
  /** "Why Choose" section. */
  whyChooseHeading?: string;
  whyChooseBenefits?: WhyChooseBenefit[];
  /** Image import path for the "Why Choose" section (relative import in the component). */
  whyChooseImageSlug?: string;
  /** "How It Works" steps (numbered list on the left). */
  howItWorksSteps?: HowItWorksStep[];
  howItWorksNote?: string;
  /** Path to "How It Works" illustration in /public. */
  howItWorksImagePath?: string;
  sections: ServiceContentSection[];
  faqs: ServiceFaq[];
};
