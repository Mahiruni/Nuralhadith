'use client';

import { useEffect, useState } from "react";

export default function AppOpening() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="app-opening" role="status" aria-label="Opening Nur al-Hadith">
      <div className="app-opening-mark" aria-hidden="true">ن</div>
      <div className="app-opening-title">Nur al-Hadith</div>
      <div className="app-opening-arabic" dir="rtl">نور الحديث</div>
      <div className="app-opening-rule" aria-hidden="true" />
      <div className="app-opening-caption">Read with purpose</div>
    </div>
  );
}
