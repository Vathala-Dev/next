/** Replaces em dashes (—) with punctuation suited to web copy. */
export const stripEmDashes = (text: string): string => {
  if (!text.includes("\u2014")) return text;
  return text
    .replace(/ — /g, ": ")
    .replace(/ —/g, ": ")
    .replace(/—/g, ", ");
};
