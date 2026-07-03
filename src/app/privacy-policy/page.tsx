import type { Metadata } from "next";

import { BlogPageShell } from "@/components/vathala/blog-page-shell";
import { LegalDocumentView } from "@/components/vathala/legal-document";
import { privacyPolicy } from "@/lib/legal/privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "VaThala privacy policy: how Muniah Technologies collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <BlogPageShell>
      <section className="border-b border-vathala-forest/10 bg-vathala-band/60 pt-24 sm:pt-28">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <LegalDocumentView document={privacyPolicy} />
        </div>
      </section>
    </BlogPageShell>
  );
}
