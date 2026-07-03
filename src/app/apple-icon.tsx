import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Static gold V for iOS home screen (no animation). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(155deg, #1a4338 0%, #1e4d3f 42%, #163830 100%)",
          borderRadius: 9999,
          border: "3px solid rgba(212, 175, 55, 0.5)",
          boxShadow: "inset 0 2px 0 rgba(255, 236, 179, 0.25)",
        }}
      >
        <span
          style={{
            color: "#e6c35c",
            fontSize: 108,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            textShadow: "0 2px 4px rgba(0,0,0,0.45), 0 0 16px rgba(255, 215, 120, 0.35)",
          }}
        >
          V
        </span>
      </div>
    ),
    { ...size },
  );
}
