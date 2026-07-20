/**
 * Desktop hero text panel — production default: `"forest"`.
 *
 * Forest green copy on a centered, subtle frosted-glass card (see
 * `.hero-text-panel--forest` in globals.css). Other variants kept for quick A/B:
 * - `"none"`  — white text on video
 * - `"glass"` — dark green glass panel, white text
 */
export type HeroDesktopTextVariant = "none" | "glass" | "forest";

/** Locked-in hero look (subtle glass + forest text). */
export const heroDesktopTextVariant = "forest" as HeroDesktopTextVariant;

/** White nav links over the hero video (`none` / `glass` variants only). */
export const heroDesktopNavUsesLightOverlay = (
  variant: HeroDesktopTextVariant,
): boolean => variant === "none" || variant === "glass";

export type HeroDesktopCopyStyles = {
  eyebrow: string;
  heading: string;
  lead: string;
  appLabel: string;
};

export const getHeroDesktopCopyStyles = (): HeroDesktopCopyStyles => {
  switch (heroDesktopTextVariant) {
    case "forest":
      return {
        eyebrow: "text-vathala-forest drop-shadow-[0_1px_8px_rgba(255,255,255,0.65)]",
        heading:
          "text-vathala-forest drop-shadow-[0_2px_20px_rgba(255,255,255,0.75)]",
        lead: "text-vathala-muted drop-shadow-[0_1px_12px_rgba(255,255,255,0.7)]",
        appLabel: "text-vathala-muted drop-shadow-[0_1px_8px_rgba(255,255,255,0.65)]",
      };
    case "glass":
      return {
        eyebrow: "text-vathala-sage",
        heading: "text-white",
        lead: "text-white/95",
        appLabel: "text-white/85",
      };
    case "none":
    default:
      return {
        eyebrow: "text-vathala-terracotta drop-shadow-sm",
        heading:
          "text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]",
        lead: "text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)]",
        appLabel: "text-white/80",
      };
  }
};
