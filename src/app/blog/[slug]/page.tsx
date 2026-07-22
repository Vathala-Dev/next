import type { Metadata } from "next";
import { BlogDetail } from "@/components/vathala/blog-detail";
import { BlogPageShell } from "@/components/vathala/blog-page-shell";
import { getAllBlogSlugs ,getBlogBySlug} from "@/lib/blogs";
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return (

    slugs.map((slug) => ({ slug }))
  )
}

// export const metadata: Metadata = {
//   title: "Blog",
//   robots: { index: true, follow: true },
// };


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    keywords: post.metaKeywords,
    robots: {
      index: !post.noIndex,
      follow: true,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: post.ogImageUrl
        ? [{ url: post.ogImageUrl }]
        : post.imageUrl
          ? [{ url: post.imageUrl }]
          : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: post.ogImageUrl
        ? [post.ogImageUrl]
        : post.imageUrl
          ? [post.imageUrl]
          : [],
    },
  };
}

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
