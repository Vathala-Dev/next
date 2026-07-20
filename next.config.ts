import type { NextConfig } from "next";

/** Single source of truth for subpath deploys (GitHub Pages, dev.vathala.com/test, etc.) */
const basePath = (process.env.BASE_PATH || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    // Keep client-side publicAssetPath() in sync with basePath (one env var at build time).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vathala-bucket.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

