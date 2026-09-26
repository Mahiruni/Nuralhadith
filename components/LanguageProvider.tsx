"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LOCALES, Locale, translate } from "../lib/i18n";

type ContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  locales: typeof LOCALES;
};

const Context = createContext<ContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("nur-language") as Locale | null;
    if (saved && saved in LOCALES) setLocaleState(saved);
  }, []);

  useEffect(() => {
    const lang = LOCALES[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = lang.dir;
    document.documentElement.dataset.locale = locale;
    localStorage.setItem("nur-language", locale);
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale: (next: Locale) => setLocaleState(next),
    t: (key: string) => translate(locale, key),
    locales: LOCALES,
  }), [locale]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useLanguage() {
  const value = useContext(Context);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
