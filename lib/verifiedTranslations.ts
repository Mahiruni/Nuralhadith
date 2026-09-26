import type { Locale } from "./i18n";

export type VerifiedTranslation = {
  locale: Locale;
  text: string;
  source: string;
  sourceUrl: string;
  attribution?: string;
};

export type TranslationLookup = {
  status: "verified" | "unavailable";
  translation?: VerifiedTranslation;
};

/*
 * Translation policy:
 * - Never machine-translate hadith text in the reader.
 * - Arabic remains authoritative.
 * - Only a translation explicitly mapped to the canonical hadith identity
 *   and attributed to a verified source may be returned.
 *
 * The current corpus source does not contain Amharic, Tigrinya, or Oromo
 * translations keyed to its eight-book IDs. We therefore fail closed rather
 * than silently displaying an unverified translation.
 *
 * This registry is intentionally the integration point for reviewed datasets
 * from HadeethEnc/IslamHouse or a separately licensed scholarly edition.
 */
const registry: Record<string, VerifiedTranslation> = {};

export function getVerifiedTranslation(
  locale: Locale,
  book: string,
  number: string | number,
): TranslationLookup {
  if (locale === "en") return { status: "unavailable" };
  const item = registry[`${locale}:${book}:${number}`];
  return item ? { status: "verified", translation: item } : { status: "unavailable" };
}
