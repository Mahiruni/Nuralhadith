'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { collections } from "../lib/collections";
import Icon from "./Icon";
import { useLanguage } from "./LanguageProvider";
import styles from "./HadithMenu.module.css";

export default function HadithMenu() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (open) {
      document.body.style.overflow = "hidden";
      window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        aria-label="Open Hadith collections menu"
        aria-expanded={open}
        aria-controls="hadith-menu-drawer"
      >
        <span className={styles.lines} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.label}>Menu</span>
      </button>

      <div className={`${styles.layer} ${open ? styles.open : ""}`} aria-hidden={!open}>
        <button type="button" className={styles.backdrop} onClick={close} aria-label="Close menu" tabIndex={open ? 0 : -1} />
        <aside
          id="hadith-menu-drawer"
          className={styles.drawer}
          role="dialog"
          aria-modal="true"
          aria-label="Hadith collections"
          aria-hidden={!open}
        >
          <div className={styles.head}>
            <div><span className="eyebrow">نور الحديث</span><h2>Hadith Library</h2></div>
            <button ref={closeButtonRef} type="button" className={styles.close} onClick={close} aria-label="Close menu" tabIndex={open ? 0 : -1}>
              <Icon name="close" size={18} />
            </button>
          </div>

          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/" onClick={close}><Icon name="library" size={16} /> Home</Link>
            <Link href="/search" onClick={close}><Icon name="search" size={16} /> {t("search")}</Link>
            <Link href="/library" onClick={close}><Icon name="bookmark" size={16} /> {t("library")}</Link>
          </nav>

          <div className={styles.section}>
            <div className={styles.sectionTitle}><span>Hadith Collections</span><small>{collections.length} collections</small></div>
            <nav className={styles.list} aria-label="Hadith collections">
              {collections.map((collection, index) => (
                <Link key={collection.id} href={`/collections/${collection.id}`} onClick={close}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.copy}><strong>{collection.name}</strong><small dir="rtl">{collection.arabic}</small></span>
                  <span className={styles.count}>{collection.count.toLocaleString()}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.footer}>
            <Link href="/settings" onClick={close}>Settings</Link>
            <span>Arabic · English · አማርኛ · Oromo · Tigrinya</span>
          </div>
        </aside>
      </div>
    </>
  );
}
