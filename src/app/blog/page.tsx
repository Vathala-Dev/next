"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BlogList } from "@/components/vathala/blog-list";
import { BlogDetail } from "@/components/vathala/blog-detail";
import { BlogPageShell } from "@/components/vathala/blog-page-shell";
import { siteName } from "@/lib/site";

const BlogPageContent = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  if (slug) {
    return (
      <BlogPageShell>
        <BlogDetail slug={slug} />
      </BlogPageShell>
    );
  }


  return (
    <BlogPageShell>
      <section className="border-b border-vathala-forest/10 bg-vathala-band/60 pb-10 pt-24 sm:pb-14 sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="font-heading text-3xl font-medium tracking-tight text-vathala-forest sm:text-4xl lg:text-5xl">
            Blogs
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-vathala-muted sm:text-lg">
            Expert guides on home healthcare, elder care, nursing, physiotherapy,
            veterinary visits, and wellness from the {siteName} team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <BlogList />
      </section>
    </BlogPageShell>
  );
};

export default function BlogIndexPage() {
  return (
    <Suspense>
      <BlogPageContent />
    </Suspense>
  );
}
