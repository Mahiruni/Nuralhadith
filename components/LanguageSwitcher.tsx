"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, locales, t } = useLanguage();

  return (
    <label className="language-switcher">
      <span className="sr-only">{t("language")}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        aria-label={t("language")}
      >
        {Object.entries(locales).map(([code, info]) => (
          <option value={code} key={code}>{info.native}</option>
        ))}
      </select>
    </label>
  );
}
