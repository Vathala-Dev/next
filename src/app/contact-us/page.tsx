import type { Metadata } from "next";

import { BlogPageShell } from "@/components/vathala/blog-page-shell";
import { ContactUsSection } from "@/components/vathala/contact-us-section";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach VaThala by phone, email, or message. Our care team is available 24/7 for home healthcare bookings across India.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <BlogPageShell>
      <section className="border-b border-vathala-forest/10 bg-vathala-band/60 pb-8 pt-20 sm:pb-14 sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-14 lg:px-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-vathala-forest sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
        </div>
      </section>

      <ContactUsSection />
    </BlogPageShell>
  );
}
