export type LegalListItem = string;

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: LegalListItem[] };

export type LegalDocument = {
  title: string;
  lastUpdated?: string;
  intro?: string;
  blocks: LegalBlock[];
};
