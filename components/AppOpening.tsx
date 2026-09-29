'use client';

import { useEffect, useState } from "react";
import styles from "./AppOpening.module.css";

export default function AppOpening() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.opening} role="status" aria-label="Opening Nur al-Hadith">
      <div className={styles.mark} aria-hidden="true">ن</div>
      <div className={styles.title}>Nur al-Hadith</div>
      <div className={styles.arabic} dir="rtl">نور الحديث</div>
      <div className={styles.rule} aria-hidden="true" />
      <div className={styles.caption}>Read with purpose</div>
    </div>
  );
}
