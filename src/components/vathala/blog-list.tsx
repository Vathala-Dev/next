"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/vathala/blog-card";
import type { BlogPost } from "@/lib/blogs";
import { fetchBlogsClient } from "@/lib/blogs-client";

const PAGE_SIZE = 9;

export const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchBlogsClient()
      .then(({ posts: p, categories: c }) => {
        setPosts(p);
        setCategories(c);
      })
      .catch(() => setError("Unable to load blogs. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(
    () =>
      activeCategory
        ? posts.filter((p) => p.category === activeCategory)
        : posts,
    [posts, activeCategory],
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

  const pagePosts = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page]);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    setPage(0);
  };

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-2xl bg-vathala-forest/5"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="py-12 text-center text-vathala-muted">{error}</p>;
  }

  return (
    <>
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCategoryClick(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-vathala-forest text-white"
                : "border border-vathala-forest/20 text-vathala-forest hover:bg-vathala-band"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-vathala-forest text-white"
                  : "border border-vathala-forest/20 text-vathala-forest hover:bg-vathala-band"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {pagePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {pagePosts.length === 0 && (
        <p className="py-12 text-center text-vathala-muted">
          No blogs found in this category.
        </p>
      )}

      {totalPages > 1 ? (
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          aria-label="Blog pagination"
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={page === 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-vathala-forest/25 px-5 py-2 text-sm font-semibold text-vathala-forest transition-colors hover:bg-vathala-band disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden />
            Prev
          </button>
          <span className="text-sm text-vathala-muted">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={page >= totalPages - 1}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-vathala-forest/25 px-5 py-2 text-sm font-semibold text-vathala-forest transition-colors hover:bg-vathala-band disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </nav>
      ) : null}
    </>
  );
};
