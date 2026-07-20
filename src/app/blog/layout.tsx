import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Healthcare Blogs",
  description:
    "Explore the VaThala Blog for expert insights on home healthcare, nursing care, physiotherapy, elder care, wound care, wellness, and healthcare services delivered at home.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
