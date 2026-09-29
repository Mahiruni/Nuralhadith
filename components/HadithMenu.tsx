'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { collections } from "../lib/collections";
import Icon from "./Icon";
import { useLanguage } from "./LanguageProvider";
import styles from "./HadithMenu.module.css";

type MenuItem = { href: string; label: string; icon: "home"|"library"|"search"|"bookmark"|"note"|"save"|"compass"|"headphones"|"bell" };
const primary: MenuItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/search", label: "Search", icon: "search" },
  { href: "/collections", label: "Collections", icon: "library" },
  { href: "/topics", label: "Topics", icon: "compass" },
  { href: "/library", label: "My Library", icon: "bookmark" },
  { href: "/?daily=1", label: "Daily Hadith", icon: "bell" },
  { href: "/audiobooks", label: "Audiobooks", icon: "headphones" },
];

export default function HadithMenu() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    const onOpen = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("nur:open-menu", onOpen);
    document.body.style.overflow = open ? "hidden" : previous;
    if (open) window.setTimeout(() => closeButtonRef.current?.focus(), 80);
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("nur:open-menu", onOpen); document.body.style.overflow = previous; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open} aria-controls="hadith-menu-drawer">
        <span className={`${styles.lines} ${open ? styles.linesOpen : ""}`} aria-hidden="true"><i/><i/><i/></span>
        <span className={styles.label}>Menu</span>
      </button>

      <div className={`${styles.layer} ${open ? styles.open : ""}`} aria-hidden={!open}>
        <button type="button" className={styles.backdrop} onClick={close} aria-label="Close menu" tabIndex={open ? 0 : -1}/>
        <aside id="hadith-menu-drawer" className={styles.drawer} role="dialog" aria-modal="true"
          aria-label="Nur al-Hadith navigation" aria-hidden={!open}>
          <div className={styles.head}>
            <div className={styles.identity}>
              <div className={styles.identityText}><span className={styles.arabicName}>نور الحديث</span><h2>Nur al-Hadith</h2><p>Hadith Library</p></div>
            </div>
            <button ref={closeButtonRef} type="button" className={styles.close} onClick={close} aria-label="Close menu" tabIndex={open ? 0 : -1}>
              <Icon name="close" size={20}/>
            </button>
          </div>

          <nav className={styles.nav} aria-label="Primary navigation">
            {primary.map(item => <Link key={item.href} href={item.href} onClick={close}>
              <Icon name={item.icon} size={21}/><span>{item.label}</span>
            </Link>)}
          </nav>

          <div className={styles.section}>
            <div className={styles.sectionTitle}><span>Collections</span><small>{collections.length}</small></div>
            <nav className={styles.list} aria-label="Hadith collections">
              {collections.map((collection, index) => (
                <Link key={collection.id} href={`/collections/${collection.id}`} onClick={close}>
                  
                  <span className={styles.copy}><strong>{collection.name}</strong><small dir="rtl">{collection.arabic}</small></span>
                  <span className={styles.count}>{collection.count.toLocaleString()}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.secondary}>
            <div className={styles.sectionTitle}><span>More</span></div>
            <Link href="/settings" onClick={close}><span>{t("settings")}</span></Link>
            <Link href="/settings" onClick={close}><Icon name="language" size={21}/><span>{t("language")} / Appearance</span></Link>
            <div className={styles.offline}><Icon name="info" size={21}/><span>Offline mode</span><span className={styles.offlineDot}/></div>
            <Link href="/sources" onClick={close}><Icon name="info" size={21}/><span>Sources & Methodology</span></Link>
            <Link href="/report" onClick={close}><Icon name="heart" size={21}/><span>Support Nur al-Hadith</span></Link>
          </div>

          <div className={styles.footer}><span>نور الحديث · Read with purpose</span><small>Nur al-Hadith · v1.0</small></div>
        </aside>
      </div>
    </>
  );
}
