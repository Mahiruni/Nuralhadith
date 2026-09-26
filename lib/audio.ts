import type { Locale } from "./i18n";

export type AudioMode = "arabic" | "translation" | "bilingual";
export type AudioLanguage = "en" | "am" | "ti" | "om";

export type HadithAudioTrack = {
  id: string;
  language: "ar" | AudioLanguage;
  label: string;
  url: string;
  available: boolean;
  source: string;
  attribution?: string;
};

export type AudioState = {
  book: string;
  number: string;
  mode: AudioMode;
  index: number;
  position: number;
  duration: number;
};

const AUDIO_BASE = (process.env.NEXT_PUBLIC_HADITH_AUDIO_BASE_URL || "/audio/hadith").replace(/\/$/, "");

export function audioUrl(book: string, number: string | number, language: string) {
  return `${AUDIO_BASE}/${encodeURIComponent(book)}/${encodeURIComponent(String(number))}/${language}.mp3`;
}

export function audioLabel(language: string, locale: Locale) {
  if (language === "ar") return "Arabic";
  if (language === "am") return "አማርኛ";
  if (language === "ti") return "ትግርኛ";
  if (language === "om") return "Afaan Oromoo";
  return locale === "ar" ? "الإنجليزية" : "English";
}

export function buildTracks(book: string, number: string | number, locale: Locale): HadithAudioTrack[] {
  const languages = ["ar", "en", "am", "ti", "om"] as const;
  return languages.map(language => ({
    id: `${book}/${number}/${language}`,
    language,
    label: audioLabel(language, locale),
    url: audioUrl(book, number, language),
    available: true,
    source: "Nur al-Hadith audio manifest",
  }));
}

export function modeLanguages(mode: AudioMode, locale: Locale): string[] {
  if (mode === "arabic") return ["ar"];
  if (mode === "translation") return locale === "ar" ? ["en"] : [locale];
  return locale === "ar" ? ["ar", "en"] : ["ar", locale];
}

export function audioStorageKey(trackId: string) {
  return `nur-audio-${trackId}`;
}

export const AUDIO_NOTICE =
  "Only audio that is explicitly supplied by the configured audio source is presented as available. Nur al-Hadith does not synthesize or label machine-generated speech as prophetic recitation.";
