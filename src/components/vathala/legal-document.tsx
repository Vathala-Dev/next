import type { LegalBlock, LegalDocument } from "@/lib/legal/types";

type LegalDocumentViewProps = {
  document: LegalDocument;
};

const renderBlock = (block: LegalBlock, index: number) => {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            key={index}
            className="mt-10 font-heading text-2xl font-semibold text-vathala-forest first:mt-0"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          className="mt-8 font-heading text-xl font-semibold text-vathala-forest"
        >
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul
          key={index}
          className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-vathala-muted"
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return (
        <p
          key={index}
          className="mt-4 text-base leading-relaxed text-vathala-muted"
        >
          {block.text}
        </p>
      );
  }
};

export const LegalDocumentView = ({ document }: LegalDocumentViewProps) => (
  <article>
    <header>
      <h1 className="font-heading text-3xl font-medium tracking-tight text-vathala-forest sm:text-4xl lg:text-5xl">
        {document.title}
      </h1>
      {document.lastUpdated ? (
        <p className="mt-3 text-sm font-medium text-vathala-sage-deep">
          Last updated: {document.lastUpdated}
        </p>
      ) : null}
      {document.intro ? (
        <p className="mt-6 text-base leading-relaxed text-vathala-muted sm:text-lg">
          {document.intro}
        </p>
      ) : null}
    </header>
    <div className="mt-8">{document.blocks.map(renderBlock)}</div>
  </article>
);
