import type { LegalDocument } from "@/lib/legal/types";
import termsParagraphs from "@/lib/legal/terms-paragraphs.json";

/** Sourced from https://curoaid.com/terms-conditions */
export const termsConditions: LegalDocument = {
  title: "Terms & Conditions",
  blocks: termsParagraphs.map((text) => ({ type: "paragraph" as const, text })),
};
