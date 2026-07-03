import { vathalaApp } from "@/lib/app-links";

type AppDownloadLinksProps = {
  layout?: "row" | "column";
  className?: string;
};

const storeLinkClass =
  "inline-flex min-h-11 min-w-[10.5rem] flex-1 items-center gap-3 rounded-xl border border-vathala-forest/15 bg-white px-4 py-2.5 text-left shadow-sm transition-colors hover:border-vathala-forest/30 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest sm:min-w-[11.5rem] sm:flex-none";

const storeIconWrapClass =
  "flex size-8 shrink-0 items-center justify-center overflow-hidden";

/** Paths from Google Play badge artwork (Wikimedia Commons). */
const GooglePlayIcon = () => (
  <svg
    className="size-7 shrink-0"
    viewBox="12 11 32 33"
    width={28}
    height={28}
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#5778c5"
      d="m13.426 12.37c-0.08533 0.31466-0.13018 0.64425-0.13018 0.98651v26.623c0 0.34162 0.04432 0.67233 0.13072 0.98587l14.684-14.681-14.684-13.914"
    />
    <path
      fill="#3bad49"
      d="m27.727 26.668 7.3473-7.3451-15.96-9.2534c-0.58012-0.34746-1.2572-0.54799-1.9817-0.54799-1.7734 0-3.2697 1.2068-3.7051 2.8447-5.34e-4 0.0016-5.34e-4 0.0027-5.34e-4 0.0041l14.3 14.298"
    />
    <path
      fill="#eb3131"
      d="m27.622 25.899-14.194 15.066c5.34e-4 0.0031 0.0016 0.0057 0.0021 0.0089 0.43532 1.636 1.9296 2.8406 3.703 2.8406 0.70892 0 1.3745-0.19166 1.9453-0.52812l0.04533-0.02656 15.978-9.22-7.479-8.141"
    />
    <path
      fill="#f6b60b"
      d="m41.983 23.334-0.0136-0.0093-6.8982-3.999-7.7717 6.9156 7.7987 7.7977 6.8618-3.9592c1.203-0.64945 2.0197-1.9177 2.0197-3.3802 0-1.452-0.80571-2.7139-1.9968-3.3655"
    />
  </svg>
);

const AppStoreIcon = () => (
  <svg
    className="size-[1.625rem] text-vathala-forest"
    viewBox="0 0 24 24"
    aria-hidden
    fill="currentColor"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export const AppDownloadLinks = ({
  layout = "row",
  className = "",
}: AppDownloadLinksProps) => {
  const { googlePlay, appStore, name } = vathalaApp;

  return (
    <div
      className={`flex gap-3 ${layout === "column" ? "flex-col" : "flex-col sm:flex-row"} ${className}`}
    >
      <a
        href={googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        className={storeLinkClass}
      >
        <span className={storeIconWrapClass}>
          <GooglePlayIcon />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium uppercase tracking-wide text-vathala-muted">
            Get it on
          </span>
          <span className="block text-base font-semibold text-vathala-forest">
            Google Play
          </span>
        </span>
        <span className="sr-only">({name})</span>
      </a>
      <a
        href={appStore}
        target="_blank"
        rel="noopener noreferrer"
        className={storeLinkClass}
      >
        <span className={storeIconWrapClass}>
          <AppStoreIcon />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium uppercase tracking-wide text-vathala-muted">
            Download on the
          </span>
          <span className="block text-base font-semibold text-vathala-forest">
            App Store
          </span>
        </span>
        <span className="sr-only">({name})</span>
      </a>
    </div>
  );
};
