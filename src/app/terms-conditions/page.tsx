import type { Metadata } from "next";

import { BlogPageShell } from "@/components/vathala/blog-page-shell";
import { LegalDocumentView } from "@/components/vathala/legal-document";
import { termsConditions } from "@/lib/legal/terms-conditions-content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the VaThala website and mobile application operated by Muniah Technologies.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <BlogPageShell>
      <section className="border-b border-vathala-forest/10 bg-vathala-band/60 pt-24 sm:pt-28">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <LegalDocumentView document={termsConditions} />
        </div>
      </section>
    </BlogPageShell>
  );
}
