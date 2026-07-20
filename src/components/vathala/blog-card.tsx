import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/lib/blogs";

type BlogCardProps = {
  post: BlogPost;
};

export const BlogCard = ({ post }: BlogCardProps) => (
  <article className="motion-hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-vathala-forest/10 bg-white shadow-sm">
    <Link
      href={`/blog/${post.slug}`}
      className="block overflow-hidden bg-vathala-band"
    >
      {post.imageUrl ? (
        <Image
          src={post.imageUrl}
          alt={`Cover image for ${post.title}`}
          width={1200}
          height={675}
          className="h-auto w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      ) : (
        <div
          className="flex h-full items-center justify-center bg-vathala-forest/10 font-heading text-4xl text-vathala-forest/30"
          aria-hidden
        >
          V
        </div>
      )}
    </Link>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <time
          dateTime={post.date}
          className="text-xs font-semibold uppercase tracking-wider text-vathala-sage-deep"
        >
          {formatBlogDate(post.date)}
        </time>
        {post.category && (
          <span className="rounded-full bg-vathala-forest/10 px-2.5 py-0.5 text-xs font-medium text-vathala-forest">
            {post.category}
          </span>
        )}
      </div>
      <h2 className="mt-2 font-heading text-lg font-semibold leading-snug text-vathala-forest sm:text-xl">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-vathala-sage-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-vathala-muted line-clamp-3">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-vathala-forest hover:text-vathala-sage-deep"
      >
        Read: {post.title}
      </Link>
    </div>
  </article>
);
