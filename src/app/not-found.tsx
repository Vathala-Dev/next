"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function NotFound() {
  const redirectedRef = useRef(false);

  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "");
    const match = path.match(/^\/blog\/(.+)$/);
    if (match && !redirectedRef.current) {
      redirectedRef.current = true;
      window.location.replace(`/blog/?slug=${encodeURIComponent(match[1])}`);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-heading text-4xl font-medium text-vathala-forest">
        Page not found
      </h1>
      <p className="mt-4 text-vathala-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-vathala-forest px-6 py-3 text-sm font-semibold text-white hover:bg-vathala-forest/90"
      >
        Go home
      </Link>
    </div>
  );
}
