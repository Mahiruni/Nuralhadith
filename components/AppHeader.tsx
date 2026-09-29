"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import Icon from "./Icon";

export default function AppHeader() {
  const { t } = useLanguage();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nur-theme") === "dark";
    setDark(saved);
    document.documentElement.dataset.theme = saved ? "dark" : "light";
  }, []);

  function toggleTheme() {
    setDark((value) => {
      const next = !value;
      localStorage.setItem("nur-theme", next ? "dark" : "light");
      document.documentElement.dataset.theme = next ? "dark" : "light";
      return next;
    });
  }

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link href="/" className="site-brand" aria-label="Nur al-Hadith home">
          <span className="site-brand-name">Nur al-Hadith</span>
          <span className="site-brand-tagline">Hadith Library</span>
        </Link>

        <nav className="app-header-nav" aria-label="Main navigation">
          <Link href="/collections">{t("collections")}</Link>
          <Link href="/search">{t("search")}</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/library">{t("library")}</Link>
          <Link href="/audiobooks">Audio</Link>
        </nav>

        <div className="app-header-tools">
          <LanguageSwitcher />
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={t("theme")}
            title={t("theme")}
          >
            <Icon name={dark ? "sun" : "moon"} size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
