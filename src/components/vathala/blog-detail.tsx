"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogPostJsonLd } from "@/components/vathala/blog-post-json-ld";
import { formatBlogDate, type BlogPost } from "@/lib/blogs";
import { fetchBlogsClient } from "@/lib/blogs-client";
import { siteName, siteUrl } from "@/lib/site";

const FAQ_HEADING_RE =
  /<h[23][^>]*>\s*(?:<strong>)?\s*Frequently\s+Asked\s+Questions/i;

const stripEmbeddedFaq = (html: string): string => {
  const match = FAQ_HEADING_RE.exec(html);
  if (!match) return html;
  const tagStart = html.lastIndexOf("<", match.index);
  return html.slice(0, tagStart >= 0 ? tagStart : match.index).trimEnd();
};

export const BlogDetail = ({ slug }: { slug: string }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchBlogsClient()
      .then(({ posts }) => {
        const found = posts.find((p) => p.slug === slug);
        if (found) {
          setPost(found);
          document.title = `${found.metaTitle || found.title} | ${siteName}`;
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 sm:pt-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-24 animate-pulse rounded bg-vathala-forest/10" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-vathala-forest/10" />
            <div className="h-10 w-full animate-pulse rounded bg-vathala-forest/10" />
          </div>
          <div className="mt-8 h-80 animate-pulse rounded-2xl bg-vathala-forest/5" />
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex flex-col items-center justify-center px-4 pt-32 pb-20">
        <h1 className="font-heading text-2xl font-medium text-vathala-forest">
          Blog not found
        </h1>
        <Link
          href="/blog"
          className="mt-4 text-sm font-semibold text-vathala-forest hover:underline"
        >
          Back to all blogs
        </Link>
      </div>
    );
  }

  const canonical = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`;
  const htmlContent =
    post.content && post.faqList.length > 0
      ? stripEmbeddedFaq(post.content)
      : post.content;

  return (
    <>
      <BlogPostJsonLd post={post} canonical={canonical} />

      <article className="pt-24 sm:pt-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-vathala-forest hover:text-vathala-sage-deep"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All blogs
          </Link>

          <header className="mt-6">
            <time
              dateTime={post.date}
              className="text-xs font-semibold uppercase tracking-wider text-vathala-sage-deep"
            >
              {formatBlogDate(post.date)}
            </time>
            {post.category && (
              <span className="ml-2 rounded-full bg-vathala-forest/10 px-2.5 py-0.5 text-xs font-medium text-vathala-forest">
                {post.category}
              </span>
            )}
            <h1 className="mt-3 font-heading text-2xl font-medium leading-tight tracking-tight text-vathala-forest sm:text-4xl">
              {post.title}
            </h1>
          </header>
        </div>

        {post.imageUrl ? (
          <div className="mx-auto mt-8 max-w-4xl px-4 sm:mt-10 sm:px-6">
            <div className="overflow-hidden rounded-2xl bg-vathala-band">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={675}
                className="h-auto w-full"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
                unoptimized
              />
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {htmlContent ? (
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : null}

          {post.faqList.length > 0 ? (
            <section className="mt-14 border-t border-vathala-forest/10 pt-10">
              <h2 className="font-heading text-2xl font-semibold text-vathala-forest">
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-6">
                {post.faqList.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-semibold text-vathala-forest">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-vathala-muted sm:text-base">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <p className="mt-12 text-sm text-vathala-muted">
            Published by {post.author ?? siteName} ·{" "}
            <Link
              href="/blog"
              className="font-semibold text-vathala-forest hover:underline"
            >
              More articles
            </Link>
          </p>
        </div>
      </article>
    </>
  );
};
