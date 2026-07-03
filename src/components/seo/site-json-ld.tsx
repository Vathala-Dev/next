import { faqItems } from "@/lib/faq-content";
import { siteDescription, siteName, siteTagline, siteUrl } from "@/lib/site";
import { vathalaServices } from "@/lib/vathala-services";

const pageTitle = `${siteName} - ${siteTagline}`;

const faqMainEntity = faqItems.map((item) => ({
  "@type": "Question",
  name: item.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: item.answer,
  },
}));

const servicesItemList = {
  "@type": "ItemList",
  "@id": `${siteUrl}/#services-catalog`,
  name: `${siteName} home healthcare services`,
  numberOfItems: vathalaServices.length,
  itemListElement: vathalaServices.map((s, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: s.title,
    description: s.description,
    url: `${siteUrl}${s.path}`,
  })),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      knowsAbout: vathalaServices.map((s) => s.title),
      subjectOf: { "@id": `${siteUrl}/#services-catalog` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
    servicesItemList,
    {
      "@type": ["WebPage", "FAQPage"],
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: pageTitle,
      description: siteDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#hero-heading", "#aeo-lead"],
      },
      mainEntity: faqMainEntity,
    },
  ],
};

export const SiteJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(structuredData),
    }}
  />
);
