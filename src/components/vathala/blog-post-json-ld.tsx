import { siteName, siteUrl } from "@/lib/site";
import type { BlogPost } from "@/lib/blogs";

type BlogPostJsonLdProps = {
  post: BlogPost;
  canonical: string;
};

export const BlogPostJsonLd = ({ post, canonical }: BlogPostJsonLdProps) => {
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author || siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    url: canonical,
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
  };

  const faqJsonLd =
    post.faqList.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqList.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const howToJsonLd =
    post.howToSteps && post.howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: post.title,
          step: post.howToSteps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.stepTitle,
            text: step.stepDescription,
          })),
        }
      : null;

  const ratingJsonLd =
    post.ratingSchema?.ratingValue != null
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: post.ratingSchema.ratingName || post.title,
          description: post.ratingSchema.ratingDescription,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: post.ratingSchema.ratingValue,
            ratingCount: post.ratingSchema.ratingCount,
          },
        }
      : null;

  const blocks = [blogPosting, faqJsonLd, howToJsonLd, ratingJsonLd].filter(
    Boolean,
  );

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
};
