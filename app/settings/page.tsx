'use client';

import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import { useLanguage } from "../../components/LanguageProvider";

export default function SettingsPage() {
  const { t, locale } = useLanguage();
  return (
    <main className="shell">
      <AppHeader />
      <div className="page-content">
        <div className="eyebrow">{t("settings")}</div>
        <h1 className="page-title">{t("settings")}</h1>
        <p className="lead">{t("translationNotice")}</p>
        <section className="library-panel">
          <h2>{t("language")}</h2>
          <LanguageSwitcher />
          <p className="translation-notice">{locale === "en" ? "Your preferred language is remembered on this device." : t("localStorage")}</p>
        </section>
        <section className="library-panel">
          <h2>{t("verifiedOnly")}</h2>
          <p className="translation-notice">{t("translationNotice")}</p>
        </section>
      </div>
    </main>
  );
}
