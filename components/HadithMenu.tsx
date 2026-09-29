'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { collections } from "../lib/collections";
import Icon from "./Icon";
import { useLanguage } from "./LanguageProvider";

export default function HadithMenu() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="hadith-menu-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open Hadith collections menu"
        aria-expanded={open}
        aria-controls="hadith-menu-drawer"
      >
        <span className="hamburger-lines" aria-hidden="true"><i /><i /><i /></span>
        <span className="hadith-menu-label">Menu</span>
      </button>

      {open && (
        <div className="hadith-menu-layer" role="presentation">
          <button className="hadith-menu-backdrop" onClick={() => setOpen(false)} aria-label="Close menu" />
          <aside id="hadith-menu-drawer" className="hadith-drawer" role="dialog" aria-modal="true" aria-label="Hadith collections">
            <div className="hadith-drawer-head">
              <div>
                <span className="eyebrow">نور الحديث</span>
                <h2>Hadith Library</h2>
              </div>
              <button type="button" className="hadith-close" onClick={() => setOpen(false)} aria-label="Close menu">
                <Icon name="x" size={18} />
              </button>
            </div>

            <nav className="hadith-drawer-nav" aria-label="Main navigation">
              <Link href="/" onClick={() => setOpen(false)}><Icon name="library" size={16} /> Home</Link>
              <Link href="/search" onClick={() => setOpen(false)}><Icon name="search" size={16} /> {t("search")}</Link>
              <Link href="/library" onClick={() => setOpen(false)}><Icon name="bookmark" size={16} /> {t("library")}</Link>
            </nav>

            <div className="hadith-drawer-section">
              <div className="hadith-drawer-section-title">
                <span>Hadith Collections</span>
                <small>{collections.length} collections</small>
              </div>
              <nav className="hadith-collection-list" aria-label="Hadith collections">
                {collections.map((collection, index) => (
                  <Link key={collection.id} href={`/collections/${collection.id}`} onClick={() => setOpen(false)}>
                    <span className="hadith-collection-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="hadith-collection-copy">
                      <strong>{collection.name}</strong>
                      <small dir="rtl">{collection.arabic}</small>
                    </span>
                    <span className="hadith-collection-count">{collection.count.toLocaleString()}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hadith-drawer-footer">
              <Link href="/settings" onClick={() => setOpen(false)}>Settings</Link>
              <span>Arabic · English · አማርኛ · Oromo · Tigrinya</span>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
