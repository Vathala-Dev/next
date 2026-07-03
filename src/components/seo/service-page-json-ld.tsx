import type { ServicePageData } from "@/lib/service-content";
import { siteUrl } from "@/lib/site";

type ServicePageJsonLdProps = {
  data: ServicePageData;
};

export const ServicePageJsonLd = ({ data }: ServicePageJsonLdProps) => {
  const pageUrl = `${siteUrl}${data.path}`;
  const faqEntity = data.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: data.heroTitle,
        description: data.metaDescription,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: data.heroTitle,
        description: data.metaDescription,
        serviceType: data.leadHeading,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        mainEntity: faqEntity,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};
