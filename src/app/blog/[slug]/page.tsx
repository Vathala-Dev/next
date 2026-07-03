import type { Metadata } from "next";
import { BlogDetail } from "@/components/vathala/blog-detail";
import { BlogPageShell } from "@/components/vathala/blog-page-shell";
import { getAllBlogSlugs } from "@/lib/blogs";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  title: "Blog",
  robots: { index: true, follow: true },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <BlogPageShell>
      <BlogDetail slug={slug} />
    </BlogPageShell>
  );
}
