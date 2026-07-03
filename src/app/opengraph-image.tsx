import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand-colors";
import { siteDescription, siteName, siteTagline } from "@/lib/site";

export const dynamic = "force-static";

export const alt = `${siteName} - ${siteTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: `linear-gradient(145deg, ${brandColors.cream} 0%, #dce8e0 42%, ${brandColors.forest} 100%)`,
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 600,
            color: brandColors.forest,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 38,
            fontWeight: 500,
            color: "#2c332f",
            maxWidth: 920,
            lineHeight: 1.25,
          }}
        >
          {siteTagline}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#5c6560",
            maxWidth: 980,
            lineHeight: 1.35,
          }}
        >
          {siteDescription.length > 220
            ? `${siteDescription.slice(0, 220)}…`
            : siteDescription}
        </div>
      </div>
    ),
    { ...size },
  );
}
