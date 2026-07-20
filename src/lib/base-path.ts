/** Repo subpath on GitHub Pages (e.g. `/vathala-web`). Empty at root / custom domain. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  "",
);

/** Prefix a public-folder path for static export + GitHub Pages. */
export const publicAssetPath = (path: string): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${normalized}` : normalized;
};
